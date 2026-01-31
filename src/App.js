

import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import './App.css';
emailjs.init("9rq094AsqGtTC12se");


export default function App() {
  
  
  const [currentPage, setCurrentPage] = useState('intro');
  const [activeNav, setActiveNav] = useState('home');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  
  const [introComplete, setIntroComplete] = useState(false);
  const [msgStatus, setMsgStatus] = useState("");
const [msgColor, setMsgColor] = useState("black");

  
  useEffect(() => {
    const animations = [
      { selector: ".top-tags", class: "from-top", delay: 0 },
      { selector: ".left h1", class: "from-left", delay: 0.3 },
      { selector: ".desc", class: "from-left", delay: 0.6 },
      { selector: ".live-line", class: "from-bottom", delay: 0.9 },
      { selector: ".buttons", class: "zoom-in", delay: 1.2 },
      { selector: ".site-link", class: "from-bottom", delay: 1.5 },
      { selector: ".right", class: "from-right", delay: 0.6 },
      { selector: ".stats", class: "from-bottom", delay: 1.8 },
    ];

    animations.forEach(item => {
      const el = document.querySelector(item.selector);
      if (el) {
        el.style.animationDelay = `${item.delay}s`;
        el.classList.add(item.class);
      }
    });

    
    const introTimer = setTimeout(() => {
      const intro = document.getElementById("intro");
      if (intro) {
        intro.classList.add("smooth-out");
        
        setTimeout(() => {
          setCurrentPage('real-site');
          setActiveNav('home');
          setIntroComplete(true);
        }, 1200);
      }
    }, 3800);

    return () => clearTimeout(introTimer);
  }, []);

  
  useEffect(() => {
    if (!introComplete) return;

    const initScrollAnimations = () => {
      const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up, .reveal"
      );
      
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translate(0)";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      elements.forEach(el => observer.observe(el));
    };

    initScrollAnimations();
  }, [introComplete]);

  // ===== SCROLL NAVBAR DETECTION =====
  useEffect(() => {
    if (!introComplete) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveNav(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introComplete]);

  // ===== SMOOTH SCROLL ANCHOR LINKS =====
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      const element = document.querySelector(href);
      
      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 120,
          behavior: "smooth"
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [introComplete]);

  // Handle navigation
  const handleNavClick = (section) => {
    setActiveNav(section);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleFormSubmit = (e) => {
  e.preventDefault();

  // Validation des champs
  if (!formData.user_name || !formData.user_email || !formData.message) {
    setMsgStatus("Veuillez remplir tous les champs!");
    setMsgColor("red");
    return;
  }

  // Envoyer l'email avec EmailJS
  emailjs
    .send(
      "service_fm48ryq",      // TON Service ID
      "template_23g7mrw",     // TON Template ID
      {
        user_name: formData.user_name,
        user_email: formData.user_email,
        message: formData.message,
      }
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setMsgStatus("✓ Message sent successfully! I'll reply soon.");
        setMsgColor("green");
        // Réinitialiser le formulaire
        setFormData({
          user_name: '',
          user_email: '',
          message: ''
        });
        // Effacer le message après 3 secondes
        setTimeout(() => setMsgStatus(""), 3000);
      },
      (error) => {
        console.log("FAILED...", error);
        setMsgStatus("✗ Failed to send message. Please try again.");
        setMsgColor("red");
      }
    );
};

  return (
    <>
      {/* INTRO SCREEN */}
      {currentPage === 'intro' && (
        <div id="intro">
          <div className="main">
            <div className="card">
              {/* TOP TAGS */}
              <div className="top-tags">
                <span className="dot">● SYSTEM READY</span>
                <span>PORTFOLIO 2026</span>
                <span>UI LOADING</span>
              </div>

              <div className="content">
                {/* LEFT */}
                <div className="left">
                  <h1>
                    Welcome to <br />
                    my Portfolio <br />
                    Website
                  </h1>

                  <p className="desc">
                    Building modern, reliable, and fast digital experiences with a
                    focus on clean UI and solid engineering.
                  </p>

                  <div className="live-line">
                    <span>LIVE STATUS</span>
                  </div>

                  <div className="buttons">
                    <div className="btn"><i className="fa-solid fa-code"></i> CODE</div>
                    <div className="btn"><i className="fa-solid fa-user"></i> PROFILE</div>
                    <div className="btn"><i className="fa-brands fa-github"></i> SOURCE</div>
                  </div>

                  {/* WEBSITE LINK */}
                  <div className="site-link">
                    <i className="fa-solid fa-globe"></i>
                    <span>www.zineddinedsb.dev</span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="right">
                  <div className="right-head">
                    <span>CORE UI</span>
                    <span className="online">ONLINE</span>
                  </div>

                  <div className="orbit-box">
                    <div className="orbit">
                      <i className="fa-solid fa-layer-group i1"></i>
                      <i className="fa-solid fa-bolt i2"></i>
                      <i className="fa-solid fa-code i3"></i>
                      <i className="fa-solid fa-wifi i4"></i>
                    </div>

                    <div className="core">
                      <span>WELCOME</span>
                    </div>
                  </div>

                  <div className="stats">
                    <div>
                      <h4>04</h4>
                      <p>Loaded</p>
                    </div>
                    <div>
                      <h4>22ms</h4>
                      <p>Stable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REAL SITE */}
      {currentPage === 'real-site' && (
        <div id="real-site">
          <Header activeNav={activeNav} onNavClick={handleNavClick} />
          
          <Home />
          <About />
          <Project />
          <Services />
          {/* <Contact formData={formData} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} /> */}
          <Contact 
  formData={formData} 
  onFormChange={handleFormChange} 
  onFormSubmit={handleFormSubmit}
  msgStatus={msgStatus}
  msgColor={msgColor}
/>
        </div>
      )}
    </>
  );
}

// ============================================
// HEADER / NAVIGATION COMPONENT
// ============================================
function Header({ activeNav, onNavClick }) {
  
  return (
    <header>
      <div className="div-list">
        <ul className="ul-list">
          <li className={activeNav === 'home' ? 'active' : ''}>
            <i className="fa-solid fa-circle-user"></i>
            <a href="#home" onClick={() => onNavClick('home')}>Home</a>
          </li>
          <li className={activeNav === 'about' ? 'active' : ''}>
            <i className="fa-regular fa-address-card"></i>
            <a href="#about" onClick={() => onNavClick('about')}>About</a>
          </li>
          <li className={activeNav === 'project' ? 'active' : ''}>
            <i className="fa-regular fa-folder-open"></i>
            <a href="#project" onClick={() => onNavClick('project')}>Projects</a>
          </li>
          <li className={activeNav === 'service' ? 'active' : ''}>
            <i className="fa-solid fa-code"></i>
            <a href="#service" onClick={() => onNavClick('service')}>services</a>
          </li>
          <li className={activeNav === 'contact' ? 'active' : ''}>
            <i className="fa-regular fa-envelope"></i>
            <a href="#contact" onClick={() => onNavClick('contact')}>Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

// ============================================
// HOME SECTION
// ============================================
function Home() {
  return (
    <section className="home" id="home">
      <p className="home-p">
        <span className="home-s">. </span>Available for freelance work
      </p>
      <div className="home-container">
        <div className="home-section">
          <div className="info-home">
            <h1>Hi, I'm Zineddine</h1>
            <h3>Full Stack Developer</h3>
            <div className="info-p">
              <p>I create beautiful, functional, and user-centered digital experiences.With a strong passion for web development, I bring ideas to life throughclean code and thoughtful design.</p>
              
            </div>
            <div className="info-p2">
              <p><i className="fa-solid fa-location-dot"></i> Based in Algeria</p>
              <p><i className="fa-solid fa-briefcase"></i> Available Now</p>
            </div>
            <div className="btnn">
              <button className="btn-home1"><i className="fa-solid fa-arrow-right"></i> Hire Me</button>
             <a href="/cv-zineddine.pdf" download className="btn-home2">
  <i className="fa-solid fa-download"></i> Download CV</a>

            </div>
            <div className="hhr">
              <hr />
            </div>
            <div className="follow">
              <p className="followw">Follow me:</p>
              <ul>
               <li><a href="https://github.com/zineddinedsb" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></li>

             <li><a href="https://discord.com/users/964239683070607390"target="_blank"rel="noopener noreferrer" ><i className="fa-brands fa-discord"></i> </a></li>

                <li><a href="https://www.linkedin.com/in/zineddine-dsb-1234b1234/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
                <li>
  <a href="https://t.me/ZINEDDINE_22"target="_blank"rel="noopener noreferrer"><i className="fa-brands fa-telegram"></i></a></li>

              </ul>
            </div>
          </div>
        </div>
        <img src="images/img2.jpg" alt="Profile" />
      </div>
    </section>
  );
}

// ============================================
// ABOUT SECTION
// ============================================
function About() {
  return (
    <section className="about reveal" id="about">
      <div className="about-info">
        <div className="img-about">
          <img src="images/img.jpg" alt="Profile" />
        </div>
        <div className="info-text">
          <h5>@ZINEDDINE</h5>
          <p>Full Stack Developer</p>
        </div>
      </div>
      <h3>ABOUT ME</h3>
      <div className="about-info2">
        <div className="about-text">
         <p>I'm Zineddine, a web development student exploring diverse fields of technology - from software and web development to artificial intelligence solutions. My goal is to continuously grow my skills and expand my horizons.</p>
        </div>
        <div className="photo-container">
          <img src="images/img.jpg" alt="Profile" />
          <span className="tape tape1"></span>
          <span className="tape tape2"></span>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROJECTS SECTION
// ============================================
function Project() {
  const projects = [
    {
      id: 1,
      img: 'images/Cleveroad.jpg',
      title: 'E-Commerce Website',
      desc: 'Modern online store with product filtering, cart, and payment system.',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      img: 'images/Capture d\'écran 2025-10-22 182207.png',
      title: 'Portfolio Website',
      desc: 'Personal portfolio to showcase my design and coding projects.',
      skills: ['HTML', 'CSS', 'Bootstrap']
    },
    {
      id: 3,
      img: 'images/Weather Forecast Dashboard.jpg',
      title: 'Weather App',
      desc: 'Responsive app showing real-time weather data using API integration.',
      skills: ['HTML', 'CSS', 'API']
    },
    {
      id: 4,
      img: 'images/WordPress dashboard design concept.jpg',
      title: 'Blog Website',
      desc: 'Clean and simple blogging platform with markdown support.',
      skills: ['HTML', 'Tailwind', 'JavaScript']
    },
    {
      id: 5,
      img: 'images/Game Dashboard Design.jpg',
      title: 'Game Landing Page',
      desc: 'Landing page for a game with animations and parallax effects.',
      skills: ['HTML', 'CSS', 'GSAP']
    },
    {
      id: 6,
      img: 'images/Task manager app.jpg',
      title: 'Task Manager',
      desc: 'Task tracking web app with CRUD features and clean UI.',
      skills: ['HTML', 'CSS', 'JS']
    }
  ];

  return (
    <section className="project reveal" id="project">
      <p>PROJECTS</p>
      <h1>Featured Work</h1>
      <hr />
      <div className="info-pro">
        <p>A showcase of my recent projects demonstrating expertise in full-stack</p>
        <p>development, modern frameworks, and creative problem-solving.</p>
      </div>
      <div className="projects-container">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <img src={project.img} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="skills">
        {project.skills.map((skill, idx) => (
          <a key={idx} href="#">{skill}</a>
        ))}
      </div>
      <div className="btns">
        <a href="#" className="btn"><i className="fab fa-github"></i> GitHub</a>
        <a href="#" className="btn"><i className="fas fa-external-link-alt"></i> Live Demo</a>
      </div>
    </div>
  );
}

// ============================================
// SERVICES SECTION
// ============================================
function Services() {
  const services = [
    {
      id: 1,
      icon: 'fas fa-code',
      title: 'Web Development',
      desc: 'I create responsive, modern websites using the latest technologies and best practices. From concept to deployment, I ensure your website looks great and performs perfectly.',
      features: ['Responsive Design', 'Performance Optimized', 'SEO Friendly']
    },
    {
      id: 2,
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Development',
      desc: 'Building cross-platform mobile applications that work seamlessly on both iOS and Android devices using modern frameworks and tools.',
      features: ['Cross-Platform', 'Native Performance', 'User-Friendly']
    },
    {
      id: 3,
      icon: 'fas fa-palette',
      title: 'UI/UX Design',
      desc: 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences. I focus on usability, accessibility, and visual appeal.',
      features: ['User-Centered', 'Modern Design', 'Accessibility']
    },
    {
      id: 4,
      icon: 'fas fa-rocket',
      title: 'Performance Optimization',
      desc: 'Optimizing websites and applications for speed, scalability, and reliability. I ensure your digital products perform at their best under any conditions.',
      features: ['Fast Loading', 'Scalable', 'Reliable']
    },
    {
      id: 5,
      icon: 'fas fa-shopping-cart',
      title: 'E-commerce Solutions',
      desc: 'Building secure and efficient e-commerce platforms that drive sales and provide excellent shopping experiences for your customers.',
      features: ['Secure Payments', 'Inventory Management', 'Analytics']
    },
    {
      id: 6,
      icon: 'fas fa-cogs',
      title: 'API Development',
      desc: 'Creating robust and scalable APIs that power your applications. I build RESTful and GraphQL APIs with proper documentation and testing.',
      features: ['RESTful APIs', 'GraphQL', 'Documentation']
    }
  ];

  return (
    <section id="service" className="section services reveal">
      <p>SERVICES</p>
      <h1>OUR Features & Services</h1>
      <hr />
      <div className="container">
        <div className="services-content">
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={service.icon}></i>
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <div className="service-features">
        {service.features.map((feature, idx) => (
          <span key={idx}>{feature}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// CONTACT SECTION
// ============================================
function Contact({ formData, onFormChange, onFormSubmit ,msgStatus, msgColor }) {
  return (
    <section id="contact" className="section reveal">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info slide-in-left">
            <p>Let's collaborate! I am always open to discussing exciting projects and new opportunities.</p>
            <div className="contact-details">
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>zinousebih128@@gmail.com</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+213 555-46-49-70</span>
              </div>
              <div className="contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Algeria, Bir mourad raiss</span>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/Zineddinedsb" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/zineddine-sebih-97b572350" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://wa.me/213555464970?text=Bonjour%2C%20je%20souhaite%20d%C3%A9velopper%20un%20site%20web%20sur%20mesure%20pour%20mon%20activit%C3%A9.%0AMerci%20de%20me%20contacter%20pour%20un%20devis."  className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="contact-form slide-in-right">
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  name="user_name"
                  value={formData.user_name}
                  onChange={onFormChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  name="user_email"
                  value={formData.user_email}
                  onChange={onFormChange}
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={onFormChange}
                ></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
              
            </form>
          </div>
        </div>
        
      </div>
    </section>
  );
}