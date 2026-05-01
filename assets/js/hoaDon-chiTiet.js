document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. HIỂN THỊ DỮ LIỆU TỪ DANH SÁCH 
    // ==========================================
    const invoiceDataStr = localStorage.getItem('viewingInvoice');
    if (invoiceDataStr) {
        const invoice = JSON.parse(invoiceDataStr);
        const titleEl = document.getElementById('pageTitle');
        // Hiển thị tiêu đề dạng "Hóa đơn / HD001" nếu có ID
        if (titleEl && invoice.id) {
            titleEl.textContent = `Hóa đơn / ${invoice.id}`;
        }
    }

    // ==========================================
    // 2. LOGIC BẬT / TẮT MODAL XÓA HÓA ĐƠN
    // ==========================================
    
    // Tìm các nút bấm và Modal bằng class / ID
    const btnDelete = document.querySelector('.btn-delete'); 
    const deleteModal = document.getElementById('deleteModal');
    const btnConfirmDelete = document.querySelector('.btn-danger-confirm'); 
    const btnCancelDelete = document.querySelector('.btn-cancel-modal'); 
    const successDeleteModal = document.getElementById('successDeleteModal');
    const btnCloseSuccess = document.querySelector('#successDeleteModal .btn-primary-modal');

    // Mở popup Xóa (Đỏ) khi bấm nút Xóa ở góc trên
    if (btnDelete && deleteModal) {
        btnDelete.addEventListener('click', () => {
            deleteModal.style.display = 'flex';
        });
    }

    // Đóng popup Xóa (Đỏ) khi bấm "Đóng"
    if (btnCancelDelete && deleteModal) {
        btnCancelDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });
    }

    // Xác nhận Xóa -> Tắt Modal Đỏ, Bật Modal Thành công (Xanh)
    if (btnConfirmDelete && deleteModal && successDeleteModal) {
        btnConfirmDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none'; 
            successDeleteModal.style.display = 'flex'; 
        });
    }

    // Đóng popup Thành công -> Chuyển về trang danh sách
    if (btnCloseSuccess && successDeleteModal) {
        btnCloseSuccess.addEventListener('click', () => {
            successDeleteModal.style.display = 'none';
            window.location.href = 'hoaDon.html';
        });
    }
});