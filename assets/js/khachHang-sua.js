document.addEventListener('DOMContentLoaded', () => {
    // 1. Tự động xóa lỗi khi người dùng gõ
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) err.style.display = 'none';
        });
    });

    // 2. Chặn nhập ngày sinh trong tương lai
    const dobInput = document.getElementById('inp-dob');
    if (dobInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;
        
        dobInput.setAttribute('max', todayStr);
        dobInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); 
            if (selectedDate > currentDate) {
                this.classList.add('input-error');
                const errText = this.nextElementSibling;
                if (errText && errText.classList.contains('error-text')) {
                    errText.textContent = 'Ngày sinh không lớn hơn hiện tại';
                    errText.style.display = 'block';
                }
                this.value = ''; 
            }
        });
    }

    // ==========================================
    // 3. ĐỔ DỮ LIỆU CŨ VÀO FORM
    // ==========================================
    const customerDataStr = localStorage.getItem('viewingCustomer');
    if (!customerDataStr) {
        window.location.href = 'khachHang.html';
        return;
    }

    const cus = JSON.parse(customerDataStr);
    
    document.getElementById('inp-name').value = cus.name || '';
    document.getElementById('inp-phone').value = cus.phone || '';
    
    // Gán dữ liệu mẫu nếu chưa có dữ liệu thật (Khớp với giao diện design)
    document.getElementById('inp-email').value = cus.email || 'mai.nguyen@example.com';
    document.getElementById('inp-address').value = cus.diachi || '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh';
    document.getElementById('inp-note').value = cus.ghichu || '';

    // Xử lý định dạng ngày (Từ DD/MM/YYYY sang YYYY-MM-DD)
    let dobVal = cus.ngaysinh || '19/08/1994';
    if (dobVal && dobVal.includes('/')) {
        const parts = dobVal.split('/');
        if (parts.length === 3) dobVal = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    if (dobInput) dobInput.value = dobVal;


    // ==========================================
    // 4. XỬ LÝ NÚT LƯU DỮ LIỆU
    // ==========================================
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const requiredInputs = document.querySelectorAll('.val-required');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    const err = input.nextElementSibling;
                    if (err) err.style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) return;

            // Xử lý ngược ngày sinh (YYYY-MM-DD -> DD/MM/YYYY)
            const dobRaw = dobInput.value;
            const dobFormatted = dobRaw ? dobRaw.split('-').reverse().join('/') : '';

            // Đóng gói dữ liệu mới
            const updatedCus = {
                ...cus, // Giữ lại ID và trạng thái cũ
                name: document.getElementById('inp-name').value,
                phone: document.getElementById('inp-phone').value,
                email: document.getElementById('inp-email').value,
                diachi: document.getElementById('inp-address').value,
                ghichu: document.getElementById('inp-note').value,
                ngaysinh: dobFormatted
            };

            // Lưu đè thông tin khách hàng đang xem
            localStorage.setItem('viewingCustomer', JSON.stringify(updatedCus));

            // Cập nhật lên Danh sách tổng
            let listKH = JSON.parse(localStorage.getItem('listKhachHang')) || [];
            const index = listKH.findIndex(k => k.id === cus.id);
            if (index !== -1) {
                listKH[index] = { ...listKH[index], ...updatedCus };
                localStorage.setItem('listKhachHang', JSON.stringify(listKH));
            }

            document.getElementById('successModal').style.display = 'flex';
        });
    }
});