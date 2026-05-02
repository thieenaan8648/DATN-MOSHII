document.addEventListener('DOMContentLoaded', () => {

    // Lấy dữ liệu từ bộ nhớ tạm
    const storedData = localStorage.getItem('moshii_detail_data');

    if (storedData) {
        const data = JSON.parse(storedData);
        const isAgent = data.ma.includes('DL'); // Kiểm tra xem có chứa chữ DL không

        // Gắn dữ liệu cơ bản
        document.getElementById('det-id').textContent = data.ma;
        document.getElementById('det-name').textContent = data.ten;
        document.getElementById('det-phone').textContent = data.sdt;
        document.getElementById('det-area').textContent = data.khuvuc;
        document.getElementById('det-commission').textContent = data.hoahong;

        // Xử lý huy hiệu Trạng thái
        if(data.trangthai === 'Hoạt động') {
            document.getElementById('det-status').innerHTML = `<span style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; background: #DCFCE7; color: #16A34A; border-radius: 8px; font-size: 12px; font-weight: 500;"><div style="width: 6px; height: 6px; background: #16A34A; border-radius: 50%;"></div>Hoạt động</span>`;
        } else {
            document.getElementById('det-status').innerHTML = `<span style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; background: #FEE2E2; color: #DC2626; border-radius: 8px; font-size: 12px; font-weight: 500;"><div style="width: 6px; height: 6px; background: #DC2626; border-radius: 50%;"></div>Ngừng hoạt động</span>`;
        }

        // ==========================================
        // BIẾN HÌNH GIAO DIỆN THEO ĐỐI TƯỢNG
        // ==========================================
        if (isAgent) {
            // LÀ ĐẠI LÝ
            document.getElementById('page-title').textContent = 'Chi tiết Đại lý';
            document.getElementById('lbl-id').textContent = 'Mã đại lý';
            document.getElementById('lbl-system').textContent = 'Thông tin hệ thống';
            
            // Các trường của Đại lý
            document.getElementById('doanh-nghiep-row').style.display = 'flex';
            document.getElementById('mst-row').style.display = 'flex';
            document.getElementById('lbl-addr-1').textContent = 'Địa chỉ thường trú';
            document.getElementById('addr-2-row').style.display = 'flex';
            document.getElementById('pham-vi-row').style.display = 'flex';
            document.getElementById('danh-sach-row').style.display = 'flex';
            document.getElementById('kenh-ban-row').style.display = 'none';

        } else {
            // LÀ CỘNG TÁC VIÊN
            document.getElementById('page-title').textContent = 'Chi tiết CTV';
            document.getElementById('lbl-id').textContent = 'Mã CTV';
            document.getElementById('lbl-system').textContent = 'Hợp tác';
            
            // Ẩn/Hiện các trường theo CTV
            document.getElementById('doanh-nghiep-row').style.display = 'none';
            document.getElementById('mst-row').style.display = 'none';
            document.getElementById('lbl-addr-1').textContent = 'Địa chỉ';
            document.getElementById('addr-2-row').style.display = 'none'; // Ẩn địa chỉ kinh doanh
            document.getElementById('pham-vi-row').style.display = 'none'; // Ẩn phạm vi
            document.getElementById('danh-sach-row').style.display = 'none'; // Ẩn danh sách CTV con
            document.getElementById('kenh-ban-row').style.display = 'flex'; // Hiện Kênh bán
        }
    }

    // ==========================================
    // 2. KÍCH HOẠT NÚT SỬA ĐỂ CHUYỂN SANG MÀN HÌNH FORM SỬA
    // ==========================================
    const btnEdit = document.querySelector('.btn-edit');
    if(btnEdit) {
        btnEdit.addEventListener('click', () => {
            // Phải đảm bảo tên file này trỏ đúng vào file Form sửa bạn vừa tạo
            window.location.href = 'daiLy-CTV-sua.html';
        });
    }
});