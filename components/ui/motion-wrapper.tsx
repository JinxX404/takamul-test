"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { ReactNode } from "react"

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variants?: Variants;
  className?: string;
}

/**
 * A lightweight client-side wrapper to enable framer-motion animations
 * inside Server Components.
 */
export function MotionWrapper({ children, variants, className, ...props }: MotionWrapperProps) {
  return (
    <motion.div 
      variants={variants} 
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
