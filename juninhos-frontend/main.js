const CONFIG = {
    API_BASE_URL: 'https://localhost:5000/api',
    ENDPOINTS: {
        PROJECTS: '/projects',
        CLASSES: '/classes',
        WAITLIST: '/waitlist'
    },
    RETRY_DELAY: 5000
};

const AuthLogic = {
    // Gerenciamento de Autenticação
    TOKEN_KEY: 'auth_token',
    removeToken: () => localStorage.removeItem('auth_token'),

    logout: () => {
        localStorage.removeItem('auth_token');
        window.location.replace('login.html');
    },

    checkSession: () => {
        if (!localStorage.getItem('auth_token')) {
            window.location.replace('login.html');
        }
    }
};

const UI = {
    // Cache de elementos do DOM para fácil acesso e manipulação
    projectsContainer: document.getElementById('projects-container'),
    classesContainer: document.getElementById('classes-container'),
    waitlistForm: document.getElementById('waitlist-form'),
    loadingOverlay: document.getElementById('loading'),
    formFeedback: document.getElementById('form-feedback'),
    modal: document.getElementById('modal'),
    closeModalBtn: document.getElementById('btn-close-modal'),
    openModalBtns: document.querySelectorAll('.btn-open-modal'),
    logoutBtn: document.getElementById('btn-logout')
};

const AppUtils = {
    // Funções auxiliares para manipulação de UI e formatação de dados
    showLoading: () => UI.loadingOverlay.classList.remove('hidden'),
    hideLoading: () => UI.loadingOverlay.classList.add('hidden'),
    formatStatusClass: (status) => {
        if (!status) return 'default';
        return status
            .toLowerCase()
            .replace(/\s+/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    },
    showMessage: (text, type = 'success') => {
        UI.formFeedback.textContent = text;
        UI.formFeedback.className = `form-feedback ${type}`;
        UI.formFeedback.classList.remove('hidden');
    }
};

const ModalLogic = {
    // Lógica para abrir e fechar o modal, incluindo a restauração do conteúdo original do formulário se necessário
    open: () => {
        // Abre o modal e impede o scroll do body para focar a atenção do usuário
        UI.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },
    close: () => {
        // Fecha o modal e permite o scroll do body novamente, além de restaurar o conteúdo original do formulário se ele tiver sido modificado
        UI.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';

        const formWrapper = UI.modal.querySelector('.form-wrapper');
        if (UI.modal.dataset.originalContent) {
            formWrapper.innerHTML = UI.modal.dataset.originalContent;
            UI.waitlistForm = document.getElementById('waitlist-form');
            UI.waitlistForm.addEventListener(
                'submit',
                Handlers.handleFormSubmit
            );
            delete UI.modal.dataset.originalContent;
        }
    }
};

const ApiService = {
    // Funções para fazer requests HTTP e lidar com erros
    async fetchWithAuth(endpoint, options = {}) {
        try {
            const token = AuthLogic.getToken();
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };

            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
                ...options,
                headers
            });
            if (!response.ok) throw new Error('Waking up');
            return await response.json();
        } catch (error) {
            return null;
        }
    },

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error('Waking up');
            return await response.json();
        } catch (error) {
            return null;
        }
    },
    async postData(endpoint, data) {
        // Função para enviar dados para o backend, com tratamento de erros e mensagens de feedback
        const response = await this.fetchWithAuth(
            `${CONFIG.API_BASE_URL}${endpoint}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Erro');
        return result;
    }
};

const Renderers = {
    // Funções para renderizar dados na tela, incluindo skeletons de carregamento e formatação de status
    showSkeletons(container, count = 3) {
        container.innerHTML = Array(count)
            .fill(
                `
            <div class="skeleton-card">
                <div class="skeleton-img skeleton"></div>
                <div class="skeleton-title skeleton"></div>
                <div class="skeleton-text skeleton"></div>
            </div>
        `
            )
            .join('');
    },
    renderProjects(projects) {
        // Função para renderizar os projetos na tela, com tratamento de casos onde não há projetos ou campos faltando
        if (!projects || projects.length === 0) return false;
        UI.projectsContainer.innerHTML = projects
            .map((p) => {
                // Se o link da imagem não termina com extensão de imagem, usa um placeholder
                const imageSrc =
                    p.links.imagem &&
                    p.links.imagem.match(/\.(jpeg|jpg|gif|png|webp)$/i)
                        ? p.links.imagem
                        : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400';

                return `
                <article class="card-item project-card">
                    <div class="project-image"><img src="${imageSrc}" alt="${p.titulo}"></div>
                    <div class="card-body">
                        <span class="status-badge ${AppUtils.formatStatusClass(p.status)}">${p.status}</span>
                        <h3>${p.titulo}</h3>
                        <p>${p.descricao}</p>
                        
                        <div class="project-stack">
                            <strong>Stack:</strong> ${p.stack.join(', ')}
                        </div>
                        <div class="project-members">
                            <strong>Membros:</strong> ${p.membros.join(', ')}
                        </div>

                        <div class="card-footer">
                            ${p.links.deploy ? `<a href="${p.links.deploy}" target="_blank" class="link-btn primary">Deploy</a>` : ''}
                            ${p.links.github ? `<a href="${p.links.github}" target="_blank" class="link-btn secondary">GitHub</a>` : ''}
                        </div>
                    </div>
                </article>
            `;
            })
            .join('');
        return true;
    },
    renderClasses(classes) {
        // Função para renderizar as aulas na tela, com tratamento de casos onde não há aulas ou campos faltando
        if (!classes || classes.length === 0) return false;
        UI.classesContainer.innerHTML = classes
            .map(
                (c) => `
            <article class="card-item class-card">
                <div class="card-body">
                    <span class="status-badge ${AppUtils.formatStatusClass(c.status)}">${c.status}</span>
                    <h3>${c.titulo}</h3>
                    <p>${c.desc}</p>
                    <p><strong>Mentor:</strong> ${c.mentor}</p>
                    <p><strong>Data:</strong> ${c.data}</p>
                    <p><strong>Canal:</strong> ${c.canal}</p>
                    </div>
                </div>
            </article>
        `
            )
            .join('');
        return true;
    }
};

const Handlers = {
    // Funções para lidar com eventos e formulários
    async handleFormSubmit(e) {
        e.preventDefault();

        const formWrapper = UI.modal.querySelector('.form-wrapper');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        if (!UI.modal.dataset.originalContent) {
            UI.modal.dataset.originalContent = formWrapper.innerHTML;
        }

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            level: document.querySelector('input[name="level"]:checked')?.value,
            areas: Array.from(
                document.querySelectorAll('input[name="areas"]:checked')
            ).map((cb) => cb.value),
            technologies: document.getElementById('technologies').value
        };

        if (!formData.level || formData.areas.length === 0)
            return AppUtils.showMessage('Campos obrigatórios!', 'error');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        AppUtils.showLoading();

        try {
            const res = await ApiService.postData(
                CONFIG.ENDPOINTS.WAITLIST,
                formData
            );

            formWrapper.innerHTML = `
                <div class="success-state">
                    <h3>Tudo certo!</h3>
                    <p class="success-msg">${res.message}</p>
                    <button class="nav-cta btn-success-close" onclick="ModalLogic.close()">Entendido</button>
                </div>
            `;
        } catch (err) {
            AppUtils.showMessage(err.message, 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            delete UI.modal.dataset.originalContent;
        } finally {
            AppUtils.hideLoading();
        }
    }
};

const NavLogic = {
    // Lóigica de funcionamento do menu para destktop / celular
    toggleMenu: () => {
        UI.navMenu.classList.toggle('active');
        UI.mobileMenuBtn.classList.toggle('active');

        if (UI.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    },

    closeMenu: () => {
        UI.navMenu.classList.remove('active');
        UI.mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    scrollToSection: (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = 80;
            const sectionPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });

            NavLogic.closeMenu();
        }
    }
};

const FormMasks = {
    phone: (value) => {
        if (!value) return '';
        value = value.replace(/\D/g, ''); // Remove tudo que não é número
        value = value.replace(/(\d{2})(\d)/, '($1) $2'); // Coloca parênteses no DDD
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca o hífen no número
        return value.substring(0, 15); // Limita ao tamanho máximo
    }
};

async function init() {
    // Função de inicialização para carregar os projetos e aulas, com retry automático em caso de falha
    AuthLogic.checkSession();
    Renderers.showSkeletons(UI.projectsContainer, 3);
    Renderers.showSkeletons(UI.classesContainer, 2);

    const load = async () => {
        const p = await ApiService.fetchData(CONFIG.ENDPOINTS.PROJECTS);
        const c = await ApiService.fetchData(CONFIG.ENDPOINTS.CLASSES);
        if (p) Renderers.renderProjects(p);
        if (c) Renderers.renderClasses(c);
        if (!p || !c) setTimeout(load, CONFIG.RETRY_DELAY);
    };
    load();
}

UI.openModalBtns.forEach((btn) =>
    btn.addEventListener('click', ModalLogic.open)
);
UI.closeModalBtn.addEventListener('click', ModalLogic.close);
if (UI.waitlistForm)
    UI.waitlistForm.addEventListener('submit', Handlers.handleFormSubmit);
window.addEventListener('DOMContentLoaded', init);

if (UI.phoneInput)
    UI.phoneInput.addEventListener('input', (e) => {
        e.target.value = FormMasks.phone(e.target.value);
    });

if (UI.logoutBtn) UI.logoutBtn.addEventListener('click', AuthLogic.logout);

if (UI.mobileMenuBtn) {
    UI.mobileMenuBtn.addEventListener('click', NavLogic.toggleMenu);
}

UI.navLinks.forEach((link) => {
    link.addEventListener('click', NavLogic.closeMenu);
});

const navCtaBtn = document.querySelector('.nav-menu .nav-cta');
if (navCtaBtn) {
    navCtaBtn.addEventListener('click', NavLogic.closeMenu);
}

UI.navMenu.addEventListener('click', (e) => {
    if (e.target === UI.navMenu) {
        NavLogic.closeMenu();
    }
});

window.addEventListener('DOMContentLoaded', init);
