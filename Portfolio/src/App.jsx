import arpitPhoto from './assets/arpit-rai.jpg'
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
title: 'Online Grievance Management System',
description:
'A digital system for submitting, tracking and managing grievances through a structured and transparent workflow.',
features: [
'Secure user registration and login',
'Online grievance submission',
'Complaint categories and status tracking',
'Admin dashboard and organized grievance records',
],
tech: 'Web Development · Database Management',
type: 'grievance',
},
{
number: '02',
title: 'College ERP System',
description:
'A centralized web platform designed to manage important academic and administrative activities in a college.',
features: [
'Student and faculty management',
'Course and attendance management',
'Fees, results and academic records',
'Role-based access and centralized data management',
],
tech: 'Web Development · Database Management',
type: 'erp',
},
]

function App() {
return (
<div className="page dark"> <div className="canvas">

    <header className="topbar">
      <a className="logo" href="#home">
        <span>AR</span> Arpit Rai
      </a>

      <nav>
        <a className="selected" href="#home">Home</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#about">About</a>
      </nav>

      <div className="top-actions">
        <a className="contact-button" href="#contact">
          Contact me
        </a>
      </div>
    </header>

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
            <div className="project-mock">
              <span>SARTHI</span>

              <b>
                Explore the world.
                <br />
                Travel your way.
              </b>

              <i></i>
              <i></i>
              <i></i>
            </div>

            <h3>Sarthi – Travel Website</h3>
            <p>HTML · CSS · JavaScript</p>
          </article>

          <article className="project-card p-two">
            <div className="project-mock">
              <span>AMARSADHANA</span>

              <b>
                Support.
                <br />
                Connect. Grow.
              </b>

              <i></i>
              <i></i>
            </div>

            <h3>Amarsadhana</h3>
            <p>Support Platform</p>
          </article>

          <article className="project-card p-three">
            <div className="project-mock">
              <span>EMAIL CHECK</span>

              <b>
                Validate.
                <br />
                Verify.
              </b>

              <i></i>
              <i></i>
              <i></i>
            </div>

            <h3>Email Validation Tool</h3>
            <p>HTML · CSS · JavaScript</p>
          </article>

        </div>
      </section>

      <section className="featured-projects">
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

                {project.type === 'grievance' ? (
                  <>
                    <span>GMS</span>

                    <div className="complaint-row">
                      <i></i>
                      <b>Submit grievance</b>
                    </div>

                    <div className="status-row">
                      <small>In review</small>
                      <small>Resolved</small>
                    </div>
                  </>
                ) : (
                  <>
                    <span>COLLEGE / ERP</span>

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
                <p className="project-number">
                  PROJECT {project.number}
                </p>

                <h3>{project.title}</h3>

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
                  <a href="#contact">Live Demo ↗</a>
                  <a href="#contact">View Project</a>
                  <a href="#contact">View Code ↗</a>
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

  </div>
</div>

)
}

export default App
