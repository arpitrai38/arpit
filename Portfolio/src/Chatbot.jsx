import React, { useState, useEffect, useRef } from 'react'
import arpitPhoto from './assets/arpit-rai.jpg'
import './Chatbot.css'

const BOT_AVATAR = arpitPhoto

// English Quick Prompts Bar
// English Quick Prompts Bar (Project Work recommendations first, Tech definitions at the end)
const QUICK_PROMPTS_EN = [
  // 1. Project-related recommendations first:
  { label: '💡 Tech Stack Advice', query: 'I am confused which technology to use for my project' },
  { label: '🎯 Suggest Features', query: 'What features should I add to my web project?' },
  { label: '🏋️ Gym ERP Demo', query: 'Show me Gym Management Platform demo' },
  { label: '🏛️ GRS Portal Demo', query: 'Show me Grievance Redressal System' },
  { label: '👤 Who is Arpit Rai?', query: 'Who is Arpit Rai and what is his background?' },
  { label: '💼 Freelance Services', query: 'What freelance services do you offer?' },
  { label: '💰 Pricing & Timeline', query: 'What is your freelance pricing and timeline?' },
  { label: '📞 Contact Arpit', query: 'How can I contact Arpit directly?' },
  // 2. Tech education recommendations at the end of the row:
  { label: '🤖 What is AI & GenAI?', query: 'What is Artificial Intelligence and Generative AI?' },
  { label: '☁️ Cloud Computing & AWS', query: 'What is Cloud Computing and AWS?' },
  { label: '💻 Full Stack & MERN', query: 'What is Full Stack Development and MERN Stack?' },
  { label: '🌐 Frontend vs Backend', query: 'What is the difference between Frontend and Backend?' },
  { label: '🗄️ SQL vs NoSQL', query: 'What is the difference between SQL and NoSQL databases?' },
  { label: '⚡ What is REST API?', query: 'What is a REST API and how does it work?' },
  { label: '🔒 What is JWT Auth?', query: 'What is JWT Authentication and how does it secure web apps?' },
]

// Hindi / Hinglish Quick Prompts Bar (Project Work recommendations first, Tech definitions at the end)
const QUICK_PROMPTS_HI = [
  // 1. Project-related recommendations first:
  { label: '💡 कौन सी Tech चुने?', query: 'Main confuse hoon ki apne project ke liye kaun si technology use karu' },
  { label: '🎯 Features क्या Add करें?', query: 'Mere project me kaun se best features add karne chahiye?' },
  { label: '🏋️ Gym ERP लाइव डेमो', query: 'Gym Management Platform ka live demo dikhao' },
  { label: '🏛️ GRS पोर्टल डेमो', query: 'GRS Grievance Redressal System ka demo dikhao' },
  { label: '👤 Arpit Rai कौन हैं?', query: 'Arpit Rai kaun hain aur unki skills kya hain?' },
  { label: '💼 फ्रीलांस सर्विसेज', query: 'Arpit kaun-kaun si web development services dete hain?' },
  { label: '💰 प्रोजेक्ट खर्च व समय', query: 'Project banwane me kitna kharch aur samay lagega?' },
  { label: '📞 Arpit से संपर्क करें', query: 'Arpit se directly kaise contact karein?' },
  // 2. Tech education recommendations at the end of the row:
  { label: '🤖 AI & GenAI क्या है?', query: 'AI aur Generative AI kya hota hai aur kaise kaam karta hai?' },
  { label: '☁️ Cloud Computing क्या है?', query: 'Cloud Computing kya hai aur AWS/Render kaise use karte hain?' },
  { label: '💻 Full Stack & MERN क्या है?', query: 'Full Stack development aur MERN stack kya hota hai?' },
  { label: '🌐 Frontend vs Backend', query: 'Frontend aur Backend me kya antar hai?' },
  { label: '🗄️ SQL vs NoSQL डेटाबेस', query: 'SQL aur NoSQL database me kya difference hai aur MongoDB kyu use kare?' },
  { label: '⚡ REST API क्या होती है?', query: 'REST API kya hoti hai aur frontend-backend kaise connect hote hain?' },
  { label: '🔒 JWT Auth क्या है?', query: 'JWT Authentication kya hota hai?' },
]

// Language detector: detects if user is asking in Hindi/Hinglish vs English
function detectLanguage(rawText) {
  if (!rawText) return 'en'
  const t = rawText.toLowerCase()
  if (/[\u0900-\u097F]/.test(rawText)) return 'hi' // Devanagari Hindi

  const hinglishKeywords = [
    'kya', 'kaise', 'kaun', 'kaunsi', 'konsi', 'kare', 'karein', 'karna', 'karo',
    'batao', 'btao', 'chahiye', 'hai', 'hain', 'ho', 'mera', 'meri', 'mere',
    'mujhe', 'hum', 'hume', 'bhai', 'bhaiya', 'banwana', 'banani', 'banaye',
    'lagana', 'lagega', 'hoga', 'thik', 'accha', 'acha', 'sahi', 'paise', 'kitna',
    'samajh', 'confuse', 'confusion', 'madad', 'help karo', 'namaste', 'shukriya',
    'dhanyawad', 'kuch', 'bhi', 'kripya', 'dost', 'daalein', 'dalna',
    'bataye', 'bataiye', 'tarika', 'sujhav', 'antar', 'bhejo', 'dikhao', 'sikhao'
  ]

  let count = 0
  for (const word of hinglishKeywords) {
    const regex = new RegExp(`\\b${word}\\b`, 'i')
    if (regex.test(t)) count++
  }

  return count >= 1 ? 'hi' : 'en'
}

// Comprehensive Knowledge Base Engine: Web Tech, AI, Cloud, Fullstack, Software Engineering, Projects & Contact
function getBotResponse(userQuery, activeLang = 'en') {
  const q = userQuery.toLowerCase().trim()
  const detected = detectLanguage(userQuery)
  // If user typed in Hindi/Hinglish, prioritize Hindi; otherwise respect active selected language
  const isHi = detected === 'hi' || (activeLang === 'hi' && detected !== 'en')

  // -------------------------------------------------------------
  // 0. WHO IS ARPIT RAI / ABOUT DEVELOPER (arpit kaun hai, who is arpit, etc.)
  // -------------------------------------------------------------
  if (
    q.includes('arpit kaun') ||
    q.includes('arpit kon') ||
    q.includes('arpit koun') ||
    q.includes('arpit kon h') ||
    q.includes('arpit kaun h') ||
    q.includes('who is arpit') ||
    q.includes('who is arpit rai') ||
    q.includes('about arpit') ||
    q.includes('arpit ke bare') ||
    q.includes('arpit ke baare') ||
    q.includes('arpit ki details') ||
    q.includes('arpit details') ||
    q.includes('arpit profile') ||
    q.includes('arpit bio') ||
    q.includes('developer kaun') ||
    q.includes('developer kon') ||
    q.includes('who is developer') ||
    q.includes('who is the developer') ||
    q.includes('about developer') ||
    q.includes('tell me about arpit') ||
    q.includes('tell me about developer') ||
    q.includes('who built this') ||
    q.includes('who made this') ||
    q.includes('who created this') ||
    q.includes('kisne banaya') ||
    q.includes('kisne banaye') ||
    q.includes('kisne banayi') ||
    q.includes('kiska portfolio') ||
    q.includes('creator kaun') ||
    q.includes('owner kaun') ||
    q === 'arpit' ||
    q === 'arpit rai' ||
    (q.includes('arpit') && (q.includes('kya karta') || q.includes('kya karte') || q.includes('hai kaun') || q.includes('info') || q.includes('background') || q.includes('experience') || q.includes('education') || q.includes('skills'))) ||
    q.includes('who are you') ||
    q.includes('tum kaun') ||
    q.includes('aap kaun') ||
    q.includes('tell me about yourself')
  ) {
    if (isHi) {
      return {
        text: `👤 **Arpit Rai kaun hain? (About Arpit Rai)**:\n\n` +
          `**Arpit Rai** ek passionate **Full Stack Web Developer** aur **Freelance Software Engineer** hain jo modern, fast aur high-performance web applications build karte hain.\n\n` +
          `• **Primary Skills & Expertise**:\n` +
          `  - **Frontend**: React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, Responsive UI/UX.\n` +
          `  - **Backend**: Node.js, Express.js, RESTful APIs, JWT Authentication, Secure Server Architectures.\n` +
          `  - **Databases**: MongoDB, MySQL, PostgreSQL, Redis.\n` +
          `  - **Cloud & Deployment**: Render, Vercel, Docker, GitHub Actions, AWS S3.\n\n` +
          `• **Arpit ke Featured Live Projects**:\n` +
          `  1. **Gym Management Platform**: Full-fledged MERN multi-tenant ERP system (Render par live).\n` +
          `  2. **GRS (Grievance Redressal System)**: Citizen aur student complaints & resolution management portal.\n` +
          `  3. **College ERP System**: Enterprise academic management system.\n` +
          `  4. **iCoder**: Tech tutorials & blogging website (Bootstrap 5).\n` +
          `  5. **Email Validation Tool**: Real-time email syntax verification tool.\n\n` +
          `• **Work Philosophy**:\n` +
          `  *"More than code. It's about impact."* — Arpit hamesha practical functionality, clean architecture aur client business growth ko priority dete hain.\n\n` +
          `Aap unse freelance projects ke liye direct WhatsApp ya Call par connect kar sakte hain!`,
        actions: [
          { label: '📞 Call Arpit: +91 96967 25794', url: 'tel:+919696725794', primary: true },
          { label: '💬 WhatsApp Chat Kholein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20aapke%20projects%20aur%20freelance%20work%20ke%20bare%20me%20baat%20karni%20hai.', primary: true },
          { label: '🚀 Live Projects Dekhein', url: '#featured' },
          { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292' },
        ],
      }
    } else {
      return {
        text: `👤 **Who is Arpit Rai? (Developer Profile)**:\n\n` +
          `**Arpit Rai** is a skilled **Full Stack Web Developer** and **Freelance Software Engineer** specializing in modern, high-performance web applications and enterprise platforms.\n\n` +
          `• **Core Technical Expertise**:\n` +
          `  - **Frontend**: React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Web Design.\n` +
          `  - **Backend**: Node.js, Express.js, RESTful APIs, JWT Authentication, Server-Side Logic.\n` +
          `  - **Databases**: MongoDB, MySQL, PostgreSQL, Redis.\n` +
          `  - **Cloud & DevOps**: Render, Vercel, Docker, GitHub Actions, AWS S3.\n\n` +
          `• **Featured Flagship Projects**:\n` +
          `  1. **Gym Management Platform**: Multi-tenant MERN ERP with automated renewals, billing, and membership tracking.\n` +
          `  2. **GRS (Grievance Redressal System)**: Role-based online grievance resolution portal.\n` +
          `  3. **College ERP System**: Centralized academic & administrative management system.\n` +
          `  4. **iCoder**: Responsive coding and technology blogging website.\n` +
          `  5. **Email Validation (iValidate)**: Lightweight email verification utility.\n\n` +
          `• **Philosophy & Work Ethic**:\n` +
          `  *"More than code. It's about impact."* — Arpit emphasizes practical usability, clean maintainable code, and high-velocity delivery for clients and businesses.\n\n` +
          `Looking to build a web application or collaborate with Arpit? Connect directly below!`,
        actions: [
          { label: '📞 Direct Call: +91 96967 25794', url: 'tel:+919696725794', primary: true },
          { label: '💬 Chat on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20would%20like%20to%20discuss%20a%20project.', primary: true },
          { label: '🚀 Explore Featured Projects', url: '#featured' },
          { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 1. AI (ARTIFICIAL INTELLIGENCE), GENAI, LLMS & MACHINE LEARNING
  // -------------------------------------------------------------
  if (
    q.includes('genai') ||
    q.includes('generative ai') ||
    q.includes('what is ai') ||
    q.includes('ai kya') ||
    q.includes('artificial intelligence') ||
    q.includes('machine learning') ||
    q.includes('llm') ||
    q.includes('large language model') ||
    q.includes('chatgpt') ||
    q.includes('gemini') ||
    q.includes('prompt engineering') ||
    q.includes('langchain') ||
    q.includes('ai in web') ||
    q.includes('integrate ai') ||
    q.includes('ai integration') ||
    q.includes('deep learning') ||
    q.includes('nlp') ||
    q === 'ai'
  ) {
    if (isHi) {
      return {
        text: `🤖 **Artificial Intelligence (AI) & Generative AI (GenAI)**:\n\n` +
          `• **AI kya hai?**\n` +
          `  AI aisi computer technology hai jo human intelligence ko simulate karti hai—jaise decision making, problem solving, language understanding aur visual perception.\n\n` +
          `• **Traditional AI vs Generative AI (GenAI)**:\n` +
          `  1. **Traditional AI**: Data ko analyze aur classify karta hai (e.g., spam detection, fraud detection, recommendation system).\n` +
          `  2. **Generative AI (GenAI)**: Naya content create karta hai—jaise naya text (ChatGPT, Gemini), code, images (Midjourney), ya audio.\n\n` +
          `• **LLMs (Large Language Models)**:\n` +
          `  GPT-4, Google Gemini, Claude, LLaMA jaise models billions of parameters par train hote hain aur natural language me human-like baatcheet aur complex reasoning karte hain.\n\n` +
          `• **Web Applications me AI kaise integrate karein?**\n` +
          `  ✓ **AI Chatbots & Virtual Assistants** (Customer support 24/7)\n` +
          `  ✓ **OpenAI / Gemini API Integration** (Automated blogs, resume analysis, text summarization)\n` +
          `  ✓ **Vector Databases & Semantic Search** (Pinecone, ChromaDB, LangChain)\n` +
          `  ✓ **Personalized Recommendations** (User behavior ke according custom feeds)\n\n` +
          `Arpit Rai aapke custom web apps me Gemini aur OpenAI APIs smoothly integrate kar sakte hain!`,
        actions: [
          { label: '💬 AI Web App banwane ke liye sampark karein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20apne%20web%20app%20me%20AI%20integrate%20karwana%20hai.', primary: true },
          { label: '☁️ Cloud Computing kya hai?', query: 'What is Cloud Computing?' },
          { label: '💻 Full Stack MERN kya hai?', query: 'What is Full Stack Development?' },
        ],
      }
    } else {
      return {
        text: `🤖 **Artificial Intelligence (AI) & Generative AI (GenAI) Overview**:\n\n` +
          `• **What is AI?**\n` +
          `  Artificial Intelligence is the simulation of human intelligence by computer systems, encompassing machine learning, natural language processing (NLP), computer vision, and autonomous reasoning.\n\n` +
          `• **Traditional AI vs Generative AI (GenAI)**:\n` +
          `  1. **Traditional/Predictive AI**: Learns patterns to categorize, predict, or filter data (e.g., spam detection, credit scoring, recommendation engines).\n` +
          `  2. **Generative AI (GenAI)**: Generates novel, original content—such as synthetic text, code, high-resolution imagery, and voice—using deep learning transformer architectures.\n\n` +
          `• **Large Language Models (LLMs)**:\n` +
          `  Models like GPT-4, Google Gemini, Anthropic Claude, and Meta LLaMA process massive tokenized corpora to understand context, generate code, summarize documents, and power conversational agents.\n\n` +
          `• **How to Integrate AI into Modern Web Applications**:\n` +
          `  ✓ **Conversational Assistants**: Embedding intelligent customer service bots with context memory.\n` +
          `  ✓ **REST APIs & SDKs**: Calling OpenAI, Google Gemini, or HuggingFace endpoints from Node.js backends.\n` +
          `  ✓ **Vector Search & RAG**: Using Pinecone, Weaviate, or pgvector with LangChain to query custom enterprise documents.\n` +
          `  ✓ **Automated Workflow**: Auto-generating product descriptions, dynamic email templates, and automated sentiment analysis.\n\n` +
          `Arpit can integrate LLM APIs and intelligent automated workflows directly into your web applications!`,
        actions: [
          { label: '💬 Consult AI Integration on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20want%20to%20integrate%20AI/LLM%20into%20my%20web%20application.', primary: true },
          { label: '☁️ Explore Cloud & DevOps', query: 'What is Cloud Computing and AWS?' },
          { label: '💻 Full Stack & MERN Stack', query: 'What is Full Stack Development?' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 2. CLOUD COMPUTING, AWS, DOCKER & DEVOPS
  // -------------------------------------------------------------
  if (
    q.includes('cloud') ||
    q.includes('aws') ||
    q.includes('azure') ||
    q.includes('gcp') ||
    q.includes('google cloud') ||
    q.includes('serverless') ||
    q.includes('docker') ||
    q.includes('container') ||
    q.includes('kubernetes') ||
    q.includes('devops') ||
    q.includes('ci/cd') ||
    q.includes('cicd') ||
    q.includes('render') ||
    q.includes('vercel') ||
    q.includes('hosting') ||
    q.includes('deploy') ||
    q.includes('s3') ||
    q.includes('cdn') ||
    q.includes('cloud kya')
  ) {
    if (isHi) {
      return {
        text: `☁️ **Cloud Computing & Modern DevOps Guide**:\n\n` +
          `• **Cloud Computing kya hota hai?**\n` +
          `  Internet ke zariye on-demand computing services (servers, storage, databases, networking, software) provide karna bina kisi physical hardware ko khud manage kiye.\n\n` +
          `• **Cloud Service Models**:\n` +
          `  1. **IaaS (Infrastructure as a Service)**: Raw servers aur storage (e.g., AWS EC2, Google Compute Engine).\n` +
          `  2. **PaaS (Platform as a Service)**: Pre-configured app runtime (e.g., Render, Vercel, Heroku, AWS Elastic Beanstalk).\n` +
          `  3. **SaaS (Software as a Service)**: Ready-to-use software (e.g., Google Drive, Slack, Shopify).\n\n` +
          `• **Top Cloud Providers**:\n` +
          `  - **AWS (Amazon Web Services)**: Market leader (EC2, S3, RDS, Lambda).\n` +
          `  - **Google Cloud Platform (GCP)**: Best for AI/ML, BigData aur Kubernetes.\n` +
          `  - **Microsoft Azure**: Enterprise companies aur Windows servers ke liye top choice.\n\n` +
          `• **Modern Deployment & DevOps Tools**:\n` +
          `  ✓ **Render & Vercel**: Fullstack aur MERN web apps ko seconds me live deploy karne ke liye.\n` +
          `  ✓ **Docker**: Applications aur unki dependencies ko lightweight container me package karta hai jisse har machine par ek jaisa chale.\n` +
          `  ✓ **CI/CD (GitHub Actions)**: Code push hote hi automatic testing aur cloud par deployment.\n` +
          `  ✓ **AWS S3 & Cloudinary**: Images, videos aur documents ko fast speed se CDN ke zariye serve karne ke liye.\n\n` +
          `Arpit aapke projects ko Render, Vercel aur AWS cloud par securely deploy aur configure karte hain!`,
        actions: [
          { label: '🚀 Arpit ke Live Deployed Apps dekhein', url: '#featured', primary: true },
          { label: '💬 Cloud Deployment me help lein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20apne%20app%20ko%20cloud%20par%20deploy%20karne%20me%20help%20chahiye.' },
          { label: '💻 Fullstack MERN kya hai?', query: 'What is Full Stack Development?' },
        ],
      }
    } else {
      return {
        text: `☁️ **Cloud Computing, Infrastructure & DevOps Essentials**:\n\n` +
          `• **What is Cloud Computing?**\n` +
          `  The on-demand delivery of IT resources (compute servers, database storage, networking, AI capabilities) over the internet with pay-as-you-go pricing, eliminating the need to maintain on-premise hardware.\n\n` +
          `• **The 3 Core Cloud Models**:\n` +
          `  1. **IaaS (Infrastructure as a Service)**: Virtual machines, raw networking, and disks (e.g., AWS EC2, Azure VMs, GCP Compute Engine).\n` +
          `  2. **PaaS (Platform as a Service)**: Managed application platforms that eliminate OS maintenance (e.g., Render, Vercel, Heroku, AWS App Runner).\n` +
          `  3. **SaaS (Software as a Service)**: Fully managed end-user web applications (e.g., Jira, Figma, Google Workspace).\n\n` +
          `• **Key DevOps & Cloud Technologies**:\n` +
          `  ✓ **Docker & Containerization**: Isolating microservices into standardized, lightweight images that run consistently across development and production environments.\n` +
          `  ✓ **Serverless Architecture**: Event-driven computing (AWS Lambda, Vercel Serverless Functions) where code runs only when triggered, scaling automatically to zero.\n` +
          `  ✓ **CI/CD Automation**: Continuous Integration & Delivery via GitHub Actions to automate build checks, test suites, and production rollouts.\n` +
          `  ✓ **Object Storage & Global CDNs**: AWS S3 and Cloudinary integrated with Cloudflare CDN for ultra-fast asset caching worldwide.\n\n` +
          `Arpit builds, dockerizes, and deploys scalable production web systems on Render, Vercel, and modern cloud infrastructure!`,
        actions: [
          { label: '🚀 Inspect Live Cloud Apps', url: '#featured', primary: true },
          { label: '💬 Discuss Cloud Deployment on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20need%20assistance%20deploying%20my%20app%20to%20the%20cloud.', primary: true },
          { label: '💻 Full Stack & MERN Architecture', query: 'What is Full Stack Development?' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 3. FULL STACK DEVELOPMENT & MERN STACK
  // -------------------------------------------------------------
  if (
    q.includes('full stack') ||
    q.includes('fullstack') ||
    q.includes('mern') ||
    q.includes('mean stack') ||
    q.includes('3-tier') ||
    q.includes('three tier') ||
    q.includes('full stack kya') ||
    q.includes('mern kya')
  ) {
    if (isHi) {
      return {
        text: `💻 **Full Stack Development & MERN Stack Complete Guide**:\n\n` +
          `• **Full Stack Development kya hota hai?**\n` +
          `  Full Stack Developer ek aisa engineer hota hai jo kisi web application ke dono hisse build karta hai:\n` +
          `  1. **Frontend (Client-side)**: User Interface jise user browser me dekhta aur interact karta hai.\n` +
          `  2. **Backend (Server-side)**: Business logic, API endpoints, user authentication aur data validation.\n` +
          `  3. **Database**: Permanent data storage (User profiles, orders, transactions).\n\n` +
          `• **MERN Stack kya hai aur kyu itna popular hai?**\n` +
          `  MERN char modern technologies ka combination hai:\n` +
          `  • **M - MongoDB**: Scalable NoSQL document database (JSON format me data store karta hai).\n` +
          `  • **E - Express.js**: Fast, minimalist Node.js web server framework.\n` +
          `  • **R - React.js**: High-performance interactive UI build karne wali library.\n` +
          `  • **N - Node.js**: JavaScript runtime environment jo server par code execute karta hai.\n\n` +
          `• **MERN Stack ke Fayde**:\n` +
          `  ✓ **Single Language**: Frontend aur Backend dono me **JavaScript** use hota hai.\n` +
          `  ✓ **Rapid Development**: Startups aur businesses ke liye fast development cycle.\n` +
          `  ✓ **Massive Community & Scalability**: Million users tak scale karne ke liye ready.\n\n` +
          `Arpit Rai ek specialist **Full Stack MERN Developer** hain jinhone Gym ERP aur GRS Jaise live platforms build kiye hain!`,
        actions: [
          { label: '🏋️ Arpit ka Gym MERN Demo dekhein', url: 'https://gym-management-platform.onrender.com', primary: true },
          { label: '🏛️ GRS MERN Portal dekhein', url: 'https://grs-mern-client.onrender.com' },
          { label: '💬 Arpit ko Full Stack Project ke liye hire karein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20ek%20Full%20Stack%20MERN%20project%20banwana%20hai.' },
        ],
      }
    } else {
      return {
        text: `💻 **Full Stack Engineering & The MERN Stack Architecture**:\n\n` +
          `• **What is Full Stack Development?**\n` +
          `  A Full Stack Engineer designs, implements, and maintains the entire 3-tier architecture of web software:\n` +
          `  1. **Presentation Layer (Frontend)**: Dynamic UI/UX rendered in the client's browser.\n` +
          `  2. **Application Layer (Backend)**: Business rules, authentication, security policies, and RESTful/GraphQL APIs.\n` +
          `  3. **Data Layer (Database)**: Structured or document-based persistent storage.\n\n` +
          `• **The MERN Stack Components**:\n` +
          `  • **M — MongoDB**: Scalable, schema-flexible NoSQL document store with JSON-like BSON documents.\n` +
          `  • **E — Express.js**: Lightweight Node.js routing and middleware framework.\n` +
          `  • **R — React.js**: Declarative, component-based frontend library powering single-page applications (SPAs).\n` +
          `  • **N — Node.js**: High-performance, asynchronous non-blocking I/O JavaScript runtime.\n\n` +
          `• **Why Businesses Choose MERN**:\n` +
          `  ✓ **Isomorphic JavaScript**: Engineering consistency across client and server with code reusability.\n` +
          `  ✓ **JSON Everywhere**: Natural end-to-end data pipeline from database to UI without mapping friction.\n` +
          `  ✓ **Speed to Market**: Accelerated MVP turnaround for web platforms, SaaS products, and portals.\n\n` +
          `Arpit Rai specializes in building enterprise-grade MERN stack applications with verified live deployments!`,
        actions: [
          { label: '🏋️ Launch Live MERN Gym ERP', url: 'https://gym-management-platform.onrender.com', primary: true },
          { label: '🏛️ Launch Live GRS Portal', url: 'https://grs-mern-client.onrender.com' },
          { label: '💬 Hire Arpit for Full Stack Dev', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20would%20like%20to%20hire%20you%20for%20a%20Full%20Stack%20project.', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 4. FRONTEND VS BACKEND
  // -------------------------------------------------------------
  if (
    q.includes('frontend vs backend') ||
    q.includes('backend vs frontend') ||
    q.includes('client side vs server') ||
    q.includes('frontend kya') ||
    q.includes('backend kya')
  ) {
    if (isHi) {
      return {
        text: `🌐 **Frontend vs Backend me kya Antar (Difference) hai?**:\n\n` +
          `• **Frontend (Client-Side)**:\n` +
          `  - **Kya hai**: Application ka wo chehra jise user browser ya phone me dekhta hai aur click karta hai.\n` +
          `  - **Technologies**: HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS, Bootstrap.\n` +
          `  - **Main Kaam**: Responsive layouts, user forms, animations, visual styling aur smooth user experience (UX).\n\n` +
          `• **Backend (Server-Side)**:\n` +
          `  - **Kya hai**: Application ka 'Dimaag' jo background server par chalta hai aur user ko direct nahi dikhta.\n` +
          `  - **Technologies**: Node.js, Express.js, Python, Java, Go.\n` +
          `  - **Main Kaam**: Business logic, security, password hashing, JWT authentication, payment processing aur database se baat karna.\n\n` +
          `• **Yeh dono aapas me kaise communicate karte hain?**\n` +
          `  Frontend aur Backend **REST APIs** ya **GraphQL** ke through JSON data exchange karte hain via HTTP requests (GET, POST, PUT, DELETE).\n\n` +
          `Arpit dono frontend aur backend me fully proficient hain, jisse aapko alag-alag developers hire karne ki zaroorat nahi padti!`,
        actions: [
          { label: '⚡ REST API kya hoti hai?', query: 'What is a REST API?' },
          { label: '🗄️ Database (SQL vs NoSQL) Guide', query: 'What is SQL vs NoSQL?' },
          { label: '💬 Arpit se baat karein', url: 'https://wa.me/919696725794' },
        ],
      }
    } else {
      return {
        text: `🌐 **Frontend vs Backend: Fundamental Differences**:\n\n` +
          `• **Frontend (Client-Side)**:\n` +
          `  - **Definition**: The visual interface and client-facing layer executed inside the end user's web browser.\n` +
          `  - **Core Tech**: HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS.\n` +
          `  - **Responsibilities**: UI rendering, input validation, state management, animations, and cross-device responsiveness.\n\n` +
          `• **Backend (Server-Side)**:\n` +
          `  - **Definition**: The underlying server architecture and computation engine running on remote servers or cloud containers.\n` +
          `  - **Core Tech**: Node.js, Express.js, Python/Django, Go, Java Spring.\n` +
          `  - **Responsibilities**: Authentication (JWT/OAuth), data authorization, payment processing, background jobs, and database CRUD.\n\n` +
          `• **How They Connect**:\n` +
          `  The frontend dispatches asynchronous HTTP/HTTPS network calls to Backend RESTful API or GraphQL endpoints, receiving serialized JSON payloads to update the view dynamically.\n\n` +
          `Arpit provides end-to-end full stack execution across both layers seamlessly!`,
        actions: [
          { label: '⚡ What is a REST API?', query: 'What is a REST API?' },
          { label: '🗄️ SQL vs NoSQL Breakdown', query: 'What is the difference between SQL and NoSQL databases?' },
          { label: '💬 Hire Arpit for Full Stack', url: 'https://wa.me/919696725794', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 5. WEB TECHNOLOGIES (HTML, CSS, JS, REACT, NEXT.JS, TYPESCRIPT)
  // -------------------------------------------------------------
  if (
    q.includes('react') ||
    q.includes('next.js') ||
    q.includes('nextjs') ||
    q.includes('javascript') ||
    q.includes('typescript') ||
    q.includes('html') ||
    q.includes('css') ||
    q.includes('web technology') ||
    q.includes('web tech') ||
    q.includes('spa') ||
    q.includes('virtual dom')
  ) {
    if (isHi) {
      return {
        text: `🌐 **Modern Web Technologies Complete Guide**:\n\n` +
          `• **HTML5, CSS3 & JavaScript (The Core Foundation)**:\n` +
          `  - **HTML5**: Web page ka structure aur semantic markup (header, nav, section, article, footer).\n` +
          `  - **CSS3**: Visual styling, Flexbox, CSS Grid layouts, media queries aur animations.\n` +
          `  - **JavaScript (ES6+)**: Webpage me dynamic interactivity, async/await, API data fetching, aur client-side logic.\n\n` +
          `• **React.js (Modern UI Standard)**:\n` +
          `  - Meta dwara banai gayi declarative UI library.\n` +
          `  - **Components**: Reusable blocks me code divide hota hai.\n` +
          `  - **Virtual DOM**: Sirf change huye element ko update karta hai, jisse webpage super-fast load hota hai.\n` +
          `  - **Hooks**: useState, useEffect, useContext se modern clean code likha jata hai.\n\n` +
          `• **Next.js (React Framework for Production)**:\n` +
          `  - Server-Side Rendering (SSR) aur Static Site Generation (SSG) provide karta hai.\n` +
          `  - **Kyu zaroori hai?**: Google Search Console aur SEO rankings ke liye best hai.\n\n` +
          `• **TypeScript**:\n` +
          `  - JavaScript with static types—bugs ko runtime se pehle hi catch kar leta hai.\n\n` +
          `Arpit Rai in sabhi modern frontend technologies me highly experienced hain!`,
        actions: [
          { label: '🚀 Arpit ka React Portfolio dekhein', url: '#featured', primary: true },
          { label: '⚡ REST APIs & Backend guide', query: 'What is a REST API?' },
          { label: '💬 WhatsApp par project discuss karein', url: 'https://wa.me/919696725794' },
        ],
      }
    } else {
      return {
        text: `🌐 **Modern Web Technologies & Frontend Architecture**:\n\n` +
          `• **The Core Web Trio**:\n` +
          `  - **HTML5**: Semantic web architecture, accessibility (a11y), and proper document hierarchy.\n` +
          `  - **CSS3**: Modern layout engines (Flexbox, CSS Grid), responsive design patterns, CSS variables, and fluid typography.\n` +
          `  - **JavaScript (ES6+)**: Asynchronous execution, event loop, Promises, async/await, closures, and DOM manipulation.\n\n` +
          `• **React.js — Industry Standard for Interactive UIs**:\n` +
          `  - **Component-Driven**: Composable, reusable UI building blocks.\n` +
          `  - **Virtual DOM (VDOM)**: High-speed reconciliation algorithm that minimizes costly direct browser DOM mutations.\n` +
          `  - **React Hooks**: Elegant functional state and lifecycle management (` + '`useState`, `useEffect`, `useMemo`' + `).\n\n` +
          `• **Next.js — The Enterprise React Framework**:\n` +
          `  - Combines Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes for optimal SEO and sub-second load times.\n\n` +
          `• **TypeScript**:\n` +
          `  - Strongly-typed superset of JavaScript preventing compile-time type errors and drastically improving maintainability.\n\n` +
          `Arpit crafts high-performance web applications leveraging React, Next.js, and modern CSS standards!`,
        actions: [
          { label: '🚀 View Arpit’s React Projects', url: '#featured', primary: true },
          { label: '⚡ Explore REST APIs & Backend', query: 'What is a REST API?' },
          { label: '💬 Discuss Web Project on WhatsApp', url: 'https://wa.me/919696725794', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 6. APIS, REST, GRAPHQL, WEBSOCKETS & HTTP
  // -------------------------------------------------------------
  if (
    q.includes('api') ||
    q.includes('rest') ||
    q.includes('restful') ||
    q.includes('graphql') ||
    q.includes('websocket') ||
    q.includes('http') ||
    q.includes('https') ||
    q.includes('status code')
  ) {
    if (isHi) {
      return {
        text: `⚡ **APIs, REST, WebSockets & HTTP Communication Guide**:\n\n` +
          `• **API (Application Programming Interface) kya hoti hai?**\n` +
          `  API ek bridge (pul) ki tarah hai jo do alag-alag software programs ko aapas me baat karne ki permission deti hai (e.g., Frontend React app se Backend Node.js server tak data mangwana).\n\n` +
          `• **REST API (Representational State Transfer)**:\n` +
          `  Web development ka sabse standard API design protocol:\n` +
          `  - **GET**: Data fetch karna (e.g., product list dekhna).\n` +
          `  - **POST**: Naya data create karna (e.g., user signup ya new order).\n` +
          `  - **PUT / PATCH**: Existing data update karna (e.g., profile edit).\n` +
          `  - **DELETE**: Data delete karna (e.g., item remove karna).\n\n` +
          `• **REST vs GraphQL vs WebSockets**:\n` +
          `  - **REST API**: Simple, reliable, standard caching ke saath.\n` +
          `  - **GraphQL**: Client exact wahi fields mangta hai jo usse chahiye (no over-fetching).\n` +
          `  - **WebSockets**: Bi-directional real-time connection—live chat apps aur stock tickers ke liye best.\n\n` +
          `• **Important HTTP Status Codes**:\n` +
          `  • 200 OK | 201 Created (Success)\n` +
          `  • 400 Bad Request | 401 Unauthorized | 404 Not Found (Client Error)\n` +
          `  • 500 Internal Server Error (Server Error)\n\n` +
          `Arpit secure, documented aur fast REST APIs Node.js aur Express me build karte hain!`,
        actions: [
          { label: '🔒 JWT Authentication kya hai?', query: 'What is JWT Authentication?' },
          { label: '🗄️ Database (SQL vs NoSQL) Guide', query: 'What is SQL vs NoSQL?' },
          { label: '💬 WhatsApp par consult karein', url: 'https://wa.me/919696725794' },
        ],
      }
    } else {
      return {
        text: `⚡ **APIs, RESTful Architecture, GraphQL & WebSockets Explained**:\n\n` +
          `• **What is an API?**\n` +
          `  An Application Programming Interface defines a contract of endpoints, methods, and data formats allowing independent systems to communicate securely over network protocols.\n\n` +
          `• **RESTful Architecture (HTTP Verbs)**:\n` +
          `  - **GET**: Retrieve resource state without side effects.\n` +
          `  - **POST**: Create a new subordinate resource or trigger server execution.\n` +
          `  - **PUT / PATCH**: Replace or partially mutate an existing resource.\n` +
          `  - **DELETE**: Remove the specified resource.\n\n` +
          `• **Architectural Comparison**:\n` +
          `  - **REST**: Stateless, standardized HTTP semantics, highly cacheable with CDNs.\n` +
          `  - **GraphQL**: Single endpoint query language eliminating over-fetching and under-fetching.\n` +
          `  - **WebSockets**: Persistent, full-duplex TCP channels for real-time collaboration, chat systems, and live telemetry.\n\n` +
          `• **Key HTTP Status Codes**:\n` +
          `  - **2xx (Success)**: 200 (OK), 201 (Created), 204 (No Content)\n` +
          `  - **4xx (Client Error)**: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found)\n` +
          `  - **5xx (Server Error)**: 500 (Internal Server Error), 502 (Bad Gateway), 503 (Service Unavailable)\n\n` +
          `Arpit engineers robust, scalable RESTful API architectures with strict error handling and security controls!`,
        actions: [
          { label: '🔒 What is JWT Authentication?', query: 'What is JWT Authentication and how does it secure web apps?' },
          { label: '🗄️ SQL vs NoSQL Database Guide', query: 'What is the difference between SQL and NoSQL databases?' },
          { label: '💬 Consult API Architecture on WhatsApp', url: 'https://wa.me/919696725794', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 7. DATABASES: SQL VS NOSQL, MONGODB, POSTGRESQL & REDIS
  // -------------------------------------------------------------
  if (
    q.includes('database') ||
    q.includes('sql') ||
    q.includes('nosql') ||
    q.includes('mongodb') ||
    q.includes('mysql') ||
    q.includes('postgresql') ||
    q.includes('postgres') ||
    q.includes('redis') ||
    q.includes('acid')
  ) {
    if (isHi) {
      return {
        text: `🗄️ **Databases Complete Guide: SQL vs NoSQL**:\n\n` +
          `• **Database kya hota hai?**\n` +
          `  Data ko securely organize, store, update aur retrieve karne ka electronic system.\n\n` +
          `• **SQL (Relational Databases)**:\n` +
          `  - **Examples**: PostgreSQL, MySQL, SQLite.\n` +
          `  - **Structure**: Tables, Rows aur Columns fixed schema ke saath.\n` +
          `  - **Strengths**: Strict ACID transactions (Banking, Financial Ledgers, strict relational data).\n` +
          `  - **Language**: Structured Query Language (SQL).\n\n` +
          `• **NoSQL (Non-Relational Databases)**:\n` +
          `  - **Examples**: MongoDB, Firebase, CouchDB.\n` +
          `  - **Structure**: Flexible JSON-like documents (BSON).\n` +
          `  - **Strengths**: Rapid schema changes, high horizontal scaling, fast read/write for dynamic applications.\n` +
          `  - **Kyu MERN me MongoDB use hota hai?**: Kyunki JavaScript objects aur MongoDB documents 100% natural fit hain bina kisi complex ORM mapping ke.\n\n` +
          `• **Redis (In-Memory Cache)**:\n` +
          `  Data ko RAM me store karta hai jisse database queries microsecond speed me response deti hain (Session management aur rate-limiting ke liye best).\n\n` +
          `Arpit aapke project ke nature ke hisaab se best database design aur indexing implement karte hain!`,
        actions: [
          { label: '🚀 Arpit ke MongoDB MERN Demos dekhein', url: '#featured', primary: true },
          { label: '⚡ REST API Guide', query: 'What is a REST API?' },
          { label: '💬 Database consultation WhatsApp par lein', url: 'https://wa.me/919696725794' },
        ],
      }
    } else {
      return {
        text: `🗄️ **Database Engineering: SQL vs NoSQL Architectural Analysis**:\n\n` +
          `• **Relational Databases (SQL)**:\n` +
          `  - **Engines**: PostgreSQL, MySQL, MariaDB, SQLite.\n` +
          `  - **Data Model**: Tabular relations, fixed schemas, foreign keys, and mathematical normalization.\n` +
          `  - **Strengths**: Strict ACID compliance (Atomicity, Consistency, Isolation, Durability), complex multi-table joins, ideal for financial and mission-critical ledger systems.\n\n` +
          `• **Document Databases (NoSQL - MongoDB)**:\n` +
          `  - **Engines**: MongoDB, DynamoDB, CouchDB.\n` +
          `  - **Data Model**: Semi-structured JSON/BSON document collections.\n` +
          `  - **Strengths**: Dynamic schema flexibility, frictionless horizontal sharding, rapid prototype-to-production velocity, and native JavaScript data structure alignment.\n\n` +
          `• **In-Memory Caching (Redis)**:\n` +
          `  - Sub-millisecond key-value data storage in RAM for caching hot database queries, distributed session storage, and rate-limiting.\n\n` +
          `• **Database Indexing**:\n` +
          `  - Creating B-Tree or Hash indexes reduces search time from O(N) full-table scans to O(log N), drastically boosting production query speeds.\n\n` +
          `Arpit architectures robust schemas with MongoDB and relational databases tailored to scale!`,
        actions: [
          { label: '🚀 Explore Live MongoDB Apps', url: '#featured', primary: true },
          { label: '⚡ REST API Architecture Guide', query: 'What is a REST API?' },
          { label: '💬 Inquire Database Consultation', url: 'https://wa.me/919696725794', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 8. SOFTWARE ENGINEERING: GIT, AUTH/JWT, CORS, ARCHITECTURE
  // -------------------------------------------------------------
  if (
    q.includes('git') ||
    q.includes('jwt') ||
    q.includes('authentication') ||
    q.includes('auth') ||
    q.includes('cors') ||
    q.includes('mvc') ||
    q.includes('software technology') ||
    q.includes('software engineering') ||
    q.includes('sdlc') ||
    q.includes('testing') ||
    q.includes('token')
  ) {
    if (isHi) {
      return {
        text: `🛠️ **Software Engineering, Git & Web Security Guide**:\n\n` +
          `• **Git & GitHub (Version Control)**:\n` +
          `  - Git ek distributed version control system hai jo code changes ko track karta hai.\n` +
          `  - **GitHub**: Cloud platform jahan teams collaborate karti hain, pull requests review karti hain, aur open-source code host karti hain.\n\n` +
          `• **JWT (JSON Web Token) Authentication**:\n` +
          `  - Modern web apps me user login state secure rakhne ka stateless token mechanism.\n` +
          `  - Token me teen parts hote hain: **Header**, **Payload** (User ID, Role), aur **Signature**.\n` +
          `  - Client is token ko HTTP Authorization header me bhejta hai, server bina session database check kiye verify kar leta hai.\n\n` +
          `• **CORS (Cross-Origin Resource Sharing)**:\n` +
          `  - Browser security mechanism jo ek domain (e.g. localhost:3000) ko doosre domain (e.g. api.server.com) se data mangne se rokta hai agar server par CORS headers allow na ho.\n\n` +
          `• **MVC Architecture (Model-View-Controller)**:\n` +
          `  - **Model**: Database se deal karta hai.\n` +
          `  - **View**: User interface (React/HTML).\n` +
          `  - **Controller**: Business logic aur request handling.\n\n` +
          `Arpit industry-standard clean code principles aur secure JWT auth patterns follow karte hain!`,
        actions: [
          { label: '🐙 Arpit ka GitHub Profile dekhein', url: 'https://github.com/arpitrai38', primary: true },
          { label: '💻 Full Stack MERN Guide', query: 'What is Full Stack Development?' },
          { label: '💬 WhatsApp par discuss karein', url: 'https://wa.me/919696725794' },
        ],
      }
    } else {
      return {
        text: `🛠️ **Software Engineering, Version Control & Security Fundamentals**:\n\n` +
          `• **Git & Version Control**:\n` +
          `  - Distributed version control tracking commits, branches, merges, and resolving merge conflicts cleanly.\n` +
          `  - GitHub hosts remote repositories, pull request reviews, issue trackers, and automated CI/CD pipelines.\n\n` +
          `• **JWT (JSON Web Token) Authentication**:\n` +
          `  - A compact, URL-safe stateless authentication standard containing Header, Payload, and Cryptographic Signature.\n` +
          `  - Eliminates server session storage bottlenecks, enabling effortless horizontal scaling across microservices.\n\n` +
          `• **CORS (Cross-Origin Resource Sharing)**:\n` +
          `  - An essential HTTP-header based security mechanism enforced by web browsers to restrict resource fetching across disparate origins.\n\n` +
          `• **Architectural Patterns (MVC & Clean Code)**:\n` +
          `  - **Model**: Encapsulates data schema and business persistence.\n` +
          `  - **View**: Handles UI rendering and user interactions.\n` +
          `  - **Controller / Router**: Coordinates request orchestration, validation, and response delivery.\n\n` +
          `Arpit implements hardened security configurations, clean git workflows, and robust authentication layers!`,
        actions: [
          { label: '🐙 Inspect Arpit’s GitHub Code', url: 'https://github.com/arpitrai38', primary: true },
          { label: '💻 Full Stack MERN Overview', query: 'What is Full Stack Development?' },
          { label: '💬 Discuss Security on WhatsApp', url: 'https://wa.me/919696725794', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 9. TECH STACK CONSULTING & ADVICE (Customer confused about tech)
  // -------------------------------------------------------------
  if (
    q.includes('confuse') ||
    q.includes('confusion') ||
    q.includes('which tech') ||
    q.includes('kaun si tech') ||
    q.includes('konsi tech') ||
    q.includes('kaunsi tech') ||
    q.includes('which stack') ||
    q.includes('what tech') ||
    q.includes('suggest tech') ||
    q.includes('choose tech') ||
    q.includes('recommend tech') ||
    q.includes('stack use') ||
    q.includes('technology use') ||
    q.includes('tecnology') ||
    q.includes('mern or') ||
    q.includes('react or') ||
    q.includes('best stack')
  ) {
    if (isHi) {
      return {
        text: `Agar aap confused hain ki apne project ke liye **kaun si technology** choose karein, toh bilkul chinta mat kijiye! Project type ke hisaab se best recommendation yeh hai:\n\n` +
          `1. **Custom Web Application / ERP / SaaS Platform**:\n` +
          `   • **Recommended**: **MERN Stack** (React.js + Node.js + Express.js + MongoDB)\n` +
          `   • **Kyu?**: High performance, flexible JSON database, single-language (JavaScript) ecosystem aur fast development speed.\n\n` +
          `2. **E-Commerce / Online Store**:\n` +
          `   • **Recommended**: React/Next.js frontend + Node.js API + MongoDB/PostgreSQL + Razorpay/Stripe\n` +
          `   • **Kyu?**: Secure transactions, fast product catalog filtering, aur smooth checkout.\n\n` +
          `3. **Landing Page / Business Portfolio / Blog**:\n` +
          `   • **Recommended**: React + Vite + Tailwind CSS (ya HTML5/Bootstrap)\n` +
          `   • **Kyu?**: Super-fast loading, lightweight, aur SEO-friendly.\n\n` +
          `Aap apne specific idea ke baare me bataiye ya direct Arpit se WhatsApp par discuss karein!`,
        actions: [
          { label: '💬 Arpit se WhatsApp par salah lein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20apne%20project%20ke%20liye%20technology%20choose%20karne%20me%20help%20chahiye.', primary: true },
          { label: '🎯 Features kya add karein?', query: 'Suggest features for my project' },
          { label: '📞 Call +91 96967 25794', url: 'tel:+919696725794' },
        ],
      }
    } else {
      return {
        text: `If you're unsure which **technology stack** best fits your project, here is our expert recommendation tailored to your project type:\n\n` +
          `1. **Full-Stack Web App / SaaS / Portal / ERP**:\n` +
          `   • **Stack**: **MERN Stack** (React.js, Node.js, Express.js, MongoDB)\n` +
          `   • **Why**: Rapid development, robust asynchronous APIs, flexible schema for fast iterations, and industry-standard JavaScript architecture.\n\n` +
          `2. **E-Commerce & Digital Marketplace**:\n` +
          `   • **Stack**: React.js / Next.js + Node.js + MongoDB / PostgreSQL + Razorpay / Stripe\n` +
          `   • **Why**: Lightning-fast cart interactions, secure payment handling, and real-time inventory tracking.\n\n` +
          `3. **Landing Page, Business Portfolio or Blog**:\n` +
          `   • **Stack**: React + Vite + Tailwind CSS or HTML5/CSS3/Bootstrap\n` +
          `   • **Why**: Maximum speed, mobile responsiveness, and high SEO performance.\n\n` +
          `Would you like to share your project idea with Arpit for a tailored architecture plan?`,
        actions: [
          { label: '💬 Discuss Architecture on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20would%20like%20guidance%20on%20choosing%20the%20tech%20stack%20for%20my%20project.', primary: true },
          { label: '🎯 Suggest Features for my App', query: 'What features should I add to my project?' },
          { label: '📞 Call: +91 96967 25794', url: 'tel:+919696725794' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 10. FEATURE RECOMMENDATIONS & ADD-ONS ADVISORY
  // -------------------------------------------------------------
  if (
    q.includes('feature') ||
    q.includes('features') ||
    q.includes('add on') ||
    q.includes('addon') ||
    q.includes('kya daalein') ||
    q.includes('kya add') ||
    q.includes('kya feature') ||
    q.includes('functionality') ||
    q.includes('modules') ||
    q.includes('kya kya hona')
  ) {
    if (isHi) {
      return {
        text: `Kisi bhi modern web project ko successful banane ke liye yeh **Must-Have Features & Value-Add Add-ons** zaroor include karne chahiye:\n\n` +
          `1. **Secure Authentication & Roles**:\n` +
          `   • User & Admin login, JWT tokens, Google 1-Click Login.\n` +
          `2. **Interactive Admin Dashboard**:\n` +
          `   • Daily analytics, revenue charts, user management aur activity logs.\n` +
          `3. **Payment Gateway Integration**:\n` +
          `   • Razorpay, Stripe ya UPI QR automated billing aur receipts ke saath.\n` +
          `4. **Real-Time Alerts & Notifications**:\n` +
          `   • WhatsApp updates, SMS aur automated email confirmations.\n` +
          `5. **Search, Filter & Export**:\n` +
          `   • Instant search, multi-category filters, aur 1-click PDF/Excel reports download.\n` +
          `6. **Mobile-First Responsive Design**:\n` +
          `   • Har screen size par flawless performance.\n\n` +
          `Aapka project kisse related hai (Gym, E-commerce, School, Services)? Main specific features suggest kar sakta hoon!`,
        actions: [
          { label: '🛒 E-Commerce Features', query: 'What features for an e-commerce website?' },
          { label: '🏋️ Gym App Features', query: 'What features for gym management platform?' },
          { label: '💬 Arpit se customized plan lein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20apne%20project%20ke%20features%20plan%20karne%20hain.', primary: true },
        ],
      }
    } else {
      return {
        text: `To make your project scalable, user-friendly, and commercially viable, here are the **Essential Features & Value-Add Add-ons** we recommend:\n\n` +
          `1. **Role-Based Access & Authentication**:\n` +
          `   • Secure JWT / OAuth authorization for Users, Staff, and Administrators.\n` +
          `2. **Centralized Admin & Analytics Dashboard**:\n` +
          `   • Visual revenue graphs, activity tracking, and user management tables.\n` +
          `3. **Automated Payment Processing**:\n` +
          `   • Integrated Razorpay, Stripe, or PayPal with instant invoices and recurring billing.\n` +
          `4. **Smart Notifications & Alerts**:\n` +
          `   • Automated WhatsApp/Email/SMS updates for renewals, receipts, and order statuses.\n` +
          `5. **Advanced Search & Data Export**:\n` +
          `   • Dynamic debounced search, multi-tag filtering, and 1-click PDF/Excel export.\n` +
          `6. **Cloud Asset Storage**:\n` +
          `   • Fast media uploads with AWS S3 or Cloudinary CDN.\n\n` +
          `What industry is your project for? I can provide an exact feature checklist!`,
        actions: [
          { label: '🛒 E-Commerce Checklist', query: 'What features for an e-commerce website?' },
          { label: '🏋️ Gym ERP Checklist', query: 'What features for gym management platform?' },
          { label: '💬 Discuss Feature List on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20can%20you%20help%20me%20finalize%20features%20for%20my%20web%20app?', primary: true },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 11. E-COMMERCE SPECIFIC GUIDANCE
  // -------------------------------------------------------------
  if (
    q.includes('ecommerce') ||
    q.includes('e-commerce') ||
    q.includes('online store') ||
    q.includes('shop') ||
    q.includes('shopping')
  ) {
    if (isHi) {
      return {
        text: `**E-Commerce Website ke liye Best Technology & Features**:\n\n` +
          `• **Recommended Tech Stack**:\n` +
          `  - Frontend: React.js / Next.js (Fast loading & SEO)\n` +
          `  - Backend: Node.js & Express.js (High speed API)\n` +
          `  - Database: MongoDB ya PostgreSQL (Order & product catalog)\n` +
          `  - Payments: Razorpay / Stripe / Cash on Delivery\n\n` +
          `• **Top Features to Include**:\n` +
          `  ✓ Product Catalog with categories, variants & instant search\n` +
          `  ✓ Cart, Wishlist & 1-step checkout\n` +
          `  ✓ Payment gateway integration & automated invoice generation\n` +
          `  ✓ Admin inventory manager (Add products, update stock)\n` +
          `  ✓ Order tracking & WhatsApp/Email shipping notifications\n` +
          `  ✓ Customer reviews & discount coupons`,
        actions: [
          { label: '💬 E-Commerce Quote on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20e-commerce%20website%20banwani%20hai.%20Cost%20kya%20hogi?', primary: true },
          { label: '📞 Call Arpit', url: 'tel:+919696725794' },
        ],
      }
    } else {
      return {
        text: `**E-Commerce Project Architecture & Recommended Features**:\n\n` +
          `• **Optimal Technology Stack**:\n` +
          `  - Frontend: React.js or Next.js (SSR for top Google search rankings)\n` +
          `  - Backend: Node.js & Express.js REST APIs\n` +
          `  - Database: MongoDB / PostgreSQL\n` +
          `  - Payments: Razorpay, Stripe, or PayPal\n\n` +
          `• **Recommended Features & Add-ons**:\n` +
          `  ✓ Dynamic product catalog with filters (price, size, color)\n` +
          `  ✓ Fast shopping cart, wishlist, and frictionless checkout\n` +
          `  ✓ Automated invoices & payment webhook handling\n` +
          `  ✓ Admin stock & inventory management system\n` +
          `  ✓ Customer order tracking with SMS/WhatsApp alerts\n` +
          `  ✓ Coupon codes and promotional banners`,
        actions: [
          { label: '💬 Request E-Commerce Estimate', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20want%20to%20build%20an%20e-commerce%20store.%20Let%20us%20discuss!', primary: true },
          { label: '📞 Call +91 96967 25794', url: 'tel:+919696725794' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 12. GYM MANAGEMENT PLATFORM
  // -------------------------------------------------------------
  if (
    q.includes('gym') ||
    q.includes('fitness') ||
    q.includes('gms') ||
    q.includes('workout')
  ) {
    if (isHi) {
      return {
        text: `**Gym Management Platform (Live ERP)**:\n\nArpit ka banaya hua complete multi-tenant gym & fitness center web system:\n\n` +
          `• **Key Features**:\n` +
          `  ✓ Member registration aur profiles\n` +
          `  ✓ Membership plan tracking & automated renewals\n` +
          `  ✓ Payment collection, fee records aur billing summaries\n` +
          `  ✓ Attendance tracking & admin controls\n` +
          `• **Tech Stack**: React.js, Node.js, Express.js, MongoDB (MERN Stack).\n\n` +
          `Aap live demo try kar sakte hain ya source code dekh sakte hain!`,
        actions: [
          { label: '🚀 Gym Live Demo dekhein', url: 'https://gym-management-platform.onrender.com', primary: true },
          { label: '💻 GitHub Code dekhein', url: 'https://github.com/arpitrai38/gms-frontened' },
          { label: '💬 Aisa app banwane ke liye sampark karein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20Gym%20Management%20jaise%20app%20ke%20bare%20me%20discuss%20karna%20hai.' },
        ],
      }
    } else {
      return {
        text: `**Gym Management Platform (Live ERP)**:\n\nA complete multi-tenant gym & fitness center enterprise application engineered by Arpit:\n\n` +
          `• **Core Features**:\n` +
          `  ✓ Member enrollment, profiles & workout plan management\n` +
          `  ✓ Membership plan validity, automated expiry alerts & renewals\n` +
          `  ✓ Payment processing, billing status & fee revenue summaries\n` +
          `  ✓ Member attendance tracking & admin management controls\n` +
          `• **Tech Stack**: React.js, Node.js, Express.js, MongoDB (MERN Stack).`,
        actions: [
          { label: '🚀 Launch Gym Live Demo', url: 'https://gym-management-platform.onrender.com', primary: true },
          { label: '💻 View Source Code', url: 'https://github.com/arpitrai38/gms-frontened' },
          { label: '💬 Inquire to Build Similar App', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20am%20interested%20in%20building%20a%20platform%20like%20your%20Gym%20ERP.' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 13. GRS (GRIEVANCE REDRESSAL SYSTEM)
  // -------------------------------------------------------------
  if (
    q.includes('grs') ||
    q.includes('grievance') ||
    q.includes('complaint') ||
    q.includes('redressal')
  ) {
    if (isHi) {
      return {
        text: `**GRS – Grievance Redressal System (Live Portal)**:\n\nNagrik aur students ki complaints submit aur track karne ka ek digital platform:\n\n` +
          `• **Key Features**:\n` +
          `  ✓ Role-based access (User login aur Admin dashboard)\n` +
          `  ✓ Category-wise online complaint submission\n` +
          `  ✓ Real-time status updates (In Review, Resolved, Closed)\n` +
          `  ✓ Admin resolution workflow aur organized records\n` +
          `• **Tech Stack**: React.js, Node.js, Express.js, MongoDB (MERN Stack).`,
        actions: [
          { label: '🚀 GRS Live Demo dekhein', url: 'https://grs-mern-client.onrender.com', primary: true },
          { label: '💻 GitHub Code dekhein', url: 'https://github.com/arpitrai38/MERN-GRS' },
        ],
      }
    } else {
      return {
        text: `**GRS – Grievance Redressal System (Live Portal)**:\n\nA citizen and student grievance submission and resolution tracking platform:\n\n` +
          `• **Core Features**:\n` +
          `  ✓ Role-based authentication (Citizen/Student and Admin)\n` +
          `  ✓ Categorized grievance submission with tracking numbers\n` +
          `  ✓ Real-time status progression (In Review, Resolved)\n` +
          `  ✓ Comprehensive admin dashboard and resolution workflow\n` +
          `• **Tech Stack**: React.js, Node.js, Express.js, MongoDB (MERN Stack).`,
        actions: [
          { label: '🚀 Launch GRS Live Demo', url: 'https://grs-mern-client.onrender.com', primary: true },
          { label: '💻 View Source Code', url: 'https://github.com/arpitrai38/MERN-GRS' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 14. iCODER BLOG & EMAIL VALIDATION
  // -------------------------------------------------------------
  if (q.includes('icoder') || q.includes('blog')) {
    const desc = isHi
      ? `**iCoder – Tech Blogging Website**:\n\nModern programming aur web development tutorials ka blogging platform, responsive Bootstrap design ke saath.`
      : `**iCoder – Tech & Coding Blog**:\n\nA responsive tech blogging platform featuring articles on web development, programming, and tech careers built with HTML5, CSS3, and Bootstrap 5.`
    return {
      text: desc,
      actions: [
        { label: '🚀 Open iCoder Live Website', url: 'https://arpitrai38.github.io/iCoder/', primary: true },
        { label: '💻 View Code on GitHub', url: 'https://github.com/arpitrai38/iCoder' },
      ],
    }
  }

  if (q.includes('email') && (q.includes('validation') || q.includes('check') || q.includes('ivalidate'))) {
    const desc = isHi
      ? `**Email Validation Tool (iValidate)**:\n\nEmails verify aur check karne ka lightweight web tool built with HTML, CSS, aur JavaScript.`
      : `**Email Validation Tool (iValidate)**:\n\nA fast web utility for verifying, formatting, and validating email addresses built with HTML, CSS, and JavaScript.`
    return {
      text: desc,
      actions: [
        { label: '🚀 Open Email Validation Demo', url: 'https://arpitrai38.github.io/Email-Validation/', primary: true },
        { label: '💻 View Code on GitHub', url: 'https://github.com/arpitrai38/Email-Validation' },
      ],
    }
  }

  // -------------------------------------------------------------
  // 15. ALL PROJECTS
  // -------------------------------------------------------------
  if (
    q.includes('project') ||
    q.includes('projects') ||
    q.includes('demo') ||
    q.includes('live') ||
    q.includes('kaam') ||
    q.includes('portfolio')
  ) {
    if (isHi) {
      return {
        text: `Arpit Rai ke saare featured projects aur unke live demo links yeh rahe:\n\n` +
          `1. **Gym Management Platform** (MERN Stack ERP)\n` +
          `2. **GRS – Grievance Redressal System** (MERN Stack Portal)\n` +
          `3. **College ERP System** (Enterprise Academic ERP)\n` +
          `4. **iCoder – Tech Blogging Website** (Bootstrap Blog)\n` +
          `5. **Email Validation Tool** (JavaScript Web Tool)\n\n` +
          `Niche diye gaye buttons par click karke direct live demo open kar sakte hain!`,
        actions: [
          { label: '🏋️ Gym ERP Demo', url: 'https://gym-management-platform.onrender.com', primary: true },
          { label: '🏛️ GRS Portal Demo', url: 'https://grs-mern-client.onrender.com', primary: true },
          { label: '💻 iCoder Blog Demo', url: 'https://arpitrai38.github.io/iCoder/' },
          { label: '✉️ Email Tool Demo', url: 'https://arpitrai38.github.io/Email-Validation/' },
        ],
      }
    } else {
      return {
        text: `Here is the curated list of Arpit Rai's featured live projects:\n\n` +
          `1. **Gym Management Platform** (MERN Stack Multi-Tenant ERP)\n` +
          `2. **GRS – Grievance Redressal System** (MERN Stack Resolution Portal)\n` +
          `3. **College ERP System** (Enterprise Academic ERP)\n` +
          `4. **iCoder – Tech Blogging Website** (Bootstrap Responsive Blog)\n` +
          `5. **Email Validation Tool** (JavaScript Validation Utility)\n\n` +
          `Click below to launch the live demos instantly!`,
        actions: [
          { label: '🏋️ Launch Gym ERP Demo', url: 'https://gym-management-platform.onrender.com', primary: true },
          { label: '🏛️ Launch GRS Portal Demo', url: 'https://grs-mern-client.onrender.com', primary: true },
          { label: '💻 Launch iCoder Blog', url: 'https://arpitrai38.github.io/iCoder/' },
          { label: '✉️ Launch Email Tool', url: 'https://arpitrai38.github.io/Email-Validation/' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 16. CONTACT / PHONE / WHATSAPP / EMAIL
  // -------------------------------------------------------------
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
    if (isHi) {
      return {
        text: `Aap **Arpit Rai** se directly in channels ke through baat kar sakte hain:\n\n` +
          `• **Phone / Calling**: +91 96967 25794\n` +
          `• **WhatsApp**: Direct chat available\n` +
          `• **Email**: sadhanamarendra12@gmail.com / arpitrai574@gmail.com\n` +
          `• **LinkedIn**: arpit-rai-002951292\n` +
          `• **GitHub**: github.com/arpitrai38\n\n` +
          `1-click me connect karne ke liye niche tap karein:`,
        actions: [
          { label: '📞 Call Karein: +91 96967 25794', url: 'tel:+919696725794', primary: true },
          { label: '💬 WhatsApp Chat Kholein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20ek%20freelance%20project%20ke%20bare%20me%20baat%20karni%20hai.', primary: true },
          { label: '✉️ Email Bhejein', url: 'mailto:sadhanamarendra12@gmail.com' },
          { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292' },
        ],
      }
    } else {
      return {
        text: `You can reach **Arpit Rai** directly via phone, WhatsApp, email, or LinkedIn for freelance inquiries and technical collaborations:\n\n` +
          `• **Phone**: +91 96967 25794\n` +
          `• **WhatsApp**: Instant direct messaging\n` +
          `• **Email**: sadhanamarendra12@gmail.com\n` +
          `• **LinkedIn**: linkedin.com/in/arpit-rai-002951292\n` +
          `• **GitHub**: github.com/arpitrai38`,
        actions: [
          { label: '📞 Direct Call: +91 96967 25794', url: 'tel:+919696725794', primary: true },
          { label: '💬 Chat on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20would%20like%20to%20discuss%20a%20project.', primary: true },
          { label: '✉️ Send Email', url: 'mailto:sadhanamarendra12@gmail.com' },
          { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 17. SOCIALS & GITHUB / LINKEDIN
  // -------------------------------------------------------------
  if (
    q.includes('github') ||
    q.includes('linkedin') ||
    q.includes('linkdien') ||
    q.includes('social')
  ) {
    const text = isHi
      ? `Arpit ke official profiles jahan aap unka open-source code aur network dekh sakte hain:`
      : `Here are Arpit's official profiles to inspect his open-source code and professional track record:`
    return {
      text,
      actions: [
        { label: '🐙 GitHub Profile (@arpitrai38)', url: 'https://github.com/arpitrai38', primary: true },
        { label: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/arpit-rai-002951292', primary: true },
        { label: '✉️ Email Arpit', url: 'mailto:sadhanamarendra12@gmail.com' },
      ],
    }
  }

  // -------------------------------------------------------------
  // 18. PRICING & TIMELINE
  // -------------------------------------------------------------
  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('pricing') ||
    q.includes('charge') ||
    q.includes('budget') ||
    q.includes('kitna') ||
    q.includes('paise') ||
    q.includes('timeline') ||
    q.includes('duration') ||
    q.includes('quote')
  ) {
    if (isHi) {
      return {
        text: `**Freelance Pricing & Timelines**:\n\n` +
          `• **Pricing**: Project ke features, complexity aur deadline ke hisaab se customized quote diya jata hai. Pricing bohot affordable aur freelance-friendly rehti hai!\n` +
          `• **Delivery Timelines**:\n` +
          `  - Landing Page / Portfolio: 2–5 din\n` +
          `  - Multi-Page Website: 1–2 hafte\n` +
          `  - Full-Stack Web App / ERP / Portal: 2–4 hafte\n\n` +
          `Apne project ke requirements bataiye, instant free estimate lene ke liye WhatsApp par message karein!`,
        actions: [
          { label: '💬 WhatsApp par Free Quote lein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20mujhe%20apne%20project%20ka%20cost%20estimate%20chahiye.', primary: true },
          { label: '📞 Call +91 96967 25794', url: 'tel:+919696725794' },
        ],
      }
    } else {
      return {
        text: `**Freelance Pricing & Delivery Timelines**:\n\n` +
          `• **Pricing Model**: Fair, milestone-based quotes customized to your exact feature scope and technical complexity.\n` +
          `• **Standard Turnaround Times**:\n` +
          `  - High-Converting Landing Page: 2–5 days\n` +
          `  - Multi-Page Responsive Web App: 1–2 weeks\n` +
          `  - Custom MERN Web Application / ERP: 2–4 weeks\n\n` +
          `Share your project details with Arpit for a quick, no-obligation quote!`,
        actions: [
          { label: '💬 Get Free Quote on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20could%20you%20provide%20a%20custom%20quote%20for%20my%20project?', primary: true },
          { label: '📞 Call +91 96967 25794', url: 'tel:+919696725794' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 19. GREETINGS
  // -------------------------------------------------------------
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.includes('namaste') ||
    q.includes('kya hal') ||
    q.includes('kaise ho')
  ) {
    if (isHi) {
      return {
        text: `Namaste! 👋 Main Arpit Rai ka AI Assistant hoon.\n\nMain aapko **AI, Cloud Computing, Fullstack, Web Technology, Software Engineering**, project ke liye **tech stack aur features recommend karne**, **live demos dikhane**, aur **freelance work** me madad kar sakta hoon. Aap kya jaanna chahte hain?`,
        actions: [
          { label: '💡 कौन सी Tech चुने?', query: 'I am confused which technology to use for my project' },
          { label: '🎯 Features क्या Add करें?', query: 'What features should I add to my web project?' },
          { label: '🚀 लाइव प्रोजेक्ट डेमो', query: 'Show me your projects' },
          { label: '📞 Arpit से संपर्क करें', query: 'How can I contact Arpit directly?' },
        ],
      }
    } else {
      return {
        text: `Hello! 👋 Welcome to Arpit Rai's AI Assistant.\n\nI can help you **plan your project**, **recommend the best tech stack and features**, **explore live project demos**, and answer any questions regarding **AI, Cloud, Fullstack, and Web Development**. How can I help you today?`,
        actions: [
          { label: '💡 Tech Stack Advice', query: 'I am confused which technology to use for my project' },
          { label: '🎯 Suggest Features', query: 'What features should I add to my web project?' },
          { label: '🚀 Live Project Demos', query: 'Show me your projects' },
          { label: '📞 Contact Arpit', query: 'How can I contact Arpit directly?' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 20. FALLBACK / ADAPTIVE DEFAULT
  // -------------------------------------------------------------
  if (isHi) {
    return {
      text: `Shukriya poochne ke liye! Main in sabhi topics par aapki poori madad kar sakta hoon:\n\n` +
        `• **Project Planning**: Best tech stack aur value-add features.\n` +
        `• **Arpit Rai Live Demos**: Gym ERP, GRS Grievance Portal, aur freelance hiring.\n` +
        `• **AI & GenAI**: ChatGPT, Gemini, LLMs, AI integrations.\n` +
        `• **Cloud Computing**: AWS, GCP, Docker, Serverless, Render, Vercel.\n` +
        `• **Fullstack & MERN**: React, Node.js, Express.js, MongoDB.\n` +
        `• **Web & Software Tech**: HTML, CSS, JavaScript, TypeScript, REST APIs, SQL vs NoSQL, Git.\n\n` +
        `Aap apna sawal type karein ya niche diye gaye option par tap karein!`,
      actions: [
        { label: '💡 कौन सी Tech चुने?', query: 'I am confused which technology to use for my project' },
        { label: '🎯 Features क्या Add करें?', query: 'What features should I add to my web project?' },
        { label: '🚀 लाइव प्रोजेक्ट डेमो', query: 'Show me your projects' },
        { label: '💬 WhatsApp Chat', url: 'https://wa.me/919696725794', primary: true },
      ],
    }
  } else {
    return {
      text: `Thanks for asking! As Arpit Rai's AI Assistant, I can assist you with:\n\n` +
        `• **Project Tech & Feature Advisory**: Expert recommendations for your product ideas.\n` +
        `• **Live Demos & Freelance Hire**: Direct phone/WhatsApp booking with Arpit.\n` +
        `• **AI & GenAI**: LLMs, prompt engineering, integrating Gemini/ChatGPT into web applications.\n` +
        `• **Cloud & DevOps**: AWS, GCP, Docker containers, CI/CD, Serverless, and Render/Vercel hosting.\n` +
        `• **Full Stack & MERN**: End-to-end architecture with MongoDB, Express, React, and Node.js.\n` +
        `• **Web & Software Engineering**: HTML5, CSS3, JavaScript, TypeScript, REST APIs, SQL vs NoSQL, Git.\n\n` +
        `Feel free to ask any question or tap a recommendation below!`,
      actions: [
        { label: '💡 Tech Stack Advice', query: 'I am confused which technology to use for my project' },
        { label: '🎯 Suggest Features', query: 'What features should I add to my web project?' },
        { label: '🚀 Live Project Demos', query: 'Show me your projects' },
        { label: '💬 Chat on WhatsApp', url: 'https://wa.me/919696725794', primary: true },
      ],
    }
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  // Language state: 'pending' (asking on initial open) | 'en' | 'hi'
  const [selectedLang, setSelectedLang] = useState('pending')

  // Initial welcome message prompting language choice
  const [messages, setMessages] = useState([
    {
      id: 'welcome-lang-prompt',
      sender: 'bot',
      text: `👋 **Welcome / नमस्ते!**\n\nI am Arpit Rai's AI Assistant. Before we get started, please select your preferred language:\n\nबातचीत शुरू करने के लिए कृपया अपनी पसंदीदा भाषा चुनें:`,
      time: 'Just now',
      isLanguagePrompt: true,
      actions: [
        { label: '🇺🇸 English', langChoice: 'en', primary: true },
        { label: '🇮🇳 हिंदी / Hinglish', langChoice: 'hi', primary: true },
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

  // Select language explicitly (when user taps language button or toggles)
  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang)
    const isHindi = lang === 'hi'

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: isHindi ? '🇮🇳 हिंदी / Hinglish' : '🇺🇸 English',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const botConfirmText = isHindi
      ? `बहुत बढ़िया! 🇮🇳 आपने **हिंदी / Hinglish** चुनी है।\n\nमैं आपके प्रोजेक्ट वर्क और वेब डेवलपमेंट से जुड़े हर काम में मदद कर सकता हूँ:\n• **Project Planning**: Kaun si technology use karein aur kaun se features add karein\n• **Arpit के लाइव प्रोजेक्ट्स**: Gym ERP, GRS Grievance Portal, iCoder Blog\n• **Freelance Services & Pricing**: Project estimates, timeline aur direct call/WhatsApp\n• **Technical Q&A**: AI & GenAI, Cloud Computing, Full Stack & Web Tech\n\nबताइए, आज आप अपने प्रोजेक्ट के बारे में क्या डिस्कस करना चाहते हैं?`
      : `Awesome! 🇺🇸 You've selected **English**.\n\nI am ready to assist you end-to-end with your project development:\n• **Project Planning**: Choosing the right tech stack & essential feature add-ons\n• **Live Demos**: Gym Management Platform, GRS Portal, and iCoder Blog\n• **Freelancing & Hiring**: Work with Arpit Rai, get pricing estimates & connect directly\n• **Technical Knowledge**: AI & GenAI, Cloud & DevOps, Full Stack MERN & Web Tech\n\nWhat project idea would you like to discuss today?`

    const confirmActions = isHindi
      ? QUICK_PROMPTS_HI.slice(0, 4)
      : QUICK_PROMPTS_EN.slice(0, 4)

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: botConfirmText,
      actions: confirmActions,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
  }

  // Toggle language from top header
  const handleToggleLanguage = () => {
    const nextLang = selectedLang === 'hi' ? 'en' : 'hi'
    setSelectedLang(nextLang)

    const switchMsg = {
      id: Date.now(),
      sender: 'bot',
      text: nextLang === 'hi'
        ? `🌐 भाषा बदलकर **हिंदी / Hinglish** कर दी गई है। आप कोई भी सवाल पूछ सकते हैं!`
        : `🌐 Language switched to **English**. Ask me anything about AI, Cloud, Fullstack, or Web Tech!`,
      actions: nextLang === 'hi' ? QUICK_PROMPTS_HI.slice(0, 4) : QUICK_PROMPTS_EN.slice(0, 4),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, switchMsg])
  }

  const handleSend = (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input
    if (!query || !query.trim()) return

    // Auto-detect language if still pending
    let currentLang = selectedLang
    if (currentLang === 'pending') {
      const detected = detectLanguage(query)
      currentLang = detected === 'hi' ? 'hi' : 'en'
      setSelectedLang(currentLang)
    }

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate realistic AI response deliberation
    setTimeout(() => {
      const botReply = getBotResponse(query, currentLang)
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
    setSelectedLang('pending')
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `👋 **Welcome / नमस्ते!**\n\nI am Arpit Rai's AI Assistant. Before we get started, please select your preferred language:\n\nबातचीत शुरू करने के लिए कृपया अपनी पसंदीदा भाषा चुनें:`,
        time: 'Just now',
        isLanguagePrompt: true,
        actions: [
          { label: '🇺🇸 English', langChoice: 'en', primary: true },
          { label: '🇮🇳 हिंदी / Hinglish', langChoice: 'hi', primary: true },
        ],
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

  const activeQuickPrompts = selectedLang === 'hi' ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN

  return (
    <div className="ai-chatbot-root">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="chatbot-launcher-wrapper">
          <div className="chatbot-tooltip">
            <span>Ask Arpit's AI ✦ (EN/HI)</span>
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
                <p>🟢 Active · Tech, AI & Cloud Advisor</p>
              </div>
            </div>

            <div className="header-actions">
              {/* Language Switcher Button */}
              <button
                className="header-btn lang-toggle-btn"
                onClick={handleToggleLanguage}
                title={selectedLang === 'hi' ? 'Switch to English' : 'हिंदी / Hinglish में बदलें'}
                aria-label="Switch Language"
                id="chatbot-lang-toggle"
              >
                {selectedLang === 'hi' ? '🇮🇳 HI' : '🇺🇸 EN'}
              </button>
              <button
                className="header-btn"
                onClick={clearChat}
                title="Restart Chat"
                aria-label="Restart Chat"
                id="chatbot-restart-btn"
              >
                ↺
              </button>
              <button
                className="header-btn close-btn"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                aria-label="Close Chat"
                id="chatbot-close-btn"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="quick-prompts-bar">
            {activeQuickPrompts.map((prompt, idx) => (
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
                <div className={`chat-bubble ${msg.sender} ${msg.isLanguagePrompt ? 'lang-prompt-bubble' : ''}`}>
                  <div className="bubble-text">{renderFormattedText(msg.text)}</div>

                  {/* Action or Language Selection Buttons inside Bot message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className={`bubble-actions ${msg.isLanguagePrompt ? 'lang-selection-row' : ''}`}>
                      {msg.actions.map((act, actIdx) => {
                        if (act.langChoice) {
                          return (
                            <button
                              key={actIdx}
                              className={`action-pill lang-choice-pill ${act.langChoice === 'hi' ? 'lang-hi' : 'lang-en'}`}
                              onClick={() => handleSelectLanguage(act.langChoice)}
                            >
                              {act.label}
                            </button>
                          )
                        }
                        if (act.url) {
                          return (
                            <a
                              key={actIdx}
                              href={act.url}
                              target={act.url.startsWith('#') || act.url.startsWith('tel:') ? '_self' : '_blank'}
                              rel="noopener noreferrer"
                              className={`action-pill ${act.primary ? 'primary' : ''}`}
                            >
                              {act.label} ↗
                            </a>
                          )
                        }
                        return (
                          <button
                            key={actIdx}
                            className="action-pill query-pill"
                            onClick={() => handleSend(act.query || act.label)}
                          >
                            {act.label}
                          </button>
                        )
                      })}
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
                placeholder={selectedLang === 'hi' ? "अपना सवाल यहाँ लिखें..." : "Ask your question here..."}
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
                id="chatbot-send-btn"
              >
                <span>➤</span>
              </button>
            </div>
            <div className="footer-branding">
              <span>Web & Software Tech · AI & Cloud · Freelance Advisory</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
