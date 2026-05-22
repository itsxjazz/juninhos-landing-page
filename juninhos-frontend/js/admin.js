// admin.js - Logic for the Admin Panel

document.addEventListener('DOMContentLoaded', () => {
    // Basic Auth Check for Admin (Mock)
    const token = localStorage.getItem('auth_token');
    if (!token) {
        // In a real app, you'd also check if the token belongs to an admin
        window.location.href = 'login.html';
    }

    // Tab Switching Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-target]');
    const tabContents = document.querySelectorAll('.admin-tab-content');
    const pageTitle = document.getElementById('admin-page-title');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links and tabs
            sidebarLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked link
            e.target.classList.add('active');

            // Show target tab
            const targetId = e.target.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Update page title
            pageTitle.textContent = e.target.textContent.trim();
        });
    });

    // Exit Panel Functionality (Return to Portal)
    const btnLogout = document.getElementById('btn-admin-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            const loadingScreen = document.getElementById('loading');
            if (loadingScreen) {
                loadingScreen.querySelector('p').textContent = 'Voltando ao portal...';
                loadingScreen.classList.remove('hidden');
            }
            
            setTimeout(() => {
                window.location.href = 'portal.html';
            }, 800);
        });
    }

    // Hide loading screen after initial 'load'
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500); // Simulate brief load time for the dashboard
    }
});
