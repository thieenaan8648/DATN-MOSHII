document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    // Chỉ lấy các dòng có chứa dữ liệu (tr.data-row)
    const dataRows = document.querySelectorAll('.table tbody tr.data-row');
    const noResultsRow = document.getElementById('noResultsRow');
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    // Khởi tạo tổng số tài khoản
    const totalRows = dataRows.length;
    if(totalCountEl) totalCountEl.textContent = totalRows;
    if(visibleCountEl) visibleCountEl.textContent = totalRows;

    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        let visibleCount = 0;

        dataRows.forEach(row => {
            const name = row.querySelector('.name').textContent.toLowerCase();
            const email = row.querySelector('.email').textContent.toLowerCase();
            const phone = row.querySelectorAll('td')[2].textContent.toLowerCase();

            // Nếu khớp từ khóa
            if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Cập nhật số lượng đang hiển thị ở góc dưới
        if (visibleCountEl) visibleCountEl.textContent = visibleCount;

        // Xử lý bật/tắt giao diện "Không tìm thấy dữ liệu"
        if (visibleCount === 0) {
            noResultsRow.style.display = ''; // Hiện thông báo trống
        } else {
            noResultsRow.style.display = 'none'; // Ẩn thông báo trống
        }
    });
});