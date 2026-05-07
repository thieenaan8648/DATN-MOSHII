document.addEventListener('DOMContentLoaded', () => {

    const tabDaily = document.getElementById('tab-daily');
    const tabCtv = document.getElementById('tab-ctv');
    const tableBodyDaily = document.getElementById('table-body-daily');
    const tableBodyCtv = document.getElementById('table-body-ctv');
    const searchInput = document.getElementById('search-input');
    const colMa = document.getElementById('col-ma');
    const colTen = document.getElementById('col-ten');

    // 1. DATA GỐC
    let agentData = [
        { ma: 'DL001', ten: 'Trần Thị Bình', email: 'binh.tran@example.com', ngaysinh: '15/03/1985', sdt: '0912345678', khuvuc: 'TP. Hồ Chí Minh', hoahong: '15%', trangthai: 'Hoạt động' },
        { ma: 'DL002', ten: 'Phạm Thị Dung', email: 'dung.pham@example.com', ngaysinh: '20/10/1990', sdt: '0934567890', khuvuc: 'Hà Nội', hoahong: '12%', trangthai: 'Hoạt động' },
        { ma: 'DL003', ten: 'Nguyễn Văn Thành', email: 'thanh.nguyen@example.com', ngaysinh: '05/08/1988', sdt: '0945678901', khuvuc: 'Đà Nẵng', hoahong: '10%', trangthai: 'Ngừng hoạt động' }
    ];

    let ctvData = [
        { ma: 'CTV001', ten: 'Lê Văn Cường', email: 'cuong.le@example.com', ngaysinh: '12/12/1995', sdt: '0923456789', khuvuc: 'TP. Hồ Chí Minh', hoahong: '8%', trangthai: 'Hoạt động' },
        { ma: 'CTV002', ten: 'Hoàng Văn Em', email: 'em.hoang@example.com', ngaysinh: '01/05/1998', sdt: '0945678901', khuvuc: 'Hà Nội', hoahong: '7%', trangthai: 'Hoạt động' },
        { ma: 'CTV003', ten: 'Vũ Văn F', email: 'f.vu@example.com', ngaysinh: '10/11/1993', sdt: '0956789012', khuvuc: 'Cần Thơ', hoahong: '6%', trangthai: 'Ngừng hoạt động' }
    ];

    // 2. KÉO DỮ LIỆU TỪ TÀI KHOẢN MỚI
    const duLieuTam = JSON.parse(localStorage.getItem('duLieuTam')) || [];
    duLieuTam.forEach(acc => {
        const newRecord = {
            ma: acc.ma || (acc.role === 'Đại lý' ? 'DL999' : 'CTV999'),
            ten: acc.ten || acc.name || 'Chưa cập nhật', 
            email: acc.email || 'Chưa cập nhật',
            ngaysinh: acc.ngaysinh || 'Chưa cập nhật', // [SỬA LỖI] Xóa fallback acc.date để không bị lấy nhầm ngày tạo
            sdt: acc.sdt || acc.phone || 'Chưa cập nhật',
            khuvuc: acc.khuvuc || 'Chưa cập nhật',
            hoahong: acc.hoahong || '10%',
            trangthai: acc.trangthai || 'Hoạt động'
        };

        if (acc.role === 'Đại lý' || newRecord.ma.includes('DL')) {
            agentData.unshift(newRecord);
        } else {
            ctvData.unshift(newRecord);
        }
    });

    // 3. RENDER BẢNG GIAO DIỆN
    function renderTable(dataArray, tableBodyElement) {
        let html = '';
        dataArray.forEach((row, index) => {
            const badgeClass = row.trangthai === 'Ngừng hoạt động' ? 'status-inactive' : 'status-active';
            html += `
                <tr class="data-row" data-index="${index}">
                    <td><strong style="color: #111827; font-weight: 500;">${row.ma}</strong></td>
                    <td><span style="color: #374151;">${row.ten}</span></td>
                    <td><span style="color: #374151;">${row.sdt}</span></td>
                    <td><span style="color: #6B7280;">${row.khuvuc}</span></td>
                    <td><span style="color: #374151;">${row.hoahong}</span></td>
                    <td><span class="status-dot ${badgeClass}">${row.trangthai}</span></td>
                </tr>
            `;
        });
        tableBodyElement.innerHTML = html;
    }

    if (tableBodyDaily && tableBodyCtv) {
        renderTable(agentData, tableBodyDaily);
        renderTable(ctvData, tableBodyCtv);
    }

    // 4. CLICK XEM CHI TIẾT
    document.body.addEventListener('click', function(e) {
        const row = e.target.closest('.data-row');
        if (row) {
            const index = row.getAttribute('data-index');
            const isAgentTab = tabDaily.classList.contains('active');
            let dataToPass = isAgentTab ? agentData[index] : ctvData[index];

            if (dataToPass) {
                localStorage.setItem('moshii_detail_data', JSON.stringify(dataToPass));
                window.location.href = 'daiLy-CTV-chiTiet.html';
            }
        }
    });

    // 5. CHUYỂN TAB VÀ TÌM KIẾM
    if (tabDaily && tabCtv) {
        tabDaily.addEventListener('click', () => {
            tabDaily.classList.add('active'); tabCtv.classList.remove('active');
            tableBodyDaily.style.display = ''; tableBodyCtv.style.display = 'none';
            colMa.textContent = 'MÃ ĐẠI LÝ'; colTen.textContent = 'TÊN ĐẠI DIỆN';
            if(searchInput) { searchInput.placeholder = 'Tìm kiếm theo mã, tên đại lý...'; searchInput.value = ''; }
            removeNoResultRow(); resetSearchVisibility(tableBodyDaily);
        });

        tabCtv.addEventListener('click', () => {
            tabCtv.classList.add('active'); tabDaily.classList.remove('active');
            tableBodyCtv.style.display = ''; tableBodyDaily.style.display = 'none';
            colMa.textContent = 'MÃ CTV'; colTen.textContent = 'TÊN CTV';
            if(searchInput) { searchInput.placeholder = 'Tìm kiếm theo mã, tên CTV...'; searchInput.value = ''; }
            removeNoResultRow(); resetSearchVisibility(tableBodyCtv);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const activeTableBody = (tableBodyDaily.style.display === 'none') ? tableBodyCtv : tableBodyDaily;
            const rows = activeTableBody.querySelectorAll('.data-row'); 
            let hasResult = false;

            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(query)) {
                    row.style.display = ''; hasResult = true;
                } else {
                    row.style.display = 'none'; 
                }
            });

            let noResultRow = document.getElementById('no-result');
            if (!hasResult) {
                if (!noResultRow) {
                    noResultRow = document.createElement('tr'); noResultRow.id = 'no-result';
                    noResultRow.innerHTML = `<td colspan="6" style="text-align: center; padding: 40px; color: #6B7280; font-size: 14px;"><i class='bx bx-search' style="font-size: 32px; color: #D1D5DB; margin-bottom: 8px; display: block;"></i>Không tìm thấy kết quả nào khớp với "<b>${this.value}</b>"</td>`;
                    activeTableBody.appendChild(noResultRow);
                } else {
                    noResultRow.style.display = '';
                    noResultRow.innerHTML = `<td colspan="6" style="text-align: center; padding: 40px; color: #6B7280; font-size: 14px;"><i class='bx bx-search' style="font-size: 32px; color: #D1D5DB; margin-bottom: 8px; display: block;"></i>Không tìm thấy kết quả nào khớp với "<b>${this.value}</b>"</td>`;
                }
            } else {
                if (noResultRow) noResultRow.style.display = 'none';
            }
        });
    }

    function removeNoResultRow() {
        const noResultRow = document.getElementById('no-result');
        if (noResultRow) noResultRow.remove();
    }
    function resetSearchVisibility(tableBody) {
        const rows = tableBody.querySelectorAll('.data-row');
        rows.forEach(row => row.style.display = '');
    }
});