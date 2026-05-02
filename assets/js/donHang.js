document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // 1. TÌM KIẾM ĐƠN HÀNG & HIỂN THỊ EMPTY STATE
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row'); 
    const searchInput = document.querySelector('.search-box input');
    const noResultsRow = document.getElementById('noResultsRow');
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    const totalRows = dataRows.length;
    if (totalCountEl) totalCountEl.textContent = totalRows;
    if (visibleCountEl) visibleCountEl.textContent = totalRows;

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            dataRows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(searchTerm)) {
                    row.style.display = ''; 
                    visibleCount++;
                } else {
                    row.style.display = 'none'; 
                }
            });

            if (visibleCountEl) visibleCountEl.textContent = visibleCount;
            if (noResultsRow) {
                noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
            }
        });
    }

    // ========================================================
    // 2. CLICK VÀO HÀNG ĐỂ XEM CHI TIẾT & CHUYỂN DỮ LIỆU
    // ========================================================
    dataRows.forEach(row => {
        row.style.cursor = 'pointer'; 
        
        row.addEventListener('click', function() {
            const columns = this.querySelectorAll('td');
            if(columns.length < 6) return; // Bảng đơn hàng có 6 cột

            const id = columns[0].textContent.trim();
            const customer = columns[1].textContent.trim();
            const packageName = columns[2].textContent.trim();
            const packagePrice = columns[3].textContent.trim();
            const statusText = columns[4].textContent.trim();
            const date = columns[5].textContent.trim(); // Cột ngày

            // Map class CSS tương ứng cho trang chi tiết
            let statusClass = 'status-dang-xu-ly'; 
            if (statusText === 'Đã hoàn thành' || statusText === 'Hoàn tất') {
                statusClass = 'status-hoan-tat';
            } else if (statusText === 'Đã hủy') {
                statusClass = 'status-da-huy';
            } else if (statusText === 'Chờ xử lý') {
                statusClass = 'status-cho-xu-ly'; 
            }

            // Đóng gói dữ liệu gửi đi (Do bảng danh sách chỉ có 1 cột Ngày nên mình clone ra cho 2 ô Bắt đầu/Kết thúc ở trang chi tiết để test)
            const selectedOrder = {
                id: id,
                customer: customer,
                packageName: packageName,
                packagePrice: packagePrice,
                startDate: date,
                endDate: date, 
                statusText: statusText,
                statusClass: statusClass,
                totalPrice: packagePrice
            };
            
            // Lưu vào localStorage
            localStorage.setItem('viewingOrder', JSON.stringify(selectedOrder));
            
            // Chuyển trang sang chi tiết
            window.location.href = 'donHang-chiTiet.html';
        });
    });
});