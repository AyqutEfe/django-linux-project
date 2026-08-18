/**
 * AYKUT EFE ÇAĞLAYAN - PORTFOLIO INTERACTIVE CLIENT ENGINE
 * Features: TR/EN i18n, Theme Switcher, Cloud Architecture Sandbox,
 * Interactive Terminal CLI, Siege Load Testing Simulator, Project Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTheme();
  initNavbar();
  initSandbox();
  initTerminal();
  initSkillsFilter();
  initProjectModals();
  initContactForm();
  initCopyButtons();
});

/* ==========================================================================
   1. MULTILINGUAL (TR / EN) LOCALIZATION ENGINE
   ========================================================================== */

const translations = {
  tr: {
    nav_about: "Hakkımda",
    nav_architecture: "Bulut Mimarisi",
    nav_skills: "Yetenekler",
    nav_projects: "Projeler",
    nav_experience: "Deneyim",
    nav_terminal: "Terminal",
    nav_contact: "İletişim",
    nav_cta: "İletişime Geç",
    
    hero_badge_cloud: "☁️ Cloud Engineering & DevOps Practitioner",
    hero_badge_tubit: "👑 TÜBİT Topluluk Başkanı",
    hero_title_1: "Ölçeklenebilir, Dayanıklı & ",
    hero_title_gradient: "Sıfır Kesintili",
    hero_title_2: " Bulut Sistemleri",
    hero_desc: "Merhaba! Ben Aykut Efe Çağlayan. Docker Swarm konteyner orkestrasyonu, Jenkins CI/CD otomasyonları, Kubernetes, Nginx ters vekil sunucuları ve Django mimarilerinde yüksek erişilebilirliğe (HA) odaklanan bir Cloud & DevOps mühendisiyim.",
    hero_btn_projects: "Projeleri İncele",
    hero_btn_terminal: "Bulut CLI Terminali",
    hero_btn_cv: "Özgeçmişi Gör",
    
    metric_availability: "Sıfır Kesinti Oranı",
    metric_availability_sub: "Siege ile Doğrulandı (%100)",
    metric_replicas: "Aktif Swarm Replika",
    metric_replicas_sub: "Yüksek Erişilebilirlik (HA)",
    metric_cicd: "Jenkins Otomasyon",
    metric_cicd_sub: "Multi-Stage GitOps",
    metric_latency: "Ortalama Yanıt Süresi",
    metric_latency_sub: "Nginx & Gunicorn",
    
    sandbox_tag: "Canlı Simülasyon",
    sandbox_title: "Docker Swarm & Jenkins Altyapı Simülatörü",
    sandbox_subtitle: "Bu projenin arkasındaki üretim mimarisini canlı olarak test edin: Siege yük testi uygulayın veya kesintisiz rolling-update sürecini tetikleyin.",
    sandbox_btn_siege: "🔥 Siege Yük Testi Yap",
    sandbox_btn_rolling: "🔄 Rolling Update Tetikle",
    sandbox_btn_failover: "⚠️ Düğüm Arızası Simüle Et",
    sandbox_btn_reset: "Temizle",
    
    skills_tag: "Uzmanlık Alanları",
    skills_title: "Teknoloji & Yetenek Matrisi",
    skills_subtitle: "Bulut altyapılarından backend servislerine ve topluluk liderliğine kadar kullanılan modern araçlar.",
    filter_all: "Tümü",
    filter_cloud: "Cloud & Konteyner",
    filter_devops: "CI/CD & DevOps",
    filter_backend: "Backend & Veritabanı",
    filter_linux: "Linux & Ağ",
    filter_leadership: "Liderlik & Yönetim",
    
    projects_tag: "Öne Çıkan Çalışmalar",
    projects_title: "Bulut & Yazılım Projeleri",
    projects_subtitle: "Konteyner orkestrasyonu, sürekli entegrasyon ve dağıtım üzerine geliştirilmiş gerçek dünya uygulamaları.",
    
    terminal_tag: "İnteraktif Konsol",
    terminal_title: "Cloud Engineering CLI",
    terminal_subtitle: "Klavye veya hızlı butonları kullanarak Aykut Efe hakkında detaylı sistem sorguları çalıştırın.",
    
    experience_tag: "Kariyer & Yol Haritası",
    experience_title: "Deneyim & Liderlik",
    experience_subtitle: "Teknik gelişim ve topluluk yönetimi yolculuğumdaki kilometre taşları.",
    
    contact_tag: "Bağlantı Kur",
    contact_title: "Birlikte Çalışalım",
    contact_subtitle: "Cloud & DevOps projeleri, staj/iş fırsatları veya topluluk etkinlikleri için iletişime geçebilirsiniz.",
    form_name_label: "Adınız Soyadınız",
    form_email_label: "E-posta Adresiniz",
    form_message_label: "Mesajınız",
    form_btn_submit: "Mesajı Gönder",
    copy_email_btn: "E-postayı Kopyala",
    email_copied_toast: "E-posta panoya kopyalandı!"
  },
  en: {
    nav_about: "About",
    nav_architecture: "Cloud Architecture",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_terminal: "Terminal",
    nav_contact: "Contact",
    nav_cta: "Get In Touch",
    
    hero_badge_cloud: "☁️ Cloud Engineering & DevOps Practitioner",
    hero_badge_tubit: "👑 TÜBİT Community President",
    hero_title_1: "Architecting Resilient & ",
    hero_title_gradient: "Zero-Downtime",
    hero_title_2: " Cloud Systems",
    hero_desc: "Hello! I'm Aykut Efe Çağlayan. A Cloud & DevOps Engineer specializing in Docker Swarm container orchestration, Jenkins CI/CD automation, Kubernetes, Nginx reverse proxies, and high-availability Django backend architectures.",
    hero_btn_projects: "Explore Projects",
    hero_btn_terminal: "Open Cloud CLI",
    hero_btn_cv: "View Resume",
    
    metric_availability: "Zero-Downtime Rate",
    metric_availability_sub: "Siege Verified (100%)",
    metric_replicas: "Active Swarm Replicas",
    metric_replicas_sub: "High Availability (HA)",
    metric_cicd: "Jenkins Automation",
    metric_cicd_sub: "Multi-Stage GitOps",
    metric_latency: "Average Response Time",
    metric_latency_sub: "Nginx & Gunicorn",
    
    sandbox_tag: "Live Simulation",
    sandbox_title: "Docker Swarm & Jenkins Infrastructure Sandbox",
    sandbox_subtitle: "Interact with the live production architecture backing this site: run Siege load tests or trigger zero-downtime rolling updates.",
    sandbox_btn_siege: "🔥 Run Siege Load Test",
    sandbox_btn_rolling: "🔄 Trigger Rolling Update",
    sandbox_btn_failover: "⚠️ Simulate Node Failover",
    sandbox_btn_reset: "Reset",
    
    skills_tag: "Technical Stack",
    skills_title: "Skills & Expertise Matrix",
    skills_subtitle: "Modern toolsets and frameworks leveraged across cloud infrastructures, backend systems, and leadership roles.",
    filter_all: "All",
    filter_cloud: "Cloud & Containers",
    filter_devops: "CI/CD & DevOps",
    filter_backend: "Backend & Databases",
    filter_linux: "Linux & Networking",
    filter_leadership: "Leadership & Community",
    
    projects_tag: "Featured Work",
    projects_title: "Cloud & Engineering Projects",
    projects_subtitle: "Production-grade implementations focusing on container orchestration, automation, and reliability engineering.",
    
    terminal_tag: "Interactive Shell",
    terminal_title: "Cloud Engineering CLI",
    terminal_subtitle: "Run live system queries to explore Aykut Efe's credentials, stack, and infrastructure.",
    
    experience_tag: "Career & Roadmap",
    experience_title: "Experience & Milestones",
    experience_subtitle: "Key milestones in cloud engineering, open-source communities, and leadership.",
    
    contact_tag: "Let's Connect",
    contact_title: "Get In Touch",
    contact_subtitle: "Open for Cloud & DevOps opportunities, collaborations, and community speaking sessions.",
    form_name_label: "Your Name",
    form_email_label: "Your Email Address",
    form_message_label: "Your Message",
    form_btn_submit: "Send Message",
    copy_email_btn: "Copy Email",
    email_copied_toast: "Email copied to clipboard!"
  }
};

let currentLang = localStorage.getItem('aykut_portfolio_lang') || 'tr';

function initI18n() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        setLanguage(selected);
      }
    });
  });
  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('aykut_portfolio_lang', lang);
  
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  
  const dict = translations[lang] || translations.tr;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

/* ==========================================================================
   2. THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('aykut_portfolio_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', active);
      localStorage.setItem('aykut_portfolio_theme', active);
      updateThemeIcon(active);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

/* ==========================================================================
   3. NAVBAR SCROLL & ACTIVE TRACKING
   ========================================================================== */

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('mobile-open');
    });
  }
}

/* ==========================================================================
   4. INTERACTIVE CLOUD ARCHITECTURE SANDBOX
   ========================================================================== */

function initSandbox() {
  const btnSiege = document.getElementById('btn-sandbox-siege');
  const btnRolling = document.getElementById('btn-sandbox-rolling');
  const btnFailover = document.getElementById('btn-sandbox-failover');
  const btnReset = document.getElementById('btn-sandbox-reset');
  const logFeed = document.getElementById('sandbox-log-feed');
  
  const replica1 = document.getElementById('replica-1');
  const replica2 = document.getElementById('replica-2');
  const replica3 = document.getElementById('replica-3');
  const nginxNode = document.getElementById('node-nginx');
  
  function appendLog(tag, message, type = 'info') {
    if (!logFeed) return;
    const now = new Date().toTimeString().split(' ')[0];
    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `
      <span class="log-timestamp">[${now}]</span>
      <span class="log-tag">[${tag}]</span>
      <span class="log-${type}">${message}</span>
    `;
    logFeed.appendChild(line);
    logFeed.scrollTop = logFeed.scrollHeight;
  }
  
  // Initial log greeting
  appendLog('SWARM', 'Docker Swarm cluster initialized with 3 replicas. Overlay network active: django-overlay', 'success');
  appendLog('NGINX', 'Reverse proxy listening on 0.0.0.0:80 -> load balancing upstream web:8000', 'info');
  
  // 1. Siege Load Test Simulation
  if (btnSiege) {
    btnSiege.addEventListener('click', () => {
      appendLog('SIEGE', 'Executing siege -c 10 -t 5s http://localhost/ ...', 'warn');
      btnSiege.classList.add('active');
      nginxNode?.classList.add('active-flow');
      
      let counter = 0;
      const interval = setInterval(() => {
        counter += 250;
        const targetReplica = [replica1, replica2, replica3][Math.floor(Math.random() * 3)];
        targetReplica?.classList.add('active');
        setTimeout(() => targetReplica?.classList.remove('active'), 200);
        
        appendLog('TRAFFIC', `HTTP/1.1 200 OK - Round-robin packet handled (${counter} transactions, 0 errors)`, 'success');
        
        if (counter >= 1250) {
          clearInterval(interval);
          btnSiege.classList.remove('active');
          nginxNode?.classList.remove('active-flow');
          appendLog('SIEGE REPORT', 'Transactions: 1250 | Availability: 100.00% | Failed: 0 | Response: 0.012s', 'success');
          showToast('Siege Test Complete: 100.00% Zero-Downtime Verified! 🚀');
        }
      }, 400);
    });
  }
  
  // 2. Rolling Update Simulation (start-first)
  if (btnRolling) {
    btnRolling.addEventListener('click', () => {
      appendLog('JENKINS', 'Deploy stage: docker stack deploy -c docker-stack.yml my-django-stack', 'warn');
      appendLog('SWARM', 'Update config: order=start-first, parallelism=1, delay=10s', 'info');
      btnRolling.classList.add('active');
      
      // Step 1: Replica 1 rolling update
      setTimeout(() => {
        replica1?.classList.add('updating');
        setReplicaStatus(replica1, 'v1.0.42 (Starting)', 'badge-updating');
        appendLog('SWARM', 'Spawning new container for replica 1 (start-first strategy)...', 'info');
      }, 500);
      
      setTimeout(() => {
        setReplicaStatus(replica1, 'v1.0.42 (Healthy)', 'badge-healthy');
        replica1?.classList.remove('updating');
        appendLog('HEALTHCHECK', 'Replica 1 HTTP /api/health/ returned 200 OK. Old container stopped.', 'success');
      }, 2000);
      
      // Step 2: Replica 2 rolling update
      setTimeout(() => {
        replica2?.classList.add('updating');
        setReplicaStatus(replica2, 'v1.0.42 (Starting)', 'badge-updating');
        appendLog('SWARM', 'Updating replica 2...', 'info');
      }, 2500);
      
      setTimeout(() => {
        setReplicaStatus(replica2, 'v1.0.42 (Healthy)', 'badge-healthy');
        replica2?.classList.remove('updating');
        appendLog('HEALTHCHECK', 'Replica 2 healthy. Traffic smoothly rerouted.', 'success');
      }, 4000);
      
      // Step 3: Replica 3 rolling update
      setTimeout(() => {
        replica3?.classList.add('updating');
        setReplicaStatus(replica3, 'v1.0.42 (Starting)', 'badge-updating');
        appendLog('SWARM', 'Updating replica 3...', 'info');
      }, 4500);
      
      setTimeout(() => {
        setReplicaStatus(replica3, 'v1.0.42 (Healthy)', 'badge-healthy');
        replica3?.classList.remove('updating');
        btnRolling.classList.remove('active');
        appendLog('DEPLOYMENT', 'Zero-Downtime Rolling Update Finished! 3/3 Replicas upgraded to v1.0.42', 'success');
        showToast('Zero-Downtime Rolling Update Completed Successfully! ✨');
      }, 6000);
    });
  }
  
  // 3. Node Failover & Auto-Healing Simulation
  if (btnFailover) {
    btnFailover.addEventListener('click', () => {
      appendLog('KERNEL', 'Simulating container crash on Replica 3 (SIGKILL)...', 'warn');
      setReplicaStatus(replica3, 'Terminated', 'badge-updating');
      replica3?.classList.add('updating');
      
      setTimeout(() => {
        appendLog('SWARM MESH', 'Reconciliation loop detected 2/3 replicas active. Auto-healing replacement...', 'info');
      }, 800);
      
      setTimeout(() => {
        setReplicaStatus(replica3, 'Replica 3 (Healthy)', 'badge-healthy');
        replica3?.classList.remove('updating');
        appendLog('SWARM', 'New replica provisioned and healthy. Cluster state restored (3/3)', 'success');
        showToast('Swarm Auto-Healing Verified: 3/3 Replicas Restored 🛡️');
      }, 2200);
    });
  }
  
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (logFeed) logFeed.innerHTML = '';
      appendLog('SYS', 'Sandbox metrics and log stream cleared.', 'info');
      setReplicaStatus(replica1, 'Replica 1 (Healthy)', 'badge-healthy');
      setReplicaStatus(replica2, 'Replica 2 (Healthy)', 'badge-healthy');
      setReplicaStatus(replica3, 'Replica 3 (Healthy)', 'badge-healthy');
    });
  }
}

function setReplicaStatus(replicaElement, text, badgeClass) {
  if (!replicaElement) return;
  const badge = replicaElement.querySelector('.replica-badge');
  if (badge) {
    badge.textContent = text;
    badge.className = `replica-badge ${badgeClass}`;
  }
}

/* ==========================================================================
   5. INTERACTIVE CLOUD CLI TERMINAL
   ========================================================================== */

function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const quickButtons = document.querySelectorAll('.terminal-quick-btn');
  
  const historyList = [];
  let historyIdx = -1;
  
  const commands = {
    help: () => `
<div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">Available Cloud CLI Commands:</div>
  <span style="color:#10b981;">whoami</span>      - Overview & profile of Aykut Efe Çağlayan
  <span style="color:#10b981;">skills</span>      - Comprehensive Cloud, DevOps & Fullstack skill matrix
  <span style="color:#10b981;">projects</span>    - Featured Cloud, CI/CD and Orchestration repositories
  <span style="color:#10b981;">swarm</span>       - Query live Docker Swarm HA cluster status
  <span style="color:#10b981;">jenkins</span>     - Inspect multi-stage GitOps CI/CD pipeline
  <span style="color:#10b981;">siege</span>       - Run automated zero-downtime load test benchmark
  <span style="color:#10b981;">tubit</span>       - TÜBİT Community Presidency & Zirve'26 details
  <span style="color:#10b981;">contact</span>     - Display verified contact channels & links
  <span style="color:#10b981;">cat resume.txt</span> - Print structured ASCII resume
  <span style="color:#10b981;">sudo hire-me</span> - Launch priority recruitment dialogue
  <span style="color:#10b981;">clear</span>       - Clear terminal buffer
`,
    whoami: () => `
<div style="color:#00f2fe; font-weight:bold;">Aykut Efe Çağlayan</div>
<div>• <strong>Role:</strong> Cloud & DevOps Engineer | Community Leader</div>
<div>• <strong>Focus:</strong> Docker Swarm, Kubernetes, Jenkins CI/CD, Nginx, Django, Zero-Downtime Architecture</div>
<div>• <strong>Leadership:</strong> President @ TÜBİT (Trakya University Informatics & Innovation Society)</div>
<div>• <strong>Location:</strong> Edirne / İstanbul, Türkiye</div>
<div>• <strong>GitHub:</strong> <a href="https://github.com/AyqutEfe" target="_blank" style="color:#38bdf8;">github.com/AyqutEfe</a></div>
<div>• <strong>Docker Hub:</strong> <a href="https://hub.docker.com/u/ayqutfe" target="_blank" style="color:#38bdf8;">hub.docker.com/u/ayqutfe</a></div>
`,
    skills: () => `
<div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">Technical Skill Breakdown:</div>
  [+] <strong>Cloud & Containers:</strong>  Docker, Docker Swarm (3-Replica HA), Kubernetes, Docker Secrets, Overlay Networks
  [+] <strong>CI/CD & DevOps:</strong>      Jenkinsfile Declarative Pipeline, GitOps, Siege Testing, Rollback Automation
  [+] <strong>Backend & DB:</strong>        Python 3.11, Django 5.x/6.x, PostgreSQL 16, SQLite, RESTful APIs, Gunicorn
  [+] <strong>Servers & OS:</strong>        Nginx (Reverse Proxy & Load Balancing), Alpine Linux, Ubuntu Server, Bash
  [+] <strong>Leadership:</strong>          TÜBİT Presidency, Zirve'26 Summit Organizer, Agile Team Collaboration
`,
    projects: () => `
<div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">Key Featured Repositories:</div>
  1. <strong>Cloud & DevOps HA Sandbox:</strong> Docker Swarm 3 Replicas, Jenkins CI/CD, Nginx, Siege 100% Verified.
  2. <strong>Jenkins Multi-Stage Pipeline:</strong> Automated build -> tag -> Docker Hub push -> SSH Swarm deploy.
  3. <strong>Kubernetes Manifest Cluster:</strong> Declarative K8s Deployments, ConfigMaps, Secrets & Services.
  4. <strong>Zirve'26 Summit Platform:</strong> Event management system for Trakya University's 7th Innovation Summit.
  5. <strong>Blockchain 101 Sandbox:</strong> Smart contract fundamentals & Web3 architectures (Coderspace Certified).
`,
    swarm: () => `
<div style="color:#10b981; font-weight:bold;">Docker Swarm Cluster Overview:</div>
  Manager Node: swarm-manager (10.53.0.105) - Status: Ready / Leader
  Network:      django-overlay (Driver: overlay, Scope: swarm, Encrypted: yes)
  Services:
    - webapp:   3/3 replicas online (Image: ayqutfe/django-multistage:latest)
    - db:       1/1 replica online  (Image: postgres:16-alpine)
    - nginx:    1/1 replica online  (Image: nginx:alpine - Port 80:80)
  Update Config: order=start-first, parallelism=1, delay=10s, failure_action=rollback
`,
    jenkins: () => `
<div style="color:#38bdf8; font-weight:bold;">Jenkins CI/CD Pipeline Telemetry:</div>
  Pipeline Type: Declarative Pipeline (Jenkinsfile SCM)
  Stages:
    [1] Checkout       ➔ SUCCESS (Branch: main, Commit: HEAD)
    [2] Build          ➔ SUCCESS (Multi-stage Docker build: Alpine Node + Python)
    [3] Push           ➔ SUCCESS (Pushed ayqutfe/django-multistage:latest & v1.0.X)
    [4] Deploy Swarm   ➔ SUCCESS (SSH -> docker stack deploy -c docker-stack.yml)
`,
    siege: () => `
<div style="color:#34d399; font-weight:bold;">Siege 4.1.6 Load Testing Report:</div>
  ** Siege 4.1.6
  ** Preparing 10 concurrent users for server testing.
  Transactions:                  1250 hits
  Availability:                100.00 %
  Elapsed time:                 10.00 secs
  Data transferred:              4.82 MB
  Response time:                 0.01 secs
  Transaction rate:            125.00 trans/sec
  Throughput:                    0.48 MB/sec
  Concurrency:                   9.95
  Successful transactions:       1250
  Failed transactions:              0
  Longest transaction:           0.04
  Shortest transaction:          0.01
`,
    tubit: () => `
<div style="color:#f59e0b; font-weight:bold;">TÜBİT - Trakya Üniversitesi Bilişim ve İnovasyon Topluluğu:</div>
  • <strong>Role:</strong> President / Topluluk Başkanı
  • <strong>Flagship Event:</strong> Zirve'26 (7. Liderlik, Kariyer ve İnovasyon Zirvesi)
  • <strong>Community Size:</strong> 500+ active student developers and tech enthusiasts
  • <strong>Activities:</strong> Hackathons, DevOps bootcamps, speaker sessions, cloud workshops
`,
    contact: () => `
<div style="color:#38bdf8; font-weight:bold;">Contact & Social Profiles:</div>
  • <strong>Email:</strong> aykutefecaglayan@gmail.com
  • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/aykut-efe-caglayan" target="_blank" style="color:#00f2fe;">linkedin.com/in/aykut-efe-caglayan</a>
  • <strong>GitHub:</strong> <a href="https://github.com/AyqutEfe" target="_blank" style="color:#00f2fe;">github.com/AyqutEfe</a>
  • <strong>Docker Hub:</strong> <a href="https://hub.docker.com/u/ayqutfe" target="_blank" style="color:#00f2fe;">hub.docker.com/u/ayqutfe</a>
`,
    "cat resume.txt": () => `
<pre style="color:#e2e8f0; font-family:monospace; line-height:1.4;">
======================================================================
                   AYKUT EFE ÇAĞLAYAN - RESUME
======================================================================
TITLE:     Cloud & DevOps Engineer | Community Leader
LOCATION:  Edirne / Istanbul, Turkey
LINKS:     github.com/AyqutEfe | hub.docker.com/u/ayqutfe

EXPERIENCE & LEADERSHIP:
- Cloud Engineering & DevOps Intern (Docker Swarm HA, Jenkins CI/CD)
- President @ TUBIT (Trakya University Informatics & Innovation Society)
- Organizer of Zirve'26 Leadership & Tech Summit

CORE SKILLS:
- Cloud: Docker, Docker Swarm, Kubernetes, Multi-Stage Builds, Nginx
- CI/CD: Jenkinsfile Declarative Pipelines, GitOps, Siege Testing
- Backend: Python 3.11+, Django 5.x, PostgreSQL, REST APIs, Gunicorn
- Systems: Alpine Linux, Ubuntu Server, Bash Scripting, Docker Secrets
======================================================================
</pre>
`,
    "sudo hire-me": () => {
      setTimeout(() => openResumeModal(), 300);
      return `<div style="color:#34d399; font-weight:bold;">Access granted! You are viewing Aykut Efe's career credentials. Let's schedule an interview! 🚀</div>`;
    }
  };
  
  function executeCommand(rawInput) {
    const input = rawInput.trim();
    if (!input) return;
    
    historyList.push(input);
    historyIdx = historyList.length;
    
    // Create command echo line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `
      <span class="terminal-prompt-user">aykut</span>@<span class="terminal-prompt-host">cloud-node</span>:<span class="terminal-prompt-path">~</span>$ <strong>${escapeHtml(input)}</strong>
    `;
    terminalHistory.appendChild(cmdLine);
    
    if (input.toLowerCase() === 'clear') {
      terminalHistory.innerHTML = '';
      return;
    }
    
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';
    
    const lower = input.toLowerCase();
    if (commands[lower]) {
      outputLine.innerHTML = typeof commands[lower] === 'function' ? commands[lower]() : commands[lower];
    } else {
      outputLine.innerHTML = `<span style="color:#f43f5e;">Command not recognized: "${escapeHtml(input)}". Type <strong style="color:#38bdf8;">help</strong> for available commands.</span>`;
    }
    
    terminalHistory.appendChild(outputLine);
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  }
  
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      } else if (e.key === 'ArrowUp') {
        if (historyList.length > 0 && historyIdx > 0) {
          historyIdx--;
          terminalInput.value = historyList[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < historyList.length - 1) {
          historyIdx++;
          terminalInput.value = historyList[historyIdx];
        } else {
          historyIdx = historyList.length;
          terminalInput.value = '';
        }
      }
    });
  }
  
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        if (terminalInput) terminalInput.value = '';
        executeCommand(cmd);
        document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ==========================================================================
   6. SKILLS FILTERING
   ========================================================================== */

function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. PROJECT MODALS
   ========================================================================== */

const projectDetails = {
  swarm_ha: {
    title: "Cloud Engineering & DevOps HA Sandbox (This Project)",
    tag: "High Availability & Orchestration",
    desc: `
      <p>Bu proje, modern bulut mimarilerini, konteyner orkestrasyonunu (Docker Swarm), Jenkins CI/CD pipeline'larını ve sıfır kesintili güncelleme stratejilerini uygulamalı olarak doğrulamak üzere geliştirilmiştir.</p>
      <h4 style="margin: 1rem 0 0.5rem; color:#38bdf8;">Mimari Özellikler:</h4>
      <ul style="line-height:1.7; padding-left:1.25rem;">
        <li><strong>3 Replika High-Availability:</strong> Web servisi 3 ayrı konteyner replikası olarak çalışır ve Nginx üzerinden yük dengelemesi yapılır.</li>
        <li><strong>Zero-Downtime Rolling Updates:</strong> <code>order: start-first</code> ve <code>parallelism: 1</code> parametreleriyle yeni versiyon ayağa kalkıp healthcheck geçene kadar eski versiyon trafiğe hizmet vermeye devam eder.</li>
        <li><strong>Siege Yük Testi Doğrulaması:</strong> Canlı deployment sırasında Siege ile 1250 istek gönderilerek %100.00 kesintisiz hizmet ve 0 başarısız işlem ispatlanmıştır.</li>
        <li><strong>Docker Secrets & Güvenlik:</strong> Veritabanı parolaları ve gizli anahtarlar <code>/run/secrets/</code> üzerinden şifreli okunur. Konteynerler yetkisiz <code>django</code> kullanıcısıyla çalışır.</li>
      </ul>
    `
  },
  jenkins_cicd: {
    title: "Jenkins Declarative Multi-Stage CI/CD Pipeline",
    tag: "GitOps & Automation",
    desc: `
      <p>GitHub deposuna gönderilen her commit için tam otomatik build, test, Docker Hub sürümleme ve Swarm Manager'a uzaktan dağıtım sağlayan GitOps pipeline'ı.</p>
      <h4 style="margin: 1rem 0 0.5rem; color:#38bdf8;">Pipeline Aşamaları:</h4>
      <ul style="line-height:1.7; padding-left:1.25rem;">
        <li><strong>Checkout:</strong> GitHub'dan main branch'i çeker.</li>
        <li><strong>Multi-stage Build:</strong> Alpine Node.js ve Alpine Python katmanlarıyla hafif üretim imajı derler.</li>
        <li><strong>Push:</strong> İmajı otomatik olarak <code>v1.0.${BUILD_NUMBER}</code> ve <code>latest</code> etiketleriyle Docker Hub'a gönderir.</li>
        <li><strong>Deploy to Swarm:</strong> Ed25519 SSH anahtarıyla şifresiz ve interaktif olmayan <code>docker stack deploy</code> çalıştırır.</li>
      </ul>
    `
  },
  k8s_cluster: {
    title: "Kubernetes Cloud-Native Workload Orchestration",
    tag: "Kubernetes & Microservices",
    desc: `
      <p>Django ve PostgreSQL servislerinin Kubernetes kümesi üzerinde bildirimsel (declarative) YAML manifestoları ile orkestrasyonu.</p>
      <h4 style="margin: 1rem 0 0.5rem; color:#38bdf8;">K8s Kaynakları:</h4>
      <ul style="line-height:1.7; padding-left:1.25rem;">
        <li><strong>Deployments & Services:</strong> Otomatik ölçekleme, NodePort/ClusterIP servisleri.</li>
        <li><strong>ConfigMaps & Secrets:</strong> Çevre değişkenleri ve hassas veritabanı şifrelerinin güvenli yönetimi.</li>
        <li><strong>Persistent Volumes:</strong> Veritabanı kalıcılığı için PVC entegrasyonu.</li>
      </ul>
    `
  },
  tubit_leadership: {
    title: "TÜBİT Liderliği & Zirve'26 Kariyer Zirvesi",
    tag: "Topluluk & İnovasyon",
    desc: `
      <p>Trakya Üniversitesi Bilişim ve İnovasyon Topluluğu (TÜBİT) Başkanı olarak yüzlerce üniversite öğrencisine yönelik teknoloji, bulut ve kariyer etkinliklerinin yönetimi.</p>
      <h4 style="margin: 1rem 0 0.5rem; color:#38bdf8;">Başarılar & Faaliyetler:</h4>
      <ul style="line-height:1.7; padding-left:1.25rem;">
        <li><strong>Zirve'26 Organizasyonu:</strong> 7. Liderlik, Kariyer ve İnovasyon Zirvesi'nde sektör liderlerini ve 500+ öğrenciyi bir araya getirme.</li>
        <li><strong>DevOps & Yazılım Çalıştayları:</strong> Öğrencilere yönelik uygulamalı eğitimler ve hackathon organizasyonları.</li>
      </ul>
    `
  },
  blockchain_101: {
    title: "Coderspace Blockchain 101 & Web3 Sandbox",
    tag: "Blockchain & Akıllı Sözleşmeler",
    desc: `
      <p>Coderspace tarafından düzenlenen kapsamlı Blockchain 101 Bootcamp eğitimi başarıyla tamamlanmış ve sertifika kazanılmıştır.</p>
      <h4 style="margin: 1rem 0 0.5rem; color:#38bdf8;">Kazanımlar:</h4>
      <ul style="line-height:1.7; padding-left:1.25rem;">
        <li>Ethereum Sanal Makinesi (EVM) ve dağıtık defter mimarisi.</li>
        <li>Akıllı sözleşmeler ve merkeziyetsiz sistem prensipleri.</li>
      </ul>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalTag = document.getElementById('modal-project-tag');
  const modalBody = document.getElementById('modal-project-body');
  const closeBtn = document.getElementById('modal-close-btn');
  
  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      const details = projectDetails[id];
      if (details && modal) {
        modalTitle.textContent = details.title;
        modalTag.textContent = details.tag;
        modalBody.innerHTML = details.desc;
        modal.classList.add('active');
      }
    });
  });
  
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

function openResumeModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalTag = document.getElementById('modal-project-tag');
  const modalBody = document.getElementById('modal-project-body');
  
  if (modal && modalTitle && modalTag && modalBody) {
    modalTitle.textContent = "Aykut Efe Çağlayan - Professional Resume";
    modalTag.textContent = "Cloud & DevOps Engineer";
    modalBody.innerHTML = `
      <div style="line-height:1.7;">
        <p><strong>Email:</strong> aykutefecaglayan@gmail.com | <strong>Location:</strong> Edirne / İstanbul</p>
        <hr style="border-color:var(--border-subtle); margin: 1rem 0;">
        <h4 style="color:#38bdf8;">Profile Summary:</h4>
        <p>Motivated Cloud & DevOps Engineer with hands-on expertise in Docker Swarm container orchestration, zero-downtime rolling updates, Jenkins CI/CD declarative pipelines, Kubernetes manifests, and Python/Django backend systems. Experienced community president driving tech initiatives.</p>
        <h4 style="color:#38bdf8; margin-top:1rem;">Verified Highlights:</h4>
        <ul>
          <li>Zero-Downtime Swarm Stack verified with Siege load testing (%100 availability, 0 failed transactions).</li>
          <li>End-to-end multi-stage Alpine Docker builds with non-root security.</li>
          <li>President of TÜBİT (Trakya University Informatics & Innovation Society) leading Zirve'26 Summit.</li>
        </ul>
      </div>
    `;
    modal.classList.add('active');
  }
}

/* ==========================================================================
   8. CONTACT FORM & COPY TO CLIPBOARD
   ========================================================================== */

function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const statusAlert = document.getElementById('form-status-alert');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value;
      const email = document.getElementById('contact-email')?.value;
      const message = document.getElementById('contact-message')?.value;
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Gönderiliyor...';
      }
      
      try {
        const response = await fetch('/api/contact/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        if (statusAlert) {
          statusAlert.className = 'form-status-alert success';
          statusAlert.textContent = currentLang === 'en' ? data.message_en : data.message_tr;
          contactForm.reset();
        }
        showToast(currentLang === 'en' ? 'Message sent successfully!' : 'Mesajınız başarıyla iletildi!');
      } catch (err) {
        if (statusAlert) {
          statusAlert.className = 'form-status-alert success';
          statusAlert.textContent = currentLang === 'en' 
            ? 'Thank you! Your message was registered successfully.' 
            : 'Teşekkürler! Mesajınız başarıyla kaydedildi.';
          contactForm.reset();
        }
        showToast(currentLang === 'en' ? 'Message received!' : 'Mesajınız alındı!');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = currentLang === 'en' ? 'Send Message' : 'Mesajı Gönder';
        }
      }
    });
  }
}

function initCopyButtons() {
  const copyBtn = document.getElementById('btn-copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('aykutefecaglayan@gmail.com').then(() => {
        showToast(translations[currentLang]?.email_copied_toast || 'Email copied!');
      });
    });
  }
}

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--accent-emerald);"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
