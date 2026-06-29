/* ============================================================
   ZAIN ABBAS — PORTFOLIO JAVASCRIPT
   Features: Theme, Typed text, Ticker, Skills Tabs, 
             Project Filter, Oscilloscope Canvas, Chatbot,
             Scroll Reveal, Contact Form, Scroll-to-Top
   ============================================================ */

(function() {
  'use strict';

  /* ─── THEME TOGGLE ─────────────────────────────────────── */
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon   = document.getElementById('theme-icon');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('za-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // Load saved preference or default light
  const savedTheme = localStorage.getItem('za-theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ─── MOBILE MENU ──────────────────────────────────────── */
  const menuToggle  = document.getElementById('menu-toggle');
  const mobileMenu  = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ─── SCROLL REVEAL ────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ─── TYPED TEXT ───────────────────────────────────────── */
  const phrases = [
    'Electrical Engineer',
    'Embedded Systems Developer',
    'IoT Solution Builder',
    'Circuit Design Enthusiast',
    'C++ & Python Developer',
    'AI Intern @ CyberGen',
  ];
  const typedEl = document.getElementById('typed-text');
  let pIdx = 0, cIdx = 0, deleting = false;

  function typeLoop() {
    const current = phrases[pIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 80);
  }
  typeLoop();

  /* ─── SKILLS TABS ──────────────────────────────────────── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const skillsPanels = document.querySelectorAll('.skills-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      skillsPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
      // Trigger reveals for newly visible cards
      target.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
    });
  });

  /* ─── PROJECT FILTER ───────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.35s ease-out';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ─── OSCILLOSCOPE ─────────────────────────────────────── */
  const canvas    = document.getElementById('oscCanvas');
  const ctx       = canvas.getContext('2d');
  let oscFreq     = 50;
  let oscAmp      = 1.0;
  let oscNoise    = 0;
  let oscWave     = 'sine';
  let oscTime     = 0;
  let animId;

  // Resize canvas to match display size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  || 620;
    canvas.height = rect.height || 220;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); });

  function drawOscilloscope() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    const gridCols = 10, gridRows = 6;
    for (let i = 1; i < gridCols; i++) {
      ctx.beginPath();
      ctx.moveTo((w / gridCols) * i, 0);
      ctx.lineTo((w / gridCols) * i, h);
      ctx.stroke();
    }
    for (let i = 1; i < gridRows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (h / gridRows) * i);
      ctx.lineTo(w, (h / gridRows) * i);
      ctx.stroke();
    }
    // Center line
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Signal
    const amplitude  = (h / 2 - 20) * (oscAmp / 10);
    const cycles     = oscFreq / 20;  // number of visible cycles
    const noiseScale = oscNoise / 100 * 0.3;

    ctx.shadowBlur  = 12;
    ctx.shadowColor = '#ff3131';
    ctx.strokeStyle = '#ff3131';
    ctx.lineWidth   = 2.2;
    ctx.beginPath();

    for (let x = 0; x <= w; x++) {
      const t = (x / w) * cycles * Math.PI * 2 + oscTime;
      let y;
      switch (oscWave) {
        case 'sine':
          y = Math.sin(t);
          break;
        case 'square':
          y = Math.sign(Math.sin(t));
          break;
        case 'triangle':
          y = (2 / Math.PI) * Math.asin(Math.sin(t));
          break;
        case 'sawtooth':
          y = ((t % (Math.PI * 2)) / (Math.PI * 2)) * 2 - 1;
          break;
        default:
          y = Math.sin(t);
      }
      // Add noise
      if (oscNoise > 0) {
        y += (Math.random() * 2 - 1) * noiseScale;
      }
      const px = x;
      const py = h / 2 - y * amplitude;
      if (x === 0) ctx.moveTo(px, py);
      else         ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Advance time for animation
    oscTime += 0.04;
    animId = requestAnimationFrame(drawOscilloscope);
  }

  // Start oscilloscope when section is in view
  const labSection = document.getElementById('signal-lab');
  let oscRunning = false;
  const oscObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !oscRunning) {
        oscRunning = true;
        drawOscilloscope();
      } else if (!entry.isIntersecting && oscRunning) {
        oscRunning = false;
        cancelAnimationFrame(animId);
      }
    });
  }, { threshold: 0.1 });
  oscObserver.observe(labSection);

  // Controls
  const freqSlider   = document.getElementById('freq-slider');
  const ampSlider    = document.getElementById('amp-slider');
  const noiseSlider  = document.getElementById('noise-slider');
  const freqDisplay  = document.getElementById('freq-display');
  const ampDisplay   = document.getElementById('amp-display');
  const noiseDisplay = document.getElementById('noise-display');
  const oscFreqVal   = document.getElementById('osc-freq-val');
  const oscAmpVal    = document.getElementById('osc-amp-val');
  const oscWaveVal   = document.getElementById('osc-wave-val');
  const oscTimeVal   = document.getElementById('osc-time-val');
  const waveBtns     = document.querySelectorAll('.wave-btn');

  freqSlider.addEventListener('input', () => {
    oscFreq = parseInt(freqSlider.value);
    freqDisplay.textContent = oscFreq + ' Hz';
    oscFreqVal.textContent  = oscFreq + ' Hz';
  });

  ampSlider.addEventListener('input', () => {
    oscAmp = parseInt(ampSlider.value) / 5;
    const display = oscAmp.toFixed(1) + ' V';
    ampDisplay.textContent = display;
    oscAmpVal.textContent  = display;
  });

  noiseSlider.addEventListener('input', () => {
    oscNoise = parseInt(noiseSlider.value);
    noiseDisplay.textContent = oscNoise + '%';
  });

  waveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      waveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      oscWave = btn.dataset.wave;
      oscWaveVal.textContent = btn.textContent;
    });
  });

  // Update elapsed time display
  setInterval(() => {
    oscTimeVal.textContent = (Date.now() % 100000 / 1000).toFixed(1) + ' ms';
  }, 100);

  /* ─── SCROLL TO TOP ─────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else                      scrollTopBtn.classList.remove('visible');
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── CHATBOT ────────────────────────────────────────────── */
  const chatToggle   = document.getElementById('chat-toggle');
  const chatPanel    = document.getElementById('chat-panel');
  const chatClose    = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput    = document.getElementById('chat-input');
  const chatSend     = document.getElementById('chat-send');
  const quickBtns    = document.getElementById('quick-btns');
  const chatIcon     = document.getElementById('chat-icon');

  chatToggle.addEventListener('click', () => {
    chatPanel.classList.toggle('open');
    const isOpen = chatPanel.classList.contains('open');
    chatIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-regular fa-comment-dots';
    chatToggle.querySelector('.chat-badge').style.display = isOpen ? 'none' : '';
  });
  chatClose.addEventListener('click', () => {
    chatPanel.classList.remove('open');
    chatIcon.className = 'fa-regular fa-comment-dots';
  });

  const BOT_RESPONSES = {
    projects: `Here are Zain's key projects:\n\n🌱 <b>Smart IoT Garden</b> — ESP32, MQTT, ThingSpeak (🏆 1st place!)\n🤖 <b>Line-Following Robot</b> — Arduino, PID control\n🔊 <b>Class-AB Amplifier</b> — Multisim simulation\n⏰ <b>Digital Alarm Clock</b> — DS3231 RTC, I2C\n🚦 <b>Traffic Light FSM</b> — 74-series ICs\n🧠 <b>AI Pipeline @ CyberGen</b> — Python, ML\n\nScroll to the Projects section for full details!`,
    skills: `⚡ Zain's technical skills:\n\n<b>Hardware:</b> Arduino, ESP32, Raspberry Pi, STM32, PCB Design, UART/I2C/SPI\n\n<b>Software:</b> C/C++, Python, MATLAB, HTML/CSS/JS, ML\n\n<b>Tools:</b> Multisim, Proteus, Git, MQTT, KiCad\n\n<b>Concepts:</b> Signal Processing, Digital Logic, Control Systems, Comms`,
    experience: `📋 Zain's work experience:\n\n🤖 <b>AI Intern @ CyberGen</b> (Summer 2024) — Production ML systems, data pipelines, automation tools.\n\n📚 <b>TA — Circuit Analysis</b> @ FAST NUCES\n📚 <b>TA — Electronics</b> @ FAST NUCES\n📚 <b>TA — Digital Logic Design</b> @ FAST NUCES`,
    education: `🎓 Zain is pursuing a <b>B.Sc. in Electrical & Electronics Engineering</b> at <b>FAST NUCES, Islamabad</b>.\n\nCGPA: <b>3.2+</b>\n\nKey subjects: Circuit Analysis, Digital Systems, Embedded Systems, Signal Processing, Communications, Power Electronics.`,
    contact: `📧 <b>Email:</b> zainabbas@example.com\n💼 <b>LinkedIn:</b> linkedin.com/in/zainabbas\n🐙 <b>GitHub:</b> github.com/zainabbas\n\nOr use the Contact form on this page — I typically respond within 24 hours!`,
    internship: `🤖 Zain interned at <b>CyberGen</b> (Islamabad) in Summer 2024 as an AI Engineering Intern.\n\nHe worked on:\n• Production ML model training\n• Data preprocessing pipelines\n• Enterprise automation tools\n• Deploying AI-driven systems\n\nThis experience strengthened his bridge between EE hardware and AI/software domains.`,
  };

  function addMessage(text, role) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + role;
    msg.innerHTML = text.replace(/\n/g, '<br>');
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function botReply(key) {
    const lowerInput = key.toLowerCase();
    // Match keywords
    let resp;
    if (lowerInput.includes('project') || lowerInput.includes('garden') || lowerInput.includes('robot') || lowerInput.includes('amplifier')) {
      resp = BOT_RESPONSES.projects;
    } else if (lowerInput.includes('skill') || lowerInput.includes('know') || lowerInput.includes('technology') || lowerInput.includes('tech')) {
      resp = BOT_RESPONSES.skills;
    } else if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('ta')) {
      resp = BOT_RESPONSES.experience;
    } else if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('university') || lowerInput.includes('fast') || lowerInput.includes('cgpa')) {
      resp = BOT_RESPONSES.education;
    } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach') || lowerInput.includes('linkedin')) {
      resp = BOT_RESPONSES.contact;
    } else if (lowerInput.includes('cybergen') || lowerInput.includes('intern') || lowerInput.includes('ai') || lowerInput.includes('ml') || lowerInput.includes('machine')) {
      resp = BOT_RESPONSES.internship;
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      resp = '👋 Hello! I\'m Zain\'s portfolio bot. Ask me about his projects, skills, education, or experience!';
    } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
      resp = '📄 You can download Zain\'s resume using the <b>Download Resume</b> button in the navigation bar!';
    } else if (lowerInput.includes('award') || lowerInput.includes('achievement') || lowerInput.includes('win')) {
      resp = '🏆 Zain has won <b>1st place at the Project Exhibition</b> and the <b>Speed Wiring Competition</b>! He\'s also an active <b>IEEE Student Member</b>.';
    } else {
      resp = "🤔 I'm not sure about that specifically. Try asking about:\n• <b>Projects</b> or <b>Skills</b>\n• <b>Experience</b> or <b>Education</b>\n• <b>CyberGen</b> internship or <b>Contact</b> info";
    }

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.innerHTML = '<i>typing...</i>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(resp, 'bot');
    }, 700);
  }

  // Quick buttons
  quickBtns.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      addMessage(btn.textContent, 'user');
      botReply(q);
    });
  });

  // Send from input
  function sendChat() {
    const val = chatInput.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    chatInput.value = '';
    botReply(val);
  }
  chatSend.addEventListener('click', sendChat);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendChat();
  });

  /* ─── CONTACT FORM ──────────────────────────────────────── */
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name',    fgId: 'fg-name',    check: v => v.trim().length > 1 },
      { id: 'email',   fgId: 'fg-email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'subject', fgId: 'fg-subject', check: v => v.trim().length > 1 },
      { id: 'message', fgId: 'fg-message', check: v => v.trim().length > 5 },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const fg    = document.getElementById(f.fgId);
      if (!f.check(input.value)) {
        fg.classList.add('error');
        valid = false;
      } else {
        fg.classList.remove('error');
      }
    });

    if (valid) {
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(form);
      
      fetch('https://formsubmit.co/ajax/zainabbasm416@gmail.com', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        form.reset();
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        document.getElementById('form-success').style.display = 'block';
        setTimeout(() => {
          document.getElementById('form-success').style.display = 'none';
        }, 4000);
      })
      .catch(error => {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        alert('Oops! There was a problem sending your message. Please email directly.');
      });
    }
  });

  // Clear error on input
  ['name', 'email', 'subject', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      document.getElementById('fg-' + id).classList.remove('error');
    });
  });


  /* ─── HORIZONTAL STICKY SCROLL ──────────────────────────── */
  const expSection   = document.getElementById('experience');
  const horizTrack   = document.getElementById('horizontal-track');
  const slideCounter = document.getElementById('slide-counter');

  if (expSection && horizTrack) {
    const stickyContainer = expSection.querySelector('.sticky-scroll-container');
    let maxScroll   = 0;
    let totalSlides = 0;
    let currentX    = 0;   // actual rendered position
    let targetX     = 0;   // desired position from scroll
    let rafId       = null;
    const LERP      = 0.10; // lower = smoother/slower, higher = snappier

    const calculateDimensions = () => {
      maxScroll   = horizTrack.scrollWidth - stickyContainer.offsetWidth;
      totalSlides = horizTrack.children.length;
    };
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    // Continuously animate toward targetX
    function animateSlider() {
      // Lerp: ease current toward target
      const diff = targetX - currentX;
      if (Math.abs(diff) > 0.5) {
        currentX += diff * LERP;
      } else {
        currentX = targetX; // snap when close enough
      }

      horizTrack.style.transform = `translate3d(${-currentX}px, 0, 0)`;

      if (slideCounter && totalSlides > 0) {
        const progress  = maxScroll > 0 ? currentX / maxScroll : 0;
        const idx       = Math.min(totalSlides, Math.floor(progress * totalSlides) + 1);
        slideCounter.textContent = `0${idx} / 0${totalSlides}`;
      }

      rafId = requestAnimationFrame(animateSlider);
    }
    animateSlider(); // always running — lightweight when diff ≈ 0

    window.addEventListener('scroll', () => {
      const rect           = expSection.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        let progress = Math.abs(rect.top) / scrollableDist;
        progress     = Math.max(0, Math.min(progress, 1));
        targetX      = progress * maxScroll;
      } else if (rect.top > 0) {
        targetX = 0;
      } else {
        targetX = maxScroll;
      }
    }, { passive: true });
  }

  /* ─── ACTIVE NAV ON SCROLL ──────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--accent)' : '';
    });
  }, { passive: true });

})();
