import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedText({ text, className = '' }: { text: string, className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  })

  const words = text.split(' ')
  return (
    <p ref={ref} className={`flex flex-wrap justify-center gap-[0.25em] ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split('').map((char, ci) => {
            const index = words.slice(0, wi).join(' ').length + wi + ci
            const total = text.length
            const start = index / total
            const end = (index + 1) / total
            return <Char key={`${wi}-${ci}`} char={char} progress={scrollYProgress} range={[start, end]} />
          })}
        </span>
      ))}
    </p>
  )
}

function Char({ char, progress, range }: { char: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  )
}
