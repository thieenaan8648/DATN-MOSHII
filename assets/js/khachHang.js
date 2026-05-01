document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.table tbody');
    
    // ========================================================
    // 1. TẢI DỮ LIỆU KHÁCH HÀNG MỚI (TỪ LOCALSTORAGE)
    // ========================================================
    let listKH = JSON.parse(localStorage.getItem('listKhachHang')) || [];
    const today = new Date().toLocaleDateString('vi-VN');
    const noResultsRow = document.getElementById('noResultsRow');
    
    listKH.forEach(kh => {
        let tr = document.createElement('tr');
        tr.className = 'data-row'; 
        
        tr.innerHTML = `
            <td><strong>${kh.id}</strong></td>
            <td>${kh.name}</td>
            <td>${kh.phone}</td>
            <td><span class="country-tag">🇻🇳 Việt Nam</span></td>
            <td><span class="status-dot status-active">${kh.status}</span></td>
            <td>${today}</td>
        `;
        
        // Chèn vào bảng, nhưng phải đứng TRƯỚC dòng Empty State
        if (tbody && noResultsRow) {
            tbody.insertBefore(tr, noResultsRow);
        }
    });

    // ========================================================
    // 2. CẬP NHẬT CON SỐ BỘ ĐẾM
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row'); 
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    const totalRows = dataRows.length;
    
    if (totalCountEl) totalCountEl.textContent = totalRows;
    if (visibleCountEl) visibleCountEl.textContent = totalRows;

    // ========================================================
    // 3. TÌM KIẾM VÀ HIỂN THỊ EMPTY STATE
    // ========================================================
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;

            // 1. Ẩn hiện các dòng dữ liệu
            dataRows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(searchTerm)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // 2. Cập nhật con số hiển thị
            if (visibleCountEl) visibleCountEl.textContent = visibleCount;

            // 3. Bật/Tắt giao diện "Không tìm thấy"
            if (noResultsRow) {
                if (visibleCount === 0) {
                    noResultsRow.style.display = ''; // Bật lên
                } else {
                    noResultsRow.style.display = 'none'; // Tắt đi
                }
            }
        });
    }

    // ========================================================
    // 4. CLICK VÀO HÀNG ĐỂ XEM CHI TIẾT
    // ========================================================
    dataRows.forEach(row => {
        row.style.cursor = 'pointer'; 
        
        row.addEventListener('click', function() {
            const columns = this.querySelectorAll('td');
            if(columns.length < 3) return;

            const id = columns[0].textContent.trim();
            const name = columns[1].textContent.trim();
            const phone = columns[2].textContent.trim();
            
            const selectedCus = { id, name, phone };
            
            localStorage.setItem('viewingCustomer', JSON.stringify(selectedCus));
            window.location.href = 'khachHang-chiTiet.html';
        });
    });
});