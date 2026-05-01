document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // 1. TÌM KIẾM HÓA ĐƠN & HIỂN THỊ EMPTY STATE
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row'); 
    const searchInput = document.querySelector('.search-box input');
    const noResultsRow = document.getElementById('noResultsRow');
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    // Cập nhật tổng số lượng ban đầu dựa trên số dòng HTML hiện có
    const totalRows = dataRows.length;
    if (totalCountEl) totalCountEl.textContent = totalRows;
    if (visibleCountEl) visibleCountEl.textContent = totalRows;

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            // Lấy từ khóa và chuyển thành chữ thường, xóa khoảng trắng thừa
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            // Quét qua từng dòng dữ liệu để so sánh text
            dataRows.forEach(row => {
                // row.textContent sẽ lấy toàn bộ text trong dòng (Mã HĐ, Tên KH, Gói cước...)
                const rowText = row.textContent.toLowerCase();

                if (rowText.includes(searchTerm)) {
                    row.style.display = ''; // Khớp thì hiện
                    visibleCount++;
                } else {
                    row.style.display = 'none'; // Không khớp thì ẩn
                }
            });

            // Cập nhật con số hiển thị dưới footer
            if (visibleCountEl) visibleCountEl.textContent = visibleCount;

            // Logic bật/tắt màn hình "Không tìm thấy"
            if (noResultsRow) {
                if (visibleCount === 0) {
                    noResultsRow.style.display = ''; // Hiện dòng trống nếu đếm = 0
                } else {
                    noResultsRow.style.display = 'none'; // Ẩn đi khi có kết quả
                }
            }
        });
    }

    // ========================================================
    // 2. CLICK VÀO HÀNG ĐỂ XEM CHI TIẾT HÓA ĐƠN
    // ========================================================
    dataRows.forEach(row => {
        row.style.cursor = 'pointer'; // Icon bàn tay báo hiệu có thể click
        
        row.addEventListener('click', function() {
            const columns = this.querySelectorAll('td');
            if(columns.length < 3) return;

            // Trích xuất Mã Hóa Đơn (cột 1)
            const id = columns[0].textContent.trim();
            
            const selectedInvoice = { id: id };
            
            // Lưu vào localStorage để trang Chi tiết lấy ra hiển thị
            localStorage.setItem('viewingInvoice', JSON.stringify(selectedInvoice));
            
            // Chuyển hướng sang trang chi tiết Hóa đơn
            window.location.href = 'hoaDon-chiTiet.html';
        });
    });
});