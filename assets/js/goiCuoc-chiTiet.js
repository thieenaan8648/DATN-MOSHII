document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. HIỂN THỊ DỮ LIỆU TỪ DANH SÁCH (TÙY CHỌN)
    // ==========================================
    const packageDataStr = localStorage.getItem('viewingPackage');
    if (packageDataStr) {
        const pkg = JSON.parse(packageDataStr);
        const titleEl = document.getElementById('pageTitle');
        if (titleEl) titleEl.textContent = `Gói cước / ${pkg.id}`;
    }

    // ==========================================
    // 2. LOGIC BẬT / TẮT MODAL XÓA GÓI CƯỚC
    // ==========================================
    
    // Tìm các nút bấm và Modal bằng class / ID
    const btnDelete = document.querySelector('.btn-delete'); 
    const deleteModal = document.getElementById('deleteModal');
    const btnConfirmDelete = document.querySelector('.btn-danger-confirm'); 
    const btnCancelDelete = document.querySelector('.btn-cancel-modal'); 
    const successDeleteModal = document.getElementById('successDeleteModal');
    const btnCloseSuccess = document.querySelector('#successDeleteModal .btn-primary-modal');

    // 1. Mở popup Xóa (Đỏ) khi bấm nút Xóa ở góc trên
    if (btnDelete && deleteModal) {
        btnDelete.addEventListener('click', () => {
            deleteModal.style.display = 'flex';
        });
    }

    // 2. Đóng popup Xóa (Đỏ) khi bấm "Đóng"
    if (btnCancelDelete && deleteModal) {
        btnCancelDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });
    }

    // 3. Xác nhận Xóa -> Tắt Modal Đỏ, Bật Modal Thành công (Xanh)
    if (btnConfirmDelete && deleteModal && successDeleteModal) {
        btnConfirmDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none'; 
            successDeleteModal.style.display = 'flex'; 
        });
    }

    // 4. Đóng popup Thành công -> Chuyển về trang danh sách
    if (btnCloseSuccess && successDeleteModal) {
        btnCloseSuccess.addEventListener('click', () => {
            successDeleteModal.style.display = 'none';
            window.location.href = 'goiCuoc.html';
        });
    }
});