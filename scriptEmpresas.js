// MENU MOBILE
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// DADOS
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

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    renderCompanies();
    setupEventListeners();
});

// RENDER
function renderCompanies() {
    const grid = document.getElementById('companiesGrid');
    const filtered = filterCompanies();
    const toShow = filtered.slice(0, displayedCompanies);
    
    grid.innerHTML = '';
    
    if (toShow.length === 0) {
        document.getElementById('noResults').classList.add('active');
        return;
    }
    
    document.getElementById('noResults').classList.remove('active');
    
    toShow.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';

        card.innerHTML = `
            <div class="card-image">
                <img src="${company.image}">
            </div>
            <h3>${company.name}</h3>
            <p>${company.description}</p>
        `;
        
        grid.appendChild(card);
    });
}

// FILTRO
function filterCompanies() {
    return companies.filter(company => {
        const matchFilter = currentFilter === 'todos' || company.category === currentFilter;

        const matchSearch =
            company.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            company.location.toLowerCase().includes(currentSearch.toLowerCase());

        return matchFilter && matchSearch;
    });
}

// EVENTOS
function setupEventListeners() {

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            currentFilter = this.dataset.filter;
            renderCompanies();
        });
    });

    document.getElementById('searchInput').addEventListener('input', function(e) {
        currentSearch = e.target.value;
        renderCompanies();
    });
}