import { URL } from "../../../public/routes.js";

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  // 인풋 요소
  const emailInput = document.getElementById("email-val");
  const passwordInput = document.getElementById("password-val");
  const passwordConfirmInput = document.getElementById("password-confirm-val");
  const nicknameInput = document.getElementById("nickname-val");

  // 에러 메세지 요소
  const profileErrorText = document.getElementById("profile-error");
  const emailErrorText = document.getElementById("email-error");
  const passwordErrorText = document.getElementById("password-error");
  const passwordConfirmErrorText = document.getElementById(
    "password-confirm-error"
  );
  const nicknameErrorText = document.getElementById("nickname-error");

  // 이미지 입력 관련 요소
  const profileInput = document.getElementById("profile-val");
  const profilePreview = document.getElementById("profile-preview");
  const profileImage = document.getElementById("profile-image");
  const profilePlaceholder = document.getElementById("profile-placeholder");

  // 버튼 요소
  const backBtn = document.getElementById("back-button");
  const registerBtn = document.getElementById("register-button");
  const loginBtn = document.getElementById("login-button");

  const validateProfile = () => {
    // 유효성 검사
    let isValid = true;
    let errorText = "";
    if (!profileInput.files || profileInput.files.length === 0) {
      errorText = "* 프로필 사진을 추가해주세요.";
      isValid = false;
    }

    // UI 업데이트
    if (!isValid) {
      profileErrorText.style.visibility = "visible";
      profileErrorText.textContent = errorText;
    } else {
      profileErrorText.style.visibility = "hidden";
    }

    return isValid;
  };

  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 유효성 검사
    let isValid = true;
    let errorText = "";
    if (!email) {
      errorText = "* 이메일을 입력해주세요.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errorText = "* 올바른 이메일 주소 형식을 입력해주세요.";
      isValid = false;
    }
    // // 중복 이메일 검사
    // else if (existingEmails.includes(email)) {
    //   errorText = "* 중복된 이메일입니다.";
    // }

    // UI 업데이트
    if (!isValid) {
      emailErrorText.style.visibility = "visible";
      emailErrorText.textContent = errorText;
    } else {
      emailErrorText.style.visibility = "hidden";
    }
    return isValid;
  };

  const validatePassword = () => {
    const password = passwordInput.value;

    // 유효성 검사
    let isValid = true;
    let errorText = "";
    if (!password) {
      errorText = "* 비밀번호를 입력해주세요.";
      isValid = false;
    }

    // UI 업데이트
    if (!isValid) {
      passwordErrorText.style.visibility = "visible";
      passwordErrorText.textContent = errorText;
    } else {
      passwordErrorText.style.visibility = "hidden";
    }
    return isValid;
  };

  function validatePasswordConfirm() {
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // 유효성 검사
    let isValid = true;
    let errorText = "";
    if (!passwordConfirm) {
      errorText = "* 비밀번호를 한번더 입력해주세요.";
      isValid = false;
    } else if (passwordConfirm !== password) {
      errorText = "* 비밀번호가 다릅니다.";
    }

    // UI 업데이트
    if (!isValid) {
      passwordConfirmErrorText.style.visibility = "visible";
      passwordConfirmErrorText.textContent = errorText;
    } else {
      passwordConfirmErrorText.style.visibility = "hidden";
    }
    return isValid;
  }

  function validateNickname() {
    const nickname = nicknameInput.value;

    // 유효성 검사
    let isValid = true;
    let errorText = "";
    if (!nickname) {
      errorText = "* 닉네임을 입력해주세요.";
      isValid = false;
    } else if (nickname.includes(" ")) {
      errorText = "* 띄어쓰기를 없애주세요.";
      isValid = false;
    } else if (nickname.length > 10) {
      errorText = "* 닉네임은 최대 10자까지 작성 가능합니다.";
      isValid = false;
    }

    // UI 업데이트
    if (!isValid) {
      nicknameErrorText.style.visibility = "visible";
      nicknameErrorText.textContent = errorText;
    } else {
      nicknameErrorText.style.visibility = "hidden";
    }
    return isValid;
  }

  const getProfileImage = () => {
    // 1. 새로운 이미지 입력 받기
    profileInput?.click();

    // 2. 기존 이미지 있다면 삭제
    if (profileImage.style.display === "block") {
      profileInput.value = "";
      profileImage.style.display = "none";
      profilePlaceholder.style.display = "block";
    }
    validateProfile();
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

  const updateButtonState = () => {
    const isFormValid =
      validateEmail() &&
      validatePassword() &&
      validatePasswordConfirm() &&
      validateNickname() &&
      validateProfile();

    if (isFormValid) {
      registerBtn.style.backgroundColor = "#7F6AEE"; // 활성화 색상
      registerBtn.disabled = false; // 버튼 활성화
      console.log("가능");
    } else {
      registerBtn.style.backgroundColor = "#ccc"; // 비활성화 색상 (기본)
      registerBtn.disabled = true; // 버튼 비활성화
      console.log("불가능");
    }
  };

  const backHandler = () => {
    window.location.href = URL.POST.MAIN.url; // 메인 페이지로 이동
  };

  const loginHandler = () => {
    window.location.href = URL.AUTH.LOGIN.url;
  };

  const registerHandler = () => {
    console.log("click");

    setTimeout(() => {
      window.location.href = `/pages/auth/login/index.html`; // 메인 페이지로 이동
    }, 3000);

    // if (registerBtn.disabled === false) {
    //   setTimeout(() => {
    //     window.location.href = `/pages/auth/login/index.html`; // 메인 페이지로 이동
    //   }, 3000);
    // } else {
    //   console.log("error");
    // }
  };

  // 입력 이벤트
  // emailInput?.addEventListener("input", validateProfile); // 비밀번호
  emailInput.addEventListener("input", () => {
    validateEmail();
    updateButtonState();
  });

  passwordInput.addEventListener("input", () => {
    validatePassword();
    updateButtonState();
  });

  passwordConfirmInput.addEventListener("input", () => {
    validatePasswordConfirm();
    updateButtonState();
  });

  nicknameInput.addEventListener("input", () => {
    validateNickname();
    updateButtonState();
  });

  profileInput.addEventListener("change", () => {
    validateProfile();
    updateButtonState();
  });

  profilePreview.addEventListener("click", getProfileImage);
  profileInput.addEventListener("change", onProfileChangeHandler);

  // 클릭 이벤트
  backBtn.addEventListener("click", backHandler);
  loginBtn.addEventListener("click", loginHandler);
  registerBtn.addEventListener("click", registerHandler);
});
