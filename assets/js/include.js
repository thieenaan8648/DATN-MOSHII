/**
 * Hàm nạp thành phần HTML từ file bên ngoài
 */
function loadComponent(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Không tìm thấy file: " + filePath);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        })
        .catch(error => console.error('Lỗi nạp component:', error));
}

/**
 * Khởi tạo giao diện và xử lý logic menu
 */
document.addEventListener("DOMContentLoaded", function() {
    // Load xong tất cả component (Sidebar, Header, Footer)
    Promise.all([
        loadComponent("sidebar-placeholder", "../components/sidebar.html"),
        loadComponent("header-placeholder", "../components/header.html"),
        loadComponent("footer-placeholder", "../components/footer.html")
    ]).then(() => {
        
        // --- LOGIC 1: TỰ ĐỘNG ACTIVE MENU THEO TRANG HIỆN TẠI ---
        // Lấy tên file hiện tại (ví dụ: taiKhoan.html)
        const currentPath = window.location.pathname.split("/").pop();
        
        // Tìm tất cả các thẻ menu trong sidebar
        const menuItems = document.querySelectorAll(".menu-item");

        menuItems.forEach(item => {
            // Xóa class active cũ của tất cả menu
            item.classList.remove("active");

            // Lấy giá trị href của menu (ví dụ: taiKhoan.html)
            const itemHref = item.getAttribute("href");

            // Nếu href trùng với tên file hiện tại thì thêm class active (hiện xanh)
            if (itemHref === currentPath) {
                item.classList.add("active");
            }
        });


        // --- LOGIC 2: XỬ LÝ ĐĂNG XUẤT ---
        const logoutBtn = document.querySelector(".menu-item.logout");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function(e) {
                e.preventDefault();
                localStorage.removeItem("userToken");
                sessionStorage.clear();
                window.location.href = "dangNhap.html";
            });
        }
    });
});