import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cliente Supabase com permissões de service role para operações administrativas
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar segurança: validar header secreto
    const authHeader = request.headers.get("x-kirvano-secret");
    const expectedSecret = process.env.KIRVANO_SECRET;

    if (!expectedSecret) {
      console.error("KIRVANO_SECRET não configurado no servidor");
      return NextResponse.json(
        { success: false, error: "Configuração do servidor incompleta" },
        { status: 500 }
      );
    }

    if (authHeader !== expectedSecret) {
      console.error("Tentativa de acesso não autorizado ao webhook");
      return NextResponse.json(
        { success: false, error: "Não autorizado" },
        { status: 401 }
      );
    }

    // 2. Ler body do webhook
    const body = await request.json();
    const { customer_email, status, event_type } = body;

    // Log para debug (remova em produção se necessário)
    console.log("Webhook recebido:", { customer_email, status, event_type });

    // 3. Validar dados obrigatórios
    if (!customer_email) {
      return NextResponse.json(
        { success: false, error: "Campo customer_email é obrigatório" },
        { status: 400 }
      );
    }

    // 4. Verificar se o status indica pagamento aprovado/assinatura ativa
    // Ajuste esses valores conforme a documentação da Kirvano
    const approvedStatuses = [
      "paid",
      "approved",
      "active",
      "completed",
      "subscription_active",
      "payment_approved",
    ];

    const isApproved =
      approvedStatuses.includes(status?.toLowerCase()) ||
      approvedStatuses.includes(event_type?.toLowerCase());

    if (!isApproved) {
      return NextResponse.json(
        {
          success: true,
          message: "Webhook recebido, mas status não requer ação",
          status,
        },
        { status: 200 }
      );
    }

    // 5. Buscar usuário pelo email na tabela auth.users
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.listUsers();

    if (userError) {
      console.error("Erro ao buscar usuários:", userError);
      return NextResponse.json(
        { success: false, error: "Erro ao buscar usuário" },
        { status: 500 }
      );
    }

    const user = userData.users.find(
      (u) => u.email?.toLowerCase() === customer_email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuário não encontrado com este email",
          customer_email,
        },
        { status: 404 }
      );
    }

    // 6. Atualizar is_subscriber = true na tabela profiles
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ is_subscriber: true })
      .eq("user_id", user.id)
      .select();

    if (profileError) {
      // Se o perfil não existe, criar um novo
      if (profileError.code === "PGRST116" || profileError.message.includes("0 rows")) {
        const { error: insertError } = await supabaseAdmin
          .from("profiles")
          .insert({
            user_id: user.id,
            is_subscriber: true,
          });

        if (insertError) {
          console.error("Erro ao criar perfil:", insertError);
          return NextResponse.json(
            { success: false, error: "Erro ao criar perfil de assinante" },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            success: true,
            message: "Perfil criado e assinatura ativada com sucesso",
            user_id: user.id,
            customer_email,
          },
          { status: 200 }
        );
      }

      console.error("Erro ao atualizar perfil:", profileError);
      return NextResponse.json(
        { success: false, error: "Erro ao atualizar assinatura" },
        { status: 500 }
      );
    }

    // 7. Sucesso!
    return NextResponse.json(
      {
        success: true,
        message: "Assinatura ativada com sucesso",
        user_id: user.id,
        customer_email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

// Método GET para testar se a rota está ativa
export async function GET() {
  return NextResponse.json(
    {
      message: "Webhook da Kirvano está ativo",
      endpoint: "/api/kirvano-webhook",
      method: "POST",
    },
    { status: 200 }
  );
}
