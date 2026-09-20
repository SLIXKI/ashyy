import FadeIn from './FadeIn'

const services = [
  {
    num: '01',
    name: 'Payment Rules',
    desc: 'Custom gateway routing for Stripe, Adyen, Braintree, Checkout.com. matcher → validator → transformer → gatewayEngine. Detects and rewrites request pipeline on the fly. The bypass, surgical, not sloppy.'
  },
  {
    num: '02',
    name: 'Card Profiles',
    desc: 'BIN tools, candidate-generator, adyenEncryptor, validator. Generates valid candidates, resolves sources, validates live. 0.8s avg transaction, no typing, just done. Life smoother.'
  },
  {
    num: '03',
    name: 'Protection Bypass',
    desc: 'Browser mods, gateway_probe, gateway_detector, integrity checks, privacy, proxy, browsingData APIs. No logs, offscreen isolation, MAIN world injection with bridge security. Clean MV3.'
  },
  {
    num: '04',
    name: 'Automation',
    desc: 'Identity filler, card filler, autoclicker, injection_hud. Zero manual typing, zero wasted seconds. From checkout wall to done. Built in dark so you don\'t wait in light.'
  },
  {
    num: '05',
    name: 'Premium UI',
    desc: '2865 lines handcrafted popup — dashboard, payment rules, card profiles, protection, automation, advanced, appearance, premium. Command palette ⌘K, updater, campaign banners. Built like Linear, not a hack.'
  }
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <FadeIn y={30}>
        <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} y={20} className="flex gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-b-0">
            <div className="font-black text-[#0C0C0C] leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {s.num}
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <h3 className="font-medium uppercase text-[#0C0C0C]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {s.name}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl opacity-60 text-[#0C0C0C]" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                {s.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-black/40 border border-black/10 px-6 py-3 rounded-full">
          ASHEO 1.6.1 • MV3 • 5.9KB MANIFEST • HASHED + SIGNED • TELEGRAM ONLY • NO FACE • JUST WORK • REAL
        </div>
      </div>
    </section>
  )
}
