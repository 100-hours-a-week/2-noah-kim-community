package community.vaniila.domain.post.repository;

import community.vaniila.domain.post.entity.Like;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
  void deleteByPost(Post post);
  void deleteByUserId(Long userId);

  boolean existsByUserAndPost(User user, Post post);
  void deleteByUserAndPost(User user, Post post);
}