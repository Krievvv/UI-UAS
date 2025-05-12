document.addEventListener('DOMContentLoaded', function() {
    // Load articles
    loadArticles();
    
    // Initialize add article button
    initializeAddArticleButton();
});

// Load articles
function loadArticles() {
    const articlesTableBody = document.getElementById('articles-table-body');
    
    if (!articlesTableBody) return;
    
    // Sample articles data
    const articles = [
        {
            id: 1,
            title: 'Tips Hemat untuk Mahasiswa Kos di Surabaya Timur',
            category: 'Tips Kuliah',
            status: 'published',
            date: '12 Mei 2025',
            views: 1500
        },
        {
            id: 2,
            title: 'Cara Efektif Belajar Online',
            category: 'Tips Kuliah',
            status: 'draft',
            date: '10 Mei 2025',
            views: 800
        },
        {
            id: 3,
            title: 'Rekomendasi Gadget untuk Mahasiswa',
            category: 'Teknologi',
            status: 'published',
            date: '8 Mei 2025',
            views: 1200
        }
    ];
    
    // Generate articles HTML
    let articlesHTML = '';
    
    articles.forEach((article, index) => {
        articlesHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${article.title}</td>
                <td>${article.category}</td>
                <td><span class="status-badge ${article.status}">${article.status}</span></td>
                <td>${article.date}</td>
                <td>${article.views}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${article.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${article.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    articlesTableBody.innerHTML = articlesHTML;
}

// Initialize add article button
function initializeAddArticleButton() {
    const addArticleBtn = document.getElementById('add-article-btn');
    
    if (!addArticleBtn) return;
    
    addArticleBtn.addEventListener('click', function() {
        openModal('article-modal');
    });
}