"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const FRAME_COUNT = 192
const READY_FRAME_COUNT = 24
const UI_UPDATE_STEP = 4

function getFrameBase(index: number) {
  return `/scroll-frames/frame_${String(index + 1).padStart(4, "0")}`
}

export function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 })
  const [loadedCount, setLoadedCount] = useState(0)
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
  const isReady = firstFrameLoaded && loadedCount >= READY_FRAME_COUNT
  const progressCount = isReady ? FRAME_COUNT : READY_FRAME_COUNT

  const loadingPercent = useMemo(
    () => Math.min(100, Math.round((loadedCount / progressCount) * 100)),
    [loadedCount, progressCount]
  )

  useEffect(() => {
    imagesRef.current = new Array(FRAME_COUNT)
    let cancelled = false
    let loaded = 0
    let pendingUi = 0

    const commitLoaded = () => {
      if (pendingUi === 0) return
      setLoadedCount(loaded)
      pendingUi = 0
    }

    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new Image()
      img.decoding = "async"
      const frameBase = getFrameBase(i)

      img.onload = () => {
        if (cancelled) return
        imagesRef.current[i] = img
        if (i === 0) setFirstFrameLoaded(true)
        loaded += 1
        pendingUi += 1
        if (loaded <= READY_FRAME_COUNT || pendingUi >= UI_UPDATE_STEP || loaded === FRAME_COUNT) {
          commitLoaded()
        }
      }
      img.onerror = () => {
        if (img.src.endsWith(".webp")) {
          img.src = `${frameBase}.jpg`
        }
      }
      img.src = `${frameBase}.webp`
    }

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const resizeCanvas = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window
      viewportRef.current = { width: innerWidth, height: innerHeight, dpr: devicePixelRatio }
      canvas.width = innerWidth * devicePixelRatio
      canvas.height = innerHeight * devicePixelRatio
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      currentFrameRef.current = -1
    }

    const drawFrame = (frameIndex: number) => {
      if (frameIndex === currentFrameRef.current) return
      const img = imagesRef.current[frameIndex]
      if (!img || !img.complete) return

      currentFrameRef.current = frameIndex
      const { width: innerWidth, height: innerHeight } = viewportRef.current
      ctx.clearRect(0, 0, innerWidth, innerHeight)

      const mobile = innerWidth < 768
      const scale = mobile
        ? Math.min(innerWidth / img.width, innerHeight / img.height) * 1.08
        : Math.max(innerWidth / img.width, innerHeight / img.height)
      const drawW = img.width * scale
      const drawH = img.height * scale
      const x = (innerWidth - drawW) / 2
      const y = (innerHeight - drawH) / 2

      ctx.drawImage(img, x, y, drawW, drawH)
    }

    const updateFromScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const maxScroll = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / maxScroll))
      const frame = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)))

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => drawFrame(frame))
    }

    const onResize = () => {
      resizeCanvas()
      updateFromScroll()
    }

    resizeCanvas()
    updateFromScroll()
    window.addEventListener("scroll", updateFromScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", updateFromScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [isReady])

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 px-4 text-center">
          <p className="text-sm md:text-base text-primary-foreground bg-primary/65 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
            اسحب للأسفل لاكتشاف تقنياتنا الذكية
          </p>
        </div>

        {!isReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/90 backdrop-blur-sm">
            <p className="text-foreground text-sm">جاري تحميل المشهد...</p>
            <div className="w-52 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${loadingPercent}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
