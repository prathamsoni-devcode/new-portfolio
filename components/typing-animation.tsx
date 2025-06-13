"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
}

export function TypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText === texts[currentIndex]) {
        // Finished typing current text, wait before deleting
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, delayBetweenTexts)
      } else {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayText(texts[currentIndex].substring(0, displayText.length + 1))
        }, typingSpeed)
      }
    } else {
      if (displayText === "") {
        // Finished deleting, move to next text
        setIsTyping(true)
        setCurrentIndex((currentIndex + 1) % texts.length)
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, deletingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, currentIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  return (
    <span className="text-primary">
      {displayText}
      <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5"></span>
    </span>
  )
}
