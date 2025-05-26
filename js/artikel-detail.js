document.addEventListener('DOMContentLoaded', function () {
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
            `
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
            `
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'teknologi',
            date: '8 Mei 2025',
            author: 'Admin',
            image: 'https://i.pinimg.com/736x/53/16/d4/5316d4847dfbdd7239114a07f51a8e68.jpg',
            content: `
                <p>Rekomendasi HP Terbaik 2025: Spek Mantap, Harga Terjangkau!</p>

                <h2>1. Samsung Galaxy A55 5G</h2>
                <p>Samsung Galaxy A55 5G menjadi pilihan menarik untuk kamu yang ingin HP dengan tampilan premium dan performa seimbang. Dukungan update software yang panjang juga jadi nilai tambah.</p>
                
                <h2>2. Samsung Galaxy A55 5G</h2>
                <p>Samsung Galaxy A55 5G menjadi pilihan menarik untuk kamu yang ingin HP dengan tampilan premium dan performa seimbang. Dukungan update software yang panjang juga jadi nilai tambah.</p>
                
                <h2>3. Samsung Galaxy A55 5G</h2>
                <p>Samsung Galaxy A55 5G menjadi pilihan menarik untuk kamu yang ingin HP dengan tampilan premium dan performa seimbang. Dukungan update software yang panjang juga jadi nilai tambah.</p>
                
                <h2>4. Samsung Galaxy A55 5G</h2>
                <p>Samsung Galaxy A55 5G menjadi pilihan menarik untuk kamu yang ingin HP dengan tampilan premium dan performa seimbang. Dukungan update software yang panjang juga jadi nilai tambah.</p>

                <p>Memilih HP terbaik harus disesuaikan dengan kebutuhan kamu. Jika kamu fokus pada fotografi, Redmi Note 13 Pro dan Infinix Zero 30 5G bisa jadi pilihan. Tapi jika kamu butuh performa kencang untuk game, POCO X6 Pro 5G adalah jawabannya.</p>
            `
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'gaya-hidup',
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
            image: 'https://adminsekolah.net/wp-content/uploads/2020/07/TIPS-SUKSES-BELAJAR-ONLINE.png'
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            date: '8 Mei 2025',
            image: 'https://i.pinimg.com/736x/53/16/d4/5316d4847dfbdd7239114a07f51a8e68.jpg'
        },
        {
            id: 4,
            title: 'Tempat Nongkrong Murah di Surabaya',
            category: 'Gaya Hidup',
            date: '5 Mei 2025',
            image: 'https://awsimages.detik.net.id/community/media/visual/2024/04/18/rekomendasi-kafe-di-surabaya-3.jpeg?w=1200'
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