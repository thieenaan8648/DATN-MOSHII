document.addEventListener('DOMContentLoaded', () => {
    // 1. Tự động xóa viền đỏ khi người dùng gõ text
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) {
                err.style.display = 'none';
                err.textContent = 'Không được để trống'; // Phục hồi text lỗi gốc
            }
        });
    });

    // ==========================================
    // VALIDATE CHẶN NGÀY TƯƠNG LAI CHO TẤT CẢ Ô DATE
    // ==========================================
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        dateInputs.forEach(input => {
            // Khóa các ngày tương lai trên bảng chọn lịch (UI)
            input.setAttribute('max', todayStr);

            // Xử lý nếu người dùng cố tình gõ tay ngày tương lai
            input.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0); 

                if (selectedDate > currentDate) {
                    this.classList.add('input-error');
                    const errText = this.nextElementSibling;
                    if (errText && errText.classList.contains('error-text')) {
                        errText.textContent = 'Ngày sinh không được lớn hơn hiện tại';
                        errText.style.display = 'block';
                    }
                    this.value = ''; // Xóa trắng dữ liệu sai
                }
            });
        });
    }
});

// 2. Validate form và lưu Khách hàng
function taoKhachHang() {
    const requiredInputs = document.querySelectorAll('.val-required');
    let isValid = true;

    // Quét lỗi để trống
    requiredInputs.forEach(input => {
        const err = input.nextElementSibling;
        if (input.value.trim() === '') {
            input.classList.add('input-error');
            if (err) err.style.display = 'block';
            isValid = false;
        }
    });

    if (!isValid) return; // Chặn lưu nếu có lỗi

    // Lấy thông tin cơ bản để hiển thị ở bảng (Demo)
    const name = document.getElementById('kh-name').value;
    const phone = document.getElementById('kh-phone').value;

    const khachHangMoi = {
        id: "KH" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        name: name,
        phone: phone,
        status: "Đang hoạt động"
    };

    // Lưu mảng Khách hàng vào LocalStorage
    let listKH = JSON.parse(localStorage.getItem('listKhachHang')) || [];
    listKH.push(khachHangMoi);
    localStorage.setItem('listKhachHang', JSON.stringify(listKH));

    // Hiển thị modal thành công
    document.getElementById('successModal').style.display = 'flex';
}

function dongModal() {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = 'khachHang.html'; // Nhảy về trang Danh sách Khách hàng
}