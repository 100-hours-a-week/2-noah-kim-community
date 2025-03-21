package community.vaniila.domain.user.service;

import community.vaniila.domain.user.dto.request.LoginRequest;
import community.vaniila.domain.user.dto.response.LoginResponse;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.password.JwtProperties;
import community.vaniila.domain.utils.password.JwtUtils;
import community.vaniila.domain.utils.password.PasswordUtils;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.response.errorcode.AuthErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final JwtUtils jwtUtils;


  @Autowired
  public UserService(UserRepository userRepository,JwtProperties jwtProperties, JwtUtils jwtUtils) {
    this.userRepository = userRepository;
    this.jwtUtils = jwtUtils;
  }

  @Transactional
  public void registerUser(String email, String password, String nickname, String imageUrl) {
    /** 이메일이 이미 존재하는 경우 */
    if (userRepository.existsByEmail(email)) {
      throw new CustomException(AuthErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }

    // 비밀번호 해싱
    String hashedPassword = PasswordUtils.hashPassword(password);

    // 사용자 저장
    User user = new User(email, hashedPassword, imageUrl, nickname);
    userRepository.save(user);
  }


  @Transactional
  public LoginResponse loginUser(LoginRequest request) {
    /**
     * 예외 처리
     * 회원가입된 이메일이 없는 경우
     */
    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() ->new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    if (!PasswordUtils.matches(request.getPassword(), user.getPassword())) {
      throw new CustomException(AuthErrorCode.AUTH_INVALID_PASSWORD);
    }

    String accessToken = jwtUtils.generateToken(user.getId());

    return new LoginResponse(user.getId(), accessToken);
  }

  @Transactional
  public void modifyUser(Long userId, String nickname, String imageUrl) {
    if (nickname == null || imageUrl == null || nickname.isBlank() || imageUrl.isBlank()) {
      throw new CustomException(AuthErrorCode.AUTH_INVALID_UPDATE_DATA);  // auth-004
    }

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    user.updateInfo(nickname, imageUrl);
  }
}