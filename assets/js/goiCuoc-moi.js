document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. LOGIC CHECKBOX CHO "LOẠI DỊCH VỤ" (DATA, SMS, VOICE)
    // =======================================================
    const checkboxes = document.querySelectorAll('.toggle-input');
    
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const targetInputId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetInputId);
            
            if(targetInput) {
                targetInput.disabled = !this.checked; 
                if(!this.checked) {
                    targetInput.value = ''; 
                } else {
                    targetInput.focus(); 
                }
            }
        });
    });

    // =======================================================
    // 2. LOGIC RADIO BUTTON CHO "LOẠI GÓI CƯỚC" (NGÀY/THÁNG)
    // =======================================================
    const radioPackageTypes = document.querySelectorAll('.radio-package-type');
    
    radioPackageTypes.forEach(radio => {
        radio.addEventListener('change', function() {
            radioPackageTypes.forEach(r => {
                const targetInputId = r.getAttribute('data-target');
                const targetInput = document.getElementById(targetInputId);
                
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

    // =======================================================
    // 3. LOGIC CÔNG TẮC TRẠNG THÁI (TOGGLE SWITCH)
    // =======================================================
    const statusToggle = document.getElementById('status-toggle');
    const statusText = document.getElementById('status-text');

    if (statusToggle && statusText) {
        statusToggle.addEventListener('change', function() {
            if(this.checked) {
                statusText.textContent = 'Hoạt động';
            } else {
                statusText.textContent = 'Ngừng hoạt động';
            }
        });
    }

    // =======================================================
    // 4. ẨN LỖI KHI NGƯỜI DÙNG BẮT ĐẦU GÕ 
    // =======================================================
    document.querySelectorAll('.val-required').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const err = this.nextElementSibling;
            if(err && err.classList.contains('error-text')) err.style.display = 'none';
        });
    });

    // =======================================================
    // 5. LOGIC KIỂM TRA LỖI VÀ HIỂN THỊ MODAL THÀNH CÔNG
    // =======================================================
    const btnSubmit = document.getElementById('btn-submit-goicuoc');
    const successModal = document.getElementById('successModal');
    
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function() {
            const requiredInputs = document.querySelectorAll('.val-required');
            let isValid = true;

            // Quét lỗi để trống
            requiredInputs.forEach(input => {
                const err = input.nextElementSibling;
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    if (err) err.style.display = 'block';
                    isValid = false;
                }
            });

            // Nếu form có lỗi thì ngừng chạy tiếp
            if (!isValid) return;

            // Nếu không có lỗi, bật Modal Thành Công
            if (successModal) {
                successModal.style.display = 'flex';
            }
        });
    }
});

// =======================================================
// 6. HÀM ĐÓNG MODAL VÀ CHUYỂN TRANG (Phải để ngoài DOMContentLoaded)
// =======================================================
function dongModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
    }
    window.location.href = 'goiCuoc.html';
}