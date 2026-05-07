document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // 1. LẤY DỮ LIỆU ĐƠN HÀNG MỚI (NẾU CÓ) VÀ VẼ THÊM VÀO BẢNG
    // ========================================================
    const tableBody = document.querySelector('.table tbody');
    const duLieuHoaDonTam = JSON.parse(localStorage.getItem('duLieuHoaDonTam')) || [];
    
    if (tableBody && duLieuHoaDonTam.length > 0) {
        // QUAN TRỌNG: Đã BỎ .reverse() để phần tử mới được đẩy lên trên cùng
        duLieuHoaDonTam.forEach(hd => {
            const tr = document.createElement('tr');
            tr.className = 'data-row';
            tr.style.cursor = 'pointer';
            tr.setAttribute('data-id', hd.id); 
            
            // Fix UI: Sử dụng class status-badge chuẩn theo CSS của bạn thay vì style inline
            let statusCls = 'processing';
            if (hd.statusText.includes('Hoàn tất') || hd.statusText.includes('thành')) statusCls = 'completed';
            if (hd.statusText.includes('hủy')) statusCls = 'canceled';
            if (hd.statusText.includes('Chờ')) statusCls = 'pending';

            // In 9 cột khớp với cấu trúc bảng HTML hiện tại của bạn
            tr.innerHTML = `
                <td>${hd.customer}</td>
                <td>${hd.packageName}</td>
                <td>${hd.packagePrice}</td>
                <td>${hd.startDate}</td>
                <td>${hd.endDate}</td>
                <td>${hd.agent}</td>
                <td>${hd.collaborator}</td>
                <td><span class="status-badge ${statusCls}">${hd.statusText}</span></td>
                <td><strong>${hd.totalPrice}</strong></td>
            `;
            tableBody.prepend(tr); // Nhét lên đầu danh sách
        });
    }

    // ========================================================
    // 2. TÌM KIẾM HÓA ĐƠN & HIỂN THỊ EMPTY STATE + ĐẾM DÒNG
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row'); 
    const searchInput = document.querySelector('.search-box input');
    const noResultsRow = document.getElementById('noResultsRow');
    
    // GIỮ NGUYÊN CHỨC NĂNG ĐẾM DÒNG HIỂN THỊ
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

            // Cập nhật số lượng dòng tìm thấy
            if (visibleCountEl) visibleCountEl.textContent = visibleCount;
            if (noResultsRow) {
                noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
            }
        });
    }

    // ========================================================
    // 3. CLICK VÀO HÀNG ĐỂ XEM CHI TIẾT & CHUYỂN DỮ LIỆU
    // ========================================================
    dataRows.forEach((row, index) => {
        row.style.cursor = 'pointer'; 
        
        row.addEventListener('click', function() {
            const columns = this.querySelectorAll('td');
            if(columns.length < 9) return;

            const statusText = columns[7].textContent.trim();
            let statusClass = 'status-dang-xu-ly'; 
            if (statusText === 'Hoàn tất') statusClass = 'status-hoan-tat';
            else if (statusText === 'Đã hủy') statusClass = 'status-da-huy';

            const generatedId = this.getAttribute('data-id') || `HD00${index + 1}`;

            const selectedInvoice = {
                id: generatedId, 
                customer: columns[0].textContent.trim(),
                packageName: columns[1].textContent.trim(),
                packagePrice: columns[2].textContent.trim(),
                startDate: columns[3].textContent.trim(),
                endDate: columns[4].textContent.trim(),
                agent: columns[5].textContent.trim(),
                collaborator: columns[6].textContent.trim(),
                statusText: statusText,
                statusClass: statusClass,
                totalPrice: columns[8].textContent.trim()
            };
            
            localStorage.setItem('viewingInvoice', JSON.stringify(selectedInvoice));
            window.location.href = 'hoaDon-chiTiet.html';
        });
    });
});