async function carregarDados() {
    const response = await ApiService.fetchWithAuth('/api/portal');

    if (response) {
        const data = await response.json();
    }
}
