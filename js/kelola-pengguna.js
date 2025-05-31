document.addEventListener('DOMContentLoaded', function () {
    // Load users
    loadUsers();

    // Initialize add user button
    initializeAddUserButton();
});

// Load users
function loadUsers() {
    const usersTableBody = document.getElementById('users-table-body');

    if (!usersTableBody) return;

    // Sample users data
    const users = [
        {
            id: 1,
            name: 'Pengguna 1',
            email: 'user1@example.com',
            role: 'customer',
            status: 'active',
            dateJoined: '1 Mei 2025',
            orders: 12,
            image: 'https://asset.kompas.com/crops/fpZgmGqFNarH__TJ6gC-ycYe8vY=/14x121:682x566/1200x800/data/photo/2025/01/08/677e3dc66ab65.jpg',
        },
        {
            id: 2,
            name: 'Admin 1',
            email: 'admin1@example.com',
            role: 'admin',
            status: 'active',
            dateJoined: '15 April 2025',
            orders: 0,
            image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Los_Caminos_del_f%C3%BAtbol._Xabi_Alonso_%2839666778464%29_%28cropped%29.jpg',
        },
        {
            id: 3,
            name: 'Pengguna 2',
            email: 'user2@example.com',
            role: 'customer',
            status: 'inactive',
            dateJoined: '1 April 2025',
            orders: 5,
            image: 'https://statik.tempo.co/data/2025/05/05/id_1396565/1396565_720.jpg',
        },
    ];

    // Generate users HTML
    let usersHTML = '';

    users.forEach(user => {
        usersHTML += `
        <tr>
            <td>${user.id}</td>
            <td>
                <div class="user-info">
                    <img src="${user.image}" alt="${user.name}" class="user-image">
                    <span class="user-name">${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.role}">${user.role}</span></td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>${user.dateJoined}</td>
            <td>${user.orders}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${user.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
    });


    usersTableBody.innerHTML = usersHTML;
}

// Initialize add user button
function initializeAddUserButton() {
    const addUserBtn = document.getElementById('add-user-btn');

    if (!addUserBtn) return;

    addUserBtn.addEventListener('click', function () {
        openModal('user-modal');
    });
}