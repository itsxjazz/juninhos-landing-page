const API_BASE_URL = 'https://localhost:5000/api';
const loginForm = document.getElementById('form-login');
const registerForm = document.getElementById('form-register');
const resetPassword = document.getElementById('form-forgot');
// File: frontend/js/auth.js

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');
    const loadingScreen = document.getElementById('loading');

    if (token) {
        // Add a slight delay to allow the user to see the loading state
        setTimeout(() => {
            window.location.href = 'portal.html';
        }, 1200);
    } else {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }
});
const AuthUI = {
    // Pegando as abas e links
    tabLogin: document.getElementById('tab-login'),
    tabRegister: document.getElementById('tab-register'),
    linkForgot: document.getElementById('link-forgot'),
    linkBackLogin: document.getElementById('link-back-login'),

    // Pegando os formulários e views
    formLogin: document.getElementById('form-login'),
    formRegister: document.getElementById('form-register'),
    mainView: document.getElementById('auth-main-view'),
    forgotView: document.getElementById('auth-forgot-view'),
    feedback: document.getElementById('auth-feedback'),

    // Funções para trocar as telas
    showLogin: () => {
        AuthUI.formRegister.classList.add('hidden');
        AuthUI.formLogin.classList.remove('hidden');
        AuthUI.tabRegister.classList.remove('active');
        AuthUI.tabLogin.classList.add('active');
        AuthUI.clearFeedback();
    },

    showRegister: () => {
        AuthUI.formLogin.classList.add('hidden');
        AuthUI.formRegister.classList.remove('hidden');
        AuthUI.tabLogin.classList.remove('active');
        AuthUI.tabRegister.classList.add('active');
        AuthUI.clearFeedback();
    },

    showForgot: () => {
        AuthUI.mainView.classList.add('hidden');
        AuthUI.forgotView.classList.remove('hidden');
        AuthUI.clearFeedback();
    },

    showMainFromForgot: () => {
        AuthUI.forgotView.classList.add('hidden');
        AuthUI.mainView.classList.remove('hidden');
        AuthUI.showLogin(); // Garante que volta na aba de login
    },

    showMessage: (msg, type = 'error') => {
        AuthUI.feedback.textContent = msg;
        AuthUI.feedback.className = `form-feedback ${type}`; // type pode ser 'error' ou 'success'
        AuthUI.feedback.classList.remove('hidden');

        // Trigger the blink animation
        AuthUI.feedback.classList.remove('blink-animation');
        void AuthUI.feedback.offsetWidth; // Force a reflow to restart the animation
        AuthUI.feedback.classList.add('blink-animation');

        // Scroll the screen to focus on the feedback message
        AuthUI.feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    clearFeedback: () => {
        AuthUI.feedback.classList.add('hidden');
        AuthUI.feedback.textContent = '';
    }
};

// Atrelando os eventos de clique aos botões de navegação
AuthUI.tabLogin.addEventListener('click', AuthUI.showLogin);
AuthUI.tabRegister.addEventListener('click', AuthUI.showRegister);
AuthUI.linkForgot.addEventListener('click', (e) => {
    e.preventDefault();
    AuthUI.showForgot();
});
AuthUI.linkBackLogin.addEventListener('click', (e) => {
    e.preventDefault();
    AuthUI.showMainFromForgot();
});

// CPF Mask
const cpfInput = document.getElementById('register-cpf');
if (cpfInput) {
    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        let formattedValue = value;
        if (value.length > 9) {
            formattedValue = value.replace(
                /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                '$1.$2.$3-$4'
            );
        } else if (value.length > 6) {
            formattedValue = value.replace(
                /(\d{3})(\d{3})(\d{1,3})/,
                '$1.$2.$3'
            );
        } else if (value.length > 3) {
            formattedValue = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        }

        e.target.value = formattedValue;
    });
}

// Name Mask (Only letters and spaces)
const nameInput = document.getElementById('register-name');
if (nameInput) {
    nameInput.addEventListener('input', function (e) {
        // Remove numbers and special characters, keeping only letters (including accents) and spaces
        e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = 'portal.html';
            } else {
                AuthUI.showMessage(data.error, 'error');
            }
        } catch (error) {
            AuthUI.showMessage('Servidor indisponível.', 'error');
        }
    });
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
        return false;

    let soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const cpf = document.getElementById('register-cpf').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById(
            'confirm-register-password'
        ).value;

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validarCPF(cpf)) {
            AuthUI.showMessage('CPF inválido.', 'error');
            return;
        }

        let cpfClean = cpf.replace(/\D/g, '');

        if (!regexEmail.test(email)) {
            AuthUI.showMessage('Formato de email inválido.', 'error');
            return;
        }

        if (password.length < 8) {
            AuthUI.showMessage(
                'A senha deve ter pelo menos 8 caracteres.',
                'error'
            );
            return;
        }

        const regraSenhaForte = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

        if (!regraSenhaForte.test(password)) {
            AuthUI.showMessage(
                'A senha precisa ter uma letra maiúscula, um número e um símbolo (!@#$%).',
                'error'
            );
            return;
        }

        if (password !== confirmPassword) {
            AuthUI.showMessage('As senhas não coincidem.', 'error');

            confirmPassword.value = '';
            confirmPassword.focus();
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, cpf: cpfClean, password })
            });

            const data = await response.json();
            if (response.ok) {
                AuthUI.showMessage('Usuário cadastrado com sucesso!', 'success');
                setTimeout(() => {
                    AuthUI.showLogin();
                }, 3000);
            } else {
                AuthUI.showMessage(data.error, 'error');
            }
        } catch (error) {
            AuthUI.showMessage('Servidor indisponível.', 'error');
        }
    });
}

if (resetPassword) {
    resetPassword.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('forgot-email').value;

        try {
            const response = await fetch(
                'http://localhost:5000/api/forgot-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert('E-mail de redefinição enviado com sucesso.');
            } else {
                AuthUI.showMessage(data.error || data.message, 'error');
            }
        } catch (error) {
            AuthUI.showMessage('Servidor indisponível.', 'error');
        }
    });
}
