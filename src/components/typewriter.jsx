"use client"

import { useState, useEffect } from "react"

export default function TypewriterComponent({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}) {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [delta, setDelta] = useState(typingSpeed)

  useEffect(() => {
    const ticker = setTimeout(() => {
      tick()
    }, delta)

    return () => clearTimeout(ticker)
  }, [text, isDeleting, phraseIndex, delta])

  const tick = () => {
    const currentPhrase = phrases[phraseIndex]
    const updatedText = isDeleting
      ? currentPhrase.substring(0, text.length - 1)
      : currentPhrase.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setDelta(deletingSpeed)
    }

    if (!isDeleting && updatedText === currentPhrase) {
      setIsDeleting(true)
      setDelta(pauseTime)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      setDelta(typingSpeed)
    } else if (!isDeleting) {
      setDelta(typingSpeed)
    }
  }

  return (
    <h2 className="font-sarala text-xl md:text-2xl text-[#5a7d53] font-bold min-h-[2rem] flex items-center">
      {text}
      <span className="ml-1 inline-block w-1 h-6 bg-[#5a7d53] animate-pulse"></span>
    </h2>
  )
}
