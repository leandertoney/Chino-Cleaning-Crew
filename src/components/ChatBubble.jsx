import { useState } from 'react'

function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    'How can we help you today?',
    'Need a quote? Tell us about your space—any size, any type.',
    'Warehouses, offices, retail, construction sites—we clean it all. Power washing, floor care, deep cleans, and more.',
    'Serving Cumberland, Dauphin, York, Lancaster, and all surrounding counties.',
    'Call 717-714-0662 — no job too big, no space too small.',
  ]

  const handleNextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length)
  }

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
        <div className="bg-navy p-5">
          <div className="flex items-center gap-3">
            <svg
              className="w-10 h-10"
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* Three concentric C's - all centered at (24,24), same 60° opening, equal 6-unit gaps */}
              {/* Outer C - radius 20 */}
              <path
                d="M34 6.72 A20 20 0 1 0 34 41.28"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Middle C - radius 14 */}
              <path
                d="M31 11.87 A14 14 0 1 0 31 36.13"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Inner C - radius 8 */}
              <path
                d="M28 17.07 A8 8 0 1 0 28 30.93"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Precise 5-point star - R=3.5, r=1.4, centered at (24,24) */}
              <path
                d="M24 20.5 L24.82 22.87 L27.33 22.92 L25.33 24.43 L26.06 26.83 L24 25.4 L21.94 26.83 L22.67 24.43 L20.67 22.92 L23.18 22.87 Z"
                fill="white"
              />
            </svg>
            <span className="text-white font-bold text-sm tracking-tight">
              Chino Cleaning Crew
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-5 min-h-[200px] bg-steel-gray/10">
          <div className="bg-white p-4 shadow-sm mb-4">
            <p className="text-navy font-medium">{messages[currentMessage]}</p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button
              onClick={handleNextMessage}
              className="w-full text-left bg-white p-3 text-sm text-navy hover:bg-steel-gray/10 transition-colors duration-200 border border-steel-gray/20"
            >
              Tell me more
            </button>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left bg-white p-3 text-sm text-navy hover:bg-steel-gray/10 transition-colors duration-200 border border-steel-gray/20"
            >
              Get a quote
            </a>
            <a
              href="tel:717-714-0662"
              className="block w-full text-left bg-white p-3 text-sm text-navy hover:bg-steel-gray/10 transition-colors duration-200 border border-steel-gray/20"
            >
              Call 717-714-0662
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-steel-gray/20 bg-white">
          <p className="text-xs text-steel-gray text-center">
            Powered by Chino Cleaning Crew
          </p>
        </div>
      </div>
    </>
  )
}

export default ChatBubble
