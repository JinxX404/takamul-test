"use client"

import { useEffect, useState } from "react"

export function useIsRtl() {
  const [isRtl, setIsRtl] = useState(true)

  useEffect(() => {
    const dir = document.documentElement.getAttribute("dir")
    setIsRtl((dir || "rtl").toLowerCase() === "rtl")
  }, [])

  return isRtl
}
