document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. RENDER DỮ LIỆU KHÁCH HÀNG
    // ==========================================
    const customerDataStr = localStorage.getItem('viewingCustomer');
    if (!customerDataStr) {
        window.location.href = 'khachHang.html'; 
        return;
    }
    
    const cus = JSON.parse(customerDataStr);

    document.getElementById('pageTitle').textContent = `Khách hàng / ${cus.id}`;
    
    const createRow = (label, value, isValueBold = false) => `
        <div class="info-row">
            <div class="info-label">${label}</div>
            <div class="info-value" style="${isValueBold ? 'font-weight: 500; color: #111827;' : ''}">${value}</div>
        </div>
    `;

    const generalContainer = document.getElementById('general-info-rows');
    let generalHTML = '';
    generalHTML += createRow('Mã khách hàng', cus.id, true);
    generalHTML += createRow('Họ và tên', cus.name);
    generalHTML += createRow('Giới tính', 'Nữ'); 
    generalHTML += createRow('Số CMND/CCCD', '048111111111');
    generalHTML += createRow('Số điện thoại', cus.phone);
    generalHTML += createRow('Email', 'mai.nguyen@example.com');
    generalHTML += createRow('Ngày sinh', '15/5/1992');
    generalHTML += createRow('Địa chỉ', '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh');
    generalHTML += createRow('Ghi chú', 'Khách hàng VIP, ưu tiên hỗ trợ nhanh');
    
    generalContainer.innerHTML = generalHTML;

    const managementContainer = document.getElementById('management-info-rows');
    let managementHTML = '';
    managementHTML += createRow('Đại lý', 'DL001 - Trần Thị Bình');
    managementHTML += createRow('Cộng tác viên', 'CTV001 - Lê Văn Cường');
    
    managementContainer.innerHTML = managementHTML;

    // ==========================================
    // 2. LOGIC NÚT BẤM VÀ MODAL 
    // ==========================================
    
    // Xử lý nút Sửa
    const btnEdit = document.querySelector('.btn-edit');
    if (btnEdit) {
        btnEdit.addEventListener('click', () => {
            // Tạm thời chưa có form sửa khách hàng nên mình để alert nhé
            alert("Chuyển sang trang sửa khách hàng");
        });
    }

    // BẮT SỰ KIỆN NÚT XÓA VÀ LUỒNG MODAL
    const btnDelete = document.querySelector('.btn-delete'); // Nút xóa ở góc trên trang
    
    // Modal 1 (Đỏ)
    const deleteModal = document.getElementById('deleteModal');
    const btnConfirmDelete = document.getElementById('btnConfirmDelete'); // Nút "Xóa"
    const btnCancelDelete = document.getElementById('btnCancelDelete'); // Nút "Đóng"
    
    // Modal 2 (Xanh)
    const successDeleteModal = document.getElementById('successDeleteModal');
    const btnCloseSuccess = document.getElementById('btnCloseSuccess');

    if (btnDelete && deleteModal && successDeleteModal) {
        
        // 1. Khi bấm nút "Xóa" trên trang -> Hiện Modal 1 (Đỏ)
        btnDelete.addEventListener('click', () => {
            deleteModal.style.display = 'flex';
        });

        // 2. Khi bấm "Đóng" ở Modal 1 -> Ẩn Modal 1
        btnCancelDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });

        // 3. Khi bấm "Xóa" ở Modal 1 -> Ẩn Modal 1, Bật Modal 2 (Xanh)
        btnConfirmDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none'; // Tắt đỏ
            successDeleteModal.style.display = 'flex'; // Bật xanh
            
            // Note: Đoạn này bạn có thể chèn code xóa data trong localStorage nếu cần
        });

        // 4. Khi bấm "Đóng" ở Modal 2 -> Chuyển về trang danh sách Khách hàng
        btnCloseSuccess.addEventListener('click', () => {
            successDeleteModal.style.display = 'none';
            window.location.href = 'khachHang.html';
        });
    }
});