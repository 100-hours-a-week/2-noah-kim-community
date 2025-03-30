package community.vaniila.domain.post.service;

import community.vaniila.domain.post.entity.Like;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.LikeRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.response.errorcode.AuthErrorCode;
import community.vaniila.domain.utils.response.errorcode.PostErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class LikeService {

  private final UserRepository userRepository;
  private final PostRepository postRepository;
  private final LikeRepository likeRepository;


  /** 좋아요 생성하기 */
  @Transactional
  public void likePost(Long userId, Long postId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    if (likeRepository.existsByUserAndPost(user, post)) {
      return; // 멱등성 보장 - 에러 없이 종료
    }


    Like like = new Like(user, post);
    likeRepository.save(like);

    post.increaseLikeCount();
    postRepository.save(post);
    postRepository.flush(); // 즉시 DB 반영
  }

  /** 좋아요 삭제하기 */
  @Transactional
  public void deleteLike(Long userId, Long postId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    if (!postRepository.existsById(postId)) {
      throw new CustomException(PostErrorCode.POST_NOT_FOUND);
    }

    // 좋아요 안 한 상태라면 아무 것도 하지 않음 (멱등성)
    if (!likeRepository.existsByUserAndPost(user, post)) {
      return;
    }

    // 연관관계 기반으로 삭제
    likeRepository.deleteByUserAndPost(user, post);

    // 좋아요 수 감소 (최소 0 유지)
    post.decreaseLikeCount();
  }
}
