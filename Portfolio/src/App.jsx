import React, { useState } from 'react'
import arpitPhoto from './assets/arpit-rai.jpg'
import Chatbot from './Chatbot'
import './App.css'

const work = [
[
'01',
'Responsive Websites',
'Fast, modern and user-friendly websites designed to create a strong online presence.',
],
[
'02',
'Full Stack Web Applications',
'Practical web applications with frontend, backend and database integration.',
],
[
'03',
'UI Implementation',
'Clean and responsive interfaces that provide a smooth experience across every screen.',
],
]

const featuredProjects = [
  {
    number: '01',
    title: 'Gym Management Platform',
    badge: 'MERN Stack · Live ERP',
    description:
      'A comprehensive multi-tenant gym & fitness center management system featuring member registration, membership tracking, automated renewals, payment processing, and attendance operations.',
    features: [
      'Member registration, profiles & workout plan management',
      'Membership plan tracking, automated expiry & renewals',
      'Payment processing, fee records & revenue summaries',
      'Attendance tracking & administrative operation controls',
    ],
    tech: 'React.js · Node.js · Express.js · MongoDB',
    type: 'gym',
    liveUrl: 'https://gym-management-platform.onrender.com',
    codeUrl: 'https://github.com/arpitrai38/gms-frontened',
  },
  {
    number: '02',
    title: 'GRS – Grievance Redressal System',
    badge: 'MERN Stack · Live Portal',
    description:
      'A structured digital system for submitting, tracking, and resolving grievances with role-based authentication, category routing, and admin resolution workflows.',
    features: [
      'Secure user registration, authentication & role access',
      'Online grievance filing with categorized complaint routing',
      'Real-time complaint status tracking (In Review, Resolved)',
      'Admin dashboard with organized grievance records & analytics',
    ],
    tech: 'React.js · Node.js · Express.js · MongoDB',
    type: 'grievance',
    liveUrl: 'https://grs-mern-client.onrender.com',
    codeUrl: 'https://github.com/arpitrai38/MERN-GRS',
  },
  {
    number: '03',
    title: 'College ERP System',
    badge: 'Enterprise Architecture',
    description:
      'A centralized enterprise web platform engineered to manage academic and administrative activities, student records, fee reconciliation, and departmental data.',
    features: [
      'Student and faculty management',
      'Course and attendance management',
      'Fees, results and academic records',
      'Role-based access and centralized data management',
    ],
    tech: 'React.js · Node.js · Express.js · Database Systems',
    type: 'erp',
    liveUrl: null,
    codeUrl: 'https://github.com/arpitrai38',
  },
]

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className="page dark">
      <div className="canvas">

        <header className="topbar">
          <a className="logo" href="#home" onClick={() => setIsNavOpen(false)}>
            <span>AR</span> Arpit Rai
          </a>

          <nav className="desktop-nav">
            <a className="selected" href="#home">Home</a>
            <a href="#featured">Featured</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#about">About</a>
          </nav>

          <div className="top-actions">
            <a className="contact-button desktop-contact-btn" href="#contact">
              Contact me
            </a>

            {/* Hamburger Menu Button */}
            <button
              className={`hamburger-btn ${isNavOpen ? 'open' : ''}`}
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isNavOpen}
              id="hamburger-btn"
            >
              <span className="hamburger-bar bar-1"></span>
              <span className="hamburger-bar bar-2"></span>
              <span className="hamburger-bar bar-3"></span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-overlay ${isNavOpen ? 'active' : ''}`}>
          <div className="mobile-nav-backdrop" onClick={() => setIsNavOpen(false)}></div>
          <aside className="mobile-nav-drawer" aria-label="Mobile Navigation">
            <div className="mobile-drawer-header">
              <a className="logo" href="#home" onClick={() => setIsNavOpen(false)}>
                <span>AR</span> Arpit Rai
              </a>
              <button
                className="mobile-drawer-close"
                onClick={() => setIsNavOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer-links">
              <a href="#home" onClick={() => setIsNavOpen(false)}>
                <i>✦</i> Home
              </a>
              <a href="#featured" onClick={() => setIsNavOpen(false)}>
                <i>🚀</i> Featured Projects
              </a>
              <a href="#portfolio" onClick={() => setIsNavOpen(false)}>
                <i>💼</i> Selected Work
              </a>
              <a href="#about" onClick={() => setIsNavOpen(false)}>
                <i>👤</i> About Me
              </a>
              <a
                href="#contact"
                className="mobile-drawer-contact-btn"
                onClick={() => setIsNavOpen(false)}
              >
                Contact Me ↗
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <p>FIND ME ONLINE</p>
              <div className="mobile-drawer-socials">
                <a href="https://github.com/arpitrai38" target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href="https://www.linkedin.com/in/arpit-rai-002951292" target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a href="tel:+919696725794">
                  +91 96967 25794
                </a>
              </div>
            </div>
          </aside>
        </div>

    <main>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="hello">HELLO, I AM ARPIT RAI</p>

          <h1>
            Hello, I&apos;m
            <br />
            <span>Arpit Rai.</span>
          </h1>

          <p className="lead">
            Full stack web developer building modern, responsive and
            high-performance web applications for real people and businesses.
          </p>

          <div className="hero-buttons">
            <a className="blue-button" href="#contact">
              Hire me <b>↗</b>
            </a>

            <a className="plain-button" href="#portfolio">
              See portfolio <b>↓</b>
            </a>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="spark s1">✦</div>
          <div className="spark s2">✦</div>

          <div className="portrait-shape"></div>

          <img src={arpitPhoto} alt="Arpit Rai" />

          <div className="availability">
            <i></i>
            <span>
              AVAILABLE FOR
              <br />
              <b>FREELANCE WORK</b>
            </span>
          </div>

          <div className="tech-chip chip-react">
            ⚛ Web Development
          </div>

          <div className="tech-chip chip-node">
            ⬡ Full Stack
          </div>
        </div>
      </section>

      <div className="social-row">
        <span>Find me online</span>

        <a
          href="https://github.com/arpitrai38"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/arpit-rai-002951292"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a href="mailto:sadhanamarendra12@gmail.com">
          Email
        </a>

        <strong>Scroll to explore ↓</strong>
      </div>

      <section className="about-section" id="about">
        <div className="section-label">
          01
          <br />
          <span>ABOUT ME</span>
        </div>

        <div className="about-content">
          <h2>
            More than code.
            <br />
            <span>It's about impact.</span>
          </h2>

          <p>
            I'm Arpit, a freelance web developer who enjoys making the
            web simple, useful and memorable. From modern websites to
            complete web applications, I bring ideas to life with clean
            design and practical functionality.
          </p>

          <a className="text-arrow" href="#contact">
            Let's work together <b>↗</b>
          </a>
        </div>

        <div className="stats">
          <div>
            <strong>5<span>+</span></strong>
            <p>
              Featured
              <br />
              projects
            </p>
          </div>

          <div>
            <strong>Full</strong>
            <p>
              Stack web
              <br />
              development
            </p>
          </div>

          <div>
            <strong>100<span>%</span></strong>
            <p>
              Focus on
              <br />
              quality
            </p>
          </div>
        </div>
      </section>

      <section className="skills">
        <div className="skills-heading">
          <p>02 / MY TOOLKIT</p>

          <h2>
            Built with the
            <br />
            <span>right tools.</span>
          </h2>
        </div>

        <div className="skill-grid">
          <article>
            <i>⚛</i>
            <h3>Frontend</h3>
            <p>
              HTML, CSS, JavaScript, React and responsive UI development.
            </p>
          </article>

          <article>
            <i>⬡</i>
            <h3>Backend</h3>
            <p>
              Node.js, Express.js, PHP and backend web development.
            </p>
          </article>

          <article>
            <i>◈</i>
            <h3>Database</h3>
            <p>
              MySQL, MongoDB, SQL and database management.
            </p>
          </article>

          <article>
            <i>✦</i>
            <h3>Tools</h3>
            <p>
              Git, GitHub, VS Code, XAMPP and modern development tools.
            </p>
          </article>
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <div className="portfolio-title">
          <p>03 / SELECTED WORK</p>

          <h2>
            My <span>portfolio.</span>
          </h2>

          <a href="#contact">Have a project? ↗</a>
        </div>

        <div className="project-grid">

          <article className="project-card p-one">
            <a
              href="https://arpitrai38.github.io/iCoder/"
              target="_blank"
              rel="noopener noreferrer"
              className="mock-link"
              title="Open iCoder live website"
            >
              <div className="project-mock">
                <span>ICODER · BLOG</span>

                <b>
                  Code. Learn.
                  <br />
                  Tech Articles & Blog.
                </b>

                <i></i>
                <i></i>
                <i></i>
              </div>
            </a>

            <h3>
              <a
                href="https://arpitrai38.github.io/iCoder/"
                target="_blank"
                rel="noopener noreferrer"
                className="project-title-link"
                title="Open iCoder live website"
              >
                iCoder – Tech Blogging Website <span className="title-arrow">↗</span>
              </a>
            </h3>
            <p>HTML · CSS · Bootstrap</p>

            <div className="card-actions">
              <a
                href="https://arpitrai38.github.io/iCoder/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-live-btn"
                title="Open iCoder live demo"
              >
                <i className="live-indicator"></i> Live Demo ↗
              </a>
              <a
                href="https://github.com/arpitrai38/iCoder"
                target="_blank"
                rel="noopener noreferrer"
                className="card-code-btn"
                title="View iCoder source code on GitHub"
              >
                Code ↗
              </a>
            </div>
          </article>

          <article className="project-card p-two">
            <a
              href="https://gym-management-platform.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mock-link"
              title="Open Gym Management Platform live demo"
            >
              <div className="project-mock">
                <span>GYM PLATFORM</span>

                <b>
                  Train. Manage.
                  <br />
                  Track & Renew.
                </b>

                <i></i>
                <i></i>
              </div>
            </a>

            <h3>
              <a
                href="https://gym-management-platform.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="project-title-link"
                title="Open Gym Management Platform live demo"
              >
                Gym Management Platform <span className="title-arrow">↗</span>
              </a>
            </h3>
            <p>MERN Stack · Full Stack ERP</p>

            <div className="card-actions">
              <a
                href="https://gym-management-platform.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card-live-btn"
                title="Open Gym Management live demo"
              >
                <i className="live-indicator"></i> Live Demo ↗
              </a>
              <a
                href="https://github.com/arpitrai38/gms-frontened"
                target="_blank"
                rel="noopener noreferrer"
                className="card-code-btn"
                title="View Gym Management source code on GitHub"
              >
                Code ↗
              </a>
            </div>
          </article>

          <article className="project-card p-three">
            <a
              href="https://arpitrai38.github.io/Email-Validation/"
              target="_blank"
              rel="noopener noreferrer"
              className="mock-link"
              title="Open Email Validation Tool live demo"
            >
              <div className="project-mock">
                <span>EMAIL CHECK</span>

                <b>
                  Validate.
                  <br />
                  Verify & Clean.
                </b>

                <i></i>
                <i></i>
                <i></i>
              </div>
            </a>

            <h3>
              <a
                href="https://arpitrai38.github.io/Email-Validation/"
                target="_blank"
                rel="noopener noreferrer"
                className="project-title-link"
                title="Open Email Validation Tool live demo"
              >
                Email Validation Tool <span className="title-arrow">↗</span>
              </a>
            </h3>
            <p>HTML · CSS · JavaScript</p>

            <div className="card-actions">
              <a
                href="https://arpitrai38.github.io/Email-Validation/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-live-btn"
                title="Open Email Validation live demo"
              >
                <i className="live-indicator"></i> Live Demo ↗
              </a>
              <a
                href="https://github.com/arpitrai38/Email-Validation"
                target="_blank"
                rel="noopener noreferrer"
                className="card-code-btn"
                title="View Email Validation source code on GitHub"
              >
                Code ↗
              </a>
            </div>
          </article>

        </div>
      </section>

      <section className="featured-projects" id="featured">
        <div className="featured-heading">
          <p>04 / FEATURED PROJECTS</p>

          <h2>
            Systems built for
            <br />
            <span>real-world work.</span>
          </h2>
        </div>

        <div className="featured-grid">

          {featuredProjects.map((project) => (
            <article
              className={`featured-card ${project.type}`}
              key={project.number}
            >
              <div className="featured-visual">

                {project.type === 'gym' && (
                  <>
                    <div className="visual-top">
                      <span>GYM / PLATFORM ERP</span>
                      {project.liveUrl && (
                        <span className="live-pill">
                          <i className="pulse-dot"></i> Live Demo
                        </span>
                      )}
                    </div>

                    <div className="gym-badge">
                      <div className="gym-icon">🏋️</div>
                      <div>
                        <b>Member Portal & ERP</b>
                        <small>Active Memberships · Live Tracking</small>
                      </div>
                    </div>

                    <div className="gym-stats-row">
                      <small>Cardio & Strength</small>
                      <small>Auto-Renew</small>
                      <small>Fee Billing</small>
                    </div>
                  </>
                )}

                {project.type === 'grievance' && (
                  <>
                    <div className="visual-top">
                      <span>GRS / GRIEVANCE PORTAL</span>
                      {project.liveUrl && (
                        <span className="live-pill">
                          <i className="pulse-dot"></i> Live Demo
                        </span>
                      )}
                    </div>

                    <div className="complaint-row">
                      <i></i>
                      <b>Submit & Track Grievance</b>
                    </div>

                    <div className="status-row">
                      <small>In review</small>
                      <small>Resolved</small>
                      <small>Role Access</small>
                    </div>
                  </>
                )}

                {project.type === 'erp' && (
                  <>
                    <div className="visual-top">
                      <span>COLLEGE / ERP SYSTEM</span>
                      <span className="erp-pill">Enterprise</span>
                    </div>

                    <div className="erp-side">
                      <b>ERP</b>
                      <small>Management System</small>
                    </div>

                    <div className="erp-table">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                  </>
                )}

              </div>

              <div className="featured-content">
                <div className="project-header-row">
                  <p className="project-number">
                    PROJECT {project.number}
                  </p>
                  {project.badge && (
                    <span className="project-badge">{project.badge}</span>
                  )}
                </div>

                <h3>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-title-link"
                      title={`Open ${project.title} live demo in a new tab`}
                    >
                      {project.title} <span className="title-arrow">↗</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                <p>{project.description}</p>

                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <p className="stack">
                  <b>TECHNOLOGIES</b> {project.tech}
                </p>

                <div className="project-actions">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-live-btn"
                      id={`live-demo-${project.number}`}
                      title={`Open ${project.title} live demo in a new tab`}
                    >
                      <i className="live-indicator"></i>
                      Live Demo ↗
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="action-contact-btn"
                      id={`contact-demo-${project.number}`}
                    >
                      Request Demo ↗
                    </a>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-sub-btn"
                    >
                      View Live App
                    </a>
                  ) : (
                    <a href="#contact" className="action-sub-btn">
                      View Details
                    </a>
                  )}

                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-sub-btn"
                      title={`View ${project.title} source code on GitHub`}
                    >
                      View Code ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

        </div>
      </section>

      <section className="services">
        <div className="services-title">
          <p>05 / HOW I CAN HELP</p>

          <h2>
            Let's build your
            <br />
            <span>next great thing.</span>
          </h2>
        </div>

        <div className="service-list">
          {work.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>

              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

    </main>

    <footer id="contact">
      <p>HAVE A PROJECT IN MIND?</p>

      <h2>
        Let's make it
        <br />
        <span>happen.</span>
      </h2>

      <a
        className="footer-email"
        href="mailto:sadhanamarendra12@gmail.com"
      >
        sadhanamarendra12@gmail.com ↗
      </a>

      <a
        className="footer-phone"
        href="tel:+919696725794"
      >
        +91 96967 25794
      </a>

      <div>
        <span>© 2026 ARPIT RAI</span>
        <span>FREELANCE WEB DEVELOPER · INDIA</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>

    <Chatbot />
  </div>
</div>

)
}

export default App
