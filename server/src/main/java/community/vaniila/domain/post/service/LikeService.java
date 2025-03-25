package community.vaniila.domain.post.service;

import community.vaniila.domain.utils.response.errorcode.PostErrorCode;
import community.vaniila.domain.post.entity.Like;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.LikeRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.security.JwtProperties;
import community.vaniila.domain.utils.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {

  private final PostRepository postRepository;
  private final LikeRepository likeRepository;


  @Autowired
  public LikeService(PostRepository postRepository,LikeRepository likeRepository, JwtProperties jwtProperties,
      JwtUtils jwtUtils) {
    this.postRepository = postRepository;
    this.likeRepository = likeRepository;
  }

  /** 좋아요 생성하기 */
  @Transactional
  public void likePost(Long userId, Long postId) {
    if (!postRepository.existsById(postId)) {
      throw new CustomException(PostErrorCode.POST_NOT_FOUND);
    }

    // 이미 좋아요 상태여도 문제 없이 끝냄 (멱등성을 위해 에러는 반환X)
    if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
      return;
    }

    Like like = new Like(userId, postId);
    likeRepository.save(like);

    // 선택: post.likeCount 증가 (비즈니스 룰에 따라)
    Post post = postRepository.findById(postId).get();
    post.setLikeCount(post.getLikeCount() + 1);
  }

  /** 좋아요 삭제하기 */
  @Transactional
  public void deleteLike(Long userId, Long postId) {
    if (!postRepository.existsById(postId)) {
      throw new CustomException(PostErrorCode.POST_NOT_FOUND);
    }

    // 이미 좋아요 안한 경우에도 조용히 204 응답 (에러 반환X)
    if (!likeRepository.existsByUserIdAndPostId(userId, postId)) {
      return;
    }

    likeRepository.deleteByUserIdAndPostId(userId, postId);

    // post 좋아요 수 감소
    Post post = postRepository.findById(postId).get();
    post.setLikeCount(Math.max(post.getLikeCount() - 1, 0));
  }
}
