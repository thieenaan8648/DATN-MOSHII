document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.table tbody');
    
    // ========================================================
    // 1. TẢI DỮ LIỆU KHÁCH HÀNG MỚI TỪ LOCALSTORAGE
    // ========================================================
    let listKH = JSON.parse(localStorage.getItem('listKhachHang')) || [];
    const today = new Date().toLocaleDateString('vi-VN');
    
    listKH.forEach(kh => {
        let tr = document.createElement('tr');
        tr.className = 'data-row'; 
        
        // Cấu trúc HTML của một dòng Khách hàng chuẩn
        tr.innerHTML = `
            <td><strong>${kh.id}</strong></td>
            <td>${kh.name}</td>
            <td>${kh.phone}</td>
            <td><span class="country-tag">🇻🇳 Việt Nam</span></td>
            <td><span class="status-dot status-active">${kh.status}</span></td>
            <td>${today}</td>
        `;
        
        // Chèn lên đầu bảng (hoặc cuối bảng tùy ý)
        if (tbody) {
            tbody.appendChild(tr);
        }
    });

    // ========================================================
    // 2. CẬP NHẬT TỔNG SỐ KHÁCH HÀNG
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row'); 
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    const totalRows = dataRows.length;
    
    if (totalCountEl) totalCountEl.textContent = totalRows;
    if (visibleCountEl) visibleCountEl.textContent = totalRows;

    // ========================================================
    // 3. CHỨC NĂNG TÌM KIẾM
    // ========================================================
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;

            dataRows.forEach(row => {
                // Quét toàn bộ text trong dòng
                const rowText = row.textContent.toLowerCase();

                if (rowText.includes(searchTerm)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Cập nhật lại số lượng đang hiển thị sau khi lọc
            if (visibleCountEl) visibleCountEl.textContent = visibleCount;
        });
    }
    // === CODE MỚI THÊM: CLICK VÀO KHÁCH HÀNG ĐỂ XEM CHI TIẾT ===
    // Quét toàn bộ các dòng hiện có (và cả dòng vừa được JS thêm vào)
    const allCustomerRows = document.querySelectorAll('.table tbody tr');
    
    allCustomerRows.forEach(row => {
        // Bỏ qua dòng thông báo "Không tìm thấy dữ liệu"
        if(row.id === 'noResultsRow') return;

        row.style.cursor = 'pointer'; // Thêm icon bàn tay
        
        row.addEventListener('click', function() {
            // Lấy thông tin từ các cột
            // Giả sử HTML hiện tại: Cột 1 là Mã KH, Cột 2 là Tên, Cột 3 là SĐT
            const columns = this.querySelectorAll('td');
            if(columns.length < 3) return;

            const id = columns[0].textContent.trim();
            const name = columns[1].textContent.trim();
            const phone = columns[2].textContent.trim();
            
            const selectedCus = { id, name, phone };
            
            // Lưu vào localStorage và chuyển trang
            localStorage.setItem('viewingCustomer', JSON.stringify(selectedCus));
            window.location.href = 'khachHang-chiTiet.html';
        });
    });
});