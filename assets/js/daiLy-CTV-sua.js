document.addEventListener('DOMContentLoaded', () => {

    const storedData = localStorage.getItem('moshii_detail_data');

    if (storedData) {
        const data = JSON.parse(storedData);
        // Kiểm tra xem mã có chứa 'DL' (Đại lý) hay không
        const isAgent = data.ma.includes('DL'); 

        // ==========================================
        // 1. ĐỔ DỮ LIỆU CŨ VÀO FORM
        // ==========================================
        document.getElementById('inp-id').value = data.ma;
        document.getElementById('inp-name').value = data.ten;
        document.getElementById('inp-phone').value = data.sdt;
        document.getElementById('inp-area').value = data.khuvuc;
        
        // Loại bỏ ký tự '%' ở Hoa hồng để chèn vào thẻ input type="number"
        const commValue = data.hoahong.replace('%', '').trim();
        document.getElementById('inp-comm').value = commValue;

        // Chọn thẻ Select trạng thái tương ứng
        const statusSelect = document.getElementById('inp-status');
        if(data.trangthai === 'Hoạt động') statusSelect.selectedIndex = 0;
        else statusSelect.selectedIndex = 1;

        // ==========================================
        // 2. BIẾN HÌNH FORM THEO ĐỐI TƯỢNG (Đại lý / CTV)
        // ==========================================
        if (isAgent) {
            document.getElementById('page-title').textContent = 'Sửa thông tin Đại lý';
            document.getElementById('lbl-id').innerHTML = 'Mã đại lý <span class="text-danger">*</span>';
            document.getElementById('lbl-system').textContent = 'Thông tin hệ thống';
            
            document.getElementById('doanh-nghiep-row').style.display = 'flex';
            document.getElementById('mst-row').style.display = 'flex';
            document.getElementById('gioi-tinh-row').style.display = 'none'; // Ẩn giới tính

            document.getElementById('lbl-addr-1').textContent = 'Địa chỉ thường trú';
            document.getElementById('addr-2-row').style.display = 'flex';
            document.getElementById('pham-vi-row').style.display = 'flex';
            document.getElementById('kenh-ban-row').style.display = 'none';
        } else {
            document.getElementById('page-title').textContent = 'Sửa thông tin CTV';
            document.getElementById('lbl-id').innerHTML = 'Mã CTV <span class="text-danger">*</span>';
            document.getElementById('lbl-system').textContent = 'Hợp tác';
            
            document.getElementById('doanh-nghiep-row').style.display = 'none';
            document.getElementById('mst-row').style.display = 'none';
            document.getElementById('gioi-tinh-row').style.display = 'flex'; // Hiện giới tính

            document.getElementById('lbl-addr-1').textContent = 'Địa chỉ';
            document.getElementById('addr-2-row').style.display = 'none'; 
            document.getElementById('pham-vi-row').style.display = 'none'; 
            document.getElementById('kenh-ban-row').style.display = 'flex'; 
        }
    }

    // ==========================================
    // 3. XỬ LÝ LƯU DỮ LIỆU
    // ==========================================
    const btnSave = document.getElementById('btn-save-data');
    if(btnSave) {
        btnSave.addEventListener('click', () => {
            // Lấy dữ liệu mới người dùng vừa sửa
            const updatedData = {
                ma: document.getElementById('inp-id').value,
                ten: document.getElementById('inp-name').value,
                sdt: document.getElementById('inp-phone').value,
                khuvuc: document.getElementById('inp-area').value,
                hoahong: document.getElementById('inp-comm').value + '%',
                trangthai: document.getElementById('inp-status').value
            };

            // Lưu lại đè lên localStorage
            localStorage.setItem('moshii_detail_data', JSON.stringify(updatedData));
            
            alert('Cập nhật thông tin thành công!');
            
            // Điều hướng quay lại trang Chi tiết
            window.location.href = 'daiLy-CTV-chiTiet.html';
        });
    }

});