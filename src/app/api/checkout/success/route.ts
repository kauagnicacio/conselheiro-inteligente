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

    if (!supabase) {
      console.error("❌ CRÍTICO: Supabase não configurado - sistema não pode funcionar");
      return NextResponse.redirect(new URL("/?error=supabase_not_configured", request.url));
    }

    console.log("🔓 Liberando acesso no Supabase para user_id:", userId);
    
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
      console.error("❌ Erro ao atualizar perfil:", updateError);
      
      // Tentar criar o perfil se não existir
      if (updateError.code === "PGRST116") {
        console.log("⚠️ Perfil não existe, criando...");
        
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
          console.error("❌ Erro ao criar perfil:", insertError);
          return NextResponse.redirect(new URL("/?error=profile_creation_failed", request.url));
        } else {
          console.log("✅ Perfil criado com sucesso:", newProfile);
        }
      } else {
        return NextResponse.redirect(new URL("/?error=profile_update_failed", request.url));
      }
    } else {
      console.log("✅ Acesso liberado no Supabase com sucesso:", profile);
    }

    // Redirecionar para home com sucesso
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("checkout", "success");
    
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("❌ Erro no checkout success:", error);
    return NextResponse.redirect(new URL("/?error=checkout_failed", request.url));
  }
}
