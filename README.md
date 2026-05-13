# Juninhos - Landing Page

A **Juninhos** é uma comunidade vibrante onde a teoria encontra a prática. Este projeto é a nossa porta de entrada oficial, conectando desenvolvedores, mentores e parceiros através de uma plataforma dinâmica, moderna e colaborativa.

---
## Site Oficial
https://www.juninhos.com/

---
## Liderança Técnica e Desenvolvimento

Este projeto foi idealizado e desenvolvido integralmente por mim (**Jessica Rodrigues**) com o apoio da comunidade, sendo responsável por:

- **Arquitetura Full-Stack:** Planejamento e execução de toda a estrutura que integra Frontend, Backend, Banco de Dados e APIs externas.
- **Engenharia de Backend:** Implementação completa do servidor Node.js, integração com a **API do Google Sheets** e modelagem de dados com **MongoDB Atlas**.
- **Sistema de Notificações:** Implementação do fluxo de e-mails via **Resend** com suporte ao novo domínio oficial `@juninhos.com`.
- **Inteligência de Negócio:** Criação dos fluxos de Inscrição em Lista de Espera e Propostas de Aula.
- **Frontend Core:** Desenvolvimento da lógica em JavaScript puro, manipulação dinâmica do DOM, integração com APIs e otimização para Mobile UX.

---

## Tecnologias e Colaboração

O projeto utiliza uma arquitetura moderna e desacoplada:

### **Frontend** (Hospedado na Vercel)
- **Design System:** Estilização modular em Vanilla CSS.
  - *Colaboração:* **Renato** foi responsável pela **arquitetura e modularização do CSS**, organizando o projeto de forma profissional.
- **Animações:** Implementadas por **Kayki** utilizando **GSAP & ScrollTrigger** para criar uma experiência fluida, dinâmica e de alto nível.
- **Responsividade:** Design adaptativo focado em acessibilidade.

### **Backend** (Hospedado no Render)
- **Node.js & Express:** O coração da aplicação.
- **Google Sheets API:** CMS dinâmico para projetos e aulas.
- **MongoDB Atlas:** Armazenamento persistente de leads.
- **Resend:** API de e-mail de alta confiabilidade.

### **Futuro (v2.0)**
- **Gustavo** está trabalhando na camada de **Autenticação**, que será integrada após o lançamento desta versão estável. Ela estará presente na construção do portal para membros.

---

## Funcionalidades

1.  **Vitrine Dinâmica**: Projetos carregados via API com modais detalhados.
2.  **Agenda em Tempo Real**: Sincronização direta com a planilha de aulas.
3.  **Lista de Espera & Instrutores**: Fluxos automatizados com salvamento em banco e aviso por e-mail para múltiplos destinatários.
4.  **UX Premium**: *Skeleton Loaders*, animações de entrada e interface em *Dark Mode*.

---

## Como Executar Localmente

### Pré-requisitos
- Node.js instalado
- MongoDB Atlas & Resend API Key
- Credenciais Google Cloud

### Configuração
1. Clone o repositório.
2. No diretório `/juninhos-backend`, configure o arquivo `.env`.
3. Execute `npm install` e `npm start`.