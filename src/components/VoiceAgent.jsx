import { useState, useRef, useEffect } from 'react'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

function VoiceAgent({ inNavbar = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(null)
  const audioUrlRef = useRef(null)

  const greeting = "Hey! Thanks for calling Chino's Cleaning Crew—we clean anything and everything! I'm Christy. Need a quote or have questions? I'm here to help!"

  const playGreeting = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      return
    }

    // If we already have the audio cached, just play it
    if (audioUrlRef.current) {
      const audio = new Audio(audioUrlRef.current)
      audioRef.current = audio
      audio.onended = () => setIsPlaying(false)
      audio.onerror = () => setIsPlaying(false)
      setIsPlaying(true)
      audio.play()
      return
    }

    if (!OPENAI_API_KEY) {
      alert('Add VITE_OPENAI_API_KEY to your .env file')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: greeting,
          voice: 'shimmer', // Young, energetic female voice
          speed: 1.15,
        }),
      })

      if (!response.ok) {
        throw new Error('TTS request failed')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      audioUrlRef.current = audioUrl // Cache it

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => setIsPlaying(false)
      audio.onerror = () => setIsPlaying(false)

      setIsLoading(false)
      setIsPlaying(true)
      audio.play()

    } catch (err) {
      console.error('TTS error:', err)
      setIsLoading(false)
      alert('Could not play audio. Check your API key.')
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current)
      }
    }
  }, [])

  // Navbar version - compact button
  if (inNavbar) {
    return (
      <button
        onClick={playGreeting}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 font-bold text-sm transition-all duration-200 ${
          isPlaying
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : isLoading
            ? 'bg-steel-gray text-white cursor-wait'
            : 'bg-navy text-white hover:bg-navy/90'
        }`}
      >
        {isPlaying ? (
          <>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Stop
          </>
        ) : isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Loading
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Talk
          </>
        )}
      </button>
    )
  }

  // Floating version - same button style
  return (
    <button
      onClick={playGreeting}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 font-bold text-sm transition-all duration-200 ${
        isPlaying
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : isLoading
          ? 'bg-steel-gray text-white cursor-wait'
          : 'bg-navy text-white hover:bg-navy/90'
      }`}
    >
      {isPlaying ? (
        <>
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Stop
        </>
      ) : isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Loading
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          Talk
        </>
      )}
    </button>
  )
}

export default VoiceAgent
