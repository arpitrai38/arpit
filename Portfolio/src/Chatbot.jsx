import React, { useState, useEffect, useRef } from 'react'
import arpitPhoto from './assets/arpit-rai.jpg'
import './Chatbot.css'

const BOT_AVATAR = arpitPhoto

const QUICK_PROMPTS = [
  { label: '💼 Freelance Services', query: 'What freelance services do you offer?' },
  { label: '🏋️ Gym ERP Demo', query: 'Show me Gym Management Platform demo' },
  { label: '🏛️ GRS Portal Demo', query: 'Show me Grievance Redressal System' },
  { label: '📞 Contact Arpit', query: 'How can I contact Arpit directly?' },
  { label: '💰 Pricing & Timeline', query: 'What is your freelance pricing and timeline?' },
  { label: '🛠️ Tech Stack', query: 'What technologies and skills do you use?' },
]

// Intelligent Knowledge Base & Response Engine
function getBotResponse(userQuery) {
  const q = userQuery.toLowerCase().trim()

  // 1. Contact / Reach / Hire / Phone / Email / WhatsApp
  if (
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('number') ||
    q.includes('call') ||
    q.includes('email') ||
    q.includes('whatsapp') ||
    q.includes('hire') ||
    q.includes('reach') ||
    q.includes('connect') ||
    q.includes('baat') ||
    q.includes('sampark') ||
    q.includes('mobile')
  ) {
    return {
      text: `You can reach **Arpit Rai** directly through phone, WhatsApp, email, or LinkedIn. He is available for freelance contracts and project discussions!`,
      actions: [
        { label: '📞 Call: +91 96967 25794', url: 'tel:+919696725794', primary: true },
        { label: '💬 WhatsApp Chat', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%20project!', primary: true },
        { label: '✉️ Email Arpit', url: 'mailto:sadhanamarendra12@gmail.com' },
        { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292' },
      ],
    }
  }

  // 2. GitHub / Socials / LinkedIn
  if (
    q.includes('github') ||
    q.includes('linkedin') ||
    q.includes('linkdien') ||
    q.includes('social') ||
    q.includes('repo')
  ) {
    return {
      text: `Here are Arpit's official profiles where you can explore his open-source code and professional network:`,
      actions: [
        { label: '🐙 GitHub (@arpitrai38)', url: 'https://github.com/arpitrai38', primary: true },
        { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292', primary: true },
        { label: '✉️ Email Arpit', url: 'mailto:sadhanamarendra12@gmail.com' },
      ],
    }
  }

  // 3. Gym Management Platform
  if (
    q.includes('gym') ||
    q.includes('fitness') ||
    q.includes('gms') ||
    q.includes('workout')
  ) {
    return {
      text: `**Gym Management Platform (ERP)**:\n\nA complete multi-tenant gym & fitness center web system.\n\n• **Features**: Member profiles & registration, plan subscriptions & automated renewal tracking, payment records & revenue billing, attendance logging, and admin dashboard.\n• **Tech Stack**: React.js, Node.js, Express.js, MongoDB (MERN Stack).`,
      actions: [
        { label: '🚀 Open Gym Live Demo', url: 'https://gym-management-platform.onrender.com', primary: true },
        { label: '💻 View Source Code', url: 'https://github.com/arpitrai38/gms-frontened' },
      ],
    }
  }

  // 4. Grievance Redressal System (GRS)
  if (
    q.includes('grs') ||
    q.includes('grievance') ||
    q.includes('complaint') ||
    q.includes('redressal')
  ) {
    return {
      text: `**GRS – Grievance Redressal System**:\n\nA structured citizen and student grievance submission and resolution portal.\n\n• **Features**: Role-based access (User & Admin), category-based complaint filing, real-time status tracking (In Review, Resolved), and admin resolution workflows.\n• **Tech Stack**: React.js, Node.js, Express.js, MongoDB (MERN Stack).`,
      actions: [
        { label: '🚀 Open GRS Live Demo', url: 'https://grs-mern-client.onrender.com', primary: true },
        { label: '💻 View GRS Source Code', url: 'https://github.com/arpitrai38/MERN-GRS' },
      ],
    }
  }

  // 5. College ERP System
  if (
    q.includes('college') ||
    q.includes('erp') ||
    q.includes('student') ||
    q.includes('university')
  ) {
    return {
      text: `**College ERP System**:\n\nAn enterprise resource planning solution developed for academic institutions.\n\n• **Features**: Student & faculty records, course enrollment, attendance tracking, fee reconciliation, academic results, and role-based permissions.\n• **Tech Stack**: MERN Stack, RESTful APIs, Database Management.`,
      actions: [
        { label: '🐙 View Arpit’s GitHub', url: 'https://github.com/arpitrai38', primary: true },
        { label: '💬 Inquire About ERP', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20am%20interested%20in%20your%20College%20ERP%20system.' },
      ],
    }
  }

  // 6. iCoder Blogging Website
  if (
    q.includes('icoder') ||
    q.includes('blog') ||
    q.includes('blogging') ||
    q.includes('article')
  ) {
    return {
      text: `**iCoder – Tech & Coding Blog**:\n\nA modern, responsive tech blogging web platform featuring tutorials on web development, programming, and tech careers.\n\n• **Tech Stack**: HTML5, CSS3, Bootstrap 5.`,
      actions: [
        { label: '🚀 Open iCoder Live Website', url: 'https://arpitrai38.github.io/iCoder/', primary: true },
        { label: '💻 View Source Code', url: 'https://github.com/arpitrai38/iCoder' },
      ],
    }
  }

  // 7. Email Validation Tool
  if (
    q.includes('email validation') ||
    q.includes('ivalidate') ||
    q.includes('validation tool') ||
    q.includes('email check')
  ) {
    return {
      text: `**Email Validation Tool (iValidate)**:\n\nA fast web utility for verifying, formatting, and checking email addresses with instant feedback.\n\n• **Tech Stack**: HTML, CSS, JavaScript.`,
      actions: [
        { label: '🚀 Open Email Validation Demo', url: 'https://arpitrai38.github.io/Email-Validation/', primary: true },
        { label: '💻 View Source Code', url: 'https://github.com/arpitrai38/Email-Validation' },
      ],
    }
  }

  // 8. All Projects Summary
  if (
    q.includes('project') ||
    q.includes('projects') ||
    q.includes('work') ||
    q.includes('portfolio') ||
    q.includes('demo') ||
    q.includes('sample') ||
    q.includes('live')
  ) {
    return {
      text: `Here are Arpit Rai's featured live projects:\n\n1. **Gym Management Platform** (MERN Stack ERP)\n2. **GRS – Grievance Redressal System** (MERN Stack Portal)\n3. **College ERP System** (Enterprise Academic ERP)\n4. **iCoder – Tech Blogging Website** (Bootstrap Blog)\n5. **Email Validation Tool** (JavaScript Utility)\n\nClick below to try the live demos!`,
      actions: [
        { label: '🏋️ Gym ERP Demo', url: 'https://gym-management-platform.onrender.com', primary: true },
        { label: '🏛️ GRS Portal Demo', url: 'https://grs-mern-client.onrender.com', primary: true },
        { label: '💻 iCoder Blog Demo', url: 'https://arpitrai38.github.io/iCoder/' },
        { label: '✉️ Email Tool Demo', url: 'https://arpitrai38.github.io/Email-Validation/' },
      ],
    }
  }

  // 9. Freelance Services / Work Offerings
  if (
    q.includes('freelance') ||
    q.includes('service') ||
    q.includes('services') ||
    q.includes('can you build') ||
    q.includes('can you make') ||
    q.includes('website banwana') ||
    q.includes('develop')
  ) {
    return {
      text: `Arpit provides end-to-end web development services for businesses and individuals:\n\n• **Full Stack Web Applications**: Custom MERN stack portals, dashboards, and SaaS platforms.\n• **Modern Frontend Development**: High-performance, responsive React.js & JavaScript websites.\n• **Backend & REST APIs**: Secure Node.js & Express server architectures with MongoDB/MySQL.\n• **Bug Fixing & Maintenance**: Optimization, redesigns, and cloud deployment.\n\nReady to get started?`,
      actions: [
        { label: '💬 Chat on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20have%20a%20freelance%20project%20I%20would%20like%20to%20discuss.', primary: true },
        { label: '📞 Call: +91 96967 25794', url: 'tel:+919696725794' },
      ],
    }
  }

  // 10. Pricing & Timeline
  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('pricing') ||
    q.includes('charge') ||
    q.includes('budget') ||
    q.includes('timeline') ||
    q.includes('kitna') ||
    q.includes('duration') ||
    q.includes('quote')
  ) {
    return {
      text: `**Freelance Pricing & Timelines**:\n\n• **Pricing**: Project-based quotes tailored to your requirements, feature complexity, and scale. Very competitive and freelance-friendly!\n• **Timelines**:\n  - Landing Page / Portfolio: 2–5 days\n  - Multi-page Website: 1–2 weeks\n  - Full Stack Web App / ERP: 2–4 weeks\n\nContact Arpit with your project details for a free, instant estimate!`,
      actions: [
        { label: '💬 Get Free Quote on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20could%20you%20give%20me%20a%20quote%20for%20a%20project?', primary: true },
        { label: '✉️ Send Project Specs via Email', url: 'mailto:sadhanamarendra12@gmail.com' },
      ],
    }
  }

  // 11. Skills & Tech Stack
  if (
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('skill') ||
    q.includes('skills') ||
    q.includes('react') ||
    q.includes('node') ||
    q.includes('mongo') ||
    q.includes('technology') ||
    q.includes('languages')
  ) {
    return {
      text: `**Arpit's Technical Skills**:\n\n• **Frontend**: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Responsive UI Design\n• **Backend**: Node.js, Express.js, RESTful APIs, PHP\n• **Databases**: MongoDB, MySQL, SQL\n• **Tools & Platforms**: Git, GitHub, VS Code, Render, XAMPP, Postman\n• **Other**: Data Structures & Algorithms with C++, AI & Generative AI exploration.`,
      actions: [
        { label: '🚀 Explore Featured Projects', url: '#featured', primary: true },
        { label: '🐙 View Code on GitHub', url: 'https://github.com/arpitrai38' },
      ],
    }
  }

  // 12. About Arpit / Developer / Experience / Education
  if (
    q.includes('who are you') ||
    q.includes('who is arpit') ||
    q.includes('about') ||
    q.includes('developer') ||
    q.includes('experience') ||
    q.includes('education') ||
    q.includes('college') ||
    q.includes('background')
  ) {
    return {
      text: `**About Arpit Rai**:\n\n• **Role**: Full Stack Web Developer & Freelancer from Uttar Pradesh, India.\n• **Education**: Pursuing B.Tech in Computer Science and Engineering at ITM (Institute of Technology and Management), GIDA, Gorakhpur.\n• **Experience**: Software Engineering Intern at Softpro India Pvt. Ltd. (Lucknow) & freelance web developer building production-grade MERN web apps for real clients.`,
      actions: [
        { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292', primary: true },
        { label: '📞 Contact Arpit', url: 'tel:+919696725794' },
      ],
    }
  }

  // 13. Greetings (Hi, Hello, Namaste, etc.)
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q.includes('namaste') ||
    q.includes('kya hal')
  ) {
    return {
      text: `Hello! 👋 Welcome to Arpit Rai's portfolio. I'm here to assist you with any questions about freelance projects, technical skills, live project demos, or direct contact details. What would you like to explore?`,
      actions: [
        { label: '💼 Freelance Services', query: 'What freelance services do you offer?' },
        { label: '🚀 Live Projects', query: 'Show me your projects' },
        { label: '📞 Contact Details', query: 'How can I contact Arpit?' },
      ],
    }
  }

  // 14. Fallback
  return {
    text: `Thanks for asking! As Arpit Rai's AI Assistant, I can help you with:\n\n• **Freelance project inquiries & estimates**\n• **Live demos** (Gym ERP, GRS Portal, iCoder Blog)\n• **Tech stack & skills** (React, Node, Express, MongoDB)\n• **Direct contact** (Phone, WhatsApp, Email, LinkedIn, GitHub)\n\nFeel free to choose an option below or chat directly with Arpit!`,
    actions: [
      { label: '💬 Chat on WhatsApp', url: 'https://wa.me/919696725794', primary: true },
      { label: '📞 Call +91 96967 25794', url: 'tel:+919696725794' },
      { label: '🚀 View Live Projects', url: '#featured' },
    ],
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `👋 **Hi there!** I'm Arpit Rai's AI Assistant.\n\nLooking to build a website, hire for freelance work, or test live project demos? Ask me anything or tap a quick question below!`,
      time: 'Just now',
      actions: [
        { label: '💼 Freelance Services', query: 'What freelance services do you offer?' },
        { label: '🏋️ Gym ERP Demo', query: 'Show me Gym Management Platform demo' },
        { label: '🏛️ GRS Portal Demo', query: 'Show me Grievance Redressal System' },
        { label: '📞 Contact Arpit', query: 'How can I contact Arpit directly?' },
      ],
    },
  ])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setHasUnread(false)
    }
  }, [messages, isOpen])

  const handleSend = (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input
    if (!query || !query.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time for realistic interaction
    setTimeout(() => {
      const botReply = getBotResponse(query)
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply.text,
        actions: botReply.actions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 450)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Chat cleared! How else can I help you with Arpit's freelance services or projects?`,
        time: 'Just now',
        actions: QUICK_PROMPTS.slice(0, 4),
      },
    ])
  }

  // Format bold markdown (**text**)
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n')
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <span key={lineIdx} className="chat-line">
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={partIdx}>{part.slice(2, -2)}</strong>
            }
            return part
          })}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="ai-chatbot-root">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="chatbot-launcher-wrapper">
          <div className="chatbot-tooltip">
            <span>Ask Arpit's AI ✦</span>
          </div>
          <button
            className="chatbot-launcher-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            id="open-chatbot-btn"
          >
            <div className="launcher-glow"></div>
            <img src={BOT_AVATAR} alt="Arpit AI" className="launcher-avatar" />
            <span className="launcher-ai-badge">AI</span>
            {hasUnread && <span className="launcher-unread-dot"></span>}
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Arpit AI Chat">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="header-avatar-wrap">
                <img src={BOT_AVATAR} alt="Arpit Rai" className="header-avatar" />
                <span className="header-online-status"></span>
              </div>
              <div>
                <h4>Arpit's AI Assistant <span className="badge-ai">PRO</span></h4>
                <p>🟢 Active now · Freelance & Portfolio Guide</p>
              </div>
            </div>

            <div className="header-actions">
              <button
                className="header-btn"
                onClick={clearChat}
                title="Restart Chat"
                aria-label="Restart Chat"
              >
                ↺
              </button>
              <button
                className="header-btn close-btn"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="quick-prompts-bar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className="quick-chip"
                onClick={() => handleSend(prompt.query)}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <img src={BOT_AVATAR} alt="Bot" className="bubble-avatar" />
                )}
                <div className={`chat-bubble ${msg.sender}`}>
                  <div className="bubble-text">{renderFormattedText(msg.text)}</div>

                  {/* Action Buttons inside Bot message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="bubble-actions">
                      {msg.actions.map((act, actIdx) =>
                        act.url ? (
                          <a
                            key={actIdx}
                            href={act.url}
                            target={act.url.startsWith('#') || act.url.startsWith('tel:') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className={`action-pill ${act.primary ? 'primary' : ''}`}
                          >
                            {act.label} ↗
                          </a>
                        ) : (
                          <button
                            key={actIdx}
                            className="action-pill query-pill"
                            onClick={() => handleSend(act.query || act.label)}
                          >
                            {act.label}
                          </button>
                        )
                      )}
                    </div>
                  )}

                  <span className="bubble-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row bot">
                <img src={BOT_AVATAR} alt="Bot" className="bubble-avatar" />
                <div className="chat-bubble bot typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="chatbot-footer">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Ask about freelancing, projects, contact..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                id="chatbot-input-field"
                autoFocus
              />
              <button
                className="send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <span>➤</span>
              </button>
            </div>
            <div className="footer-branding">
              <span>Arpit Rai Portfolio Assistant · Instant AI Answers</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
