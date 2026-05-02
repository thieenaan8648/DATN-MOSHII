document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CHỨC NĂNG CHUYỂN ĐỔI TAB (Đại lý / CTV)
    // ==========================================
    const tabDaily = document.getElementById('tab-daily');
    const tabCtv = document.getElementById('tab-ctv');
    const tableBodyDaily = document.getElementById('table-body-daily');
    const tableBodyCtv = document.getElementById('table-body-ctv');
    const searchInput = document.getElementById('search-input');
    
    // Các tiêu đề cột cần đổi chữ
    const colMa = document.getElementById('col-ma');
    const colTen = document.getElementById('col-ten');

    if (tabDaily && tabCtv) {
        tabDaily.addEventListener('click', () => {
            // Đổi trạng thái Tab
            tabDaily.classList.add('active');
            tabCtv.classList.remove('active');

            // Đổi nội dung hiển thị
            tableBodyDaily.style.display = ''; // Hiện bảng Đại lý
            tableBodyCtv.style.display = 'none'; // Ẩn bảng CTV
            
            // Cập nhật text liên quan
            colMa.textContent = 'MÃ ĐẠI LÝ';
            colTen.textContent = 'TÊN ĐẠI DIỆN';
            searchInput.placeholder = 'Tìm kiếm theo mã, tên đại lý...';
            searchInput.value = ''; // Xóa ô tìm kiếm khi đổi tab
            
            // Xóa dòng lỗi tìm kiếm nếu có
            removeNoResultRow();
            resetSearchVisibility(tableBodyDaily);
        });

        tabCtv.addEventListener('click', () => {
            // Đổi trạng thái Tab
            tabCtv.classList.add('active');
            tabDaily.classList.remove('active');

            // Đổi nội dung hiển thị
            tableBodyCtv.style.display = ''; // Hiện bảng CTV
            tableBodyDaily.style.display = 'none'; // Ẩn bảng Đại lý
            
            // Cập nhật text liên quan
            colMa.textContent = 'MÃ CTV';
            colTen.textContent = 'TÊN CTV';
            searchInput.placeholder = 'Tìm kiếm theo mã, tên CTV...';
            searchInput.value = ''; // Xóa ô tìm kiếm khi đổi tab

            // Xóa dòng lỗi tìm kiếm nếu có
            removeNoResultRow();
            resetSearchVisibility(tableBodyCtv);
        });
    }

    // ==========================================
    // 2. CHỨC NĂNG TÌM KIẾM TRỰC TIẾP (LIVE SEARCH)
    // ==========================================
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            // Xác định xem bảng nào đang được hiển thị (để tìm kiếm trên bảng đó)
            const activeTableBody = (tableBodyDaily.style.display === 'none') ? tableBodyCtv : tableBodyDaily;
            const rows = activeTableBody.querySelectorAll('.data-row'); 
            
            let hasResult = false;

            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(query)) {
                    row.style.display = ''; 
                    hasResult = true;
                } else {
                    row.style.display = 'none'; 
                }
            });

            // Xử lý thông báo không tìm thấy
            let noResultRow = document.getElementById('no-result');
            
            if (!hasResult) {
                if (!noResultRow) {
                    noResultRow = document.createElement('tr');
                    noResultRow.id = 'no-result';
                    noResultRow.innerHTML = `
                        <td colspan="6" style="text-align: center; padding: 40px 16px; color: #6B7280; font-size: 14px;">
                            <i class='bx bx-search' style="font-size: 32px; color: #D1D5DB; margin-bottom: 8px; display: block;"></i>
                            Không tìm thấy kết quả
                        </td>
                    `;
                    activeTableBody.appendChild(noResultRow);
                } else {
                    noResultRow.style.display = '';
                    noResultRow.innerHTML = `
                        <td colspan="6" style="text-align: center; padding: 40px 16px; color: #6B7280; font-size: 14px;">
                            <i class='bx bx-search' style="font-size: 32px; color: #D1D5DB; margin-bottom: 8px; display: block;"></i>
                            Không tìm thấy kết quả
                        </td>
                    `;
                }
            } else {
                if (noResultRow) noResultRow.style.display = 'none';
            }
        });
    }

    // --- Các hàm hỗ trợ dùng chung ---
    function removeNoResultRow() {
        const noResultRow = document.getElementById('no-result');
        if (noResultRow) noResultRow.remove();
    }

    function resetSearchVisibility(tableBody) {
        const rows = tableBody.querySelectorAll('.data-row');
        rows.forEach(row => row.style.display = '');
    }

    // ==========================================
    // 1. CHUYỂN TRANG TỪ DANH SÁCH SANG CHI TIẾT
    // ==========================================
    const allRows = document.querySelectorAll('.data-row');
    
    allRows.forEach(row => {
        row.addEventListener('click', function() {
            // Lấy dữ liệu
            const cells = this.querySelectorAll('td');
            const dataToPass = {
                ma: cells[0].textContent.trim(),
                ten: cells[1].textContent.trim(),
                sdt: cells[2].textContent.trim(),
                khuvuc: cells[3].textContent.trim(),
                hoahong: cells[4].textContent.trim(),
                trangthai: cells[5].textContent.trim()
            };

            // Lưu vào bộ nhớ tạm của trình duyệt
            localStorage.setItem('moshii_detail_data', JSON.stringify(dataToPass));

            // Chuyển hướng sang trang chi tiết DÙNG CHUNG
            window.location.href = 'daiLy-CTV-chiTiet.html';
        });
    });

});