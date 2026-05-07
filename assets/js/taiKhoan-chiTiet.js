document.addEventListener('DOMContentLoaded', () => {

    try {
        // Lấy dữ liệu từ bộ nhớ tạm
        const storedData = localStorage.getItem('moshii_detail_data');

        if (!storedData) {
            window.location.href = 'daiLy-CTV.html';
            return;
        }

        const data = JSON.parse(storedData);
        
        // [SỬA LỖI CRASH] Kiểm tra an toàn trước khi gọi hàm includes
        const maText = data.ma || '';
        const isAgent = maText.includes('DL') || data.role === 'Đại lý'; 

        // Hàm hỗ trợ đổ dữ liệu an toàn (không sập nếu thiếu thẻ HTML)
        const safeSetText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text || 'Chưa cập nhật';
        };

        const safeSetDisplay = (id, displayValue) => {
            const el = document.getElementById(id);
            if (el) el.style.display = displayValue;
        };

        // ==========================================
        // 1. GẮN DỮ LIỆU CƠ BẢN VÀO GIAO DIỆN
        // ==========================================
        safeSetText('det-id', data.ma);
        safeSetText('det-name', data.ten || data.name);
        safeSetText('det-email', data.email);
        safeSetText('det-dob', data.ngaysinh);
        safeSetText('det-phone', data.sdt || data.phone);
        safeSetText('det-area', data.khuvuc);
        safeSetText('det-commission', data.hoahong);

        // Xử lý huy hiệu Trạng thái
        const detStatus = document.getElementById('det-status');
        if (detStatus) {
            if (data.trangthai === 'Hoạt động' || !data.trangthai) {
                detStatus.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; background: #DCFCE7; color: #16A34A; border-radius: 8px; font-size: 12px; font-weight: 500;"><div style="width: 6px; height: 6px; background: #16A34A; border-radius: 50%;"></div>Hoạt động</span>`;
            } else {
                detStatus.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; background: #FEE2E2; color: #DC2626; border-radius: 8px; font-size: 12px; font-weight: 500;"><div style="width: 6px; height: 6px; background: #DC2626; border-radius: 50%;"></div>Ngừng hoạt động</span>`;
            }
        }

        // ==========================================
        // 2. BIẾN HÌNH GIAO DIỆN THEO ĐỐI TƯỢNG
        // ==========================================
        if (isAgent) {
            safeSetText('page-title', 'Chi tiết Đại lý');
            safeSetText('lbl-id', 'Mã đại lý');
            safeSetText('lbl-system', 'Thông tin hệ thống');
            
            safeSetDisplay('doanh-nghiep-row', 'flex');
            safeSetDisplay('mst-row', 'flex');
            safeSetDisplay('gioi-tinh-row', 'none');

            safeSetText('lbl-addr-1', 'Địa chỉ thường trú');
            safeSetDisplay('addr-2-row', 'flex');
            safeSetDisplay('pham-vi-row', 'flex');
            safeSetDisplay('danh-sach-row', 'flex');
            safeSetDisplay('kenh-ban-row', 'none');

        } else {
            safeSetText('page-title', 'Chi tiết CTV');
            safeSetText('lbl-id', 'Mã CTV');
            safeSetText('lbl-system', 'Hợp tác');
            
            safeSetDisplay('doanh-nghiep-row', 'none');
            safeSetDisplay('mst-row', 'none');
            safeSetDisplay('gioi-tinh-row', 'flex');

            safeSetText('lbl-addr-1', 'Địa chỉ');
            safeSetDisplay('addr-2-row', 'none'); 
            safeSetDisplay('pham-vi-row', 'none'); 
            safeSetDisplay('danh-sach-row', 'none'); 
            safeSetDisplay('kenh-ban-row', 'flex'); 
        }

        // ==========================================
        // 3. KÍCH HOẠT CÁC NÚT ĐIỀU HƯỚNG
        // ==========================================
        const btnEdit = document.querySelector('.btn-edit');
        if (btnEdit) {
            btnEdit.addEventListener('click', () => {
                window.location.href = 'daiLy-CTV-sua.html';
            });
        }

        // [SỬA LỖI] Ép nút Quay lại hoạt động ổn định bằng Javascript thay vì HTML
        const btnBack = document.querySelector('.back-btn');
        if (btnBack) {
            btnBack.addEventListener('click', (e) => {
                e.preventDefault(); // Ngăn chặn lỗi nhảy trang loạn xạ
                window.location.href = 'daiLy-CTV.html';
            });
        }

    } catch (error) {
        console.error("Đã chặn được lỗi sập trang chi tiết:", error);
    }
});