import { useState, useMemo } from "react";
import {
  ShoppingCart, X, Plus, Minus, Zap, Check, ChevronRight, Circle
} from "lucide-react";

const PRODUCTS = [
  { id: "p1", name: "Audífonos Ear Clip", cat: "Audio", price: 109.9, img: "/products/earclip.jpg" },
  { id: "p2", name: "Audífonos P9 Pro Max", cat: "Audio", price: 94.9, img: "/products/p9promax.jpeg" },
  { id: "p3", name: "Audífonos Estilo Arete", cat: "Audio", price: 62.9, img: "/products/arete.png" },
  { id: "p4", name: "Audífonos Bluetooth Pro 6", cat: "Audio", price: 64.9, img: "/products/pro6.jpg" },
  { id: "p5", name: "Audífonos F9 5c + Power Bank", cat: "Audio", price: 84.9, img: "/products/f95c.jpg" },
  { id: "p6", name: "Smartwatch Watch 8 Ultra", cat: "Smartwatch", price: 114.9, img: "/products/watch8ultra.jpg" },
  { id: "p7", name: "Smartwatch T900 Pro Max S9", cat: "Smartwatch", price: 74.9, img: "/products/t900.jpg" },
  { id: "p8", name: "Lentes con Audífonos Bluetooth", cat: "Audio", price: 64.9, img: "/products/lentesbt.png" },
  { id: "p9", name: "Cargador Inalámbrico 3 en 1", cat: "Cargadores", price: 84.9, img: "/products/cargador3en1.jpeg" },
  { id: "p10", name: "Soporte para Celular", cat: "Accesorios", price: 27.9, img: "/products/soportecel.jpg" },
];

const DISTRITOS = ["Miraflores", "San Isidro", "Surco", "La Molina", "San Borja", "Los Olivos", "San Miguel", "Otro (Lima)"];

// 👉 CAMBIA ESTE NÚMERO por tu WhatsApp Business (formato: código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "5194679469";

const COLORS = {
  bg: "#0B0F14",
  card: "#131A21",
  cardBorder: "#212A33",
  text: "#E9EEF2",
  muted: "#8A97A3",
  lime: "#C6FF3D",
  cyan: "#4DE8FF",
};

function CircuitDivider() {
  return (
    <div className="w-full flex justify-center py-2" aria-hidden="true">
      <svg width="100%" height="28" viewBox="0 0 800 28" preserveAspectRatio="none" style={{ maxWidth: 900 }}>
        <path
          d="M0 14 H120 L140 4 L160 24 L180 14 H340 L360 4 L380 24 L400 14 H560 L580 4 L600 24 L620 14 H800"
          fill="none"
          stroke={COLORS.lime}
          strokeWidth="2"
          strokeDasharray="4 5"
          opacity="0.7"
        />
        <circle cx="140" cy="4" r="3" fill={COLORS.cyan} />
        <circle cx="360" cy="4" r="3" fill={COLORS.cyan} />
        <circle cx="580" cy="4" r="3" fill={COLORS.cyan} />
      </svg>
    </div>
  );
}

export default function VoltioTienda() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState("shop"); // shop | checkout | confirmed
  const [form, setForm] = useState({ nombre: "", telefono: "", distrito: DISTRITOS[0], direccion: "", pago: "Yape" });
  const [orderId, setOrderId] = useState(null);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty })),
    [cart]
  );
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const envio = subtotal > 0 && subtotal < 100 ? 9.9 : 0;
  const total = subtotal + envio;
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const changeQty = (id, delta) =>
    setCart((c) => {
      const next = Math.max(0, (c[id] || 0) + delta);
      return { ...c, [id]: next };
    });

  const submitOrder = (e) => {
    e.preventDefault();
    const id = "VLT-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);

    const lineas = cartItems.map((i) => `• ${i.qty}x ${i.name} — S/ ${(i.price * i.qty).toFixed(2)}`).join("\n");
    const mensaje =
      `¡Hola VOLTIO! 👋 Quiero hacer este pedido (${id}):\n\n` +
      `${lineas}\n\n` +
      `Envío: ${envio === 0 ? "Gratis" : `S/ ${envio.toFixed(2)}`}\n` +
      `*Total: S/ ${total.toFixed(2)}*\n\n` +
      `📍 Datos de entrega:\n` +
      `Nombre: ${form.nombre}\n` +
      `Celular: ${form.telefono}\n` +
      `Distrito: ${form.distrito}\n` +
      `Dirección: ${form.direccion}\n` +
      `Método de pago: ${form.pago}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    setView("confirmed");
  };

  const resetAll = () => {
    setCart({});
    setForm({ nombre: "", telefono: "", distrito: DISTRITOS[0], direccion: "", pago: "Yape" });
    setOrderId(null);
    setView("shop");
    setCartOpen(false);
  };

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, minHeight: "100vh" }} className="w-full font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Header */}
      <header className="w-full sticky top-0 z-20 backdrop-blur" style={{ background: "rgba(11,15,20,0.85)", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <Zap size={22} color={COLORS.lime} />
            VOLTIO
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 rounded-full"
            style={{ border: `1px solid ${COLORS.cardBorder}` }}
          >
            <ShoppingCart size={18} />
            <span className="font-mono text-sm">S/ {total.toFixed(2)}</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                style={{ background: COLORS.lime, color: "#0B0F14" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {view === "shop" && (
        <>
          {/* Hero */}
          <section className="max-w-5xl mx-auto px-5 pt-14 pb-8">
            <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: COLORS.cyan }}>
              Envíos a todo Lima · 24-72h
            </p>
            <h1 className="font-display font-bold leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
              Audio y smartwatches que <span style={{ color: COLORS.lime }}>sí llegan</span> a tu puerta.
            </h1>
            <p className="mt-4 max-w-xl" style={{ color: COLORS.muted }}>
              Audífonos, relojes inteligentes y accesorios tech seleccionados para tu día a día. Paga por Yape o Plin, coordinamos todo por WhatsApp.
            </p>
          </section>

          <CircuitDivider />

          {/* Catalog */}
          <section className="max-w-5xl mx-auto px-5 py-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold">Catálogo</h2>
              <span className="font-mono text-xs" style={{ color: COLORS.muted }}>{PRODUCTS.length} productos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="rounded-2xl overflow-hidden flex flex-col justify-between"
                    style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}` }}
                  >
                    <div className="w-full aspect-square overflow-hidden" style={{ background: "#0000" }}>
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="font-mono text-xs mb-1" style={{ color: COLORS.muted }}>{p.cat}</p>
                      <h3 className="font-display font-medium mb-3">{p.name}</h3>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-mono font-medium">S/ {p.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(p.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium"
                          style={{ background: COLORS.lime, color: "#0B0F14" }}
                        >
                          <Plus size={14} /> Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <footer className="max-w-5xl mx-auto px-5 py-10 mt-6" style={{ borderTop: `1px solid ${COLORS.cardBorder}`, color: COLORS.muted }}>
            <p className="font-mono text-xs">VOLTIO · Lima, Perú · Pagos con Yape, Plin y tarjeta</p>
          </footer>
        </>
      )}

      {view === "checkout" && (
        <section className="max-w-lg mx-auto px-5 py-10">
          <button onClick={() => setView("shop")} className="font-mono text-xs mb-6" style={{ color: COLORS.cyan }}>
            ← Volver a la tienda
          </button>
          <h2 className="font-display text-2xl font-bold mb-6">Finalizar pedido</h2>
          <form onSubmit={submitOrder} className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-xs" style={{ color: COLORS.muted }}>Nombre completo</label>
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg outline-none"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
              />
            </div>
            <div>
              <label className="font-mono text-xs" style={{ color: COLORS.muted }}>Celular</label>
              <input
                required
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                placeholder="9XXXXXXXX"
                className="w-full mt-1 px-3 py-2 rounded-lg outline-none"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
              />
            </div>
            <div>
              <label className="font-mono text-xs" style={{ color: COLORS.muted }}>Distrito</label>
              <select
                value={form.distrito}
                onChange={(e) => setForm({ ...form, distrito: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg outline-none"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
              >
                {DISTRITOS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs" style={{ color: COLORS.muted }}>Dirección</label>
              <input
                required
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg outline-none"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
              />
            </div>
            <div>
              <label className="font-mono text-xs mb-2 block" style={{ color: COLORS.muted }}>Método de pago</label>
              <div className="flex gap-2">
                {["Yape", "Plin", "Tarjeta"].map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setForm({ ...form, pago: m })}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: form.pago === m ? COLORS.lime : COLORS.card,
                      color: form.pago === m ? "#0B0F14" : COLORS.text,
                      border: `1px solid ${COLORS.cardBorder}`,
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-4 mt-2 font-mono text-sm" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}` }}>
              <div className="flex justify-between mb-1"><span style={{ color: COLORS.muted }}>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between mb-1"><span style={{ color: COLORS.muted }}>Envío</span><span>{envio === 0 ? "Gratis" : `S/ ${envio.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold mt-2 pt-2" style={{ borderTop: `1px solid ${COLORS.cardBorder}` }}><span>Total</span><span>S/ {total.toFixed(2)}</span></div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-full font-display font-bold flex items-center justify-center gap-2"
              style={{ background: COLORS.lime, color: "#0B0F14" }}
            >
              Enviar pedido por WhatsApp <ChevronRight size={18} />
            </button>
          </form>
        </section>
      )}

      {view === "confirmed" && (
        <section className="max-w-lg mx-auto px-5 py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: COLORS.lime }}
          >
            <Check size={28} color="#0B0F14" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">¡Casi listo!</h2>
          <p style={{ color: COLORS.muted }} className="mb-1">Código de pedido</p>
          <p className="font-mono text-lg mb-6" style={{ color: COLORS.cyan }}>{orderId}</p>
          <p style={{ color: COLORS.muted }} className="mb-8">
            Se abrió WhatsApp con tu pedido armado — solo dale enviar. Coordinamos ahí la entrega en {form.distrito} y el pago vía {form.pago}.
          </p>
          <button
            onClick={resetAll}
            className="px-6 py-3 rounded-full font-display font-bold"
            style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text }}
          >
            Volver a la tienda
          </button>
        </section>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-30 flex justify-end" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setCartOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm h-full p-5 flex flex-col"
            style={{ background: COLORS.bg, borderLeft: `1px solid ${COLORS.cardBorder}` }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg">Tu carrito</h3>
              <button onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>

            {cartItems.length === 0 ? (
              <p style={{ color: COLORS.muted }}>Tu carrito está vacío. Agrega algún producto del catálogo.</p>
            ) : (
              <div className="flex-1 overflow-auto flex flex-col gap-4">
                {cartItems.map((i) => (
                  <div key={i.id} className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{i.name}</p>
                      <p className="font-mono text-xs" style={{ color: COLORS.muted }}>S/ {i.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(i.id, -1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: `1px solid ${COLORS.cardBorder}` }}>
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm w-4 text-center">{i.qty}</span>
                      <button onClick={() => changeQty(i.id, 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: `1px solid ${COLORS.cardBorder}` }}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${COLORS.cardBorder}` }}>
                <div className="flex justify-between font-mono text-sm mb-4">
                  <span style={{ color: COLORS.muted }}>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); setView("checkout"); }}
                  className="w-full py-3 rounded-full font-display font-bold"
                  style={{ background: COLORS.lime, color: "#0B0F14" }}
                >
                  Ir a pagar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
