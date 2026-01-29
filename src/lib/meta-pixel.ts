// Meta Pixel tracking utilities
// Pixel ID: 1392950065611433

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const FB_PIXEL_ID = '1392950065611433';

// Inicializar Meta Pixel
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;
  
  // Evitar inicialização duplicada
  if (window.fbq) return;

  // Código base do Meta Pixel
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Rastrear PageView (para mudanças de rota em SPA)
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Evento: Lead (ao entrar no quiz)
export const trackLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
    console.log('Meta Pixel: Lead event tracked');
  }
};

// ⚠️ ATENÇÃO: FUNÇÃO DESATIVADA - NÃO USAR!
// A Kirvano dispara InitiateCheckout automaticamente quando o checkout abre.
// Disparar manualmente causa duplicação de eventos e infla as métricas.
// Esta função foi DESATIVADA e não deve ser chamada em nenhum lugar do código.
export const trackInitiateCheckout = () => {
  // FUNÇÃO DESATIVADA - NÃO FAZ NADA
  console.warn('⚠️ trackInitiateCheckout foi chamada mas está DESATIVADA. A Kirvano dispara automaticamente.');
};

// Evento: Purchase (quando pagamento aprovado)
export const trackPurchase = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency
    });
    console.log(`Meta Pixel: Purchase event tracked - ${currency} ${value}`);
  }
};
