document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tableRows = document.querySelectorAll('.table tbody tr');

    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        tableRows.forEach(row => {
            const name = row.querySelector('.name').textContent.toLowerCase();
            const email = row.querySelector('.email').textContent.toLowerCase();
            const phone = row.querySelectorAll('td')[2].textContent.toLowerCase();

            if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});