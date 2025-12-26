import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("user_id");
    const sessionId = searchParams.get("session_id");

    console.log("🎉 Checkout success - User ID:", userId, "Session ID:", sessionId);

    if (!userId) {
      console.error("❌ User ID não fornecido no retorno do checkout");
      return NextResponse.redirect(new URL("/?error=missing_user_id", request.url));
    }

    // ESTRATÉGIA DUPLA: Supabase + localStorage
    // Isso garante que SEMPRE funcione, mesmo se houver problema com banco

    // 1. TENTAR ATUALIZAR NO SUPABASE (se configurado)
    if (supabase) {
      console.log("🔓 Liberando acesso no Supabase para user_id:", userId);
      
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
        console.error("❌ Erro ao atualizar perfil:", updateError);
        
        // Tentar criar o perfil se não existir
        if (updateError.code === "PGRST116") {
          console.log("⚠️ Perfil não existe, criando...");
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({ 
              user_id: userId,
              is_subscriber: true
            });
          
          if (insertError) {
            console.error("❌ Erro ao criar perfil:", insertError);
          } else {
            console.log("✅ Perfil criado com sucesso");
          }
        }
      } else {
        console.log("✅ Acesso liberado no Supabase com sucesso:", profile);
      }
    } else {
      console.log("⚠️ Supabase não configurado, usando apenas localStorage");
    }

    // 2. SEMPRE SALVAR NO LOCALSTORAGE (fallback garantido)
    // Redirecionar com parâmetros que serão lidos pelo frontend
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("checkout", "success");
    redirectUrl.searchParams.set("user_id", userId);
    redirectUrl.searchParams.set("activate", "true");
    
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("❌ Erro no checkout success:", error);
    return NextResponse.redirect(new URL("/?error=checkout_failed", request.url));
  }
}
