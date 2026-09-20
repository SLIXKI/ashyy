import { motion } from 'framer-motion'
import React from 'react'

type Props = {
  children: React.ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '', as = 'div' }: Props) {
  const MotionTag = (motion as any)[as] || motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
