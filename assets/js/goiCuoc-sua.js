document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOGIC CHECKBOX CHO "LOẠI DỊCH VỤ"
    const checkboxes = document.querySelectorAll('.toggle-input');
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const targetInput = document.getElementById(this.getAttribute('data-target'));
            if(targetInput) {
                targetInput.disabled = !this.checked; 
                if(!this.checked) targetInput.value = ''; 
                else targetInput.focus(); 
            }
        });
    });

    // 2. LOGIC RADIO BUTTON CHO "LOẠI GÓI CƯỚC"
    const radioPackageTypes = document.querySelectorAll('.radio-package-type');
    radioPackageTypes.forEach(radio => {
        radio.addEventListener('change', function() {
            radioPackageTypes.forEach(r => {
                const targetInput = document.getElementById(r.getAttribute('data-target'));
                if (targetInput) {
                    if (r.checked) {
                        targetInput.disabled = false; 
                        targetInput.focus();
                    } else {
                        targetInput.disabled = true; 
                        targetInput.value = ''; 
                    }
                }
            });
        });
    });

    // 3. LOGIC CÔNG TẮC TRẠNG THÁI
    const statusToggle = document.getElementById('status-toggle');
    const statusText = document.getElementById('status-text');
    if (statusToggle && statusText) {
        statusToggle.addEventListener('change', function() {
            statusText.textContent = this.checked ? 'Hoạt động' : 'Ngừng hoạt động';
        });
    }

    // 4. ẨN LỖI KHI NGƯỜI DÙNG BẮT ĐẦU GÕ 
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) err.style.display = 'none';
        });
    });

    // 5. BẮT SỰ KIỆN NÚT "LƯU THAY ĐỔI"
    const btnSave = document.getElementById('btn-save-goicuoc');
    const successModal = document.getElementById('successModal');
    
    if (btnSave) {
        btnSave.addEventListener('click', function() {
            const requiredInputs = document.querySelectorAll('.val-required');
            let isValid = true;

            requiredInputs.forEach(input => {
                const err = input.nextElementSibling;
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                }
            });

            if (!isValid) return;

            if (successModal) {
                successModal.style.display = 'flex';
            }
        });
    }
});

// 6. HÀM ĐÓNG MODAL VÀ QUAY VỀ TRANG CHI TIẾT
function dongModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    // Sửa thành công thì trở về trang xem Chi tiết
    window.location.href = 'goiCuoc-chiTiet.html';
}