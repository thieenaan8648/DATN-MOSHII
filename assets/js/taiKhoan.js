document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.table tbody');
    const noResultsRow = document.getElementById('noResultsRow');

    // ========================================================
    // 1. TẢI DỮ LIỆU TẠO MỚI (ĐẨY LÊN ĐẦU BẢNG)
    // ========================================================
    let danhSachMoi = JSON.parse(localStorage.getItem('duLieuTam')) || [];
    
    // KHÔNG dùng reverse() kết hợp prepend(). Vòng lặp tự nhiên + prepend() 
    // sẽ tự động nhét cái mới nhất lên tít trên cùng (như xếp chồng đĩa).
    danhSachMoi.forEach(acc => {
        let roleClass = acc.role === 'Đại lý' ? 'role-agent' : 'role-collab';
        
        let tr = document.createElement('tr');
        tr.className = 'data-row'; 
        // Bắt buộc phải có data-id để định danh chính xác 100% record
        tr.setAttribute('data-id', acc.ma || ''); 
        
        tr.innerHTML = `
            <td>
                <div class="user-info">
                    <span class="name" style="font-weight: 500; color: #111827;">${acc.name || acc.ten}</span>
                    <span class="email" style="color: #6B7280; font-size: 13px;">${acc.email}</span>
                </div>
            </td>
            <td><span class="role-badge ${roleClass}">${acc.role}</span></td>
            <td>${acc.phone || acc.sdt}</td>
            <td><span class="status-dot status-active">${acc.trangthai || 'Hoạt động'}</span></td>
            <td>${acc.date}</td>
        `;
        
        if (tbody) {
            // Lệnh prepend đẩy element lên vị trí đầu tiên của tbody
            tbody.prepend(tr); 
        }
    });

    // ========================================================
    // 2. XỬ LÝ SỰ KIỆN CLICK (TRUYỀN ID CHÍNH XÁC)
    // ========================================================
    const dataRows = document.querySelectorAll('.table tbody tr.data-row');

    dataRows.forEach((row, index) => {
        row.style.cursor = 'pointer'; 
        
        // Cấp mã ID giả cho các dòng dữ liệu code cứng trong HTML để khỏi bị nhầm
        if (!row.getAttribute('data-id')) {
            row.setAttribute('data-id', `STATIC_${index}`);
        }
        
        row.addEventListener('click', function() {
            const name = this.querySelector('.name')?.textContent.trim() || '';
            const email = this.querySelector('.email')?.textContent.trim() || '';
            const phone = this.querySelectorAll('td')[2]?.textContent.trim() || '';
            const roleText = this.querySelectorAll('td')[1]?.textContent.trim() || '';
            const statusText = this.querySelectorAll('td')[3]?.textContent.trim() || 'Hoạt động';
            
            // Lấy ID chính xác tuyệt đối của dòng vừa click
            const ma = this.getAttribute('data-id'); 
            
            let role = 'Đại lý';
            if (roleText.includes('Cộng tác viên') || roleText.includes('Collab')) {
                role = 'Cộng tác viên';
            }
            
            // Gói dữ liệu gửi sang chi tiết
            const selectedAcc = { ma, name, email, phone, role, trangthai: statusText };
            
            localStorage.setItem('viewingAccount', JSON.stringify(selectedAcc));
            window.location.href = 'taiKhoan-chiTiet.html';
        });
    });

    // ========================================================
    // 3. XỬ LÝ TÌM KIẾM VÀ PHÂN TRANG (Giữ nguyên)
    // ========================================================
    const searchInput = document.getElementById('searchInput');
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
                const name = row.querySelector('.name').textContent.toLowerCase();
                const email = row.querySelector('.email').textContent.toLowerCase();
                const phone = row.querySelectorAll('td')[2].textContent.toLowerCase();

                if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
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
});