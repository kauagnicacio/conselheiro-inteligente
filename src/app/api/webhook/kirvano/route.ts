import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("🔔 Webhook Kirvano recebido:", JSON.stringify(body, null, 2));

    // Extrair dados do webhook
    const { event, data } = body;
    
    // Processar apenas eventos de pagamento aprovado
    if (event === "payment.approved" || event === "checkout.completed") {
      const userId = data?.metadata?.user_id || data?.user_id;
      
      if (!userId) {
        console.error("❌ User ID não encontrado no webhook");
        return NextResponse.json({ error: "User ID missing" }, { status: 400 });
      }

      if (!supabase) {
        console.error("❌ Supabase não configurado");
        return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
      }

      console.log("🔓 Liberando acesso via webhook para user_id:", userId);

      // Atualizar perfil para liberar acesso
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
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({ 
              user_id: userId,
              is_subscriber: true
            });
          
          if (insertError) {
            console.error("❌ Erro ao criar perfil via webhook:", insertError);
            return NextResponse.json({ error: "Profile creation failed" }, { status: 500 });
          }
          
          console.log("✅ Perfil criado via webhook com sucesso");
        } else {
          return NextResponse.json({ error: "Update failed" }, { status: 500 });
        }
      } else {
        console.log("✅ Acesso liberado via webhook com sucesso:", profile);
      }

      return NextResponse.json({ success: true, message: "Access granted" });
    }

    // Outros eventos - apenas logar
    console.log("ℹ️ Evento não processado:", event);
    return NextResponse.json({ success: true, message: "Event received" });

  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
