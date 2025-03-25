package community.vaniila.domain.post.repository;

import community.vaniila.domain.post.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
  boolean existsByUserIdAndPostId(Long userId, Long postId);
  void deleteByUserIdAndPostId(Long userId, Long postId);
  void deleteByPostId(Long userId);
  void deleteByUserId(Long userId);
  boolean existsByPostIdAndUserId(Long postId, Long userId);
}