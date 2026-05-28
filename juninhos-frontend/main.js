const CONFIG = {
    API_BASE_URL: 'https://juninhos-landing-page.onrender.com/api',
    ENDPOINTS: {
        PROJECTS: '/projects',
        CLASSES: '/classes',
        WAITLIST: '/waitlist',
        INSTRUCTOR: '/instructor',
        SUPPORTERS: '/supporters' // preparado pro endpoint real quando o backend implementar
    },
    RETRY_DELAY: 5000
};

// MOCK temporário comentado
/*
const MOCK_SUPPORTERS = [
    { name: 'Ana Costa', tier: 'senior', github: 'https://github.com/anacosta', linkedin: 'https://linkedin.com/in/anacosta', portfolio: 'https://anacosta.dev' },
    { name: 'Bruno Lima', tier: 'pleno', github: 'https://github.com/brunolima', linkedin: 'https://linkedin.com/in/brunolima' },
    { name: 'Carla Mendes', tier: 'junior', github: 'https://github.com/carlamendes', portfolio: 'https://carlamendes.com.br' },
    { name: 'Diego Rocha', tier: 'senior', linkedin: 'https://linkedin.com/in/diegorocha', portfolio: 'https://diegorocha.io' },
    { name: 'Elena Souza', tier: 'pleno', github: 'https://github.com/elenasouza', linkedin: 'https://linkedin.com/in/elenasouza' },
    { name: 'Felipe Alves', tier: 'junior', github: 'https://github.com/felipealves', linkedin: 'https://linkedin.com/in/felipealves' }
];
*/

const UI = { // Cache de elementos do DOM para fácil acesso e manipulação 
    projectsContainer: document.getElementById('projects-container'),
    classesContainer: document.getElementById('classes-container'),
    supportersContainer: document.getElementById('supporters-container'),
    waitlistForm: document.getElementById('waitlist-form'),
    instructorForm: document.getElementById('instructor-form'),
    loadingOverlay: document.getElementById('loading'),
    formFeedback: document.getElementById('form-feedback'),
    instructorFeedback: document.getElementById('instructor-feedback'),
    modal: document.getElementById('modal'),
    modalInstructor: document.getElementById('modal-instructor'),
    modalProject: document.getElementById('modal-project'),
    closeModalBtn: document.getElementById('btn-close-modal'),
    closeInstructorModalBtn: document.getElementById('btn-close-instructor-modal'),
    closeProjectModalBtn: document.getElementById('btn-close-project-modal'),
    projectDetailTitle: document.getElementById('project-detail-title'),
    projectDetailBody: document.getElementById('project-detail-body'),
    openModalBtns: document.querySelectorAll('.btn-open-modal'),
    openInstructorModalBtn: document.querySelector('.btn-open-instructor-modal'),
    mobileMenuBtn: document.getElementById('btn-mobile-menu'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-menu a'),
    phoneInput: document.getElementById('phone')
};

const AppUtils = { // Funções auxiliares para manipulação de UI e formatação de dados
    showLoading: () => UI.loadingOverlay.classList.remove('hidden'),
    hideLoading: () => UI.loadingOverlay.classList.add('hidden'),
    formatStatusClass: (status) => {
        if (!status) return 'default';
        return status.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },
    showMessage: (text, type = 'success', feedbackEl = UI.formFeedback) => {
        feedbackEl.textContent = text;
        feedbackEl.className = `form-feedback ${type}`;
        feedbackEl.classList.remove('hidden');
    },
    getDirectImageLink: (url) => { // Converte links do Drive e GitHub para links diretos de imagem
        if (!url) return url;

        // Trata Google Drive
        if (url.includes('drive.google.com')) {
            const match = url.match(/\/d\/([^/]+)/);
            return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
        }

        // Trata GitHub
        if (url.includes('github.com') && url.includes('/blob/')) {
            return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }

        return url;
    }
};

const ModalLogic = { // Lóigica para abrir e fechar o modal, incluindo a restauração do conteúdo original do formulário se necessário
    open: (modalEl = UI.modal) => { // Abre o modal e impede o scroll do body para focar a atenção do usuário
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        modalEl.classList.add('show');
        
        // Trava agressiva de scroll para mobile
        document.documentElement.style.scrollBehavior = 'auto'; // Desativa o smooth scroll global
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    },

    close: (modalEl = UI.modal) => { // Fecha o modal e permite o scroll do body novamente
        modalEl.classList.remove('show');

        setTimeout(() => {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.scrollBehavior = ''; // Reativa o smooth scroll padrão

            const formWrapper = modalEl.querySelector('.form-wrapper');
            if (modalEl.dataset.originalContent) {
                formWrapper.innerHTML = modalEl.dataset.originalContent;

                if (modalEl === UI.modal) {
                    UI.waitlistForm = document.getElementById('waitlist-form');
                    UI.waitlistForm.addEventListener('submit', Handlers.handleFormSubmit);
                } else {
                    UI.instructorForm = document.getElementById('instructor-form');
                    UI.instructorForm.addEventListener('submit', Handlers.handleInstructorSubmit);
                }
                delete modalEl.dataset.originalContent;
            }
        }, 300); // 300ms = tempo da transição no CSS
    }
};

const ApiService = { // Funções para fazer requests HTTP e lidar com erros
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error('Waking up');
            return await response.json();
        } catch (error) {
            return null;
        }
    },
    async postData(endpoint, data) { // Função para enviar dados para o backend, com tratamento de erros e mensagens de feedback
        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Erro');
        return result;
    }
};

const Renderers = { // Funções para renderizar dados na tela, incluindo skeletons de carregamento e formatação de status
    showSkeletons(container, count = 3) {
        container.innerHTML = Array(count).fill(`
            <div class="skeleton-card">
                <div class="skeleton-img skeleton"></div>
                <div class="skeleton-title skeleton"></div>
                <div class="skeleton-text skeleton"></div>
            </div>
        `).join('');
    },
    renderProjects(projects) { // Função para renderizar os projetos na tela, com tratamento de casos onde não há projetos ou campos faltando
        if (!projects || projects.length === 0) return false;
        UI.projectsContainer.innerHTML = projects.map(p => {
            const rawImage = p.links.imagem;
            const convertedImage = AppUtils.getDirectImageLink(rawImage);

            // Verifica se é uma imagem válida após a conversão
            const isImage = convertedImage && (
                convertedImage.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) ||
                convertedImage.includes('drive.google.com') ||
                convertedImage.includes('googleusercontent.com') ||
                convertedImage.includes('images.unsplash.com') ||
                convertedImage.startsWith('http')
            );

            /* 
            if (!isImage && rawImage) {
                console.warn(`Imagem inválida para o projeto "${p.titulo}":`, rawImage);
            }
            */

            const imageSrc = isImage
                ? convertedImage
                : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400';

            return `
                <article class="card-item project-card">
                    <div class="project-image">
                        <img src="${imageSrc}" 
                             alt="${p.titulo}" 
                             onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400'; this.onerror=null;">
                    </div>
                    <div class="card-body">
                        <span class="status-badge ${AppUtils.formatStatusClass(p.status)}">${p.status}</span>
                        <h3>${p.titulo}</h3>
                        <p>${p.descricao_simples || p.descricao || ''}</p>
                        
                        <div class="project-stack">
                            <strong>Stack:</strong> ${Array.isArray(p.stack) ? p.stack.join(', ') : p.stack}
                        </div>
                        <div class="project-members">
                            <strong>Membros:</strong> ${Array.isArray(p.membros) ? p.membros.join(', ') : p.membros}
                        </div>

                        <div class="card-footer" style="flex-wrap: wrap;">
                            <button class="link-btn primary btn-show-details" 
                                    onclick="Handlers.showProjectDetails('${p.titulo.replace(/'/g, "\\'")}', '${(p.descricao_detalhada || 'Sem descrição detalhada disponível.').replace(/'/g, "\\'").replace(/\n/g, '<br>')}')">
                                Saiba mais
                            </button>
                            ${p.links.deploy ? `<a href="${p.links.deploy}" target="_blank" class="link-btn secondary">Deploy</a>` : ''}
                            ${p.links.github ? `<a href="${p.links.github}" target="_blank" class="link-btn secondary">GitHub</a>` : ''}
                        </div>
                    </div>
                </article>
            `;
        }).join('');
        return true;
    },
    renderClasses(classes) { // Função para renderizar as aulas na tela, com tratamento de casos onde não há aulas ou campos faltando
        if (!classes || classes.length === 0) return false;
        UI.classesContainer.innerHTML = classes.map(c => `
            <article class="card-item class-card">
                <div class="card-body">
                    <span class="status-badge ${AppUtils.formatStatusClass(c.status)}">${c.status}</span>
                    <h3>${c.titulo}</h3>
                    <p>${c.desc}</p>
                    <p><strong>Mentor:</strong> ${c.mentor}</p>
                    <p><strong>Data:</strong> ${c.data}</p>
                    <p><strong>Canal:</strong> ${c.canal}</p>
                </div>
            </article>
        `).join('');
        return true;
    },
    renderSupporters(supporters) { // Renderiza apoiadores; cada item tem name, tier (junior/pleno/senior), github?, portfolio?, linkedin?
        if (!supporters || supporters.length === 0 || !UI.supportersContainer) return false;

        const TIER_LABEL = { junior: 'Júnior', pleno: 'Pleno', senior: 'Sênior', especialista: 'Especialista' };

        const iconGithub = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.4-2.3 1.1-3.1-.1-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z"/></svg>';
        const iconLinkedin = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7C5.5 6.7 4.8 6 4.8 5s.7-1.7 1.7-1.7S8.2 4 8.2 5s-.7 1.7-1.7 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z"/></svg>';
        const iconLink = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

        UI.supportersContainer.innerHTML = supporters.map(s => {
            const initial = (s.name || '?').trim().charAt(0).toUpperCase();
            const tierKey = (s.tier || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
            const tierLabel = TIER_LABEL[tierKey] || s.tier || 'Apoiador';

            const links = [];
            if (s.github) links.push(`<a href="${s.github}" target="_blank" rel="noreferrer" class="supporter-link" aria-label="GitHub de ${s.name}">${iconGithub} GitHub</a>`);
            if (s.portfolio) links.push(`<a href="${s.portfolio}" target="_blank" rel="noreferrer" class="supporter-link" aria-label="Portfolio de ${s.name}">${iconLink} Portfolio</a>`);
            if (s.linkedin) links.push(`<a href="${s.linkedin}" target="_blank" rel="noreferrer" class="supporter-link" aria-label="LinkedIn de ${s.name}">${iconLinkedin} LinkedIn</a>`);

            return `
                <article class="card-item supporter-card">
                    <div class="supporter-avatar" aria-hidden="true">${initial}</div>
                    <h3 class="supporter-name">${s.name}</h3>
                    <!-- <span class="supporter-tier ${tierKey}">${tierLabel}</span> -->
                    <div class="supporter-links">${links.join('')}</div>
                </article>
            `;
        }).join('');
        return true;
    }
};

const Handlers = { // Funções para lidar com eventos e formulários
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
            areas: Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(cb => cb.value),
            technologies: document.getElementById('technologies').value
        };

        if (!formData.level || formData.areas.length === 0) return AppUtils.showMessage('Campos obrigatórios!', 'error');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        AppUtils.showLoading();

        try {
            const res = await ApiService.postData(CONFIG.ENDPOINTS.WAITLIST, formData);

            formWrapper.innerHTML = `
                <div class="success-state">
                    <h3>Tudo certo!</h3>
                    <p class="success-msg">${res.message}</p>
                    <button class="nav-cta btn-success-close" onclick="ModalLogic.close(UI.modal)">Entendido</button>
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
    },

    async handleInstructorSubmit(e) {
        e.preventDefault();
        const formWrapper = UI.modalInstructor.querySelector('.form-wrapper');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        if (!UI.modalInstructor.dataset.originalContent) {
            UI.modalInstructor.dataset.originalContent = formWrapper.innerHTML;
        }

        const formData = {
            name: document.getElementById('inst-name').value,
            discord: document.getElementById('inst-discord').value,
            whatsapp: document.getElementById('inst-whatsapp').value,
            theme: document.querySelector('input[name="theme"]:checked')?.value,
            title: document.getElementById('inst-title').value,
            description: document.getElementById('inst-desc').value,
            level: document.querySelector('input[name="level"]:checked')?.value,
            days: Array.from(document.querySelectorAll('input[name="days"]:checked')).map(cb => cb.value),
            shift: document.querySelector('input[name="shift"]:checked')?.value,
            support: document.querySelector('input[name="support"]:checked')?.value
        };

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando proposta...';
        AppUtils.showLoading();

        try {
            const res = await ApiService.postData(CONFIG.ENDPOINTS.INSTRUCTOR, formData);
            formWrapper.innerHTML = `
                <div class="success-state">
                    <h3>Proposta Enviada!</h3>
                    <p class="success-msg">${res.message}</p>
                    <button class="nav-cta btn-success-close" onclick="ModalLogic.close(UI.modalInstructor)">Entendido</button>
                </div>
            `;
        } catch (err) {
            AppUtils.showMessage(err.message, 'error', UI.instructorFeedback);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            delete UI.modalInstructor.dataset.originalContent;
        } finally {
            AppUtils.hideLoading();
        }
    },

    showProjectDetails(title, details) {
        UI.projectDetailTitle.textContent = title;
        UI.projectDetailBody.innerHTML = details;
        ModalLogic.open(UI.modalProject);
    }
};

const NavLogic = { // Lóigica de funcionamento do menu para destktop / celular
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
        if (!value) return "";
        value = value.replace(/\D/g, ""); // Remove tudo que não é número
        value = value.replace(/(\d{2})(\d)/, "($1) $2"); // Coloca parênteses no DDD
        value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Coloca o hífen no número
        return value.substring(0, 15); // Limita ao tamanho máximo
    }
};

async function init() {
    Animations.initAll();

    Renderers.showSkeletons(UI.projectsContainer, 3);
    Renderers.showSkeletons(UI.classesContainer, 2);

    // Apoiadores: tenta API; se ainda não existir o endpoint ou estiver vazio, usa um array vazio.
    (async () => {
        const live = await ApiService.fetchData(CONFIG.ENDPOINTS.SUPPORTERS);
        const data = (live && live.length) ? live : [];
        Renderers.renderSupporters(data);
        requestAnimationFrame(() => Animations.refreshCards());
    })();

    const load = async () => {
        const p = await ApiService.fetchData(CONFIG.ENDPOINTS.PROJECTS);
        const c = await ApiService.fetchData(CONFIG.ENDPOINTS.CLASSES);
        if (p) Renderers.renderProjects(p);
        if (c) Renderers.renderClasses(c);

        if (p || c) {
            requestAnimationFrame(() => Animations.refreshCards());
        }

        if (!p || !c) setTimeout(load, CONFIG.RETRY_DELAY);
    };
    load();
}

// Eventos de Modal
UI.openModalBtns.forEach(btn => btn.addEventListener('click', () => ModalLogic.open(UI.modal)));
UI.closeModalBtn.addEventListener('click', () => ModalLogic.close(UI.modal));

if (UI.openInstructorModalBtn) {
    UI.openInstructorModalBtn.addEventListener('click', () => ModalLogic.open(UI.modalInstructor));
}
if (UI.closeInstructorModalBtn) {
    UI.closeInstructorModalBtn.addEventListener('click', () => ModalLogic.close(UI.modalInstructor));
}

// Eventos de Formulário
UI.waitlistForm.addEventListener('submit', Handlers.handleFormSubmit);
if (UI.instructorForm) {
    UI.instructorForm.addEventListener('submit', Handlers.handleInstructorSubmit);
}

// Máscaras e Inputs
UI.phoneInput.addEventListener('input', (e) => {
    e.target.value = FormMasks.phone(e.target.value);
});

const instPhone = document.getElementById('inst-whatsapp');
if (instPhone) {
    instPhone.addEventListener('input', (e) => {
        e.target.value = FormMasks.phone(e.target.value);
    });
}

// Navegação
if (UI.mobileMenuBtn) {
    UI.mobileMenuBtn.addEventListener('click', NavLogic.toggleMenu);
};

UI.navLinks.forEach(link => {
    link.addEventListener('click', NavLogic.closeMenu);
});

const navCtaBtn = document.querySelector('.nav-menu .nav-cta');
if (navCtaBtn) {
    navCtaBtn.addEventListener('click', NavLogic.closeMenu);
};

UI.navMenu.addEventListener('click', (e) => {
    if (e.target === UI.navMenu) {
        NavLogic.closeMenu();
    };
});

// Fechar modais ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === UI.modal) ModalLogic.close(UI.modal);
    if (e.target === UI.modalInstructor) ModalLogic.close(UI.modalInstructor);
    if (e.target === UI.modalProject) ModalLogic.close(UI.modalProject);
});

if (UI.closeProjectModalBtn) {
    UI.closeProjectModalBtn.addEventListener('click', () => ModalLogic.close(UI.modalProject));
}

window.addEventListener('DOMContentLoaded', init);