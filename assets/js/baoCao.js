document.addEventListener('DOMContentLoaded', () => {

    // 1. LOGIC ĐỐI TƯỢNG THỐNG KÊ (HIỂN THỊ DROPDOWN)
    const targetRadios = document.querySelectorAll('input[name="doi_tuong"]');
    const dropdownContainer = document.getElementById('dropdown-container');

    targetRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'all') {
                dropdownContainer.innerHTML = ''; 
            } else if (this.value === 'agent') {
                dropdownContainer.innerHTML = `
                    <select class="filter-select">
                        <option value="" disabled selected hidden>Chọn đại lý</option>
                        <option value="DL001">DL001 - Trần Thị Bình</option>
                        <option value="DL002">DL002 - Phạm Thị Dung</option>
                    </select>
                `;
            } else if (this.value === 'collab') {
                dropdownContainer.innerHTML = `
                    <select class="filter-select">
                        <option value="" disabled selected hidden>Chọn cộng tác viên</option>
                        <option value="CTV001">CTV001 - Lê Văn Cường</option>
                        <option value="CTV002">CTV002 - Hoàng Văn Em</option>
                    </select>
                `;
            }
        });
    });

    // 2. LOGIC LOẠI THỜI GIAN (ĐỔI LOẠI Ô INPUT)
    const timeRadios = document.querySelectorAll('input[name="loai_thoi_gian"]');
    const dateRangeContainer = document.getElementById('date-range-container');

    timeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            let labelStart = "Ngày bắt đầu"; let labelEnd = "Ngày kết thúc"; let inputType = "date";
            if (this.value === 'week') { labelStart = "Tuần bắt đầu"; labelEnd = "Tuần kết thúc"; inputType = "week"; } 
            else if (this.value === 'month') { labelStart = "Tháng bắt đầu"; labelEnd = "Tháng kết thúc"; inputType = "month"; } 
            else if (this.value === 'year') { labelStart = "Năm bắt đầu"; labelEnd = "Năm kết thúc"; inputType = "number"; }

            dateRangeContainer.innerHTML = `
                <div class="date-input-wrapper">
                    <label>${labelStart}</label>
                    <input type="${inputType}" ${inputType === 'number' ? 'placeholder="VD: 2026"' : ''}>
                </div>
                <div class="date-input-wrapper">
                    <label>${labelEnd}</label>
                    <input type="${inputType}" ${inputType === 'number' ? 'placeholder="VD: 2026"' : ''}>
                </div>
            `;
        });
    });

    // 3. LOGIC KHI BẤM "XEM BÁO CÁO" (TẠO DATA & VẼ BIỂU ĐỒ)
    const btnViewReport = document.getElementById('btn-view-report');
    const reportContainer = document.getElementById('report-result-container');
    const valTotal = document.getElementById('val-total');
    const valCompleted = document.getElementById('val-completed');
    const valProcessing = document.getElementById('val-processing');
    let myChartInstance = null;

    if (btnViewReport) {
        btnViewReport.addEventListener('click', () => {
            const currentTarget = document.querySelector('input[name="doi_tuong"]:checked').value;
            const currentTimeType = document.querySelector('input[name="loai_thoi_gian"]:checked').value;

            let baseMultiplier = (currentTarget === 'all') ? 10 : (currentTarget === 'agent' ? 5 : 2);
            const total = Math.floor(Math.random() * 50 * baseMultiplier) + 20; 
            const completed = Math.floor(total * (Math.random() * 0.4 + 0.5)); 
            const processing = total - completed;

            valTotal.textContent = total; valCompleted.textContent = completed; valProcessing.textContent = processing;

            let xAxisLabels = [];
            if (currentTimeType === 'day') xAxisLabels = ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04', '07/04'];
            else if (currentTimeType === 'week') xAxisLabels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
            else if (currentTimeType === 'month') xAxisLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
            else if (currentTimeType === 'year') xAxisLabels = ['2023', '2024', '2025', '2026'];

            let remaining = total;
            let chartData = [];
            for (let i = 0; i < xAxisLabels.length - 1; i++) {
                let val = Math.floor(Math.random() * (remaining / 1.5));
                chartData.push(val); remaining -= val;
            }
            chartData.push(remaining);
            chartData.sort(() => Math.random() - 0.5);

            reportContainer.style.display = 'flex';
            const ctx = document.getElementById('myChart').getContext('2d');
            if (myChartInstance) myChartInstance.destroy();

            myChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: xAxisLabels,
                    datasets: [{
                        label: 'Số lượng đơn hàng',
                        data: chartData,
                        backgroundColor: '#2563EB',
                        borderRadius: 6, barThickness: 28,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#F3F4F6' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        });
    }

    // ==========================================
    // 4. LOGIC BẬT/TẮT POPUP XUẤT BÁO CÁO
    // ==========================================
    const btnExport = document.getElementById('btn-export-report');
    const exportModal = document.getElementById('exportModal');
    const btnCloseExport = document.getElementById('btn-close-export');
    const btnConfirmExport = document.getElementById('btn-confirm-export');

    if (btnExport && exportModal) {
        btnExport.addEventListener('click', () => {
            exportModal.style.display = 'flex';
        });
    }

    if (btnCloseExport && exportModal) {
        btnCloseExport.addEventListener('click', () => {
            exportModal.style.display = 'none';
        });
    }

    if (btnConfirmExport && exportModal) {
        btnConfirmExport.addEventListener('click', () => {
            const format = document.querySelector('input[name="exportFormat"]:checked').value;
            // Ở dự án thực tế, đây là lúc gọi API tải file. Mình giả lập bằng việc tắt popup.
            alert("Hệ thống đang tải xuống file " + format.toUpperCase());
            exportModal.style.display = 'none';
        });
    }

});