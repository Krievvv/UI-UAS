document.addEventListener('DOMContentLoaded', function () {
    // Load articles
    loadArticles();

    // Initialize filter buttons
    initializeFilters();

    // Initialize search
    initializeSearch();

    // Initialize mobile menu
    initializeMobileMenu();
});

const ITEMS_PER_PAGE = 6; // Number of articles per page
let currentPage = 1;

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
            image: 'https://osccdn.medcom.id/images/content/2024/08/27/8d005a005f1bdeb16cc53303df5eb9eb.png',
            excerpt: 'Berbagai cara menghemat pengeluaran selama kuliah tanpa mengurangi kualitas hidup.'
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'tips-kuliah',
            categoryName: 'Tips Kuliah',
            date: '10 Mei 2025',
            image: 'https://adminsekolah.net/wp-content/uploads/2020/07/TIPS-SUKSES-BELAJAR-ONLINE.png',
            excerpt: 'Strategi belajar online yang efektif untuk mahasiswa di era digital.'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'teknologi',
            categoryName: 'Teknologi',
            date: '8 Mei 2025',
            image: 'https://i.pinimg.com/736x/53/16/d4/5316d4847dfbdd7239114a07f51a8e68.jpg',
            excerpt: 'Pilihan gadget terbaik untuk menunjang kegiatan perkuliahan dengan budget terbatas.'
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'gaya-hidup',
            categoryName: 'Gaya Hidup',
            date: '5 Mei 2025',
            image: 'https://awsimages.detik.net.id/community/media/visual/2024/04/18/rekomendasi-kafe-di-surabaya-3.jpeg?w=1200',
            excerpt: 'Rekomendasi tempat nongkrong dengan harga terjangkau untuk mahasiswa di Surabaya.'
        },
        {
            id: 5,
            title: 'Menjaga Kesehatan Mental Selama Kuliah',
            category: 'kesehatan',
            categoryName: 'Kesehatan',
            date: '3 Mei 2025',
            image: 'https://i.pinimg.com/736x/b8/44/f3/b844f30d2abd25b8d4d06a8c3ce55731.jpg',
            excerpt: 'Tips menjaga kesehatan mental di tengah padatnya aktivitas perkuliahan.'
        },
        {
            id: 6,
            title: 'Aplikasi Wajib untuk Mahasiswa',
            category: 'teknologi',
            categoryName: 'Teknologi',
            date: '1 Mei 2025',
            image: 'https://i.pinimg.com/736x/60/d6/89/60d689b8064ba23914e8c4f474925476.jpg',
            excerpt: 'Daftar aplikasi yang membantu meningkatkan produktivitas mahasiswa.'
        },
        {
            id: 7,
            title: 'Tips Manajemen Waktu Kuliah',
            category: 'tips-kuliah',
            categoryName: 'Tips Kuliah',
            date: '29 April 2025',
            image: 'https://i.pinimg.com/736x/16/64/d1/1664d1ffe14e265aae698430801ab768.jpg',
            excerpt: 'Cara efektif mengatur waktu antara kuliah, organisasi, dan kehidupan pribadi.'
        },
        {
            id: 8,
            title: 'Smartphone Budget untuk Mahasiswa',
            category: 'teknologi',
            categoryName: 'Teknologi',
            date: '27 April 2025',
            image: 'https://i.pinimg.com/736x/ca/f9/90/caf9901cb64381fba49ed13f9b8ccb14.jpg',
            excerpt: 'Rekomendasi smartphone terbaik dengan harga terjangkau untuk mahasiswa.'
        },
        {
            id: 9,
            title: 'Olahraga Praktis di Kos',
            category: 'kesehatan',
            categoryName: 'Kesehatan',
            date: '25 April 2025',
            image: 'https://i.pinimg.com/736x/1f/b5/bf/1fb5bf6b9575d8f772b91512ed64fef8.jpg',
            excerpt: 'Rutinitas olahraga sederhana yang bisa dilakukan di kamar kos.'
        },
        {
            id: 10,
            title: 'Wisata Kuliner Murah Surabaya',
            category: 'gaya-hidup',
            categoryName: 'Gaya Hidup',
            date: '23 April 2025',
            image: 'https://i.pinimg.com/736x/78/8c/69/788c694e92dfe12a7fcb419ee472afd2.jpg',
            excerpt: 'Tempat makan enak dan murah untuk mahasiswa di Surabaya.'
        },
        {
            id: 11,
            title: 'Software Gratis untuk Mahasiswa',
            category: 'teknologi',
            categoryName: 'Teknologi',
            date: '21 April 2025',
            image: 'https://i.pinimg.com/736x/57/46/8d/57468d8387042651790a73ade6a0d224.jpg',
            excerpt: 'Kumpulan software dan aplikasi gratis yang berguna untuk mahasiswa.'
        },
        {
            id: 12,
            title: 'Nutrisi Sehat untuk Produktivitas',
            category: 'kesehatan',
            categoryName: 'Kesehatan',
            date: '19 April 2025',
            image: 'https://i.pinimg.com/736x/2e/9a/3d/2e9a3deaaac76111e1126c112631f18f.jpg',
            excerpt: 'Panduan pola makan sehat untuk meningkatkan fokus dan produktivitas.'
        },
        {
            id: 13,
            title: 'Tips Presentasi yang Efektif',
            category: 'tips-kuliah',
            categoryName: 'Tips Kuliah',
            date: '17 April 2025',
            image: 'https://i.pinimg.com/736x/39/43/63/394363c859dab4dd0391003687424142.jpg',
            excerpt: 'Cara membuat dan menyampaikan presentasi yang menarik dan efektif.'
        },
        {
            id: 14,
            title: 'Hobi Kreatif untuk Mahasiswa',
            category: 'gaya-hidup',
            categoryName: 'Gaya Hidup',
            date: '15 April 2025',
            image: 'https://i.pinimg.com/736x/68/56/aa/6856aa19dbf51a196711b033a5b8e79e.jpg',
            excerpt: 'Ide hobi kreatif yang bisa menghasilkan uang tambahan.'
        }
    ];

    // Filter articles by category if needed
    const filteredArticles = category === 'all'
        ? articles
        : articles.filter(article => article.category === category);

    // Calculate pagination
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    // Generate HTML for articles
    let articlesHTML = '';

    if (paginatedArticles.length === 0) {
        articlesHTML = '<div class="no-results">Tidak ada artikel yang ditemukan.</div>';
    } else {
        paginatedArticles.forEach(article => {
            articlesHTML += `
                <div class="blog-card">
                    <a href="artikel-detail.html?id=${article.id}">
                        <div class="blog-image">
                            <img src="${article.image}" alt="${article.title}">
                            <span class="blog-category">${article.categoryName}</span>
                        </div>
                        <div class="blog-content">
                            <div class="blog-date">
                                <i class="far fa-calendar-alt"></i>
                                ${article.date}
                            </div>
                            <h3 class="blog-title">${article.title}</h3>
                            <p class="blog-excerpt">${article.excerpt}</p>
                            <span class="blog-read-more">Baca selengkapnya <i class="fas fa-arrow-right"></i></span>
                        </div>
                    </a>
                </div>
            `;
        });
    }

    articlesContainer.innerHTML = articlesHTML;
    updatePagination(totalPages);
}

// Update pagination buttons
function updatePagination(totalPages) {
    const pagination = document.querySelector('.pagination');
    
    // Update prev/next buttons state
    let paginationHTML = `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" onclick="changePage('prev')">Sebelumnya</button>
    `;

    // Generate page number buttons
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="pagination-btn ${currentPage === i ? 'active' : ''}" 
                    onclick="changePage(${i})">${i}</button>
        `;
    }

    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage('next')">Selanjutnya</button>
    `;

    pagination.innerHTML = paginationHTML;
}

// Handle page changes
function changePage(page) {
    if (page === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (page === 'next') {
        currentPage++;
    } else if (typeof page === 'number') {
        currentPage = page;
    }

    // Scroll to top of the page smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    loadArticles(getActiveCategory());
}

// Initialize filter buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentPage = 1; // Reset to first page when changing category
            const category = this.getAttribute('data-category');
            loadArticles(category);
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('artikel-search');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            currentPage = 1; // Reset to first page when searching
            const searchTerm = this.value.toLowerCase().trim();

            if (searchTerm.length < 2) {
                loadArticles(getActiveCategory());
                return;
            }

            // Get all article cards
            const articleCards = document.querySelectorAll('.blog-card');

            articleCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

                // Show/hide based on search term
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show message if no results
            const visibleCards = document.querySelectorAll('.blog-card[style="display: none;"]');
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

// Initialize mobile menu
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Make functions available globally
window.changePage = changePage;