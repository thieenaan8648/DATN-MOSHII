// 1. Hàm chuyển đổi tab Vai trò
function selectRole(roleType, element) {
    const options = document.querySelectorAll('.role-option');
    options.forEach(opt => {
        opt.classList.remove('active');
        opt.classList.add('inactive');
    });
    element.classList.remove('inactive');
    element.classList.add('active');

    const gridDaily = document.getElementById('grid-daily');
    const gridCtv = document.getElementById('grid-ctv');

    if (roleType === 'daily') {
        gridDaily.style.display = 'grid';
        gridCtv.style.display = 'none';
    } else if (roleType === 'ctv') {
        gridDaily.style.display = 'none';
        gridCtv.style.display = 'grid';
    }
}

// 2. Lắng nghe sự kiện DOM load xong để gán event xóa lỗi
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.input-group input, .input-group select').forEach(element => {
        element.addEventListener('input', function() {
            this.classList.remove('input-error');
            const errorText = this.nextElementSibling;
            if(errorText && errorText.classList.contains('error-text')) {
                errorText.style.display = 'none';
            }
        });
    });
});

// 3. Hàm Validate, Lưu tài khoản và hiện Modal
function taoTaiKhoanMoi() {
    const vaiTro = document.querySelector('.role-option.active').innerText;
    const activeGrid = vaiTro === 'Đại lý' ? document.getElementById('grid-daily') : document.getElementById('grid-ctv');
    const inputs = activeGrid.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        const errorText = input.nextElementSibling;
        if (input.value.trim() === '') {
            input.classList.add('input-error');
            if(errorText) errorText.style.display = 'block';
            isValid = false;
        } else {
            input.classList.remove('input-error');
            if(errorText) errorText.style.display = 'none';
        }
    });

    if (!isValid) return; 

    const email = activeGrid.querySelector('.val-email').value;
    const hoTen = activeGrid.querySelector('.val-name').value;
    const sdt = activeGrid.querySelector('.val-phone').value;

    const taiKhoanMoi = {
        name: hoTen,
        email: email,
        phone: sdt,
        role: vaiTro,
        date: new Date().toLocaleDateString('vi-VN')
    };

    let danhSach = JSON.parse(localStorage.getItem('duLieuTam')) || [];
    danhSach.push(taiKhoanMoi);
    localStorage.setItem('duLieuTam', JSON.stringify(danhSach));

    document.getElementById('successModal').style.display = 'flex';
}

// 4. Hàm đóng Modal
function dongModalVaChuyenTrang() {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = 'taiKhoan.html';
}