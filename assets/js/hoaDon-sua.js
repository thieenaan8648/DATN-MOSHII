document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LẤY DỮ LIỆU TỪ LOCALSTORAGE ĐỂ ĐIỀN VÀO FORM
    // ==========================================
    const invoiceDataStr = localStorage.getItem('viewingInvoice');
    
    // Nếu có dữ liệu thì tiến hành bóc tách và điền vào ô
    if (invoiceDataStr) {
        const invoice = JSON.parse(invoiceDataStr);

        // Hàm hỗ trợ chuyển đổi ngày từ định dạng DD/MM/YYYY sang YYYY-MM-DD để đưa vào input type="date"
        function formatDateForInput(dateString) {
            if(!dateString || !dateString.includes('/')) return "";
            const parts = dateString.split('/');
            if(parts.length === 3) {
                // Đảm bảo MM và DD luôn có 2 chữ số
                const dd = parts[0].padStart(2, '0');
                const mm = parts[1].padStart(2, '0');
                const yyyy = parts[2];
                return `${yyyy}-${mm}-${dd}`;
            }
            return "";
        }

        // Loại bỏ chữ "VNĐ" và dấu "." để lấy số thô điền vào ô giá
        function formatPriceForInput(priceString) {
            if(!priceString) return "";
            return priceString.replace(' VNĐ', '').replace(/\./g, '');
        }

        document.getElementById('edit-customer').value = invoice.customer || '';
        document.getElementById('edit-packageName').value = invoice.packageName || '';
        document.getElementById('edit-packagePrice').value = formatPriceForInput(invoice.packagePrice);
        document.getElementById('edit-totalPrice').value = formatPriceForInput(invoice.totalPrice);
        
        document.getElementById('edit-startDate').value = formatDateForInput(invoice.startDate);
        document.getElementById('edit-endDate').value = formatDateForInput(invoice.endDate);

        // Gắn đúng trạng thái vào thẻ Select
        const statusSelect = document.getElementById('edit-status');
        if(statusSelect && invoice.statusText) {
            statusSelect.value = invoice.statusText;
        }

    } else {
        // Tránh lỗi khi mở trực tiếp link
        window.location.href = 'hoaDon.html';
        return;
    }

    // ==========================================
    // 2. ẨN LỖI KHI NGƯỜI DÙNG BẮT ĐẦU GÕ 
    // ==========================================
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) err.style.display = 'none';
        });
    });

    // ==========================================
    // 3. BẮT SỰ KIỆN NÚT "LƯU"
    // ==========================================
    const btnSave = document.getElementById('btn-save-hoadon');
    const successModal = document.getElementById('successModal');
    
    if (btnSave) {
        btnSave.addEventListener('click', function() {
            const requiredInputs = document.querySelectorAll('.val-required');
            let isValid = true;

            // Kiểm tra các ô bắt buộc
            requiredInputs.forEach(input => {
                const err = input.nextElementSibling;
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) return;

            // Hiển thị Popup thành công
            if (successModal) {
                successModal.style.display = 'flex';
            }
        });
    }
});

// ==========================================
// 4. HÀM ĐÓNG MODAL VÀ QUAY VỀ TRANG CHI TIẾT
// ==========================================
function dongModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    // Sửa thành công thì trở về trang xem Chi tiết
    window.location.href = 'hoaDon-chiTiet.html';
}