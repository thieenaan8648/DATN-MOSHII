document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.table tbody');
    const noResultsRow = document.getElementById('noResultsRow');

    // ========================================================
    // 1. TẢI DỮ LIỆU TẠO MỚI TỪ BỘ NHỚ TẠM (LOCALSTORAGE)
    // ========================================================
    let danhSachMoi = JSON.parse(localStorage.getItem('duLieuTam')) || [];
    
    danhSachMoi.forEach(acc => {
        let roleClass = acc.role === 'Đại lý' ? 'role-agent' : 'role-collab';
        
        let tr = document.createElement('tr');
        tr.className = 'data-row'; // Gắn class để logic click và search nhận diện được
        tr.innerHTML = `
            <td>
                <div class="user-info">
                    <span class="name" style="font-weight: 500; color: #111827;">${acc.name}</span>
                    <span class="email" style="color: #6B7280; font-size: 13px;">${acc.email}</span>
                </div>
            </td>
            <td><span class="role-badge ${roleClass}">${acc.role}</span></td>
            <td>${acc.phone}</td>
            <td><span class="status-dot status-active">Hoạt động</span></td>
            <td>${acc.date}</td>
        `;
        
        // Chèn vào cuối bảng nhưng phải nằm TRƯỚC dòng "Không tìm thấy dữ liệu"
        if (noResultsRow && tbody) {
            tbody.insertBefore(tr, noResultsRow);
        }
    });

    // ========================================================
    // 2. LẤY TẤT CẢ CÁC DÒNG DỮ LIỆU (Bao gồm HTML cũ + Dòng mới thêm)
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row');

    // ========================================================
    // 3. XỬ LÝ SỰ KIỆN CLICK CHUYỂN SANG TRANG CHI TIẾT
    // ========================================================
    dataRows.forEach(row => {
        row.style.cursor = 'pointer'; // Hiển thị hình bàn tay khi rê chuột vào
        
        row.addEventListener('click', function() {
            // Lấy thông tin từ các cột trong bảng
            const name = this.querySelector('.name').textContent;
            const email = this.querySelector('.email').textContent;
            const phone = this.querySelectorAll('td')[2].textContent;
            const roleText = this.querySelectorAll('td')[1].textContent;
            
            // Chuẩn hóa tên vai trò
            let role = 'Đại lý';
            if (roleText.includes('Cộng tác viên') || roleText.includes('Collab')) {
                role = 'Cộng tác viên';
            }
            
            const selectedAcc = { name, email, phone, role };
            
            // Lưu dữ liệu dòng vừa click vào localStorage và chuyển trang
            localStorage.setItem('viewingAccount', JSON.stringify(selectedAcc));
            window.location.href = 'taiKhoan-chiTiet.html';
        });
    });

    // ========================================================
    // 4. XỬ LÝ TÌM KIẾM VÀ PHÂN TRANG (Giữ nguyên logic chuẩn của bạn)
    // ========================================================
    const searchInput = document.getElementById('searchInput');
    const visibleCountEl = document.getElementById('visibleCount');
    const totalCountEl = document.getElementById('totalCount');

    // Khởi tạo tổng số tài khoản hiển thị ở góc dưới
    const totalRows = dataRows.length;
    if (totalCountEl) totalCountEl.textContent = totalRows;
    if (visibleCountEl) visibleCountEl.textContent = totalRows;

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;

            dataRows.forEach(row => {
                const name = row.querySelector('.name').textContent.toLowerCase();
                const email = row.querySelector('.email').textContent.toLowerCase();
                const phone = row.querySelectorAll('td')[2].textContent.toLowerCase();

                // Kiểm tra xem dòng có khớp từ khóa không
                if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Cập nhật con số hiển thị
            if (visibleCountEl) visibleCountEl.textContent = visibleCount;

            // Bật/tắt giao diện trống "Không tìm thấy dữ liệu"
            if (noResultsRow) {
                if (visibleCount === 0) {
                    noResultsRow.style.display = ''; 
                } else {
                    noResultsRow.style.display = 'none';
                }
            }
        });
    }
});