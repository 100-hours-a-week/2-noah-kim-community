package community.vaniila.domain.post.repository;

import community.vaniila.domain.post.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
  List<Comment> findByPostIdAndDeletedAtIsNullOrderByCreatedAtDesc(Long postId);
  List<Comment> findByPostIdAndDeletedAtIsNull(Long postId);
}
