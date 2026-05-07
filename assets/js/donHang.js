document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. LẤY DỮ LIỆU ĐƠN HÀNG MỚI TẠO VÀ VẼ LÊN BẢNG
    // ========================================================
    const tableBody = document.querySelector('.table tbody');
    const duLieuDonHangTam = JSON.parse(localStorage.getItem('duLieuDonHangTam')) || [];

    if (tableBody && duLieuDonHangTam.length > 0) {
        // Lật ngược mảng để đơn mới nhất hiện lên trên cùng
        duLieuDonHangTam.reverse().forEach(dh => {
            const tr = document.createElement('tr');
            tr.className = 'data-row';
            tr.style.cursor = 'pointer';
            
            // Fix UI Badge cho Trạng thái Đơn Hàng (Các Pill màu)
            let badgeHtml = '';
            if (dh.statusClass === 'status-cho-xu-ly' || dh.statusText === 'Chờ xử lý') {
                badgeHtml = `<span style="background: #FEF3C7; color: #D97706; padding: 6px 12px; border-radius: 8px; font-weight: 500; font-size: 13px;">${dh.statusText}</span>`;
            } else if (dh.statusClass === 'status-hoan-tat' || dh.statusText === 'Đã hoàn thành') {
                badgeHtml = `<span style="background: #DCFCE7; color: #16A34A; padding: 6px 12px; border-radius: 8px; font-weight: 500; font-size: 13px;">${dh.statusText}</span>`;
            } else if (dh.statusClass === 'status-da-huy' || dh.statusText === 'Đã hủy') {
                badgeHtml = `<span style="background: #FEE2E2; color: #DC2626; padding: 6px 12px; border-radius: 8px; font-weight: 500; font-size: 13px;">${dh.statusText}</span>`;
            } else { // Đang xử lý
                badgeHtml = `<span style="background: #EFF6FF; color: #2563EB; padding: 6px 12px; border-radius: 8px; font-weight: 500; font-size: 13px;">${dh.statusText}</span>`;
            }

            // Sửa lại UI: Bỏ in đậm số tiền, đổi màu cột ngày cho đồng bộ với dòng cũ
            tr.innerHTML = `
                <td><strong style="color: #111827; font-weight: 500;">${dh.id}</strong></td>
                <td><span style="color: #374151;">${dh.customer}</span></td>
                <td><span style="color: #374151;">${dh.packageName}</span></td>
                <td><span style="color: #374151;">${dh.packagePrice}</span></td>
                <td>${badgeHtml}</td>
                <td><span style="color: #374151;">${dh.date}</span></td>
            `;
            tableBody.prepend(tr); // Đẩy lên đầu bảng
        });
    }
    
    // ========================================================
    // 2. TÌM KIẾM ĐƠN HÀNG & HIỂN THỊ EMPTY STATE
    // ========================================================
    // Khai báo lại dataRows sau khi đã chèn thêm các dòng mới vào HTML
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
    // 3. CLICK VÀO HÀNG ĐỂ XEM CHI TIẾT & CHUYỂN DỮ LIỆU
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

            // Đóng gói dữ liệu gửi đi 
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