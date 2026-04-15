/* =====================================================
   DISTRIBUIDORA DOÑA DELIA - DYNAMIC INTERACTIONS
   ===================================================== */

// ─── Age Gate ───
function enterSite() {
    const ageGate = document.getElementById('ageGate');
    ageGate.classList.add('hidden');
    setTimeout(() => {
        ageGate.style.display = 'none';
        document.getElementById('promoBanner').style.display = 'block';
    }, 500);
    sessionStorage.setItem('ageVerified', 'true');
}

// Check if already verified
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('ageVerified') === 'true') {
        const ageGate = document.getElementById('ageGate');
        ageGate.style.display = 'none';
        document.getElementById('promoBanner').style.display = 'block';
    }

    createParticles();
    initCounters();
});

// ─── Floating Particles ───
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';

        // Random colors between gold and red
        const colors = ['#D4A03C', '#F5C845', '#FFD700', '#EF5350', '#D32F2F'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;

        container.appendChild(particle);
    }
}

// ─── Navbar Scroll Effect ───
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;

    if (scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = scrollY;

    // Update active link
    updateActiveNavLink();
});

// ─── Active Navigation Link ───
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ─── Mobile Menu Toggle ───
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.getElementById('mobileToggle');
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const toggle = document.getElementById('mobileToggle');
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
    });
});

// ─── Scroll Reveal Animations ───
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ─── Counter Animation ───
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ─── Product Filtering ───
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.product-filter-btn');

    // Update active button
    buttons.forEach(btn => {
        btn.style.background = 'var(--black-card)';
        btn.style.color = 'var(--gray-light)';
        btn.style.border = '1px solid rgba(255,255,255,0.1)';
    });

    const activeBtn = event.currentTarget;
    activeBtn.style.background = 'linear-gradient(135deg, var(--red-primary), var(--red-dark))';
    activeBtn.style.color = 'white';
    activeBtn.style.border = '1px solid var(--red-primary)';

    cards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'todos' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        } else {
            card.style.display = 'none';
        }
    });
}

// ─── Order via WhatsApp ───
function orderProduct(productName) {
    const message = encodeURIComponent(`Hola Doña Delia, me interesa pedir: ${productName}. ¿Está disponible?`);
    window.open(`https://wa.me/59165259865?text=${message}`, '_blank');
}

// ─── Product Details Modal ───
function showDetails(name, description, price) {
    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;

    const message = encodeURIComponent(`Hola Doña Delia, quiero información sobre: ${name}`);
    document.getElementById('modalOrderBtn').href = `https://wa.me/59165259865?text=${message}`;

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Close modal on outside click
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) {
        closeModal();
    }
});

// ─── Lightbox Gallery ───
function openLightbox(element) {
    const img = element.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeModal();
    }
});

// ─── Contact Form → WhatsApp ───
function submitForm(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const producto = document.getElementById('producto').value;
    const mensaje = document.getElementById('mensaje').value;

    let whatsappMessage = `¡Hola Doña Delia! 👋\n\n`;
    whatsappMessage += `📋 *Consulta desde el sitio web*\n\n`;
    whatsappMessage += `👤 *Nombre:* ${nombre}\n`;
    whatsappMessage += `📞 *Teléfono:* ${telefono}\n`;

    if (producto) {
        whatsappMessage += `🍺 *Producto:* ${producto}\n`;
    }

    if (mensaje) {
        whatsappMessage += `💬 *Mensaje:* ${mensaje}\n`;
    }

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/59165259865?text=${encodedMessage}`, '_blank');
}

// ─── Smooth Scroll for Navigation Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ─── Dynamic Time Display ───
function updateOpenStatus() {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();

    let isOpen = false;
    if (day >= 1 && day <= 6) {
        isOpen = hours >= 8 && hours < 22;
    } else {
        isOpen = hours >= 9 && hours < 20;
    }

    // You can use this to show open/closed status dynamically
    const statusElements = document.querySelectorAll('.location-card .location-icon');
    if (statusElements.length > 2) {
        const clockIcon = statusElements[2];
        if (isOpen) {
            clockIcon.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
            clockIcon.textContent = '🟢';
        } else {
            clockIcon.style.background = 'linear-gradient(135deg, #EF5350, #B71C1C)';
            clockIcon.textContent = '🔴';
        }
    }
}

updateOpenStatus();
setInterval(updateOpenStatus, 60000);

// ─── Parallax Effect on Hero ───
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }
});

// ─── Typing Effect for Hero Subtitle ───
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ─── Dynamic Year in Footer ───
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
}

// ─── Product Card Hover Sound Effect (visual only - ripple) ───
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// ─── Floating WhatsApp visibility on scroll ───
const whatsappFloat = document.getElementById('whatsappFloat');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.transform = 'scale(1)';
    } else {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0.5)';
    }
});

// Initial state
if (whatsappFloat) {
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.transform = 'scale(0.5)';
    whatsappFloat.style.transition = 'all 0.4s ease';
}

console.log('🍺 Distribuidora Doña Delia - Sucre, Bolivia');
console.log('📞 WhatsApp: +591 65259865');
