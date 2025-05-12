document.addEventListener('DOMContentLoaded', function() {
    // Load articles
    loadArticles();
    
    // Initialize filter buttons
    initializeFilters();
    
    // Initialize search
    initializeSearch();
});

// Load articles
function loadArticles(category = 'all') {
    const articlesContainer = document.getElementById('articles-container');
    
    if (!articlesContainer) return;
    
    // Sample articles data
    const articles = [
        {
            id: 1,
            title: 'Tips Hemat untuk Mahasiswa Kos di Surabaya Timur',
            category: 'tips-kuliah',
            categoryName: 'Tips Kuliah',
            date: '12 Mei 2025',
            image: 'img/article-1.jpg',
            excerpt: 'Berbagai cara menghemat pengeluaran selama kuliah tanpa mengurangi kualitas hidup.'
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'tips-kuliah',
            categoryName: 'Tips Kuliah',
            date: '10 Mei 2025',
            image: 'img/article-2.jpg',
            excerpt: 'Strategi belajar online yang efektif untuk mahasiswa di era digital.'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'teknologi',
            categoryName: 'Teknologi',
            date: '8 Mei 2025',
            image: 'img/article-3.jpg',
            excerpt: 'Pilihan gadget terbaik untuk menunjang kegiatan perkuliahan dengan budget terbatas.'
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'gaya-hidup',
            categoryName: 'Gaya Hidup',
            date: '5 Mei 2025',
            image: 'img/article-4.jpg',
            excerpt: 'Rekomendasi tempat nongkrong dengan harga terjangkau untuk mahasiswa di Surabaya.'
        },
        {
            id: 5,
            title: 'Menjaga Kesehatan Mental Selama Kuliah',
            category: 'kesehatan',
            categoryName: 'Kesehatan',
            date: '3 Mei 2025',
            image: 'img/article-5.jpg',
            excerpt: 'Tips menjaga kesehatan mental di tengah padatnya aktivitas perkuliahan.'
        },
        {
            id: 6,
            title: 'Aplikasi Wajib untuk Mahasiswa',
            category: 'teknologi',
            categoryName: 'Teknologi',
            date: '1 Mei 2025',
            image: 'img/article-6.jpg',
            excerpt: 'Daftar aplikasi yang membantu meningkatkan produktivitas mahasiswa.'
        }
    ];
    
    // Filter articles by category if needed
    const filteredArticles = category === 'all' 
        ? articles 
        : articles.filter(article => article.category === category);
    
    // Generate HTML for articles
    let articlesHTML = '';
    
    if (filteredArticles.length === 0) {
        articlesHTML = '<div class="no-results">Tidak ada artikel yang ditemukan.</div>';
    } else {
        filteredArticles.forEach(article => {
            articlesHTML += `
                <div class="article-card">
                    <a href="artikel-detail.html?id=${article.id}">
                        <div class="article-image">
                            <img src="${article.image}" alt="${article.title}">
                        </div>
                        <div class="article-info">
                            <div class="article-date">${article.date} • ${article.categoryName}</div>
                            <h3 class="article-title">${article.title}</h3>
                            <p class="article-excerpt">${article.excerpt}</p>
                        </div>
                    </a>
                </div>
            `;
        });
    }
    
    articlesContainer.innerHTML = articlesHTML;
}

// Initialize filter buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Load articles with selected category
            loadArticles(category);
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('artikel-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                // If search term is too short, show all articles
                loadArticles(getActiveCategory());
                return;
            }
            
            // Get all article cards
            const articleCards = document.querySelectorAll('.article-card');
            
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
                
                // Show/hide based on search term
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show message if no results
            const visibleCards = document.querySelectorAll('.article-card[style="display: none;"]');
            const noResults = document.querySelector('.no-results');
            
            if (visibleCards.length === articleCards.length) {
                if (!noResults) {
                    const container = document.getElementById('articles-container');
                    container.innerHTML += '<div class="no-results">Tidak ada artikel yang ditemukan.</div>';
                }
            } else {
                if (noResults) {
                    noResults.remove();
                }
            }
        });
    }
}

// Get active category
function getActiveCategory() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.getAttribute('data-category') : 'all';
}