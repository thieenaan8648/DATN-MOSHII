document.addEventListener('DOMContentLoaded', () => {
    // 1. Tự động xóa viền đỏ khi người dùng gõ text
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) err.style.display = 'none';
        });
    });
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