import { URL } from "../../../public/routes.js";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

const emailErrorText = document.getElementById("email-error-message");
const passwordErrorText = document.getElementById("password-error-message");

const loginBtn = document.getElementById("login-button");
const registerBtn = document.getElementById("register-button");

document.addEventListener("DOMContentLoaded", function () {
  function validateEmail() {
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;
    if (!email || !emailRegex.test(email)) {
      emailErrorText.textContent = "* 올바른 이메일 주소 형식을 입력해주세요.";
      isValid = false;
    }

    // 유효성 검사에 따른 에러 메세지 여부 결정표시
    if (!isValid) {
      emailErrorText.style.display = "block";
    } else {
      emailErrorText.style.display = "none";
    }

    return isValid;
  }

  function validatePassword() {
    const password = passwordInput.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    let isValid = true;
    let errorText = "";
    if (!password) {
      errorText = "* 비밀번호를 입력해주세요.";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      errorText =
        "* 8자 이상, 20자 이하, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
      isValid = false;
    }

    if (!isValid) {
      passwordErrorText.style.display = "block";
      passwordErrorText.textContent = errorText;
    } else {
      passwordErrorText.style.display = "none";
    }

    return isValid;
  }

  function loginHandler() {
    if (validateEmail() && validatePassword()) {
      loginBtn.style.backgroundColor = "#7F6AEE";
      setTimeout(() => {
        window.location.href = URL.POST.MAIN.url; // 메인 페이지로 이동
      }, 3000);
    }
  }

  function registerHandler() {
    window.location.href = URL.AUTH.REGISTER.url; // 회원가입 페이지로 이동
  }

  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);
  loginBtn.addEventListener("click", loginHandler);
  registerBtn.addEventListener("click", registerHandler);
});
