package community.vaniila.domain.member.service;

import community.vaniila.domain.member.entity.User;
import community.vaniila.domain.member.repository.UserRepository;
import community.vaniila.domain.utils.password.PasswordUtils;
import community.vaniila.domain.utils.response.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Transactional
  public void registerMember(String email, String password, String nickname, String imageUrl) {
    // 중복 검사
    if (userRepository.existsByEmail(email)) {
      throw new CustomException("Auth-001", "이미 존재하는 이메일입니다.");
    }
    if (userRepository.existsByNickname(nickname)) {
      throw new CustomException("Auth-002", "이미 존재하는 닉네임입니다.");
    }

    // 비밀번호 해싱
    String hashedPassword = PasswordUtils.hashPassword(password);

    // 사용자 저장
    User user = new User(email, hashedPassword, imageUrl, nickname);
    userRepository.save(user);
  }
}