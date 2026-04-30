document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy dữ liệu khách hàng được click
    const customerDataStr = localStorage.getItem('viewingCustomer');
    if (!customerDataStr) {
        window.location.href = 'khachHang.html'; // Đá về danh sách nếu ko có data
        return;
    }
    
    const cus = JSON.parse(customerDataStr);

    // Điền Tiêu đề
    document.getElementById('pageTitle').textContent = `Khách hàng / ${cus.id}`;
    
    // Hàm tạo dòng HTML
    const createRow = (label, value, isValueBold = false) => `
        <div class="info-row">
            <div class="info-label">${label}</div>
            <div class="info-value" style="${isValueBold ? 'font-weight: 500; color: #111827;' : ''}">${value}</div>
        </div>
    `;

    // 2. Render Thông tin chung
    const generalContainer = document.getElementById('general-info-rows');
    let generalHTML = '';
    generalHTML += createRow('Mã khách hàng', cus.id, true);
    generalHTML += createRow('Họ và tên', cus.name);
    generalHTML += createRow('Giới tính', 'Nữ'); // Tạm fix cứng demo
    generalHTML += createRow('Số CMND/CCCD', '048111111111');
    generalHTML += createRow('Số điện thoại', cus.phone);
    generalHTML += createRow('Email', 'mai.nguyen@example.com');
    generalHTML += createRow('Ngày sinh', '15/5/1992');
    generalHTML += createRow('Địa chỉ', '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh');
    generalHTML += createRow('Ghi chú', 'Khách hàng VIP, ưu tiên hỗ trợ nhanh');
    
    generalContainer.innerHTML = generalHTML;

    // 3. Render Thông tin quản lý
    const managementContainer = document.getElementById('management-info-rows');
    let managementHTML = '';
    managementHTML += createRow('Đại lý', 'DL001 - Trần Thị Bình');
    managementHTML += createRow('Cộng tác viên', 'CTV001 - Lê Văn Cường');
    
    managementContainer.innerHTML = managementHTML;
});