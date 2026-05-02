document.addEventListener('DOMContentLoaded', () => {

    const tabIncome = document.getElementById('tab-income');
    const tabWithdraw = document.getElementById('tab-withdraw');
    const filterContainer = document.getElementById('filter-block-container');
    const incomeContainer = document.getElementById('income-result-container');
    const withdrawContainer = document.getElementById('withdraw-result-container');
    
    const emptyDetailState = document.getElementById('empty-detail-state');
    const detailContent = document.getElementById('detail-content');
    const detailActions = document.getElementById('detail-actions');

    let currentSelectedIndex = null; // Biến theo dõi dòng đang được click

    // Mảng Data có thể bị thay đổi khi duyệt/từ chối
    const withdrawData = [
        { id: 'WD001', name: 'Trần Thị Bình', role: 'Đại lý', price: '15,000,000 VNĐ', time: '14:30:00 15/4/2026', status: 'Chờ xử lý', badge: 'badge-pending' },
        { id: 'WD002', name: 'Lê Văn Cường', role: 'Đại lý', price: '8,000,000 VNĐ', time: '10:20:00 14/4/2026', status: 'Chờ xử lý', badge: 'badge-pending' },
        { id: 'WD003', name: 'Phạm Thị Dung', role: 'CTV', price: '12,000,000 VNĐ', time: '16:45:00 13/4/2026', status: 'Đã duyệt', badge: 'badge-approved' },
        { id: 'WD004', name: 'Hoàng Văn Em', role: 'CTV', price: '5,500,000 VNĐ', time: '09:15:00 12/4/2026', status: 'Bị từ chối', badge: 'badge-rejected' }
    ];

    // Hàm render lại toàn bộ bảng Yêu cầu rút tiền
    function renderWithdrawTable() {
        const tableWithdrawBody = document.getElementById('table-withdraw-body');
        let withdrawHtml = '';
        withdrawData.forEach((row, index) => {
            // Nếu dòng này đang được chọn thì in đậm nó lên
            const isActive = (currentSelectedIndex == index) ? 'active-row' : '';
            withdrawHtml += `
                <tr class="withdraw-row ${isActive}" data-index="${index}">
                    <td class="col-bold">${row.id}</td>
                    <td>${row.name}</td>
                    <td class="col-bold">${row.price}</td>
                    <td>${row.time}</td>
                    <td><span class="badge ${row.badge}">${row.status}</span></td>
                </tr>
            `;
        });
        tableWithdrawBody.innerHTML = withdrawHtml;
        attachRowClickEvents();
    }

    // Hàm cập nhật lại Khối chi tiết bên phải
    function updateDetailView(index) {
        const data = withdrawData[index];
        document.getElementById('det-id').textContent = data.id;
        document.getElementById('det-name').innerHTML = `${data.name} <span style="color:#6B7280; font-size:13px">(${data.role})</span>`;
        document.getElementById('det-price').textContent = data.price;
        document.getElementById('det-time').textContent = data.time;
        document.getElementById('det-status-wrapper').innerHTML = `<span class="badge ${data.badge}">${data.status}</span>`;

        emptyDetailState.style.display = 'none';
        detailContent.style.display = 'flex';

        // Ẩn hiện nút Duyệt/Từ chối tùy trạng thái
        if (data.status === 'Chờ xử lý') {
            detailActions.style.display = 'flex';
        } else {
            detailActions.style.display = 'none';
        }
    }

    // ==========================================
    // 1. LOGIC CHUYỂN TAB
    // ==========================================
    if (tabIncome && tabWithdraw) {
        tabIncome.addEventListener('click', () => {
            tabIncome.classList.add('active'); tabWithdraw.classList.remove('active');
            filterContainer.style.display = 'block'; 
            withdrawContainer.style.display = 'none';
        });

        tabWithdraw.addEventListener('click', () => {
            tabWithdraw.classList.add('active'); tabIncome.classList.remove('active');
            filterContainer.style.display = 'none'; 
            incomeContainer.style.display = 'none';
            
            // Render bảng và mở khung
            currentSelectedIndex = null; // Reset lựa chọn
            renderWithdrawTable();
            withdrawContainer.style.display = 'flex';
            
            emptyDetailState.style.display = 'flex';
            detailContent.style.display = 'none';
        });
    }

    // ==========================================
    // 2. SỰ KIỆN CLICK VÀO TỪNG DÒNG CỦA BẢNG
    // ==========================================
    function attachRowClickEvents() {
        const rows = document.querySelectorAll('.withdraw-row');
        rows.forEach(row => {
            row.addEventListener('click', function() {
                // Đổi màu dòng đang chọn
                rows.forEach(r => r.classList.remove('active-row'));
                this.classList.add('active-row');

                // Lấy index và load chi tiết
                currentSelectedIndex = this.getAttribute('data-index');
                updateDetailView(currentSelectedIndex);
            });
        });
    }

    // ==========================================
    // 3. XỬ LÝ POPUP XÁC NHẬN VÀ TỪ CHỐI
    // ==========================================
    const btnApproveReq = document.getElementById('btn-req-approve');
    const btnRejectReq = document.getElementById('btn-req-reject');
    
    const approveModal = document.getElementById('approveModal');
    const rejectModal = document.getElementById('rejectModal');

    // Mở popup
    if (btnApproveReq) btnApproveReq.addEventListener('click', () => approveModal.style.display = 'flex');
    if (btnRejectReq) btnRejectReq.addEventListener('click', () => rejectModal.style.display = 'flex');

    // Đóng popup khi ấn Hủy
    document.getElementById('btn-cancel-approve').addEventListener('click', () => approveModal.style.display = 'none');
    document.getElementById('btn-cancel-reject').addEventListener('click', () => rejectModal.style.display = 'none');

    // Nút XÁC NHẬN TRONG POPUP DUYỆT
    document.getElementById('btn-confirm-approve').addEventListener('click', () => {
        if (currentSelectedIndex !== null) {
            withdrawData[currentSelectedIndex].status = 'Đã duyệt';
            withdrawData[currentSelectedIndex].badge = 'badge-approved';
            
            approveModal.style.display = 'none';
            renderWithdrawTable();
            updateDetailView(currentSelectedIndex); // Load lại khối bên phải để ẩn 2 nút
        }
    });

    // Nút XÁC NHẬN TRONG POPUP TỪ CHỐI
    document.getElementById('btn-confirm-reject').addEventListener('click', () => {
        if (currentSelectedIndex !== null) {
            withdrawData[currentSelectedIndex].status = 'Bị từ chối';
            withdrawData[currentSelectedIndex].badge = 'badge-rejected';
            
            rejectModal.style.display = 'none';
            renderWithdrawTable();
            updateDetailView(currentSelectedIndex);
        }
    });

    // ==========================================
    // 4. BỘ LỌC BÊN TAB THU NHẬP
    // ==========================================
    const filterType = document.getElementById('filter-type');
    const filterTarget = document.getElementById('filter-target');
    const labelTarget = document.getElementById('label-target');

    if (filterType && filterTarget && labelTarget) {
        filterType.addEventListener('change', function() {
            if (this.value === 'agent') {
                labelTarget.textContent = 'Chọn đại lý';
                filterTarget.innerHTML = `<option value="" disabled selected hidden>Vui lòng chọn</option><option value="DL001">DL001 - Trần Thị Bình</option><option value="DL002">DL002 - Phạm Thị Dung</option>`;
            } else {
                labelTarget.textContent = 'Chọn cộng tác viên';
                filterTarget.innerHTML = `<option value="" disabled selected hidden>Vui lòng chọn</option><option value="CTV001">CTV001 - Lê Văn Cường</option><option value="CTV002">CTV002 - Hoàng Văn Em</option>`;
            }
        });
    }

    const btnViewAction = document.getElementById('btn-view-action');
    if (btnViewAction) {
        btnViewAction.addEventListener('click', () => {
            const isIncomeTab = tabIncome.classList.contains('active');
            if(isIncomeTab) {
                const target = document.getElementById('filter-target').value;
                const month = document.getElementById('filter-month').value;
                const valOrders = document.getElementById('val-total-orders');
                const valCommission = document.getElementById('val-total-commission');
                const tableIncomeBody = document.getElementById('table-income-body');

                if (!target) { alert("Vui lòng chọn Đối tượng!"); return; }

                if (month === "4") {
                    valOrders.textContent = '25 đơn'; valCommission.textContent = '5,000,000 VNĐ';
                    tableIncomeBody.innerHTML = `
                        <tr><td class="col-bold">DH001</td><td>01/04</td><td>2,000,000 VNĐ</td><td class="col-green">200,000 VNĐ</td></tr>
                        <tr><td class="col-bold">DH002</td><td>02/04</td><td>3,000,000 VNĐ</td><td class="col-green">300,000 VNĐ</td></tr>
                        <tr><td class="col-bold">DH003</td><td>03/04</td><td>1,500,000 VNĐ</td><td class="col-green">150,000 VNĐ</td></tr>
                    `;
                } else {
                    const randomOrders = Math.floor(Math.random() * 30) + 10; let htmlContent = ''; let tempTotalComm = 0;
                    for(let i = 1; i <= 3; i++) {
                        const priceVal = (Math.floor(Math.random() * 4) + 1) * 1000000; const commVal = priceVal * 0.1; tempTotalComm += commVal;
                        htmlContent += `<tr><td class="col-bold">DH0${Math.floor(Math.random() * 90) + 10}</td><td>0${i}/0${month}</td><td>${priceVal.toLocaleString('vi-VN')} VNĐ</td><td class="col-green">${commVal.toLocaleString('vi-VN')} VNĐ</td></tr>`;
                    }
                    valOrders.textContent = `${randomOrders} đơn`; valCommission.textContent = `${((tempTotalComm / 3) * randomOrders).toLocaleString('vi-VN')} VNĐ`;
                    tableIncomeBody.innerHTML = htmlContent;
                }
                incomeContainer.style.display = 'flex';
            }
        });
    }
});