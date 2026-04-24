const modal = document.getElementById('modal');
const openModalButtons = document.querySelectorAll('.btn-open-modal');
const closeModalButton = document.getElementById('btn-close-modal');

const openModal = () => {
    modal.classList.remove('hidden');
};

const closeModal = () => {
    modal.classList.add('hidden');
};

openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

closeModalButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
