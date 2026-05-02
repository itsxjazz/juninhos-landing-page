const API_BASE_URL = 'https://localhost:5500/api';
const loginForm = document.getElementById('form-login');
const registerForm = document.getElementById('form-register');
const msgFeedback = document.getElementById('msg');

// File: frontend/js/auth.js

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

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(
                `${process.env.API_BASE_URL}/api/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();

            if (response.ok) {
                AuthLogic.saveToken(data.token);
                Window.location.href = 'portal.html';

                AuthUI.showMessage('Erro ao fazer login.', 'error');
                // if (msgFeedback) {
                //     msgFeedback.textContent =
                //         data.error || data.message || 'Erro ao fazer login.';
                //     msgFeedback.style.color = 'red';
                // }
            }
        } catch (error) {
            if (msgFeedback) msgFeedback.textContent = 'Servidor indisponível.';
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById(
            'confirm-register-password'
        ).value;

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
            const response = fetch(`${process.env.API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    body: JSON.stringify({ name, email, password: senha })
                }
            });

            const dados = response.json();

            if (response.ok) {
                AuthLogic.saveToken(data.token);
                Window.location.href = 'login.html';

                if (msgFeedback) {
                    msgFeedback.textContent =
                        data.error || data.message || 'Erro ao fazer login.';
                    msgFeedback.style.color = 'red';
                }
            }
        } catch (error) {
            AuthUI.showMessage('Servidor indisponível.', 'error');
        }
    });
}

async function login(email, senha) {
    try {
        // Envia o email e senha para validação na api
        const resposta = await fetch('https://localhost:5500/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                body: JSON.stringify({ email, password: senha })
            }
        });

        // Recebe a resposta da api transformada em json
        const dados = await responsta.json();

        // Se a requisição/login for realizado com sucesso
        if (resposta.ok) {
            // Salva o token no storage do navegador
            localStorage.setItem('auth_token', dados.token);

            // Redireciona para o portal
            window.location.href = 'portal.html';
        } else {
            alert('Erro: ' + dados.error);
        }
    } catch (error) {}
}
