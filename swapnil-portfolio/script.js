const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const revealElements = document.querySelectorAll('.reveal');
const typingSpans = document.querySelectorAll('.typing-wrap span');

const projectDetails = {
  shopnest: {
    title: 'ShopNest',
    description: 'Full-stack e-commerce platform with signup/login, product browsing, cart, wishlist, orders, admin dashboard, user management and sales analytics.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
    features: ['Signup/Login', 'Product browsing', 'Cart and wishlist', 'Orders', 'Admin dashboard', 'User management', 'Sales analytics', 'Responsive UI'],
    work: 'Built a complete e-commerce web app with user and admin workflows, database-driven product management and analytics-focused reporting.',
    github: ''
  },
  harryshop: {
    title: 'HarryShop',
    description: 'Built a relational e-commerce database in MySQL and performed SQL-based analysis across customers, products, orders, order items and payments.',
    technologies: ['MySQL', 'SQL', 'Relational Database', 'Data Analysis'],
    features: ['Database creation', 'Relational design', 'Primary and Foreign Keys', 'SELECT queries', 'WHERE', 'ORDER BY', 'GROUP BY', 'COUNT', 'SUM', 'AVG', 'JOINs', 'Order analysis', 'Product analysis', 'Payment method analysis'],
    work: 'Created a relational database for an e-commerce workflow and analyzed customer, product and payment trends using SQL queries and data aggregation.',
    github: ''
  },
  'user-registration': {
    title: 'User Registration System',
    description: 'Registration workflow with REST APIs, MongoDB integration, duplicate email validation and a registered users list.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'HTML', 'CSS', 'JavaScript'],
    features: ['User registration', 'REST APIs', 'MongoDB integration', 'Duplicate email validation', 'Registered users list', 'Total users counter'],
    work: 'Built a backend-driven registration system with validation and database persistence for user data and registration tracking.',
    github: ''
  },
  'car-rental': {
    title: 'Car Rental System',
    description: 'Rental booking platform covering vehicle selection, time windows, company filtering and license verification.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'ImageKit'],
    features: ['Vehicle selection', 'Pickup and drop schedule', 'Company selection', '4/5/6/7 seater options', 'Manual/Automatic', 'Petrol/Diesel/CNG/Electric', 'Driving license upload', 'License validity verification', 'Booking management'],
    work: 'Created a multi-step booking flow with filtering, validation and storage of bookings and vehicle-related details.',
    github: ''
  },
  'school-management': {
    title: 'School Management System',
    description: 'Management-focused web application designed for streamlined academic workflows and information tracking.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    features: ['Management workflows', 'Database-backed operations', 'Responsive UI', 'Student information support'],
    work: 'Designed a management-oriented application to support administrative workflows with a database-backed backend and responsive frontend.',
    github: ''
  },
  sixart: {
    title: 'SixArt AI Dashboard',
    description: 'Worked on the SixArt AI dashboard and related content workflows including templates, Explore page content and AI media support.',
    technologies: ['Dashboard', 'Templates', 'Explore', 'AI content', 'Marketing'],
    features: ['Dashboard management', 'Templates', 'Explore page content', 'AI image/video/music content', 'Content organization', 'AI marketing support', 'Promotional content'],
    work: 'Supported dashboard and content management work for AI-generated media and product promotion within the SixArt ecosystem.',
    github: ''
  }
};

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.body.classList.remove('dark', 'light');
  document.body.classList.add(theme);

  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);
    themeIcon.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((item) => observer.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add('is-visible'));
}

if (typingSpans.length) {
  let index = 0;

  function cycleTyping() {
    typingSpans.forEach((span, i) => {
      span.classList.toggle('is-visible', i === index);
    });

    index = (index + 1) % typingSpans.length;
  }

  cycleTyping();

  if (!prefersReducedMotion) {
    setInterval(cycleTyping, 1800);
  }
}

const projectCards = document.querySelectorAll('.project-card');
const filterButtons = document.querySelectorAll('.filter-btn');

function applyFilter(filter) {
  projectCards.forEach((card) => {
    const category = card.dataset.category || '';
    const visible = filter === 'all' || category.includes(filter);
    card.style.display = visible ? 'flex' : 'none';
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    applyFilter(button.dataset.filter);
  });
});

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalFeatures = document.getElementById('modalFeatures');
const modalWork = document.getElementById('modalWork');
const modalGitHub = document.getElementById('modalGitHub');
const modalClose = document.querySelector('.modal-close');

function openModal(projectKey) {
  const project = projectDetails[projectKey];
  if (!project || !modal) return;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTech.innerHTML = project.technologies.map((item) => `<span>${item}</span>`).join('');
  modalFeatures.innerHTML = project.features.map((item) => `<li>${item}</li>`).join('');
  modalWork.textContent = project.work;

  modalGitHub.innerHTML = project.github
    ? `<a class="btn btn-primary" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>`
    : '';

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-btn').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-close="modal"]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

const heroScene = document.querySelector('.visual-scene');
const hoverCards = document.querySelectorAll('.hero-card, .project-card, .skill-group, .profile-3d-card, .ai-card');

if (!prefersReducedMotion) {
  hoverCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 14;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  document.addEventListener('pointermove', (event) => {
    if (heroScene) {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      heroScene.style.transform = `rotateX(${(-y).toFixed(2)}deg) rotateY(${(x).toFixed(2)}deg)`;
    }
  });

  document.addEventListener('pointerleave', () => {
    if (heroScene) heroScene.style.transform = '';
  });
}

const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (status) {
      status.textContent = 'This form is front-end only and ready for a backend connection when you are ready.';
    }
    form.reset();
  });
}

const promptButtons = document.querySelectorAll('.prompt-sample');
const toast = document.getElementById('promptToast');

promptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!toast) return;
    toast.textContent = button.dataset.prompt;
    toast.classList.remove('hidden');
    clearTimeout(window.promptToastTimer);
    window.promptToastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2400);
  });
});

const resumePdfPath = 'Swapnil_Patil_Resume_Updated3.pdf';

const openResume = () => {
  window.open(resumePdfPath, '_blank', 'noopener,noreferrer');
};

const downloadButtons = document.querySelectorAll('#downloadResume, #downloadResumeBottom, #resumeButton');
downloadButtons.forEach((button) => {
  button.addEventListener('click', openResume);
});

initTheme();
applyFilter('all');
