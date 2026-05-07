document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. TỰ ĐỘNG ĐIỀN GIÁ GÓI VÀ TÍNH NGÀY KẾT THÚC (CHUẨN NGHIỆP VỤ)
    // ========================================================
    const selectPackage = document.getElementById('select-package');
    const inputPrice = document.getElementById('auto-price');
    const inputStartDate = document.getElementById('inp-ngay-bat-dau');
    const inputEndDate = document.getElementById('inp-ngay-ket-thuc');

    // GIẢ LẬP DỮ LIỆU GÓI CƯỚC (Được kéo từ màn hình Quản lý Gói cước)
    // Dựa vào value của thẻ select (hiện tại đang là giá tiền) để map đúng cấu hình Ngày/Tháng
    const cauHinhGoiCuoc = {
        '150000': { loai: 'thang', giaTri: 1 }, // Gói Data Cao Cấp: 1 Tháng
        '200000': { loai: 'thang', giaTri: 1 }, // Gói Combo Data + Voice: 1 Tháng
        '50000': { loai: 'ngay', giaTri: 7 }    // Gói SMS Doanh Nghiệp: 7 Ngày
    };

    function tinhNgayKetThuc() {
        if (selectPackage && inputStartDate && inputEndDate) {
            const giaGoi = selectPackage.value;
            const ngayBatDauStr = inputStartDate.value;

            if (giaGoi && ngayBatDauStr && cauHinhGoiCuoc[giaGoi]) {
                const cauHinh = cauHinhGoiCuoc[giaGoi];
                const dateObj = new Date(ngayBatDauStr);
                
                // THUẬT TOÁN TÍNH NGÀY KẾT THÚC
                if (cauHinh.loai === 'thang') {
                    // Cộng theo Tháng
                    dateObj.setMonth(dateObj.getMonth() + cauHinh.giaTri);
                    dateObj.setDate(dateObj.getDate() - 1); // Trừ 1 ngày (VD: 1/1 + 1 tháng = 31/1)
                } else if (cauHinh.loai === 'ngay') {
                    // Cộng theo Ngày
                    dateObj.setDate(dateObj.getDate() + cauHinh.giaTri - 1); // (VD: 1/1 + 7 ngày = 7/1)
                }

                // Format lại thành YYYY-MM-DD để gán vào input
                const yyyy = dateObj.getFullYear();
                const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                const dd = String(dateObj.getDate()).padStart(2, '0');
                
                inputEndDate.value = `${yyyy}-${mm}-${dd}`;
            }
        }
    }

    if (selectPackage && inputPrice) {
        selectPackage.addEventListener('change', function() {
            // Tự động điền giá tiền
            const price = this.value;
            inputPrice.value = price ? Number(price).toLocaleString('vi-VN') + ' VNĐ' : '';
            
            // Tự động tính ngày kết thúc
            tinhNgayKetThuc(); 
        });
    }

    if (inputStartDate) {
        inputStartDate.addEventListener('change', tinhNgayKetThuc);
    }


    // ========================================================
    // 2. ẨN LỖI KHI NHẬP LIỆU
    // ========================================================
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', hideError);
        input.addEventListener('change', hideError);
        function hideError() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) err.style.display = 'none';
        }
    });

    function getSelectText(id) {
        const el = document.getElementById(id);
        if (el && el.tagName === 'SELECT' && el.selectedIndex > 0) {
            return el.options[el.selectedIndex].text;
        }
        return '-';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '-';
        const parts = dateStr.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return dateStr;
    }

    // ========================================================
    // 3. XỬ LÝ LƯU DỮ LIỆU
    // ========================================================
    const btnSubmit = document.getElementById('btn-submit-donhang');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function() {
            const inputs = document.querySelectorAll('.val-required');
            let isValid = true;

            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    if (input.nextElementSibling) input.nextElementSibling.style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) return;

            try {
                const tenKhach = getSelectText('inp-khach-hang');
                const tenGoi = getSelectText('select-package');
                const tenDaiLy = getSelectText('inp-dai-ly');
                const tenCTV = getSelectText('inp-ctv');
                const trangThaiChon = getSelectText('inp-trang-thai'); 
                
                const giaGoi = inputPrice.value || '0 VNĐ';
                const ngayBatDau = document.getElementById('inp-ngay-bat-dau').value;
                const ngayKetThuc = document.getElementById('inp-ngay-ket-thuc').value;
                
                const maDH = `DH${Math.floor(Math.random() * 9000) + 1000}`;
                
                let statusClassDonHang = 'processing';
                if (trangThaiChon.includes('Chờ')) statusClassDonHang = 'pending';
                if (trangThaiChon.includes('Hoàn tất') || trangThaiChon.includes('hoàn thành')) statusClassDonHang = 'completed';
                if (trangThaiChon.includes('hủy')) statusClassDonHang = 'canceled';

                // LƯU ĐƠN HÀNG
                const donHangMoi = {
                    id: maDH,
                    customer: tenKhach,
                    packageName: tenGoi,
                    packagePrice: giaGoi,
                    statusText: trangThaiChon,
                    statusClass: statusClassDonHang,
                    date: formatDate(ngayBatDau)
                };
                let dsDonHang = JSON.parse(localStorage.getItem('duLieuDonHangTam')) || [];
                dsDonHang.push(donHangMoi);
                localStorage.setItem('duLieuDonHangTam', JSON.stringify(dsDonHang));

                // LƯU HÓA ĐƠN
                const hoaDonMoi = {
                    id: maDH.replace('DH', 'HD'),
                    maDonHang: maDH,
                    customer: tenKhach,
                    packageName: tenGoi,
                    packagePrice: giaGoi,
                    startDate: formatDate(ngayBatDau),
                    endDate: formatDate(ngayKetThuc),
                    agent: tenDaiLy,
                    collaborator: tenCTV,
                    statusText: 'Chờ xử lý',
                    statusClass: 'pending',
                    totalPrice: giaGoi
                };
                let dsHoaDon = JSON.parse(localStorage.getItem('duLieuHoaDonTam')) || [];
                dsHoaDon.push(hoaDonMoi);
                localStorage.setItem('duLieuHoaDonTam', JSON.stringify(dsHoaDon));

                document.getElementById('successModal').style.display = 'flex';

            } catch (e) {
                console.error("Lỗi khi lưu dữ liệu:", e);
            }
        });
    }
});

function dongModal() {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = 'donHang.html';
}