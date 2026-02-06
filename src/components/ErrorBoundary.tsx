"use client";

import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

/**
 * ErrorBoundary - Captura erros client-side e previne crash do app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Atualizar estado para renderizar fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log do erro para análise
    console.error("[ErrorBoundary] Erro capturado:", error);
    console.error("[ErrorBoundary] Informações:", errorInfo);

    // Se for erro de storage, tentar limpar
    if (
      error.message?.includes("localStorage") ||
      error.message?.includes("sessionStorage") ||
      error.message?.includes("QuotaExceededError") ||
      error.name === "QuotaExceededError"
    ) {
      console.warn("[ErrorBoundary] Erro de storage detectado. Limpando...");
      this.clearStorageAndReload();
    }

    this.setState({ error, errorInfo });
  }

  clearStorageAndReload = () => {
    try {
      if (typeof window !== "undefined") {
        // Limpar localStorage
        try {
          localStorage.clear();
        } catch (e) {
          console.error("[ErrorBoundary] Erro ao limpar localStorage:", e);
        }

        // Limpar sessionStorage
        try {
          sessionStorage.clear();
        } catch (e) {
          console.error("[ErrorBoundary] Erro ao limpar sessionStorage:", e);
        }

        // Limpar caches
        if ("caches" in window) {
          caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
          });
        }

        // Desregistrar service workers
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => registration.unregister());
          });
        }

        // Aguardar 500ms e recarregar
        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      }
    } catch (error) {
      console.error("[ErrorBoundary] Erro ao limpar storage:", error);
      // Forçar reload de qualquer forma
      window.location.href = "/home";
    }
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.href = "/home";
  };

  render() {
    if (this.state.hasError) {
      // Renderizar fallback customizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Renderizar UI de erro padrão
      return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#212121] rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-gray-100 mb-2">
              Ops! Algo deu errado
            </h1>

            <p className="text-gray-400 mb-6">
              Encontramos um problema ao carregar o aplicativo. Isso pode ter
              acontecido devido a dados antigos salvos no navegador.
            </p>

            {this.state.error && (
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6 text-left">
                <p className="text-xs text-gray-500 font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={this.clearStorageAndReload}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Limpar dados e recarregar
              </Button>

              <Button
                onClick={this.handleReset}
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                size="lg"
              >
                Tentar novamente
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Se o problema persistir, tente usar uma aba anônima ou limpar o
              cache do navegador.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
