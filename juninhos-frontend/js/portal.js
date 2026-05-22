async function carregarDados() {
    const response = await ApiService.fetchWithAuth('/api/portal');

    if (response) {
        const data = await response.json();
    }
}

// Authentication Check & Logout Logic
document.addEventListener('DOMContentLoaded', () => {
    // Check if token exists, if not redirect to login
    const token = localStorage.getItem('auth_token');
    if (!token) {
        window.location.href = 'login.html';
    }

    // Logout functionality
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            const loadingScreen = document.getElementById('loading');
            if (loadingScreen) {
                loadingScreen.querySelector('p').textContent = 'Saindo do sistema...';
                loadingScreen.classList.remove('hidden');
            }
            
            localStorage.removeItem('auth_token');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1200);
        });
    }
});
