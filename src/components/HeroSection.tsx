import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col overflow-x-clip relative bg-[#0C0C0C]">
      <FadeIn delay={0} y={-20} className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
        <nav className="flex justify-between w-full">
          <a href="#about" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#services" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#telegram" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">Contact</a>
        </nav>
      </FadeIn>

      <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m ash
          </h1>
        </FadeIn>
      </div>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            a developer driven by crafting smooth and unforgettable transactions
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <div className="relative">
            <img
              src="/ghost-1.jpg"
              alt="ASH — no face, just ghost, dark luxury"
              className="w-full h-auto object-cover rounded-[24px] border border-white/10 grayscale contrast-125 brightness-90"
              style={{ aspectRatio: '4/5' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[24px] pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase text-white/70">● 03:17 AM • GHOST • NO FACE</div>
              <div className="bg-[#E8FF42] text-black px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">ASHEO 1.6.1</div>
            </div>
          </div>
        </Magnet>
      </FadeIn>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8FF42]/30 to-transparent" />
    </section>
  )
}
