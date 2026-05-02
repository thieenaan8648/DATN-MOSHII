document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. LẤY DỮ LIỆU TỪ LOCALSTORAGE ĐỂ ĐIỀN VÀO CHI TIẾT
    // ==========================================
    const invoiceDataStr = localStorage.getItem('viewingInvoice');
    
    // Nếu CÓ DỮ LIỆU (tức là được chuyển đến từ trang Danh sách)
    if (invoiceDataStr) {
        const invoice = JSON.parse(invoiceDataStr);

        // Đổi tên Tiêu đề trang
        const titleEl = document.getElementById('pageTitle');
        if (titleEl && invoice.id) {
            titleEl.textContent = `Hóa đơn / ${invoice.id}`;
        }

        // Gắn Text vào các trường thông tin
        document.getElementById('val-customer').textContent = invoice.customer || '...';
        document.getElementById('val-packageName').textContent = invoice.packageName || '...';
        document.getElementById('val-packagePrice').textContent = invoice.packagePrice || '...';
        document.getElementById('val-startDate').textContent = invoice.startDate || '...';
        document.getElementById('val-endDate').textContent = invoice.endDate || '...';
        document.getElementById('val-agent').textContent = invoice.agent || '...';
        document.getElementById('val-collaborator').textContent = invoice.collaborator || '...';
        document.getElementById('val-totalPrice').textContent = invoice.totalPrice || '...';

        // Cập nhật Nhãn Trạng thái (Text và Màu sắc)
        const statusEl = document.getElementById('val-status');
        if (statusEl) {
            statusEl.textContent = invoice.statusText || '...';
            statusEl.className = 'status-badge-invoice ' + (invoice.statusClass || 'status-dang-xu-ly');
        }
    } else {
        // NẾU KHÔNG CÓ DỮ LIỆU (Mở trực tiếp trang) -> Đẩy về trang Danh sách
        window.location.href = 'hoaDon.html';
        return; // Dừng chạy các lệnh bên dưới
    }

    // ==========================================
    // 2. LOGIC BẬT / TẮT MODAL XÓA HÓA ĐƠN
    // ==========================================
    const btnDelete = document.querySelector('.btn-delete'); 
    const deleteModal = document.getElementById('deleteModal');
    const btnConfirmDelete = document.querySelector('.btn-danger-confirm'); 
    const btnCancelDelete = document.querySelector('.btn-cancel-modal'); 
    const successDeleteModal = document.getElementById('successDeleteModal');
    const btnCloseSuccess = document.querySelector('#successDeleteModal .btn-primary-modal');

    if (btnDelete && deleteModal) {
        btnDelete.addEventListener('click', () => {
            deleteModal.style.display = 'flex';
        });
    }

    if (btnCancelDelete && deleteModal) {
        btnCancelDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });
    }

    if (btnConfirmDelete && deleteModal && successDeleteModal) {
        btnConfirmDelete.addEventListener('click', () => {
            deleteModal.style.display = 'none'; 
            successDeleteModal.style.display = 'flex'; 
        });
    }

    if (btnCloseSuccess && successDeleteModal) {
        btnCloseSuccess.addEventListener('click', () => {
            successDeleteModal.style.display = 'none';
            // Xóa thành công thì clear dữ liệu tạm luôn cho sạch
            localStorage.removeItem('viewingInvoice');
            window.location.href = 'hoaDon.html';
        });
    }
});