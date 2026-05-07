document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. HIỂN THỊ DỮ LIỆU ĐƠN HÀNG
    // ==========================================
    const orderDataStr = localStorage.getItem('viewingOrder');
    
    // Mock giả lập 1 đơn hàng "Hoàn tất" để test nếu mở trực tiếp
    let order = {
        id: 'DH001',
        customer: 'Trần Văn Hùng',
        packageName: 'Gói Combo Data + Voice',
        packagePrice: '200.000 VNĐ',
        startDate: '05/04/2026',
        endDate: '05/05/2026',
        statusText: 'Hoàn tất', 
        statusClass: 'status-hoan-tat',
        totalPrice: '200.000 VNĐ'
    };

    if (orderDataStr) {
        order = JSON.parse(orderDataStr);
    }

    // Gắn dữ liệu vào HTML
    const titleEl = document.getElementById('pageTitle');
    if (titleEl && order.id) titleEl.textContent = `Đơn hàng / ${order.id}`;

    document.getElementById('val-customer').textContent = order.customer || '...';
    document.getElementById('val-packageName').textContent = order.packageName || '...';
    document.getElementById('val-packagePrice').textContent = order.packagePrice || '...';
    document.getElementById('val-startDate').textContent = order.startDate || '...';
    document.getElementById('val-endDate').textContent = order.endDate || '...';
    document.getElementById('val-totalPrice').textContent = order.totalPrice || '...';

    const statusEl = document.getElementById('val-status');
    if (statusEl) {
        statusEl.textContent = order.statusText || '...';
        statusEl.className = 'status-badge-order ' + (order.statusClass || 'status-dang-xu-ly');
    }

    // ==========================================
    // 2. LOGIC DISABLE NÚT KHI ĐƠN HÀNG ĐÃ HOÀN THÀNH/ĐÃ HỦY
    // ==========================================
    const btnEdit = document.getElementById('btn-edit-order');
    const btnDelete = document.getElementById('btn-delete-order');
    const deleteModal = document.getElementById('deleteModal');

    // Các trạng thái KHÔNG được phép sửa/xóa
    const lockedStatuses = ['Hoàn tất', 'Đã hoàn thành', 'Đã hủy'];

    if (lockedStatuses.includes(order.statusText)) {
        // Gắn class mờ & chặn thao tác chuột
        if (btnEdit) btnEdit.classList.add('btn-disabled');
        if (btnDelete) btnDelete.classList.add('btn-disabled');
    } else {
        // Chỉ cấp quyền tương tác nếu đơn hàng đang xử lý/chờ xử lý
        if (btnEdit) {
            btnEdit.addEventListener('click', () => {
                window.location.href = 'donHang-sua.html';
            });
        }
        if (btnDelete && deleteModal) {
            btnDelete.addEventListener('click', () => {
                deleteModal.style.display = 'flex';
            });
        }
    }

    // ==========================================
    // 3. LOGIC MODAL XÓA (KHI NÚT XÓA CHƯA BỊ KHÓA) VÀ XÓA DATA THẬT
    // ==========================================
    const btnConfirmDelete = document.getElementById('btnConfirmDelete'); 
    const btnCancelDelete = document.getElementById('btnCancelDelete'); 
    const successDeleteModal = document.getElementById('successDeleteModal');
    const btnCloseSuccess = document.getElementById('btnCloseSuccess');

    if (btnCancelDelete && deleteModal) {
        btnCancelDelete.addEventListener('click', () => deleteModal.style.display = 'none');
    }

    if (btnConfirmDelete && deleteModal && successDeleteModal) {
        btnConfirmDelete.addEventListener('click', () => {
            // XÓA THẬT TRONG LOCALSTORAGE
            let dsDonHang = JSON.parse(localStorage.getItem('duLieuDonHangTam')) || [];
            dsDonHang = dsDonHang.filter(dh => dh.id !== order.id); 
            localStorage.setItem('duLieuDonHangTam', JSON.stringify(dsDonHang));

            // Xóa luôn Hóa đơn ánh xạ
            let dsHoaDon = JSON.parse(localStorage.getItem('duLieuHoaDonTam')) || [];
            dsHoaDon = dsHoaDon.filter(hd => hd.maDonHang !== order.id); 
            localStorage.setItem('duLieuHoaDonTam', JSON.stringify(dsHoaDon));

            deleteModal.style.display = 'none'; 
            successDeleteModal.style.display = 'flex'; 
        });
    }

    if (btnCloseSuccess && successDeleteModal) {
        btnCloseSuccess.addEventListener('click', () => {
            successDeleteModal.style.display = 'none';
            localStorage.removeItem('viewingOrder'); 
            window.location.href = 'donHang.html';
        });
    }
});