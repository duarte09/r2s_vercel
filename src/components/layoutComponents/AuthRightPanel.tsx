"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const phrases = [
  "Decisões inteligentes, resultados reais.",
  "O futuro da sua operação comercial.",
  "Sua gestão agora inteligente.",
  "Tecnologia que transforma sua operação.",
  "Soluções integradas para resultados concretos.",
]

const images = [
  "/assets/AuthRightPanel.png",
  "/assets/AuthRightPanel2.png",
  "/assets/AuthRightPanel3.png",
]

export function AuthRightPanel() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentImage, setCurrentImage] = useState(images[0])
  const [nextImage, setNextImage] = useState(images[1])
  const [fadeIn, setFadeIn] = useState(false)

  const frameRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const speed = isDeleting ? 75 : 100
    let lastTime = performance.now()

    const type = (time: number) => {
      if (time - lastTime < speed) {
        frameRef.current = requestAnimationFrame(type)
        return
      }
      lastTime = time

      setDisplayedText((prev) => {
        if (!isDeleting) {
          const next = phrase.slice(0, prev.length + 1)
          if (next === phrase) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), 2500)
            return prev
          }
          return next
        } else {
          const next = prev.slice(0, -1)
          if (next === "") {
            setIsDeleting(false)
            setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
            return ""
          }
          return next
        }
      })

      frameRef.current = requestAnimationFrame(type)
    }

    frameRef.current = requestAnimationFrame(type)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [phraseIndex, isDeleting])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (images.indexOf(currentImage) + 1) % images.length
      setNextImage(images[nextIndex])
      setFadeIn(true)

      setTimeout(() => {
        setCurrentImage(images[nextIndex])
        setFadeIn(false)
      }, 1200)
    }, 6000)

    return () => clearInterval(interval)
  }, [currentImage])

  return (
    <div className="hidden lg:flex flex-1 relative overflow-hidden">
      <Image
        src={currentImage}
        alt="Auth background"
        fill
        className="object-cover transition-all duration-1000"
        priority
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeIn ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={nextImage}
          alt="Auth background fade"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="text-center px-8 max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-white leading-tight h-[6rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {displayedText}
            <span className="text-white animate-pulse">|</span>
          </motion.h1>
        </div>
      </div>
    </div>
  )
}
