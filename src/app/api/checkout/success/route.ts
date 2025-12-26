import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get("session_id");

    console.log("🎉 Checkout success - Session ID:", sessionId);

    // NOVO FLUXO: Redirecionar para cadastro após pagamento aprovado
    // O usuário ainda não tem conta - vai criar agora
    const redirectUrl = new URL("/cadastro", request.url);
    redirectUrl.searchParams.set("checkout", "success");
    if (sessionId) {
      redirectUrl.searchParams.set("session_id", sessionId);
    }
    
    console.log("✅ Redirecionando para cadastro:", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("❌ Erro no checkout success:", error);
    return NextResponse.redirect(new URL("/quiz?error=checkout_failed", request.url));
  }
}
