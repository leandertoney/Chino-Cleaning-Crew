import { useState, useRef, useEffect } from 'react'

// Uses environment variable - create a .env file with VITE_OPENAI_API_KEY=your_key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

function VoiceAgent({ inNavbar = false }) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  const wsRef = useRef(null)
  const audioContextRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const processorRef = useRef(null)

  const systemPrompt = `You are Christy, a friendly and professional AI assistant for Chino's Cleaning Crew, an industrial cleaning company in Central Pennsylvania.

When you first connect, greet the caller by saying: "Hey, thanks for calling Chino's Cleaning Crew, where we clean anything and everything! This is Christy, your AI assistant. How can I help you today?"

You help with:
- Answering questions about services (warehouse cleaning, power washing, floor waxing, deep cleans, office cleaning, retail, construction sites)
- Service areas (Cumberland, Dauphin, York, Lancaster, Perry, Adams, Franklin, Lebanon, Juniata, Mifflin counties)
- Taking information for quote requests (name, phone, space size/type)
- General inquiries

Be warm, confident, and helpful. Keep responses conversational and concise. If someone wants a quote, collect their name, phone number, and describe their space. The company phone is 717-714-0662.`

  const startCall = async () => {
    if (!OPENAI_API_KEY) {
      setError('Add VITE_OPENAI_API_KEY to your .env file')
      return
    }

    setError(null)
    setIsConnecting(true)

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      // Create audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 24000
      })

      // Connect to OpenAI Realtime API
      const ws = new WebSocket(
        'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01',
        ['realtime', `openai-insecure-api-key.${OPENAI_API_KEY}`, 'openai-beta.realtime-v1']
      )

      wsRef.current = ws

      ws.onopen = () => {
        // Configure the session
        ws.send(JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: systemPrompt,
            voice: 'alloy',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500
            }
          }
        }))

        // Trigger initial greeting
        ws.send(JSON.stringify({
          type: 'response.create',
          response: {
            modalities: ['text', 'audio'],
            instructions: 'Greet the caller with your introduction.'
          }
        }))

        setIsConnecting(false)
        setIsCallActive(true)

        // Start sending audio
        startAudioCapture(stream, ws)
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === 'response.audio.delta' && data.delta) {
          playAudio(data.delta)
        }

        if (data.type === 'error') {
          console.error('OpenAI error:', data.error)
          setError(data.error?.message || 'Connection error')
        }
      }

      ws.onerror = (err) => {
        console.error('WebSocket error:', err)
        setError('Connection failed. Check your API key.')
        endCall()
      }

      ws.onclose = () => {
        setIsCallActive(false)
        setIsConnecting(false)
      }

    } catch (err) {
      console.error('Failed to start call:', err)
      setError(err.message || 'Could not access microphone')
      setIsConnecting(false)
    }
  }

  const startAudioCapture = (stream, ws) => {
    const audioContext = audioContextRef.current
    const source = audioContext.createMediaStreamSource(stream)

    // Create script processor for raw PCM data
    const processor = audioContext.createScriptProcessor(4096, 1, 1)
    processorRef.current = processor

    processor.onaudioprocess = (e) => {
      if (ws.readyState !== WebSocket.OPEN) return

      const inputData = e.inputBuffer.getChannelData(0)

      // Resample to 24kHz and convert to 16-bit PCM
      const pcm16 = new Int16Array(inputData.length)
      for (let i = 0; i < inputData.length; i++) {
        pcm16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768))
      }

      // Convert to base64
      const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)))

      ws.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: base64
      }))
    }

    source.connect(processor)
    processor.connect(audioContext.destination)
  }

  const playAudio = (base64Audio) => {
    if (!audioContextRef.current) return

    // Decode base64 to PCM
    const binaryString = atob(base64Audio)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // Convert to float32 for Web Audio
    const pcm16 = new Int16Array(bytes.buffer)
    const float32 = new Float32Array(pcm16.length)
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 32768
    }

    // Create and play audio buffer
    const audioBuffer = audioContextRef.current.createBuffer(1, float32.length, 24000)
    audioBuffer.getChannelData(0).set(float32)

    const source = audioContextRef.current.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContextRef.current.destination)
    source.start()
  }

  const endCall = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    setIsCallActive(false)
    setIsConnecting(false)
  }

  useEffect(() => {
    return () => endCall()
  }, [])

  // Navbar version - compact button
  if (inNavbar) {
    return (
      <button
        onClick={isCallActive ? endCall : startCall}
        disabled={isConnecting}
        className={`flex items-center gap-2 px-4 py-2 font-bold text-sm transition-all duration-200 ${
          isCallActive
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : isConnecting
            ? 'bg-steel-gray text-white'
            : 'bg-navy text-white hover:bg-navy/90'
        }`}
      >
        {isCallActive ? (
          <>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            End Call
          </>
        ) : isConnecting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Connecting
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

  // Floating version (fallback)
  return (
    <>
      {error && (
        <div className="fixed bottom-6 left-6 z-50 bg-white shadow-2xl p-4 max-w-xs border-l-4 border-red-500">
          <p className="text-navy text-sm mb-2">{error}</p>
          <button onClick={() => setError(null)} className="text-xs text-steel-gray hover:text-navy">
            Dismiss
          </button>
        </div>
      )}

      {isCallActive && (
        <div className="fixed top-20 right-6 z-50 bg-white shadow-2xl p-4 w-72">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>
            <div>
              <p className="text-navy font-bold text-sm">Christy - AI Assistant</p>
              <p className="text-green-500 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Connected
              </p>
            </div>
          </div>
          <button
            onClick={endCall}
            className="w-full py-2 bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
          >
            End Call
          </button>
        </div>
      )}
    </>
  )
}

export default VoiceAgent
