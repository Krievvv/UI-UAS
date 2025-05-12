document.addEventListener('DOMContentLoaded', function() {
    // Get article ID from URL
    const articleId = getUrlParam('id') || 1;
    
    // Load article content
    loadArticleContent(articleId);
    
    // Load related articles
    loadRelatedArticles(articleId);
});

// Load article content
function loadArticleContent(articleId) {
    const articleContent = document.getElementById('article-content');
    
    if (!articleContent) return;
    
    // Sample article data
    const articles = [
        {
            id: 1,
            title: 'Tips Hemat untuk Mahasiswa Kos di Surabaya Timur',
            category: 'Tips Kuliah',
            date: '12 Mei 2025',
            author: 'Admin',
            image: 'img/article-detail.jpg',
            content: `
                <p>Sebagai mahasiswa yang tinggal di kos di daerah Surabaya Timur, mengatur keuangan dengan baik adalah keterampilan penting yang harus dikuasai. Artikel ini akan membahas berbagai tips dan trik untuk menghemat pengeluaran selama kuliah.</p>

                <h2>1. Manajemen Uang Saku</h2>
                <p>Langkah pertama dalam menghemat adalah dengan membuat anggaran bulanan. Pisahkan kebutuhan primer seperti uang kos, makan, dan transportasi dari kebutuhan sekunder. Gunakan aplikasi pencatat keuangan untuk memantau pengeluaran Anda.</p>

                <h2>2. Tips Belanja Hemat</h2>
                <p>Belanja kebutuhan sehari-hari di pasar tradisional seperti Pasar Keputran atau Pasar Tambakrejo bisa menghemat banyak uang dibandingkan belanja di supermarket. Belilah bahan makanan dalam jumlah yang cukup untuk seminggu untuk menghindari pemborosan.</p>

                <h2>3. Transportasi Ekonomis</h2>
                <p>Gunakan transportasi umum seperti angkot atau bus Suroboyo. Jika kampus tidak terlalu jauh, pertimbangkan untuk berjalan kaki atau bersepeda. Selain menghemat uang, ini juga baik untuk kesehatan.</p>

                <h2>4. Manfaatkan Promo dan Diskon</h2>
                <p>Banyak restoran dan toko di sekitar kampus yang menawarkan diskon khusus untuk mahasiswa. Selalu bawa kartu mahasiswa Anda dan tanyakan apakah ada promo khusus. Manfaatkan juga promo dari aplikasi belanja online dan ojek online.</p>

                <h2>5. Berbagi Biaya dengan Teman</h2>
                <p>Berbagi biaya untuk kebutuhan bersama seperti wifi, listrik, atau bahkan makanan dengan teman kos dapat menghemat pengeluaran. Anda juga bisa berbagi biaya transportasi jika memiliki tujuan yang sama.</p>

                <p>Dengan menerapkan tips-tips di atas, Anda dapat menghemat pengeluaran dan mengelola keuangan dengan lebih baik selama masa kuliah. Ingat, menghemat bukan berarti pelit, tetapi bijak dalam menggunakan uang.</p>
            `
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'Tips Kuliah',
            date: '10 Mei 2025',
            author: 'Admin',
            image: 'img/article-2.jpg',
            content: `
                <p>Belajar online telah menjadi bagian penting dari pendidikan modern, terutama sejak pandemi. Artikel ini membahas strategi efektif untuk memaksimalkan pembelajaran online.</p>

                <h2>1. Ciptakan Ruang Belajar yang Nyaman</h2>
                <p>Dedikasikan area khusus untuk belajar yang bebas dari gangguan. Pastikan area tersebut memiliki pencahayaan yang baik, kursi yang nyaman, dan meja yang cukup luas untuk peralatan belajar Anda.</p>

                <h2>2. Kelola Waktu dengan Bijak</h2>
                <p>Buat jadwal belajar yang konsisten dan patuhi jadwal tersebut. Gunakan teknik Pomodoro (belajar selama 25 menit, istirahat 5 menit) untuk menjaga fokus dan produktivitas.</p>

                <h2>3. Aktif Berpartisipasi</h2>
                <p>Jangan hanya menjadi pendengar pasif dalam kelas online. Ajukan pertanyaan, berpartisipasi dalam diskusi, dan berinteraksi dengan dosen dan sesama mahasiswa untuk meningkatkan pemahaman.</p>

                <h2>4. Manfaatkan Sumber Daya Online</h2>
                <p>Selain materi kuliah, manfaatkan sumber belajar online seperti video tutorial, artikel ilmiah, dan forum diskusi untuk memperdalam pemahaman Anda tentang topik yang dipelajari.</p>

                <h2>5. Jaga Kesehatan Fisik dan Mental</h2>
                <p>Istirahat yang cukup, olahraga teratur, dan makan makanan bergizi sangat penting untuk menjaga kesehatan dan kemampuan belajar. Jangan lupa untuk beristirahat sejenak dari layar untuk mengurangi kelelahan mata.</p>

                <p>Dengan menerapkan strategi-strategi di atas, Anda dapat meningkatkan efektivitas belajar online dan mencapai hasil akademik yang lebih baik.</p>
            `
        }
    ];
    
    // Find article by ID
    const article = articles.find(article => article.id === parseInt(articleId)) || articles[0];
    
    // Generate article HTML
    const articleHTML = `
        <h1 class="article-title">${article.title}</h1>
        
        <div class="article-meta">
            <div class="article-date">
                <i class="fas fa-calendar"></i>
                <span>${article.date}</span>
            </div>
            <div class="article-author">
                <i class="fas fa-user"></i>
                <span>${article.author}</span>
            </div>
            <div class="article-actions">
                <button class="action-btn">
                    <i class="fas fa-share-alt"></i>
                    <span>Bagikan</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-bookmark"></i>
                    <span>Simpan</span>
                </button>
            </div>
        </div>

        <div class="article-featured-image">
            <img src="${article.image}" alt="${article.title}">
        </div>

        <div class="article-content">
            ${article.content}
        </div>
    `;
    
    articleContent.innerHTML = articleHTML;
    
    // Update page title
    document.title = `${article.title} - AndyShop`;
}

// Load related articles
function loadRelatedArticles(currentArticleId) {
    const relatedArticlesContainer = document.getElementById('related-articles');
    
    if (!relatedArticlesContainer) return;
    
    // Sample related articles data
    const relatedArticles = [
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'Tips Kuliah',
            date: '10 Mei 2025',
            image: 'img/article-2.jpg'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            date: '8 Mei 2025',
            image: 'img/article-3.jpg'
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'Gaya Hidup',
            date: '5 Mei 2025',
            image: 'img/article-4.jpg'
        }
    ].filter(article => article.id !== parseInt(currentArticleId));
    
    // Generate HTML for related articles
    let articlesHTML = '';
    
    relatedArticles.forEach(article => {
        articlesHTML += `
            <div class="article-card">
                <a href="artikel-detail.html?id=${article.id}">
                    <div class="article-image">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="article-info">
                        <h4 class="article-title">${article.title}</h4>
                        <div class="article-date">${article.date}</div>
                    </div>
                </a>
            </div>
        `;
    });
    
    relatedArticlesContainer.innerHTML = articlesHTML;
}