import React, { useState, useEffect, useRef } from 'react'
import arpitPhoto from './assets/arpit-rai.jpg'
import './Chatbot.css'

const BOT_AVATAR = arpitPhoto

// Category quick prompts for one-tap exploration
const QUICK_PROMPTS = [
  { label: '💡 Tech Stack Guide', query: 'I am confused which technology to use for my project' },
  { label: '🎯 Suggest Features', query: 'What features should I add to my web project?' },
  { label: '🛒 E-Commerce Guide', query: 'What technology and features are best for an e-commerce website?' },
  { label: '🏋️ Gym ERP Demo', query: 'Show me Gym Management Platform demo' },
  { label: '🏛️ GRS Portal Demo', query: 'Show me Grievance Redressal System' },
  { label: '💼 Freelance Services', query: 'What freelance services do you offer?' },
  { label: '💰 Pricing & Timeline', query: 'What is your freelance pricing and timeline?' },
  { label: '📞 Contact Arpit', query: 'How can I contact Arpit directly?' },
]

// Language detector: detects if user is asking in Hindi/Hinglish vs English
function detectLanguage(rawText) {
  const t = rawText.toLowerCase()
  if (/[\u0900-\u097F]/.test(rawText)) return 'hi' // Devanagari Hindi

  const hinglishKeywords = [
    'kya', 'kaise', 'kaun', 'kaunsi', 'konsi', 'kare', 'karein', 'karna', 'karo',
    'batao', 'btao', 'chahiye', 'hai', 'hain', 'ho', 'mera', 'meri', 'mere',
    'mujhe', 'hum', 'hume', 'bhai', 'bhaiya', 'banwana', 'banani', 'banaye',
    'lagana', 'lagega', 'hoga', 'thik', 'accha', 'acha', 'sahi', 'paise', 'kitna',
    'samajh', 'confuse', 'confusion', 'madad', 'help karo', 'namaste', 'shukriya',
    'dhanyawad', 'kuch', 'bhi', 'kripya', 'dost', 'bhi', 'daalein', 'dalna',
    'bataye', 'bataiye', 'tarika', 'sujhav', 'chahiye'
  ]

  let count = 0
  for (const word of hinglishKeywords) {
    const regex = new RegExp(`\\b${word}\\b`, 'i')
    if (regex.test(t)) count++
  }

  return count >= 1 ? 'hinglish' : 'en'
}

// Intelligent Knowledge Base & Project Consultant Engine
function getBotResponse(userQuery) {
  const q = userQuery.toLowerCase().trim()
  const lang = detectLanguage(userQuery)
  const isHi = lang === 'hinglish' || lang === 'hi'

  // -------------------------------------------------------------
  // 1. TECHNOLOGY CONSULTING & ADVICE (Customer is confused about tech)
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
  // 2. FEATURE RECOMMENDATIONS & ADD-ONS ADVISORY
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
  // 3. E-COMMERCE SPECIFIC GUIDANCE
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
  // 4. MERN STACK & DATABASE CONSULTING (Why MERN? / Mongo vs SQL)
  // -------------------------------------------------------------
  if (
    q.includes('why mern') ||
    q.includes('mern kyu') ||
    q.includes('mongodb or mysql') ||
    q.includes('mongo vs sql') ||
    q.includes('database kaun')
  ) {
    if (isHi) {
      return {
        text: `**MERN Stack & Database Recommendation**:\n\n` +
          `• **MERN kyu best hai?**:\n` +
          `  1. Frontend (React) aur Backend (Node) dono **JavaScript** me hote hain, jisse development super fast aur efficient hoti hai.\n` +
          `  2. **MongoDB** flexible document structure provide karta hai, jisse naye features add karna bohot aasan hota hai.\n` +
          `  3. Scalable aur startup-friendly architecture.\n\n` +
          `• **MongoDB vs SQL/MySQL**:\n` +
          `  - Agar aapka data dynamic hai (like users, products, memberships, activity logs) → **MongoDB** best hai.\n` +
          `  - Agar strict banking transactions ya complex relations hain → **PostgreSQL/MySQL** best hai.`,
        actions: [
          { label: '🚀 Arpit ke MERN Demos dekhein', url: '#featured', primary: true },
          { label: '💬 WhatsApp par discuss karein', url: 'https://wa.me/919696725794' },
        ],
      }
    } else {
      return {
        text: `**Why Choose MERN Stack & Which Database to Pick**:\n\n` +
          `• **Benefits of MERN Stack**:\n` +
          `  1. **Unified JavaScript Language**: Both client and server run on JS, enabling rapid feature delivery.\n` +
          `  2. **Component Architecture**: React offers rich interactive UIs and smooth single-page application (SPA) performance.\n` +
          `  3. **High Throughput**: Node.js non-blocking I/O handles thousands of concurrent requests seamlessly.\n\n` +
          `• **MongoDB vs SQL**:\n` +
          `  - **MongoDB**: Ideal for rapid prototyping, ERP platforms, dynamic schemas, and high-velocity iterations.\n` +
          `  - **PostgreSQL / SQL**: Best for strictly structured relational systems requiring complex multi-table ACID transactions.`,
        actions: [
          { label: '🚀 View Live MERN Projects', url: '#featured', primary: true },
          { label: '💬 Discuss with Arpit on WhatsApp', url: 'https://wa.me/919696725794' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 5. GYM MANAGEMENT PLATFORM
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
  // 6. GRS (GRIEVANCE REDRESSAL SYSTEM)
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
  // 7. iCODER BLOG & EMAIL VALIDATION
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
  // 8. ALL PROJECTS
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
  // 9. CONTACT / HIRE / PHONE / WHATSAPP / EMAIL
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
  // 10. SOCIALS & GITHUB / LINKEDIN
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
  // 11. PRICING & TIMELINE
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
  // 12. FREELANCE SERVICES
  // -------------------------------------------------------------
  if (
    q.includes('freelance') ||
    q.includes('service') ||
    q.includes('services') ||
    q.includes('can you build') ||
    q.includes('kya banate')
  ) {
    if (isHi) {
      return {
        text: `Arpit Rai yeh sari **Web Development Services** provide karte hain:\n\n` +
          `• **Full-Stack Web Applications**: MERN stack portals, dashboards, ERPs aur custom platforms.\n` +
          `• **Frontend UI/UX Engineering**: Modern, responsive React.js aur JavaScript websites.\n` +
          `• **Backend & REST APIs**: Secure Node.js & Express servers, authentication aur database integration.\n` +
          `• **Deployment & Hosting**: Render, Vercel, Netlify aur cloud setup.\n` +
          `• **Bug Fixing & Speed Optimization**: Existing websites ko optimize aur modernise karna.`,
        actions: [
          { label: '💬 WhatsApp par project discuss karein', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20have%20a%20project%20to%20build!', primary: true },
          { label: '🚀 Live Projects Dekhein', url: '#featured' },
        ],
      }
    } else {
      return {
        text: `Arpit Rai delivers end-to-end **Full-Stack Web Engineering Services**:\n\n` +
          `• **Custom Web Applications**: Production-grade MERN portals, SaaS products, and ERP systems.\n` +
          `• **Modern Frontend UI**: Lightning-fast, mobile-first responsive interfaces using React.js.\n` +
          `• **Backend & RESTful APIs**: Scalable Node.js & Express server architectures with MongoDB/MySQL.\n` +
          `• **Cloud Deployment**: Render, Vercel, and GitHub Pages continuous integration.\n` +
          `• **Maintenance & Optimization**: Code refactoring, speed enhancement, and bug resolution.`,
        actions: [
          { label: '💬 Discuss Project on WhatsApp', url: 'https://wa.me/919696725794?text=Hi%20Arpit,%20I%20have%20a%20project%20to%20build!', primary: true },
          { label: '🚀 Explore Featured Projects', url: '#featured' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 13. GREETINGS
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
        text: `Namaste! 👋 Arpit Rai ke AI Assistant me aapka swagat hai.\n\nMain aapko **project technology guide karne**, **features suggest karne**, **live demos dikhane**, aur **freelance work & estimates** me help kar sakta hoon. Aap kis baare me jaanna chahte hain?`,
        actions: [
          { label: '💡 Tech Stack Guide', query: 'I am confused which technology to use for my project' },
          { label: '🎯 Features Suggestion', query: 'What features should I add to my project?' },
          { label: '🚀 Live Demos', query: 'Show me your projects' },
          { label: '📞 Contact Arpit', query: 'How can I contact Arpit?' },
        ],
      }
    } else {
      return {
        text: `Hello! 👋 Welcome to Arpit Rai's Portfolio Assistant.\n\nI can help you **choose the ideal tech stack**, **recommend must-have features for your app**, **explore live project demos**, and **connect with Arpit for freelance hiring**. How can I assist you today?`,
        actions: [
          { label: '💡 Tech Stack Advice', query: 'I am confused which technology to use for my project' },
          { label: '🎯 Feature Ideas', query: 'What features should I add to my project?' },
          { label: '🚀 Live Demos', query: 'Show me your projects' },
          { label: '📞 Contact Arpit', query: 'How can I contact Arpit?' },
        ],
      }
    }
  }

  // -------------------------------------------------------------
  // 14. FALLBACK / ADAPTIVE DEFAULT
  // -------------------------------------------------------------
  if (isHi) {
    return {
      text: `Shukriya poochne ke liye! Arpit ke AI Assistant ke roop me, main aapki in cheezon me madad kar sakta hoon:\n\n` +
        `• **Technology Guidance**: Project ke liye kaun sa stack (MERN, React, Node, SQL) best rahega.\n` +
        `• **Feature Recommendations**: App me kaun se zaroori features aur add-ons hone chahiye.\n` +
        `• **Live Demos**: Gym ERP, GRS Grievance Portal, iCoder Blog demos.\n` +
        `• **Direct Contact**: Arpit se Phone, WhatsApp, ya Email par baat karein.\n\n` +
        `Aap niche diye gaye option me se chunein ya apna sawal type karein!`,
      actions: [
        { label: '💡 Tech Stack Guide', query: 'I am confused which technology to use for my project' },
        { label: '🎯 Suggest Features', query: 'What features should I add to my project?' },
        { label: '💬 WhatsApp Chat', url: 'https://wa.me/919696725794', primary: true },
        { label: '📞 Call +91 96967 25794', url: 'tel:+919696725794' },
      ],
    }
  } else {
    return {
      text: `Thanks for asking! As Arpit Rai's AI Assistant, I can guide you with:\n\n` +
        `• **Tech Stack Consulting**: Choosing the right technologies (MERN, React, Node, SQL/NoSQL).\n` +
        `• **Feature Planning**: Recommending essential features and add-ons for your application.\n` +
        `• **Live Project Demos**: Testing Gym ERP, GRS Portal, and iCoder Blog.\n` +
        `• **Freelance Estimates & Direct Contact**: Reaching Arpit directly via Phone, WhatsApp, or Email.\n\n` +
        `Please choose an option below or ask your question!`,
      actions: [
        { label: '💡 Tech Stack Guide', query: 'I am confused which technology to use for my project' },
        { label: '🎯 Suggest Features', query: 'What features should I add to my project?' },
        { label: '💬 Chat on WhatsApp', url: 'https://wa.me/919696725794', primary: true },
        { label: '📞 Call: +91 96967 25794', url: 'tel:+919696725794' },
      ],
    }
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
      text: `👋 **Hello / Namaste!** I'm Arpit Rai's AI Assistant.\n\nConfused about which technology to pick for your project? Need ideas on which features to add? Or looking to hire Arpit for freelance development? Ask me in **English or Hindi / Hinglish**!`,
      time: 'Just now',
      actions: [
        { label: '💡 Tech Stack Guide', query: 'I am confused which technology to use for my project' },
        { label: '🎯 Suggest Features', query: 'What features should I add to my project?' },
        { label: '🏋️ Gym ERP Demo', query: 'Show me Gym Management Platform demo' },
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

    // Simulate realistic AI deliberation time
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
        text: `Chat restarted! Ask me about tech recommendations, project features, freelance hiring, or live demos. (English / Hindi dono me baat kar sakte hain!)`,
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
                <p>🟢 Active · Tech & Project Advisor (EN/HI)</p>
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
                placeholder="Ask in English ya Hindi (e.g. 'konsi tech use kare?')..."
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
              <span>Tech Advisory · Feature Planning · Direct Freelance Connect</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
