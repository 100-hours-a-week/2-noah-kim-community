import { URL } from "/public/routes.js";

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  // 인풋 요소
  const emailInput = document.getElementById("email-val");
  const passwordInput = document.getElementById("password-val");
  const passwordConfirmInput = document.getElementById("password-confirm-val");
  const nicknameInput = document.getElementById("nickname-val");

  // 이미지 입력 관련 요소
  const profileInput = document.getElementById("profile-val");
  const profilePreview = document.getElementById("profile-preview");
  const profileImage = document.getElementById("profile-image");
  const profilePlaceholder = document.getElementById("profile-placeholder");

  // 버튼 요소
  const backBtn = document.getElementById("back-button");
  const registerBtn = document.getElementById("register-button");
  const loginBtn = document.getElementById("login-button");

  // const validateEmail = () => {
  //   const email = emailInput.value.trim();
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = () => {
  //   const password = passwordInput.value;
  //   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
  //     password
  //   );
  // };

  // function validatePasswordConfirm() {
  //   return passwordInput.value === passwordConfirmInput.value;
  // }

  // function validateNickname() {
  //   return nicknameInput.value.trim().length > 0;
  // }

  const getProfileImage = () => {
    // 1. 새로운 이미지 입력 받기
    profileInput?.click();

    // 2. 기존 이미지 있다면 삭제
    if (profileImage.style.display === "block") {
      profileInput.value = "";
      profileImage.style.display = "none";
      profilePlaceholder.style.display = "block";
    }
  };

  // 이미지가 입력받아지면 수행할 일
  const onProfileChangeHandler = () => {
    // 2. 새로운 이미지 받기
    if (profileInput.files && profileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
        profileImage.style.display = "block";
        profilePlaceholder.style.display = "none";
      };
      reader.readAsDataURL(profileInput.files[0]);
    }
  };

  // signupForm.addEventListener("submit", function (event) {
  //   event.preventDefault();
  //   if (
  //     validateEmail() &&
  //     validatePassword() &&
  //     validatePasswordConfirm() &&
  //     validateNickname() &&
  //     validateProfile()
  //   ) {
  //     alert("회원가입 성공!");
  //     window.location.href = "main.html";
  //   } else {
  //     alert("입력을 확인해주세요!");
  //   }
  // });

  const backHandler = () => {
    window.location.href = URL.POST.MAIN.url; // 메인 페이지로 이동
  };

  const loginHandler = () => {
    window.location.href = URL.AUTH.LOGIN.url; // 로그인 페이지로 이동
  };

  const registerHandler = () => {
    window.location.href = URL.AUTH.REGISTER.url; // 회원가입 페이지로 이동
  };

  profilePreview.addEventListener("click", getProfileImage); // 클릭하면
  profileInput.addEventListener("change", onProfileChangeHandler);

  backBtn.addEventListener("click", backHandler);
  loginBtn.addEventListener("click", loginHandler);
  registerBtn.addEventListener("click", registerHandler);
});
