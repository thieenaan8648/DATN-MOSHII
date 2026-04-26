function handleLogin() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const loginError = document.getElementById("loginError");

  const correctEmail = "admin@gmail.com";
  const correctPassword = "123456";

  let isValid = true;

  // reset
  email.classList.remove("input-error");
  password.classList.remove("input-error");

  emailError.style.display = "none";
  passwordError.style.display = "none";
  loginError.style.display = "none";

  // check rỗng
  if (email.value.trim() === "") {
    email.classList.add("input-error");
    emailError.style.display = "block";
    isValid = false;
  }

  if (password.value.trim() === "") {
    password.classList.add("input-error");
    passwordError.style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  // check sai
  if (email.value !== correctEmail || password.value !== correctPassword) {
    loginError.style.display = "block";
    email.classList.add("input-error");
    password.classList.add("input-error");
    return;
  }

  //alert("Đăng nhập thành công!");
  window.location.href = "bangDieuKhien.html";
}