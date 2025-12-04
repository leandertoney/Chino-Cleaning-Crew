import { useState } from 'react'

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [conversation, setConversation] = useState([
    { type: 'bot', text: "Hey! What can we help you with today?" }
  ])

  const quickReplies = {
    initial: [
      { label: "I need a quote", action: "quote" },
      { label: "What do you clean?", action: "services" },
      { label: "Where do you service?", action: "areas" },
      { label: "Call now", action: "call" },
    ],
    quote: [
      { label: "Warehouse / Industrial", action: "quote-warehouse" },
      { label: "Office / Commercial", action: "quote-office" },
      { label: "Something else", action: "quote-other" },
    ],
    services: [
      { label: "Get a quote", action: "quote" },
      { label: "Where do you service?", action: "areas" },
      { label: "Call to discuss", action: "call" },
    ],
    areas: [
      { label: "I'm in your area!", action: "quote" },
      { label: "I'm outside these areas", action: "outside-area" },
    ],
    final: [
      { label: "Start over", action: "reset" },
    ],
  }

  const responses = {
    quote: "Great! What type of space do you need cleaned?",
    "quote-warehouse": "Perfect—warehouses are our specialty. Fill out our quick form and we'll get back to you within 24 hours with a free quote.",
    "quote-office": "We handle offices of all sizes. Fill out our quick form and we'll get back to you within 24 hours.",
    "quote-other": "No problem—we clean it all. Fill out our form and tell us about your space. We'll figure it out together.",
    services: "We clean everything: warehouses, offices, retail spaces, construction sites—even emergency cleanups. Power washing, floor care, deep cleans—you name it, we handle it.",
    areas: "We serve Cumberland, Dauphin, York, Lancaster, Perry, Adams, Franklin, Lebanon, Juniata, and Mifflin counties in Central PA.",
    "outside-area": "Don't worry—we never say no. Give us a call and let's talk about your project.",
    call: "Call us anytime at 717-714-0662. We're happy to chat!",
  }

  const getNextReplies = (action) => {
    if (action === "reset") return "initial"
    if (action === "quote") return "quote"
    if (action === "services") return "services"
    if (action === "areas") return "areas"
    if (action.startsWith("quote-") || action === "outside-area" || action === "call") return "final"
    return "initial"
  }

  const handleReply = (reply) => {
    if (reply.action === "reset") {
      setConversation([{ type: 'bot', text: "Hey! What can we help you with today?" }])
      return
    }

    if (reply.action === "call") {
      window.location.href = "tel:717-714-0662"
      return
    }

    const userMessage = { type: 'user', text: reply.label }
    const botResponse = { type: 'bot', text: responses[reply.action] }

    setConversation(prev => [...prev, userMessage, botResponse])
  }

  const getCurrentReplies = () => {
    if (conversation.length === 1) return quickReplies.initial

    const lastBotMessage = [...conversation].reverse().find(m => m.type === 'bot')

    for (const [action, response] of Object.entries(responses)) {
      if (lastBotMessage?.text === response) {
        return quickReplies[getNextReplies(action)] || quickReplies.final
      }
    }

    return quickReplies.initial
  }

  const currentReplies = getCurrentReplies()
  const showQuoteButton = conversation.some(m =>
    m.text?.includes("Fill out") || m.text?.includes("form")
  )

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-navy text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'rotate-0' : ''
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Modal */}
      <div
        className={`fixed bottom-28 right-6 z-50 w-80 md:w-96 bg-white shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-navy p-4">
          <div className="flex items-center gap-0">
            <svg
              className="w-9 h-9"
              viewBox="0 0 36 48"
              fill="none"
            >
              <path
                d="M34 6.72 A20 20 0 1 0 34 41.28"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M31 11.87 A14 14 0 1 0 31 36.13"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M28 17.07 A8 8 0 1 0 28 30.93"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M24 20.5 L24.82 22.87 L27.33 22.92 L25.33 24.43 L26.06 26.83 L24 25.4 L21.94 26.83 L22.67 24.43 L20.67 22.92 L23.18 22.87 Z"
                fill="white"
              />
            </svg>
            <div>
              <span className="text-white font-bold text-sm block">Chino Cleaning Crew</span>
              <span className="text-white/70 text-xs">Usually replies instantly</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 max-h-64 overflow-y-auto bg-steel-gray/5">
          <div className="space-y-3">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 text-sm ${
                    message.type === 'user'
                      ? 'bg-navy text-white rounded-t-lg rounded-bl-lg'
                      : 'bg-white text-navy shadow-sm rounded-t-lg rounded-br-lg'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Replies */}
        <div className="p-4 border-t border-steel-gray/10 bg-white">
          <div className="flex flex-wrap gap-2">
            {currentReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleReply(reply)}
                className="px-3 py-2 text-sm bg-steel-gray/10 text-navy rounded-full hover:bg-navy hover:text-white transition-colors duration-200"
              >
                {reply.label}
              </button>
            ))}
          </div>

          {showQuoteButton && (
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full mt-3 py-3 bg-navy text-white text-center text-sm font-bold hover:bg-navy/90 transition-colors duration-200"
            >
              Get Your Free Quote
            </a>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatBubble
