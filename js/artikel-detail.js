document.addEventListener('DOMContentLoaded', function () {
    // Get article ID from URL
    const articleId = getUrlParam('id') || 1;

    // Load article content
    loadArticleContent(articleId);

    // Load related articles
    loadRelatedArticles(articleId);

    // Initialize mobile menu
    initializeMobileMenu();

    // Initialize share buttons
    initializeShareButtons();
});

// Get URL parameter
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load article content
function loadArticleContent(articleId) {
    const articleContent = document.getElementById('article-content');
    const breadcrumbTitle = document.getElementById('breadcrumb-title');

    if (!articleContent) return;

    // Sample article data
    const articles = [
        {
            id: 1,
            title: 'Tips Hemat untuk Mahasiswa Kos di Surabaya Timur',
            category: 'Tips Kuliah',
            date: '12 Mei 2025',
            author: 'Admin',
            image: 'https://osccdn.medcom.id/images/content/2024/08/27/8d005a005f1bdeb16cc53303df5eb9eb.png',
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
            `,
            tags: ['Hemat', 'Keuangan', 'Mahasiswa', 'Kos']
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'Tips Kuliah',
            date: '10 Mei 2025',
            author: 'Admin',
            image: 'https://adminsekolah.net/wp-content/uploads/2020/07/TIPS-SUKSES-BELAJAR-ONLINE.png',
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
            `,
            tags: ['Belajar Online', 'Produktivitas', 'Pendidikan', 'Teknologi']
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            date: '8 Mei 2025',
            author: 'Admin',
            image: 'https://i.pinimg.com/736x/53/16/d4/5316d4847dfbdd7239114a07f51a8e68.jpg',
            content: `
                <p>Rekomendasi HP Terbaik 2025: Spek Mantap, Harga Terjangkau!</p>

                <h2>1. Samsung Galaxy A55 5G</h2>
                <p>Samsung Galaxy A55 5G menjadi pilihan menarik untuk kamu yang ingin HP dengan tampilan premium dan performa seimbang. Dukungan update software yang panjang juga jadi nilai tambah.</p>
                
                <h2>2. Redmi Note 13 Pro</h2>
                <p>Redmi Note 13 Pro menawarkan kamera utama 200MP yang menghasilkan foto detail tinggi. Layar AMOLED 120Hz membuat pengalaman browsing dan gaming jadi lebih mulus.</p>
                
                <h2>3. POCO X6 Pro 5G</h2>
                <p>POCO X6 Pro 5G hadir dengan chipset MediaTek Dimensity 8300-Ultra yang powerful untuk gaming. Layar AMOLED 120Hz dan pengisian daya cepat 67W melengkapi fitur unggulannya.</p>
                
                <h2>4. Infinix Zero 30 5G</h2>
                <p>Infinix Zero 30 5G menawarkan kamera selfie 50MP yang bisa merekam video 4K, cocok untuk content creator. Desainnya premium dengan layar melengkung dan bodi tipis.</p>

                <p>Memilih HP terbaik harus disesuaikan dengan kebutuhan kamu. Jika kamu fokus pada fotografi, Redmi Note 13 Pro dan Infinix Zero 30 5G bisa jadi pilihan. Tapi jika kamu butuh performa kencang untuk game, POCO X6 Pro 5G adalah jawabannya.</p>
            `,
            tags: ['Gadget', 'Smartphone', 'Teknologi', 'Review']
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'Gaya Hidup',
            date: '5 Mei 2025',
            author: 'Admin',
            image: 'https://awsimages.detik.net.id/community/media/visual/2024/04/18/rekomendasi-kafe-di-surabaya-3.jpeg?w=1200',
            content: `
                <p>Tempat Nongkrong Murah di Surabaya</p>

                <h2>1. Caturra Espresso </h2>
                <p>Caturra Espresso terkenal dengan suasananya yang tenang dan desain interior yang estetik. Cocok banget buat kamu yang mau nugas sambil ngopi.</p>
                
                <h2>2. TBRK (Taman Baca Rumah Kue) </h2>
                <p> Lokasi: Jalan Pucang Anom Timur No.17 </p>
                <p> Harga: Mulai Rp10.000-an </p>
                <p>Tempat ini unik karena menggabungkan konsep taman baca dan tempat makan. Cocok untuk santai sambil baca buku.</p>
                
                <h2>3. Historica Coffee & Pastry</h2>
                <p>Historica punya interior estetik dengan suasana yang chill, pas banget untuk hangout sore atau malam bareng teman.</p>
                
                <h2>4. Carpentier Kitchen</h2>
                <p> Lokasi: Jalan Untung Suropati No.83 Carpentier Kitchen cocok buat nongkrong lama sambil ngobrol, kerja, atau sekadar me time.</p>
                
                <h2>5. Loop Graha Family</h2>
                <p> Lokasi: Jalan Raya Graha Family Loop cocok banget buat nongkrong rame-rame karena pilihan makanannya banyak dan suasananya hidup.</p>

                <p>Surabaya punya banyak tempat nongkrong murah dengan suasana nyaman dan estetika yang oke. Tinggal pilih sesuai mood kamu — mau ngopi, makan kenyang, atau sekadar duduk-duduk cantik sambil ngobrol.</p>
            `,
            tags: ['Cafe', 'Kuliner', 'Surabaya', 'Hangout']
        }
    ];

    // Find article by ID
    const article = articles.find(article => article.id === parseInt(articleId)) || articles[0];

    // Update breadcrumb title
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = article.title;
    }

    // Generate article HTML
    const articleHTML = `
        <div class="blog-detail-header">
            <h1 class="blog-detail-title">${article.title}</h1>
            
            <div class="blog-detail-meta">
                <div class="blog-detail-date">
                    <i class="far fa-calendar-alt"></i>
                    <span>${article.date}</span>
                </div>
                <div class="blog-detail-author">
                    <i class="far fa-user"></i>
                    <span>${article.author}</span>
                </div>
                <div class="blog-detail-category">
                    <i class="far fa-folder"></i>
                    <span>${article.category}</span>
                </div>
            </div>
        </div>

        <div class="blog-detail-image">
            <img src="${article.image}" alt="${article.title}">
        </div>

        <div class="blog-detail-content">
            ${article.content}
        </div>

        <div class="blog-detail-actions">
            <div class="blog-detail-tags">
                ${article.tags.map(tag => `<a href="#" class="blog-tag">${tag}</a>`).join('')}
            </div>
        </div>
    `;

    articleContent.innerHTML = articleHTML;

    // Update page title
    document.title = `${article.title} - KrievvvShop`;
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
            image: 'https://adminsekolah.net/wp-content/uploads/2020/07/TIPS-SUKSES-BELAJAR-ONLINE.png',
            excerpt: 'Strategi belajar online yang efektif untuk mahasiswa di era digital.'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            date: '8 Mei 2025',
            image: 'https://i.pinimg.com/736x/53/16/d4/5316d4847dfbdd7239114a07f51a8e68.jpg',
            excerpt: 'Pilihan gadget terbaik untuk menunjang kegiatan perkuliahan dengan budget terbatas.'
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'Gaya Hidup',
            date: '5 Mei 2025',
            image: 'https://awsimages.detik.net.id/community/media/visual/2024/04/18/rekomendasi-kafe-di-surabaya-3.jpeg?w=1200',
            excerpt: 'Rekomendasi tempat nongkrong dengan harga terjangkau untuk mahasiswa di Surabaya.'
        }
    ].filter(article => article.id !== parseInt(currentArticleId));

    // Generate HTML for related articles
    let articlesHTML = '';

    relatedArticles.forEach(article => {
        articlesHTML += `
            <div class="blog-card">
                <a href="artikel-detail.html?id=${article.id}">
                    <div class="blog-image">
                        <img src="${article.image}" alt="${article.title}">
                        <span class="blog-category">${article.category}</span>
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

    relatedArticlesContainer.innerHTML = articlesHTML;
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

// Initialize share buttons
function initializeShareButtons() {
    const copyLinkBtn = document.getElementById('copy-link');
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Copy current URL to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    // Show success message
                    alert('Link artikel berhasil disalin!');
                })
                .catch(err => {
                    console.error('Gagal menyalin link: ', err);
                });
        });
    }
    
    // Get the current article title and URL for sharing
    const pageTitle = document.title;
    const pageUrl = encodeURIComponent(window.location.href);
    
    // Facebook share
    const facebookBtn = document.querySelector('.share-btn.facebook');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, 
                'facebook-share-dialog', 
                'width=626,height=436');
        });
    }
    
    // Twitter share
    const twitterBtn = document.querySelector('.share-btn.twitter');
    if (twitterBtn) {
        twitterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${pageUrl}`, 
                'twitter-share-dialog', 
                'width=626,height=436');
        });
    }
    
    // WhatsApp share
    const whatsappBtn = document.querySelector('.share-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + decodeURIComponent(pageUrl))}`, 
                '_blank');
        });
    }
    
    // Telegram share
    const telegramBtn = document.querySelector('.share-btn.telegram');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://t.me/share/url?url=${pageUrl}&text=${encodeURIComponent(pageTitle)}`, 
                '_blank');
        });
    }
}

// Function to handle reading time calculation
function calculateReadingTime() {
    const content = document.querySelector('.blog-detail-content');
    if (!content) return;
    
    // Count words (rough estimate)
    const text = content.textContent || content.innerText;
    const wordCount = text.split(/\s+/).length;
    
    // Average reading speed: 200 words per minute
    const readingTime = Math.ceil(wordCount / 200);
    
    // Add reading time to the meta information
    const metaContainer = document.querySelector('.blog-detail-meta');
    if (metaContainer) {
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'blog-detail-reading-time';
        readingTimeElement.innerHTML = `
            <i class="far fa-clock"></i>
            <span>${readingTime} menit membaca</span>
        `;
        metaContainer.appendChild(readingTimeElement);
    }
}

// Function to highlight active category in sidebar
function highlightActiveCategory() {
    const articleContent = document.getElementById('article-content');
    if (!articleContent) return;
    
    // Get category from article meta
    const categoryElement = articleContent.querySelector('.blog-detail-category span');
    if (!categoryElement) return;
    
    const category = categoryElement.textContent.trim().toLowerCase();
    
    // Find and highlight the matching category in sidebar
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        if (linkText === category) {
            link.classList.add('active');
        }
    });
}

// Execute additional functions after content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Calculate reading time after article content is loaded
    setTimeout(calculateReadingTime, 100);
    
    // Highlight active category in sidebar
    setTimeout(highlightActiveCategory, 100);
    
    // Add smooth scrolling for heading links
    document.querySelectorAll('.blog-detail-content h2').forEach(heading => {
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;
        
        // Create anchor link
        const anchor = document.createElement('a');
        anchor.href = `#${id}`;
        anchor.className = 'heading-anchor';
        anchor.innerHTML = '<i class="fas fa-link"></i>';
        
        heading.appendChild(anchor);
    });
});