const resetPasswordForm = document.getElementById('password-reset-form');

const AuthUI = {
    feedback: document.getElementById('reset-feedback'),

    showMessage: (msg, type = 'error') => {
        AuthUI.feedback.textContent = msg;
        AuthUI.feedback.className = `form-feedback ${type}`;
        AuthUI.feedback.classList.remove('hidden');
    },

    clearFeedback: () => {
        AuthUI.feedback.classList.add('hidden');
        AuthUI.feedback.textContent = '';
    }
};

if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword =
            document.getElementById('confirm-password').value;

        if (newPassword.length < 8) {
            AuthUI.showMessage(
                'A senha deve ter pelo menos 8 caracteres.',
                'error'
            );
            return;
        }

        const regraSenhaForte = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*'])/;
        console.log(newPassword, confirmPassword);

        if (!regraSenhaForte.test(newPassword)) {
            AuthUI.showMessage(
                'A senha precisa ter uma letra maiúscula, um número e um símbolo (!@#$%).',
                'error'
            );
            return;
        }

        console.log(newPassword, confirmPassword);
        if (newPassword != confirmPassword) {
            AuthUI.showMessage('As senhas não conferem');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            AuthUI.showMessage('Link de recuperação inválido ou ausente.');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/reset-password/${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password: newPassword })
                }
            );

            const data = await response.json();

            if (response.ok) {
                AuthUI.showMessage(
                    'Senha alterada com sucesso! Redirecionando...',
                    'sucess'
                );

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                AuthUI.showMessage(
                    data.error || data.message || 'Erro ao alterar senha',
                    'error'
                );
            }
        } catch (error) {
            console.log('Erro na requisição: ', error);
            AuthUI.showMessage('Servidor indisponível.', 'error');
        }
    });
}
