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

// 2. Lắng nghe DOM load: Gán event xóa lỗi & chặn ngày tương lai
document.addEventListener('DOMContentLoaded', () => {
    // Xóa lỗi khi bắt đầu nhập
    document.querySelectorAll('.input-group input, .input-group select').forEach(element => {
        element.addEventListener('input', function() {
            this.classList.remove('input-error');
            const errorText = this.nextElementSibling;
            if(errorText && errorText.classList.contains('error-text')) {
                errorText.style.display = 'none';
                errorText.textContent = 'Không được để trống';
            }
        });
    });

    // Validate ngày sinh
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        dateInputs.forEach(input => {
            input.setAttribute('max', todayStr);
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
                    this.value = '';
                }
            });
        });
    }
});

// ==========================================
// HÀM HÚT DỮ LIỆU THÔNG MINH (KHÔNG CẦN ID HTML)
// ==========================================
function extractData(activeGrid, keywords, isSelect = false) {
    const elements = activeGrid.querySelectorAll(isSelect ? 'select' : 'input');
    for (let el of elements) {
        const parentText = (el.parentElement ? el.parentElement.textContent : '').toLowerCase();
        const placeholder = (el.placeholder || '').toLowerCase();
        
        // Nếu Label hoặc Placeholder chứa từ khóa cần tìm
        if (keywords.some(k => parentText.includes(k) || placeholder.includes(k))) {
            if (isSelect) {
                return el.selectedIndex > 0 ? el.options[el.selectedIndex].text : '';
            } else {
                // Đổi format ngày sinh thành DD/MM/YYYY
                if (el.type === 'date' && el.value) {
                    const parts = el.value.split('-');
                    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
                // Tự động thêm dấu % vào hoa hồng nếu chưa có
                if (keywords.includes('phần trăm') && el.value && !el.value.includes('%')) {
                     return el.value + '%';
                }
                return el.value;
            }
        }
    }
    return '';
}

// 3. Hàm Validate, Lưu tài khoản
function taoTaiKhoanMoi() {
    const vaiTro = document.querySelector('.role-option.active').innerText;
    const activeGrid = vaiTro === 'Đại lý' ? document.getElementById('grid-daily') : document.getElementById('grid-ctv');
    const inputs = activeGrid.querySelectorAll('input, select');
    let isValid = true;

    // Validate bỏ trống
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

    // Sử dụng thuật toán hút dữ liệu vào biến
    const email = activeGrid.querySelector('.val-email')?.value || extractData(activeGrid, ['email']);
    const hoTen = activeGrid.querySelector('.val-name')?.value || extractData(activeGrid, ['họ và tên']);
    const sdt = activeGrid.querySelector('.val-phone')?.value || extractData(activeGrid, ['số điện thoại']);

    const ngaySinh = extractData(activeGrid, ['ngày sinh']);
    const khuVuc = extractData(activeGrid, ['khu vực']);
    const hoaHong = extractData(activeGrid, ['phần trăm', 'hoa hồng']);
    
    // Quét lấy Mã Đại Lý hoặc Mã CTV
    let maMoi = '';
    if (vaiTro === 'Đại lý') {
        maMoi = extractData(activeGrid, ['mã đại lý']) || 'DL' + (Math.floor(Math.random() * 900) + 100);
    } else {
        maMoi = extractData(activeGrid, ['mã cộng tác viên']) || 'CTV' + (Math.floor(Math.random() * 900) + 100);
    }

    // Nếu là CTV thì hút thêm Đại lý quản lý
    const dailyQuanLy = vaiTro === 'Đại lý' ? '' : extractData(activeGrid, ['đại lý quản lý'], true);

    // Gom dữ liệu đầy đủ
    const taiKhoanMoi = {
        ma: maMoi,
        ten: hoTen,
        name: hoTen, 
        email: email,
        sdt: sdt,
        phone: sdt, 
        role: vaiTro,
        ngaysinh: ngaySinh,
        khuvuc: khuVuc,
        hoahong: hoaHong,
        dailyQuanLy: dailyQuanLy,
        trangthai: 'Hoạt động',
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