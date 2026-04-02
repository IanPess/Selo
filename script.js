// Mobile Menu Toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Smooth Scrolling for Navigation Links
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

        // Header Background on Scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Função genérica (reutilizável)
function criarContador(dataAlvo, ids, containerClass) {
    function atualizar() {
        const agora = new Date().getTime();
        const distancia = dataAlvo.getTime() - agora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById(ids.days).textContent = dias.toString().padStart(2, '0');
        document.getElementById(ids.hours).textContent = horas.toString().padStart(2, '0');
        document.getElementById(ids.minutes).textContent = minutos.toString().padStart(2, '0');
        document.getElementById(ids.seconds).textContent = segundos.toString().padStart(2, '0');

        if (distancia < 0) {
            document.querySelector(containerClass).innerHTML = '<h3>Inscrições Abertas!</h3>';
        }
    }

    setInterval(atualizar, 1000);
    atualizar();
}

// 🎯 CONTADOR 1 — 18 de Maio
criarContador(
    new Date(2026, 4, 18, 23, 59, 59), // mês começa em 0 (4 = maio)
    {
        days: 'days1',
        hours: 'hours1',
        minutes: 'minutes1',
        seconds: 'seconds1'
    },
    '.countdown:nth-child(1)'
);

// 🎯 CONTADOR 2 — 19 de Maio
criarContador(
    new Date(2026, 4, 19, 23, 59, 59),
    {
        days: 'days2',
        hours: 'hours2',
        minutes: 'minutes2',
        seconds: 'seconds2'
    },
    '.countdown:nth-child(2)'
);
// CARROSSEL FUNCTIONALITY
// ============================================
let currentSlide = 0;
const carrossel = document.getElementById('carrossel');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = document.querySelectorAll('.empresa-card').length;
let autoplayInterval;

function updateCarrossel() {
    if (!carrossel) return;
    
    carrossel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarrossel();
    resetAutoplay();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarrossel();
    resetAutoplay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarrossel();
    resetAutoplay();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Start autoplay when DOM is ready
if (carrossel) {
    startAutoplay();
}

// Touch support for mobile
let startX = 0;
let startY = 0;

const carrosselContainer = document.querySelector('.carrossel-container');

if (carrosselContainer) {
    carrosselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    carrosselContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });
}

// Pause autoplay on hover
if (carrosselContainer) {
    carrosselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carrosselContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

// ============================================
// FAQ ACCORDION EFFECT
// ============================================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === 'block';
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Toggle current answer
        if (!isOpen) {
            answer.style.display = 'block';
            answer.style.animation = 'fadeInUp 0.3s ease';
        }
    });
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    section.style.backgroundColor = '#fffbf0';
                    setTimeout(() => {
                        section.style.backgroundColor = '';
                    }, 2000);
                }
            });
        }
    });
}

// ============================================
// SCROLL ANIMATION FOR CARDS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.company-card, .partner-logo, .faq-category, .reveal').forEach(el => {
    observer.observe(el);
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', new Date().getFullYear());
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));


// ============================================
// MOBILE MENU TOGGLE
// ============================================
function checkMobile() {
    const navLinks = document.querySelector('.nav-links');
    const searchBox = document.querySelector('.search-box');
    
    if (window.innerWidth <= 768) {
        if (navLinks) navLinks.style.display = 'none';
        if (searchBox) searchBox.style.display = 'none';
    } else {
        if (navLinks) navLinks.style.display = 'flex';
        if (searchBox) searchBox.style.display = 'block';
    }
}

window.addEventListener('resize', checkMobile);
checkMobile();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// KEYBOARD NAVIGATION FOR CARROSSEL
// ============================================
document.addEventListener('keydown', (e) => {
    if (!carrossel) return;
    
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Qualification Carousel
let currentQualificationSlide = 0;
const qualificationCards = document.querySelectorAll('.qualification-card');
const qualificationTrack = document.querySelector('.qualification-carousel-track');
const qualificationDots = document.querySelectorAll('.qualification-dot');

function updateQualificationCarousel() {
    if (!qualificationTrack) return;
    
    const cardWidth = qualificationCards[0].offsetWidth;
    const gap = 32; // 2rem gap
    
    // Para dispositivos móveis, mostra 1 card
    // Para tablets, mostra 2 cards
    // Para desktop, mostra 3 cards
    let cardsToShow = 3;
    if (window.innerWidth <= 768) {
        cardsToShow = 1;
    } else if (window.innerWidth <= 1024) {
        cardsToShow = 2;
    }
    
    const translateValue = -(currentQualificationSlide * (cardWidth + gap));
    qualificationTrack.style.transform = `translateX(${translateValue}px)`;
    
    // Update dots
    qualificationDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentQualificationSlide) {
            dot.classList.add('active');
        }
    });
}

function moveQualificationCarousel(direction) {
    const totalSlides = qualificationCards.length;
    let maxSlide = totalSlides - 3;
    
    if (window.innerWidth <= 768) {
        maxSlide = totalSlides - 1;
    } else if (window.innerWidth <= 1024) {
        maxSlide = totalSlides - 2;
    }
    
    currentQualificationSlide += direction;
    
    if (currentQualificationSlide < 0) {
        currentQualificationSlide = maxSlide;
    } else if (currentQualificationSlide > maxSlide) {
        currentQualificationSlide = 0;
    }
    
    updateQualificationCarousel();
}

function goToQualificationSlide(index) {
    currentQualificationSlide = index;
    updateQualificationCarousel();
}

// Auto-play carousel
let qualificationAutoplay = setInterval(() => {
    moveQualificationCarousel(1);
}, 5000);

// Pause autoplay on hover
const qualificationContainer = document.querySelector('.qualification-carousel-container');
if (qualificationContainer) {
    qualificationContainer.addEventListener('mouseenter', () => {
        clearInterval(qualificationAutoplay);
    });

    qualificationContainer.addEventListener('mouseleave', () => {
        qualificationAutoplay = setInterval(() => {
            moveQualificationCarousel(1);
        }, 5000);
    });
}

// Companies Carousel
let currentCompanySlide = 0;
const companyCards = document.querySelectorAll('.company-card');
const companiesTrack = document.querySelector('.companies-track');

function updateCompaniesCarousel() {
    if (!companiesTrack) return;
    
    const cardWidth = companyCards[0].offsetWidth;
    const gap = 32; // 2rem gap
    
    let cardsToShow = 3;
    if (window.innerWidth <= 768) {
        cardsToShow = 1;
    } else if (window.innerWidth <= 1024) {
        cardsToShow = 2;
    }
    
    const translateValue = -(currentCompanySlide * (cardWidth + gap));
    companiesTrack.style.transform = `translateX(${translateValue}px)`;
}

function moveCompanies(direction) {
    const totalSlides = companyCards.length;
    let maxSlide = totalSlides - 3;
    
    if (window.innerWidth <= 768) {
        maxSlide = totalSlides - 1;
    } else if (window.innerWidth <= 1024) {
        maxSlide = totalSlides - 2;
    }
    
    currentCompanySlide += direction;
    
    if (currentCompanySlide < 0) {
        currentCompanySlide = maxSlide;
    } else if (currentCompanySlide > maxSlide) {
        currentCompanySlide = 0;
    }
    
    updateCompaniesCarousel();
}

// FAQ Toggle
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const allQuestions = document.querySelectorAll('.faq-question');
    const allAnswers = document.querySelectorAll('.faq-answer');
    
    // Close all other FAQs
    allQuestions.forEach(q => {
        if (q !== button) {
            q.classList.remove('active');
        }
    });
    
    allAnswers.forEach(a => {
        if (a !== answer) {
            a.style.maxHeight = null;
        }
    });
    
    // Toggle current FAQ
    button.classList.toggle('active');
    
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2025-03-15T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const timeBoxes = document.querySelectorAll('.time-box');
    if (timeBoxes.length >= 4) {
        timeBoxes[0].querySelector('.time').textContent = days;
        timeBoxes[1].querySelector('.time').textContent = hours;
        timeBoxes[2].querySelector('.time').textContent = minutes;
        timeBoxes[3].querySelector('.time').textContent = seconds;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scrolling for navigation links
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

// Update carousels on window resize
window.addEventListener('resize', () => {
    updateQualificationCarousel();
    updateCompaniesCarousel();
});

// Initialize carousels on page load
window.addEventListener('load', () => {
    updateQualificationCarousel();
    updateCompaniesCarousel();
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

        // Toggle mobile menu
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        // Smooth scroll for anchor links
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
