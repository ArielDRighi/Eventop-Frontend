'use client'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': any;
    }
  }
}

import React, { useEffect, useState } from 'react'

export default function EnhancedDialogflowChatbot() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
    script.async = true
    document.body.appendChild(script)

    // Verificar el estado de apertura en localStorage
    const hasOpened = localStorage.getItem('chatbotOpened')
    if (hasOpened) {
      setIsOpen(false)
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      localStorage.setItem('chatbotOpened', 'true')
    }
  }

  return (
    <>
      <df-messenger
        intent="WELCOME"
        chat-title="Eventop"
        agent-id="e58e2f28-b4d2-468c-b436-7d5ac5896bf9"
        language-code="es"
        chat-icon="https://example.com/path-to-your-custom-icon.png"
        className={`df-messenger-custom ${isOpen ? 'df-messenger-open' : ''}`}
        expand={isOpen ? 'true' : 'false'}
      ></df-messenger>
      <button 
        className="chat-toggle-btn"
        onClick={toggleChatbot}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        <span className="chat-toggle-icon"></span>
      </button>
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(139, 92, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }

        .df-messenger-custom {
          --df-messenger-bot-message: #8B5CF6;
          --df-messenger-user-message: #60A5FA;
          --df-messenger-chat-background-color: #1F2937;
          --df-messenger-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          --df-messenger-send-icon: #60A5FA;
          --df-messenger-button-titlebar-color: #111827;
          --df-messenger-button-titlebar-font-color: #FFFFFF;
          --df-messenger-chat-border-radius: 1rem;
          --df-messenger-message-border-radius: 1rem;
          --df-messenger-input-box-color: #4B5563;
          --df-messenger-input-box-border-color: #4B5563;
          --df-messenger-input-font-color: #FFFFFF;
          --df-messenger-input-placeholder-font-color: #9CA3AF;
          --df-messenger-minimized-chat-close-icon-color: #FFFFFF;
        }

        .df-messenger-custom {
          z-index: 1000;
          transition: all 0.3s ease-in-out;
        }

        .df-messenger-custom > df-messenger-chat {
          width: 370px;
          height: 600px;
          max-height: calc(100vh - 100px);
          transition: all 0.3s ease-in-out;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .df-messenger-custom.df-messenger-open > df-messenger-chat {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        .df-messenger-custom:not(.df-messenger-open) > df-messenger-chat {
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 480px) {
          .df-messenger-custom > df-messenger-chat {
            width: calc(100% - 32px);
            height: calc(100% - 100px);
            max-height: none;
            border-radius: 0;
            bottom: 0;
            right: 0;
          }
        }

        .df-messenger-custom df-message-list {
          padding: 1rem;
        }

        .df-messenger-custom df-message {
          margin-bottom: 0.75rem;
          transition: all 0.2s ease-in-out;
          opacity: 0;
          transform: translateY(10px);
        }

        .df-messenger-custom df-message[data-rendered] {
          opacity: 1;
          transform: translateY(0);
        }

        .df-messenger-custom df-message-text {
          padding: 0.75rem 1rem;
          line-height: 1.5;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          color: #FFFFFF;
          font-weight: 600;
        }

        .df-messenger-custom df-chip-container {
          margin-top: 0.5rem;
        }

        .df-messenger-custom df-chip {
          background-color: #4B5563;
          color: #FFFFFF;
          border-radius: 1rem;
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
        }

        .df-messenger-custom df-chip:hover {
          background-color: #6B7280;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .chat-toggle-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #8B5CF6;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        .chat-toggle-btn:hover {
          transform: scale(1.1);
        }

        .chat-toggle-icon {
          width: 24px;
          height: 24px;
          position: relative;
        }

        .chat-toggle-icon::before,
        .chat-toggle-icon::after {
          content: '';
          position: absolute;
          background-color: white;
          transition: all 0.3s ease;
        }

        .chat-toggle-icon::before {
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          transform: translateY(11px) rotate(45deg);
        }

        .chat-toggle-icon::after {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          transform: translateY(-11px) rotate(-45deg);
        }

        .df-messenger-open .chat-toggle-icon::before {
          transform: translateY(0) rotate(0);
          width: 50%;
        }

        .df-messenger-open .chat-toggle-icon::after {
          transform: translateY(0) rotate(0);
          width: 50%;
          left: auto;
          right: 0;
        }

        .df-messenger-custom df-message[agent="human"] df-message-text,
        .df-messenger-custom df-message[agent="bot"] df-message-text {
          color: #FFFFFF;
        }
      `}</style>
    </>
  )
}