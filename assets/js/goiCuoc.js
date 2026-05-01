document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // TÌM KIẾM GÓI CƯỚC & HIỂN THỊ EMPTY STATE
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row'); 
    const searchInput = document.querySelector('.search-box input');
    const noResultsRow = document.getElementById('noResultsRow');
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    // Cập nhật tổng số lượng ban đầu dựa trên thẻ HTML
    const totalRows = dataRows.length;
    if (totalCountEl) totalCountEl.textContent = totalRows;
    if (visibleCountEl) visibleCountEl.textContent = totalRows;

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            // 1. Quét qua từng dòng dữ liệu để so sánh text
            dataRows.forEach(row => {
                // row.textContent sẽ lấy toàn bộ chữ (Mã gói, Tên gói, Giá...) gộp lại
                const rowText = row.textContent.toLowerCase();

                if (rowText.includes(searchTerm)) {
                    row.style.display = ''; // Khớp thì hiện
                    visibleCount++;
                } else {
                    row.style.display = 'none'; // Không khớp thì ẩn
                }
            });

            // 2. Cập nhật con số đang hiển thị dưới footer
            if (visibleCountEl) visibleCountEl.textContent = visibleCount;

            // 3. Logic bật/tắt dòng "Không tìm thấy dữ liệu"
            if (noResultsRow) {
                if (visibleCount === 0) {
                    noResultsRow.style.display = ''; // Bật lên khi bằng 0
                } else {
                    noResultsRow.style.display = 'none'; // Ẩn đi khi có kết quả
                }
            }
        });
    }
});