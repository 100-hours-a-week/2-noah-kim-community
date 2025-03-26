package community.vaniila.domain.user.service;

import community.vaniila.domain.post.entity.Comment;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.CommentRepository;
import community.vaniila.domain.post.repository.LikeRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.user.dto.request.LoginRequest;
import community.vaniila.domain.user.dto.response.LoginResponse;
import community.vaniila.domain.user.dto.response.UserDataResponse;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.response.errorcode.AuthErrorCode;
import community.vaniila.domain.utils.security.JwtUtils;
import community.vaniila.domain.utils.security.PasswordUtils;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class UserService {

  private final UserRepository userRepository;
  private final PostRepository postRepository;
  private final CommentRepository commentRepository;
  private final LikeRepository likeRepository;
  private final JwtUtils jwtUtils;


  @Transactional
  public void registerUser(String email, String password, String nickname, String imageUrl) {
    /** 이메일이 이미 존재하는 경우 */
    if (userRepository.existsByEmail(email)) {
      throw new CustomException(AuthErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }

    /** 중복 닉네임 검사 */
    checkNicknameDuplication(nickname);

    // 비밀번호 해싱
    String hashedPassword = PasswordUtils.hashPassword(password);

    // 사용자 저장
    User user = new User(email, hashedPassword, imageUrl, nickname);
    userRepository.save(user);
  }


  @Transactional
  public LoginResponse loginUser(LoginRequest request) {
    /** 회원가입된 이메일이 없는 경우 */
    User user = userRepository.findByEmailAndDeletedAtIsNull(request.getEmail())
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    if (!PasswordUtils.matches(request.getPassword(), user.getPassword())) {
      throw new CustomException(AuthErrorCode.AUTH_INVALID_PASSWORD);
    }

    String accessToken = jwtUtils.generateToken(user.getId());

    return new LoginResponse(user.getId(), accessToken);
  }

  @Transactional
  public UserDataResponse getUser(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    return new UserDataResponse(
        user.getId(),
        user.getEmail(),
        user.getNickname(),
        user.getImageUrl()
    );
  }

  @Transactional
  public void modifyUser(Long userId, String nickname, String imageUrl) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    /** 이미 회원 탈퇴한 유저인 경우 */
    if (user.getDeletedAt() != null) {
      throw new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND);
    }

    /** 중복 닉네임 검사 */
    checkNicknameDuplication(nickname);

    user.updateInfo(nickname, imageUrl);
  }

  @Transactional
  public void unregisterUser(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    // 이미 삭제된 유저
    if (user.getDeletedAt() != null) {
      throw new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND);
    }


    // 1. 게시글 소프트 딜리트
    List<Post> posts = postRepository.findByUserIdAndDeletedAtIsNull(userId);
    for (Post post : posts) {
      post.softDelete();
    }

    // 2. 댓글 소프트 딜리트
    List<Comment> comments = commentRepository.findByUserIdAndDeletedAtIsNull(userId);
    for (Comment comment : comments) {
      comment.softDelete();
    }

    // 3. 좋아요 하드 딜리트
    likeRepository.deleteByUserId(userId);

    // 4. 유저 소프트 딜리트
    user.setDeletedAt(LocalDateTime.now());
  }

  public void checkNicknameDuplication(String nickname) {
    if (userRepository.existsByNickname(nickname)) {
      throw new CustomException(AuthErrorCode.AUTH_NICKNAME_DUPLICATED);
    }
  }
}