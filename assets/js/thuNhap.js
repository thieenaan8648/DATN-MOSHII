document.addEventListener('DOMContentLoaded', () => {

    // Các thành phần DOM chung
    const tabIncome = document.getElementById('tab-income');
    const tabWithdraw = document.getElementById('tab-withdraw');
    const filterContainer = document.getElementById('filter-block-container'); // Khối chứa bộ lọc
    const incomeContainer = document.getElementById('income-result-container');
    const withdrawContainer = document.getElementById('withdraw-result-container');
    
    // ==========================================
    // 1. DATA MẪU TĨNH THEO THIẾT KẾ
    // ==========================================
    const figmaIncomeData = [
        { id: 'DH001', date: '01/04', price: '2,000,000 VNĐ', comm: '200,000 VNĐ' },
        { id: 'DH002', date: '02/04', price: '3,000,000 VNĐ', comm: '300,000 VNĐ' },
        { id: 'DH003', date: '03/04', price: '1,500,000 VNĐ', comm: '150,000 VNĐ' },
        { id: 'DH004', date: '05/04', price: '2,500,000 VNĐ', comm: '250,000 VNĐ' },
        { id: 'DH005', date: '07/04', price: '4,000,000 VNĐ', comm: '400,000 VNĐ' }
    ];

    const withdrawData = [
        { id: 'WD001', name: 'Trần Thị Bình', price: '15,000,000 VNĐ', time: '14:30:00 15/4/2026', status: 'Chờ xử lý', badge: 'badge-pending' },
        { id: 'WD002', name: 'Lê Văn Cường', price: '8,000,000 VNĐ', time: '10:20:00 14/4/2026', status: 'Chờ xử lý', badge: 'badge-pending' },
        { id: 'WD003', name: 'Phạm Thị Dung', price: '12,000,000 VNĐ', time: '16:45:00 13/4/2026', status: 'Đã duyệt', badge: 'badge-approved' },
        { id: 'WD004', name: 'Hoàng Văn Em', price: '5,500,000 VNĐ', time: '09:15:00 12/4/2026', status: 'Bị từ chối', badge: 'badge-rejected' }
    ];

    // ==========================================
    // 2. LOGIC CHUYỂN TAB VÀ ẨN/HIỆN GIAO DIỆN
    // ==========================================
    if (tabIncome && tabWithdraw) {
        // KHI BẤM TAB THU NHẬP
        tabIncome.addEventListener('click', () => {
            tabIncome.classList.add('active');
            tabWithdraw.classList.remove('active');
            
            // HIỆN BỘ LỌC
            filterContainer.style.display = 'block'; 
            
            // ẨN TAB RÚT TIỀN
            withdrawContainer.style.display = 'none';
        });

        // KHI BẤM TAB YÊU CẦU RÚT TIỀN
        tabWithdraw.addEventListener('click', () => {
            tabWithdraw.classList.add('active');
            tabIncome.classList.remove('active');

            // ẨN HOÀN TOÀN BỘ LỌC VÀ BẢNG THU NHẬP
            filterContainer.style.display = 'none'; 
            incomeContainer.style.display = 'none';

            // HIỆN NGAY DANH SÁCH RÚT TIỀN VÀ ĐỔ DỮ LIỆU
            const tableWithdrawBody = document.getElementById('table-withdraw-body');
            let withdrawHtml = '';
            withdrawData.forEach(row => {
                withdrawHtml += `
                    <tr>
                        <td class="col-bold">${row.id}</td>
                        <td>${row.name}</td>
                        <td class="col-bold">${row.price}</td>
                        <td>${row.time}</td>
                        <td><span class="badge ${row.badge}">${row.status}</span></td>
                    </tr>
                `;
            });
            tableWithdrawBody.innerHTML = withdrawHtml;
            
            withdrawContainer.style.display = 'flex';
        });
    }

    // ==========================================
    // 3. LOGIC BỘ LỌC BÊN TAB THU NHẬP
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

    // ==========================================
    // 4. LOGIC NÚT "XEM THU NHẬP"
    // ==========================================
    const btnViewAction = document.getElementById('btn-view-action');
    if (btnViewAction) {
        btnViewAction.addEventListener('click', () => {
            const target = document.getElementById('filter-target').value;
            const month = document.getElementById('filter-month').value;
            const valOrders = document.getElementById('val-total-orders');
            const valCommission = document.getElementById('val-total-commission');
            const tableIncomeBody = document.getElementById('table-income-body');

            if (!target) {
                alert("Vui lòng chọn Đối tượng để xem dữ liệu!");
                return;
            }

            if (month === "4") {
                valOrders.textContent = '25 đơn';
                valCommission.textContent = '5,000,000 VNĐ';
                let htmlContent = '';
                figmaIncomeData.forEach(row => {
                    htmlContent += `<tr><td class="col-bold">${row.id}</td><td>${row.date}</td><td>${row.price}</td><td class="col-green">${row.comm}</td></tr>`;
                });
                tableIncomeBody.innerHTML = htmlContent;
            } else {
                const randomOrders = Math.floor(Math.random() * 30) + 10;
                let htmlContent = '';
                let tempTotalComm = 0;

                for(let i = 1; i <= 5; i++) {
                    const priceVal = (Math.floor(Math.random() * 4) + 1) * 1000000;
                    const commVal = priceVal * 0.1;
                    tempTotalComm += commVal;

                    htmlContent += `<tr><td class="col-bold">DH0${Math.floor(Math.random() * 90) + 10}</td><td>0${i}/0${month}</td><td>${priceVal.toLocaleString('vi-VN')} VNĐ</td><td class="col-green">${commVal.toLocaleString('vi-VN')} VNĐ</td></tr>`;
                }
                valOrders.textContent = `${randomOrders} đơn`;
                valCommission.textContent = `${((tempTotalComm / 5) * randomOrders).toLocaleString('vi-VN')} VNĐ`;
                tableIncomeBody.innerHTML = htmlContent;
            }

            incomeContainer.style.display = 'flex';
        });
    }
});