import { motion } from 'framer-motion'

export function BiographyApp() {
  return (
    <div className="p-6 md:p-8 text-white">
      <div className="mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-6">Biography — 2018 → 2026</div>
      
      <h1 className="text-[32px] md:text-[44px] font-[700] leading-[0.9] tracking-[-0.03em] mb-6">
        I design and code<br />
        <span className="text-white/40">gateways that feel</span><br />
        <span className="text-[#E8FF42]">alive.</span>
      </h1>

      <div className="space-y-4 text-[14px] leading-[1.7] text-white/60 max-w-[420px] font-[300]">
        <p>
          6+ years reverse engineering payment infrastructure. No team. No shortcuts. 
          Just a single dev who refused to accept that checkout has to fail.
        </p>
        <p>
          ASHEO 1.6.1 is not an extension. It's 116+ gateways dissected, 
          8 engines rewritten, BIN tools forged from scratch, 
          and 0.8 seconds of pure bypass.
        </p>
        <p className="text-white/90">
          Built in the dark. Distributed on Telegram. 
          Proven by 14 real transactions.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-10">
        {[
          { k: '6+ YEARS', v: 'Grinding' },
          { k: '116+', v: 'Gateways' },
          { k: '0.8S', v: 'Bypass' },
        ].map(i => (
          <div key={i.k} className="rounded-[12px] bg-white/[0.04] border border-white/[0.06] p-3">
            <div className="mono text-[18px] font-bold text-white">{i.k}</div>
            <div className="mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{i.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DeveloperLabApp() {
  const code = `// gateway-registry.ts — ASHEO 1.6.1
export const GATEWAYS = 116;

export class GatewayRegistry {
  private engines = new Map();
  
  async probe(gateway: string) {
    const start = performance.now();
    const result = await this.engines.get(gateway).scan();
    const elapsed = performance.now() - start;
    
    if (elapsed <= 800) {
      return { status: 'BYPASSED', time: elapsed };
    }
    return { status: 'FAILED' };
  }
}

// request-pipeline.ts
export const pipeline = async (req) => {
  const normalized = await normalizer(req);
  const candidates = await candidateGenerator(normalized);
  return orchestrator(candidates);
};`

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-0 overflow-hidden bg-[#0A0A0B]">
        <div className="h-full overflow-auto p-5 mono text-[11px] leading-[1.7] text-white/70 whitespace-pre">
          {code}
        </div>
      </div>
      <div className="h-[36px] flex items-center justify-between px-4 border-t border-white/[0.06] bg-black/20 mono text-[10px] text-white/30">
        <span>engine/gateway-registry.ts — 286 lines</span>
        <span className="text-[#E8FF42]">● Live</span>
      </div>
    </div>
  )
}

export function GatewayLabApp() {
  const gateways = [
    'Stripe', 'Braintree', 'Adyen', 'Checkout.com', 'Authorize.net', '2Checkout',
    'PayPal', 'Square', 'Recurly', 'Chargebee', 'Worldpay', 'Mollie',
    'Razorpay', 'Paystack', 'Flutterwave', 'Adyen Encryptor', '...116+'
  ]

  return (
    <div className="p-6">
      <div className="mono text-[10px] tracking-widest uppercase text-white/30 mb-4">Gateway Lab — 116+ Cracked</div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {gateways.map((g, i) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="group rounded-[10px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] px-3 py-2.5 flex items-center justify-between"
          >
            <span className="mono text-[11px] text-white/70 group-hover:text-white">{g}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF42]" />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-[12px] bg-[#E8FF42] text-black p-4">
        <div className="mono text-[11px] font-bold tracking-widest uppercase">Bypass Rate</div>
        <div className="text-[32px] font-black leading-none mt-1">94.7%</div>
        <div className="mono text-[10px] opacity-60 mt-1">Average across 116 gateways · 0.8s avg</div>
      </div>
    </div>
  )
}

export function MemoryWallApp() {
  const proofs = Array.from({ length: 14 }, (_, i) => `/proofs/photo_2026-09-20_16-40-${['00','13','22','27','30','33','36','39','43','46','49','55','58'][i] || '00'}.jpg`)

  return (
    <div className="p-5">
      <div className="mono text-[10px] tracking-widest uppercase text-white/30 mb-4">Memory Wall — 14 Real Proofs</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {proofs.slice(0, 12).map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group relative aspect-[4/3] rounded-[12px] overflow-hidden bg-white/[0.04] border border-white/[0.06]"
          >
            <img src={src} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 mono text-[9px] text-white/60 px-1.5 py-0.5 rounded bg-black/60">PROOF_{String(i+1).padStart(2,'0')}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 mono text-[10px] text-white/30 text-center">
        All proofs are real transactions · Sensitive data redacted · Telegram distributed
      </div>
    </div>
  )
}

export function TerminalApp() {
  return (
    <div className="h-full bg-black p-5 mono text-[12px] leading-[1.8]">
      <div className="text-white/30">$ ash --whoami</div>
      <div className="text-white/80 mt-1">
        ASH — Developer<br />
        6+ years building bypass infrastructure<br />
        Solo · Telegram · 03:17 AM builder<br />
        ASHEO 1.6.1 · 116+ gateways · 0.8s
      </div>
      <div className="text-white/30 mt-4">$ ash --skills</div>
      <div className="text-[#E8FF42] mt-1">
        reverse-engineering / payment gateways / BIN tools / MV3 extensions /<br />
        adyenEncryptor / request-pipeline / orchestrator / premium UI
      </div>
      <div className="text-white/30 mt-4">$ ash --proofs --real</div>
      <div className="text-white/60 mt-1">14 real transaction proofs found in /memory/wall</div>
      <div className="text-white/30 mt-4">$ ash --install</div>
      <div className="text-white mt-1">Opening Telegram... <span className="text-[#E8FF42] underline cursor-pointer">t.me/asheo</span></div>
      <div className="mt-6 flex items-center gap-2">
        <span className="text-white/30">$</span>
        <span className="w-2 h-4 bg-white/70 animate-pulse inline-block" />
      </div>
    </div>
  )
}

export function TelegramApp() {
  return (
    <div className="h-full flex flex-col bg-[#0E0E10]">
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-auto">
        <div className="self-start max-w-[80%] rounded-[16px] rounded-bl-[4px] bg-white/[0.06] border border-white/[0.06] p-4">
          <div className="mono text-[11px] text-white/90">ASHEO 1.6.1 is live.</div>
          <div className="mono text-[11px] text-white/50 mt-1">116+ gateways. 0.8s bypass. No paywall.</div>
        </div>
        <div className="self-end max-w-[80%] rounded-[16px] rounded-br-[4px] bg-[#E8FF42] p-4">
          <div className="mono text-[11px] text-black font-medium">How to get it?</div>
        </div>
        <div className="self-start max-w-[80%] rounded-[16px] rounded-bl-[4px] bg-white/[0.06] border border-white/[0.06] p-4">
          <div className="mono text-[11px] text-white/90">Telegram only. No website payments. No middlemen.</div>
          <div className="mono text-[11px] text-white/50 mt-2">6+ years of work, distributed directly to those who know.</div>
        </div>
        <div className="self-start max-w-[80%] rounded-[12px] bg-black border border-white/[0.08] p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E8FF42] flex items-center justify-center mono text-[12px] text-black font-bold">A</div>
          <div>
            <div className="mono text-[11px] text-white">ASHEO 1.6.1.zip</div>
            <div className="mono text-[10px] text-white/40">2.4 MB · MV3 · Chrome 116+</div>
          </div>
        </div>
      </div>
      <div className="h-[56px] border-t border-white/[0.06] p-3 flex gap-2">
        <div className="flex-1 rounded-full bg-white/[0.06] border border-white/[0.08] px-4 flex items-center mono text-[11px] text-white/30">
          Message ASH...
        </div>
        <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">↗</button>
      </div>
    </div>
  )
}
