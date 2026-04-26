// Hàm load component cũ của bạn
function loadComponent(elementId, filePath) {
    return fetch(filePath) // Thêm return để dùng được .then()
        .then(response => {
            if (!response.ok) throw new Error("Không tìm thấy file: " + filePath);
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Lỗi nạp component:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    // Load xong tất cả component
    Promise.all([
        loadComponent("sidebar-placeholder", "../components/sidebar.html"),
        loadComponent("header-placeholder", "../components/header.html")
    ]).then(() => {
        // Sau khi Sidebar đã lên màn hình, ta mới tìm được nút đăng xuất
        const logoutBtn = document.querySelector(".menu-item.logout");
        
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function(e) {
                e.preventDefault(); // Ngăn chặn chuyển trang mặc định của thẻ <a>
                
                // 1. Xóa dữ liệu đăng nhập (nếu có)
                localStorage.removeItem("userToken");
                sessionStorage.clear();
                
                // 2. Thông báo (tùy chọn)
                //alert("Bạn đã đăng xuất thành công!");
                
                // 3. Chuyển hướng về trang đăng nhập
                window.location.href = "dangNhap.html";
            });
        }
    });
});