"use client";

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initMetaPixel, trackPageView } from '@/lib/meta-pixel';

function MetaPixelTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  // Inicializar Meta Pixel uma única vez
  useEffect(() => {
    initMetaPixel();
  }, []);

  // Rastrear mudanças de rota (PageView APENAS)
  // NÃO disparar InitiateCheckout aqui - a Kirvano cuida disso
  useEffect(() => {
    // Evitar duplicação no primeiro render (já disparado no init)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (pathname) {
      trackPageView();
    }
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <MetaPixelTracking />
      </Suspense>
      {children}
    </>
  );
}
