document.addEventListener('DOMContentLoaded', () => {
    const accountDataStr = localStorage.getItem('viewingAccount');
    if (!accountDataStr) {
        window.location.href = 'taiKhoan.html'; 
        return;
    }
    
    const acc = JSON.parse(accountDataStr);

    const prefix = acc.role === 'Đại lý' ? 'DL' : 'CTV';
    document.getElementById('pageTitle').textContent = `Tài khoản / ${prefix}_${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;
    
    document.getElementById('val-email').textContent = acc.email || 'chuacapnhat@email.com';

    const roleBadge = document.getElementById('val-role');
    if (acc.role === 'Đại lý') {
        roleBadge.innerHTML = `<span style="background: #DCFCE7; color: #16A34A; padding: 4px 10px; border-radius: 8px; font-weight: 500; font-size: 12px;">Đại lý</span>`;
        document.getElementById('sectionTitle2').textContent = 'Thông tin đại lý';
    } else {
        roleBadge.innerHTML = `<span style="background: #FEF3C7; color: #D97706; padding: 4px 10px; border-radius: 8px; font-weight: 500; font-size: 12px;">Cộng tác viên</span>`;
        document.getElementById('sectionTitle2').textContent = 'Thông tin cộng tác viên';
    }

    const dynamicContainer = document.getElementById('dynamic-info-rows');
    const createRow = (label, value) => `
        <div class="info-row">
            <div class="info-label">${label}</div>
            <div class="info-value">${value}</div>
        </div>
    `;

    let rowsHTML = '';
    rowsHTML += createRow('Họ và tên', acc.name || 'Đang cập nhật');
    rowsHTML += createRow('Ngày sinh', '19/08/1994'); 
    rowsHTML += createRow('Số điện thoại', acc.phone || 'Đang cập nhật');

    if (acc.role === 'Cộng tác viên') {
        rowsHTML += createRow('Đại lý quản lý', 'Nguyễn Văn An - AG001');
    }

    rowsHTML += createRow('Mã đại lý', 'AG001');

    if (acc.role === 'Cộng tác viên') {
        rowsHTML += createRow('Mã cộng tác viên', 'CTV_00005');
    }

    rowsHTML += createRow('Khu vực hoạt động', 'TP. Hồ Chí Minh');
    rowsHTML += createRow('Phần trăm hoa hồng', acc.role === 'Đại lý' ? '25%' : '18%');
    
    // GẮN THÊM id="status-container" ĐỂ LÁT NỮA UPDATE MÀU ĐỎ
    rowsHTML += `
        <div class="info-row">
            <div class="info-label">Trạng thái</div>
            <div class="info-value" id="status-container">
                <span style="background: #DCFCE7; color: #16A34A; padding: 4px 10px; border-radius: 8px; font-weight: 500; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;">
                    <span style="width: 6px; height: 6px; background: #16A34A; border-radius: 50%;"></span> Hoạt động
                </span>
            </div>
        </div>
    `;

    dynamicContainer.innerHTML = rowsHTML;

    // Nút Sửa
    const btnEdit = document.querySelector('.btn-edit');
    if (btnEdit) {
        btnEdit.addEventListener('click', () => {
            window.location.href = 'taiKhoan-sua.html';
        });
    }
});