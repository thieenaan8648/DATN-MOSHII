document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TỰ ĐỘNG ĐIỀN GIÁ GÓI CƯỚC
    // ==========================================
    const selectPackage = document.getElementById('select-package');
    const inputPrice = document.getElementById('auto-price');

    if (selectPackage && inputPrice) {
        selectPackage.addEventListener('change', function() {
            // Lấy value (số tiền) từ option được chọn
            const price = this.value;
            // Format thành chuỗi có dấu chấm và VNĐ
            if (price) {
                const formattedPrice = Number(price).toLocaleString('vi-VN') + ' VNĐ';
                inputPrice.value = formattedPrice;
            } else {
                inputPrice.value = '';
            }
        });
    }

    // ==========================================
    // 2. ẨN LỖI KHI NGƯỜI DÙNG BẮT ĐẦU NHẬP/CHỌN
    // ==========================================
    document.querySelectorAll('.val-required').forEach(input => {
        // Bắt sự kiện 'input' cho text/date và 'change' cho thẻ select
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
    const btnSubmit = document.getElementById('btn-submit-donhang');
    const successModal = document.getElementById('successModal');
    
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function() {
            const requiredInputs = document.querySelectorAll('.val-required');
            let isValid = true;

            requiredInputs.forEach(input => {
                const err = input.nextElementSibling;
                // Kiểm tra xem ô input có trống hoặc select chưa được chọn
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                }
            });

            // Ngừng chạy nếu có lỗi
            if (!isValid) return;

            // Bật Popup thành công
            if (successModal) {
                successModal.style.display = 'flex';
            }
        });
    }
});

// ==========================================
// 4. HÀM ĐÓNG MODAL VÀ CHUYỂN TRANG 
// ==========================================
function dongModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    // Trở về trang danh sách đơn hàng
    window.location.href = 'donHang.html';
}