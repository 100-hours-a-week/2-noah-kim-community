package community.vaniila.domain.post.repository;

import community.vaniila.domain.post.entity.Comment;
import community.vaniila.domain.post.entity.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
  List<Comment> findByPostAndDeletedAtIsNullOrderByCreatedAtAsc(Post post);
  List<Comment> findByPostAndDeletedAtIsNull(Post post);

  List<Comment> findByUserIdAndDeletedAtIsNull(Long userId);
}
