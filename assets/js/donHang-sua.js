document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TỰ ĐỘNG ĐIỀN DỮ LIỆU ĐƠN HÀNG ĐANG SỬA
    // ==========================================
    const orderDataStr = localStorage.getItem('viewingOrder');
    
    if (orderDataStr) {
        const order = JSON.parse(orderDataStr);

        // Hàm hỗ trợ chuyển đổi ngày từ định dạng DD/MM/YYYY sang YYYY-MM-DD
        function formatDateForInput(dateString) {
            if(!dateString || !dateString.includes('/')) return "";
            const parts = dateString.split('/');
            if(parts.length === 3) {
                const dd = parts[0].padStart(2, '0');
                const mm = parts[1].padStart(2, '0');
                const yyyy = parts[2];
                return `${yyyy}-${mm}-${dd}`;
            }
            return "";
        }

        // Bỏ giá trị chữ VNĐ để form nhìn sạch sẽ hơn
        function formatPriceForInput(priceString) {
            if(!priceString) return "";
            return priceString.replace(' VNĐ', '').replace(/,/g, '').replace(/\./g, '');
        }

        // Đổ dữ liệu vào các trường bị khóa
        document.getElementById('edit-customer').value = order.customer || '';
        document.getElementById('edit-packageName').value = order.packageName || '';
        document.getElementById('edit-packagePrice').value = formatPriceForInput(order.packagePrice);

        // Đổ dữ liệu vào các trường cho phép sửa
        document.getElementById('edit-startDate').value = formatDateForInput(order.startDate);
        document.getElementById('edit-endDate').value = formatDateForInput(order.endDate);

        const agentSelect = document.getElementById('edit-agent');
        if (agentSelect && order.agent) {
            agentSelect.value = order.agent; 
        }

        const collaboratorSelect = document.getElementById('edit-collaborator');
        if (collaboratorSelect && order.collaborator) {
            collaboratorSelect.value = order.collaborator;
        }

        const statusSelect = document.getElementById('edit-status');
        if (statusSelect && order.statusText) {
            statusSelect.value = order.statusText;
        }

    } else {
        // Nếu mở trực tiếp link mà không có data thì đẩy về trang chủ
        window.location.href = 'donHang.html';
        return;
    }

    // ==========================================
    // 2. ẨN LỖI KHI NGƯỜI DÙNG BẮT ĐẦU NHẬP/CHỌN
    // ==========================================
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', hideError);
        input.addEventListener('change', hideError);

        function hideError() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) {
                err.style.display = 'none';
            }
        }
    });

    // ==========================================
    // 3. LOGIC KIỂM TRA LỖI VÀ HIỂN THỊ MODAL
    // ==========================================
    const btnSave = document.getElementById('btn-save-donhang');
    const successModal = document.getElementById('successModal');
    
    if (btnSave) {
        btnSave.addEventListener('click', function() {
            const requiredInputs = document.querySelectorAll('.val-required');
            let isValid = true;

            requiredInputs.forEach(input => {
                const err = input.nextElementSibling;
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) return;

            if (successModal) {
                successModal.style.display = 'flex';
            }
        });
    }
});

// ==========================================
// 4. HÀM ĐÓNG MODAL VÀ QUAY VỀ CHI TIẾT
// ==========================================
function dongModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    // Sửa xong thì quay về trang chi tiết xem thành quả
    window.location.href = 'donHang-chiTiet.html';
}