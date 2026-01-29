import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // VALIDAÇÃO DE SEGURANÇA: Verificar assinatura do webhook
    const signature = request.headers.get("x-kirvano-signature");
    const webhookSecret = process.env.KIRVANO_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      const body = await request.text();
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");
      
      if (signature !== expectedSignature) {
        console.error("❌ Assinatura do webhook inválida");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
      
      console.log("✅ Assinatura do webhook validada");
      var parsedBody = JSON.parse(body);
    } else {
      console.warn("⚠️ Webhook sem validação de assinatura (configure KIRVANO_WEBHOOK_SECRET)");
      parsedBody = await request.json();
    }
    
    console.log("🔔 Webhook Kirvano recebido:", JSON.stringify(parsedBody, null, 2));

    // Extrair dados do webhook
    const { event, data } = parsedBody;
    
    // Processar apenas eventos de pagamento aprovado
    if (event === "payment.approved" || event === "checkout.completed" || event === "purchase.completed") {
      const userId = data?.metadata?.user_id || data?.user_id || data?.customer?.metadata?.user_id;
      
      if (!userId) {
        console.error("❌ User ID não encontrado no webhook. Dados recebidos:", data);
        return NextResponse.json({ error: "User ID missing" }, { status: 400 });
      }

      if (!supabase) {
        console.error("❌ Supabase não configurado");
        return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
      }

      console.log("🔓 Liberando acesso via webhook para user_id:", userId);

      // PONTO ÚNICO DE VERDADE: Atualizar profiles.is_subscriber = true
      const { data: profile, error: updateError } = await supabase
        .from("profiles")
        .update({ 
          is_subscriber: true,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (updateError) {
        console.error("❌ Erro ao atualizar perfil via webhook:", updateError);
        
        // Tentar criar o perfil se não existir
        if (updateError.code === "PGRST116") {
          console.log("⚠️ Perfil não existe, criando via webhook...");
          
          // Buscar email do usuário no auth.users
          const { data: authUser } = await supabase.auth.admin.getUserById(userId);
          
          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert({ 
              user_id: userId,
              email: authUser?.user?.email || null,
              is_subscriber: true
            })
            .select()
            .single();
          
          if (insertError) {
            console.error("❌ Erro ao criar perfil via webhook:", insertError);
            return NextResponse.json({ error: "Profile creation failed" }, { status: 500 });
          }
          
          console.log("✅ Perfil criado via webhook com sucesso:", newProfile);
          return NextResponse.json({ success: true, message: "Access granted (profile created)", profile: newProfile });
        } else {
          return NextResponse.json({ error: "Update failed", details: updateError }, { status: 500 });
        }
      } else {
        console.log("✅ Acesso liberado via webhook com sucesso:", profile);
        return NextResponse.json({ success: true, message: "Access granted", profile });
      }
    }

    // Outros eventos - apenas logar
    console.log("ℹ️ Evento não processado:", event);
    return NextResponse.json({ success: true, message: "Event received but not processed" });

  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
    return NextResponse.json({ 
      error: "Webhook processing failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
