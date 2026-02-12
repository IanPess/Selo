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

        // Countdown Timer
        function updateCountdown() {
            // Set target date (you can modify this)
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate());
            targetDate.setHours(23, 59, 59, 999);
            
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            if (distance < 0) {
                document.querySelector('.countdown').innerHTML = '<h3>Inscrições Abertas!</h3>';
            }
        }
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // ============================================
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



// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Sample data - In production, this would come from an API/database
        const companies = [
            {
                id: 1,
                name: "Hotel Rural Araçatuba",
                category: "hotelaria",
                description: "Especializado em turismo rural e ecoturismo, oferecendo experiências autênticas na natureza com conforto e sustentabilidade.",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2023",
                tags: ["Ecoturismo", "Sustentável", "Natureza"]
            },
            {
                id: 2,
                name: "Agência Roteiros",
                category: "turismo",
                description: "Agência receptiva especializada em roteiros personalizados pela região, conectando turistas aos melhores atrativos locais.",
                image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2023",
                tags: ["Roteiros", "Personalizado", "Receptivo"]
            },
            {
                id: 3,
                name: "Restaurante Típico",
                category: "gastronomia",
                description: "Gastronomia regional autêntica, valorizando ingredientes locais e tradições culinárias da região de Araçatuba.",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2023",
                tags: ["Regional", "Autêntico", "Local"]
            },
            {
                id: 4,
                name: "Pousada Vista Verde",
                category: "hotelaria",
                description: "Pousada boutique com vista privilegiada para áreas verdes, oferecendo experiência única de hospedagem e lazer em meio à natureza.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
                location: "Interior de SP",
                year: "2024",
                tags: ["Boutique", "Natureza", "Conforto"]
            },
            {
                id: 5,
                name: "Café Artesanal Grãos Nobres",
                category: "gastronomia",
                description: "Cafeteria especializada em cafés especiais da região, com torrefação própria e ambiente aconchegante para apreciadores da bebida.",
                image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2024",
                tags: ["Café Especial", "Artesanal", "Torrefação"]
            },
            {
                id: 6,
                name: "Aventura Extrema",
                category: "turismo",
                description: "Operadora de turismo de aventura oferecendo rafting, rapel, trilhas ecológicas e experiências radicais com total segurança.",
                image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80",
                location: "Região Tietê",
                year: "2023",
                tags: ["Aventura", "Radical", "Segurança"]
            },
            {
                id: 7,
                name: "Spa Bem-Estar Completo",
                category: "servicos",
                description: "Centro de bem-estar com tratamentos holísticos, massagens terapêuticas e programas de relaxamento para corpo e mente.",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2024",
                tags: ["Bem-estar", "Relaxamento", "Terapias"]
            },
            {
                id: 8,
                name: "Empório Regional Sabores",
                category: "comercio",
                description: "Loja especializada em produtos regionais, artesanato local e iguarias típicas, valorizando produtores da região.",
                image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2023",
                tags: ["Regional", "Artesanato", "Produtores Locais"]
            },
            {
                id: 9,
                name: "Fazenda Experiência Rural",
                category: "turismo",
                description: "Turismo rural com atividades interativas, ordenha, cavalgadas e vivência autêntica do dia a dia no campo para toda família.",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
                location: "Interior de SP",
                year: "2024",
                tags: ["Rural", "Família", "Vivência"]
            },
            {
                id: 10,
                name: "Churrascaria Tradição Gaúcha",
                category: "gastronomia",
                description: "Churrascaria premium com cortes nobres, buffet completo e ambiente tradicional gaúcho com música ao vivo nos finais de semana.",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2023",
                tags: ["Churrasco", "Premium", "Tradição"]
            },
            {
                id: 11,
                name: "Resort Águas Claras",
                category: "hotelaria",
                description: "Resort all-inclusive com parque aquático, atividades recreativas e infraestrutura completa para férias inesquecíveis.",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
                location: "Região Tietê",
                year: "2024",
                tags: ["Resort", "All-inclusive", "Lazer"]
            },
            {
                id: 12,
                name: "Transporte Turístico Premium",
                category: "servicos",
                description: "Serviço de transporte executivo para turistas com veículos modernos, motoristas bilíngues e roteiros personalizados.",
                image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
                location: "Araçatuba, SP",
                year: "2023",
                tags: ["Transporte", "Executivo", "Conforto"]
            },
            {
                id: 13,
                name: "IFSP",
                category: "servicos",
                description: "Serviços de educação.",
                image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
                location: "Birigui, SP",
                year: "2023",
                tags: ["Transporte", "Executivo", "Conforto"]
            }
        ];

        let displayedCompanies = 9;
        let currentFilter = 'todos';
        let currentSearch = '';

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            renderCompanies();
            setupEventListeners();
        });

        // Render companies
        function renderCompanies() {
            const grid = document.getElementById('companiesGrid');
            const filtered = filterCompanies();
            const toShow = filtered.slice(0, displayedCompanies);
            
            grid.innerHTML = '';
            
            if (toShow.length === 0) {
                document.getElementById('noResults').classList.add('active');
                document.getElementById('loadMoreBtn').style.display = 'none';
                return;
            }
            
            document.getElementById('noResults').classList.remove('active');
            
            toShow.forEach(company => {
                const card = createCompanyCard(company);
                grid.appendChild(card);
            });
            
            // Show/hide load more button
            if (filtered.length > displayedCompanies) {
                document.getElementById('loadMoreBtn').style.display = 'inline-block';
            } else {
                document.getElementById('loadMoreBtn').style.display = 'none';
            }
        }

        // Create company card
        function createCompanyCard(company) {
            const card = document.createElement('div');
            card.className = 'company-card';
            card.setAttribute('data-category', company.category);
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${company.image}" alt="${company.name}">
                    <div class="certified-badge">
                        ✓ Certificado
                    </div>
                </div>
                <div class="card-content">
                    <div class="company-category">${getCategoryName(company.category)}</div>
                    <h3 class="company-name">${company.name}</h3>
                    <p class="company-description">${company.description}</p>
                    <div class="company-tags">
                        ${company.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="company-meta">
                        <div class="meta-item">📍 ${company.location}</div>
                        <div class="meta-item">📅 Desde ${company.year}</div>
                    </div>
                </div>
            `;
            
            return card;
        }

        // Get category name in Portuguese
        function getCategoryName(category) {
            const names = {
                'hotelaria': 'Hotelaria',
                'turismo': 'Turismo',
                'gastronomia': 'Gastronomia',
                'servicos': 'Serviços',
                'comercio': 'Comércio'
            };
            return names[category] || category;
        }

        // Filter companies
        function filterCompanies() {
            return companies.filter(company => {
                const matchesFilter = currentFilter === 'todos' || company.category === currentFilter;
                const matchesSearch = currentSearch === '' || 
                    company.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                    company.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                    company.location.toLowerCase().includes(currentSearch.toLowerCase()) ||
                    company.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
                
                return matchesFilter && matchesSearch;
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            // Filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.getAttribute('data-filter');
                    displayedCompanies = 9;
                    renderCompanies();
                });
            });

            // Search input
            document.getElementById('searchInput').addEventListener('input', function(e) {
                currentSearch = e.target.value;
                displayedCompanies = 9;
                renderCompanies();
            });

            // Load more button
            document.getElementById('loadMoreBtn').addEventListener('click', function() {
                displayedCompanies += 9;
                renderCompanies();
            });
        }

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