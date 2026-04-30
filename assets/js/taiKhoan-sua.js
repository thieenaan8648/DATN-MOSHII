// 1. Hàm chuyển đổi form
function selectRole(roleType, element) {
    const options = document.querySelectorAll('.role-option');
    options.forEach(opt => { opt.classList.remove('active'); opt.classList.add('inactive'); });
    element.classList.remove('inactive'); element.classList.add('active');

    if (roleType === 'daily') {
        document.getElementById('grid-daily').style.display = 'grid';
        document.getElementById('grid-ctv').style.display = 'none';
    } else {
        document.getElementById('grid-daily').style.display = 'none';
        document.getElementById('grid-ctv').style.display = 'grid';
    }
}

// 2. Lấy dữ liệu cũ điền vào form khi load trang
document.addEventListener('DOMContentLoaded', () => {
    const accountDataStr = localStorage.getItem('viewingAccount');
    if (accountDataStr) {
        const acc = JSON.parse(accountDataStr);
        
        // Chọn đúng tab Vai trò
        if (acc.role === 'Cộng tác viên') {
            selectRole('ctv', document.getElementById('btnRoleCtv'));
        }

        // Điền dữ liệu vào form Đang hiển thị
        const activeGrid = acc.role === 'Đại lý' ? document.getElementById('grid-daily') : document.getElementById('grid-ctv');
        if(activeGrid.querySelector('.val-name')) activeGrid.querySelector('.val-name').value = acc.name;
        if(activeGrid.querySelector('.val-email')) activeGrid.querySelector('.val-email').value = acc.email;
        if(activeGrid.querySelector('.val-phone')) activeGrid.querySelector('.val-phone').value = acc.phone;
    }

    // Xóa lỗi khi gõ chữ
    document.querySelectorAll('.input-group input, .input-group select').forEach(element => {
        element.addEventListener('input', function() {
            this.classList.remove('input-error'); 
            const errorText = this.nextElementSibling;
            if(errorText && errorText.classList.contains('error-text')) errorText.style.display = 'none'; 
        });
    });
});

// 3. Hàm Validate và Lưu
function luuTaiKhoan() {
    const vaiTro = document.querySelector('.role-option.active').innerText;
    const activeGrid = vaiTro === 'Đại lý' ? document.getElementById('grid-daily') : document.getElementById('grid-ctv');
    const inputs = activeGrid.querySelectorAll('input:not([type="password"]), select'); 
    let isValid = true;

    inputs.forEach(input => {
        const errorText = input.nextElementSibling;
        if (input.value.trim() === '') {
            input.classList.add('input-error'); 
            if(errorText && errorText.classList.contains('error-text')) errorText.style.display = 'block'; 
            isValid = false;
        }
    });

    if (!isValid) return;

    // Nếu muốn lưu chèn thay đổi vào LocalStorage có thể code thêm ở đây.
    // Hiện tại chạy demo nên chỉ cần bật thông báo thành công:
    document.getElementById('successModal').style.display = 'flex';
}