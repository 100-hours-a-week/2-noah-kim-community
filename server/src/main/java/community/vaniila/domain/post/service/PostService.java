package community.vaniila.domain.post.service;

import community.vaniila.domain.post.dto.request.post.PostCreateRequest;
import community.vaniila.domain.post.dto.request.post.PostListResponse;
import community.vaniila.domain.post.dto.request.post.PostModifyRequest;
import community.vaniila.domain.post.dto.response.post.PostDetailResponse;
import community.vaniila.domain.post.dto.response.post.PostDetailResponse.CommentData;
import community.vaniila.domain.post.entity.Comment;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.CommentRepository;
import community.vaniila.domain.post.repository.LikeRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.response.errorcode.AuthErrorCode;
import community.vaniila.domain.utils.response.errorcode.CommentErrorCode;
import community.vaniila.domain.utils.response.errorcode.PostErrorCode;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;
  private final LikeRepository likeRepository;

  /** 게시글 생성 */
  @Transactional
  public void createPost(Long userId, PostCreateRequest request) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    Post post = new Post(user, request.getTitle(), request.getContent(), request.getImageUrl());
    postRepository.save(post);
  }

  /** 게시글 수정 */
  @Transactional
  public void updatePost(Long userId, Long postId, PostModifyRequest request) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    if (!post.getUser().getId().equals(userId)) {
      throw new CustomException(PostErrorCode.POST_FORBIDDEN);
    }

    post.modify(request.getTitle(), request.getContent(), request.getImageUrl());
  }

  /** 단일 게시글 조회 */
  @Transactional()
  public PostDetailResponse getPostDetail(Long postId,Long userId) {
    /** 게시글이 없음 */
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    /** 삭제된 게시글임 */
    if (post.getDeletedAt() != null) {
      throw new CustomException(PostErrorCode.POST_NOT_FOUND);
    }

    /** 게시글이 없음 (작성자의 회원탈퇴) */
    User writer = post.getUser();
    if (writer.getDeletedAt() != null) {
      throw new CustomException(PostErrorCode.POST_NOT_FOUND);
    }

    List<Comment> comments = commentRepository.findByPostAndDeletedAtIsNullOrderByCreatedAtAsc(post);
    List<CommentData> commentData = comments.stream()
        .map(comment -> {
          User commentUser = comment.getUser();
          if (commentUser.getDeletedAt() != null) {
            throw new CustomException(CommentErrorCode.COMMENT_DELETED); // 또는 null 처리
          }


          return new PostDetailResponse.CommentData(
              comment.getId(),
              commentUser.getId(),
              commentUser.getNickname(),
              commentUser.getImageUrl(),
              comment.getContent(),
              comment.getCreatedAt()
          );
        }).toList();

    boolean isLiked = false;
    if (userId != null) {
      User loginUser = userRepository.findById(userId)
          .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));
      isLiked = likeRepository.existsByUserAndPost(loginUser, post);
    }

    // 조회수 증가
    post.increaseViewCount();

    PostDetailResponse.PostData postData = new PostDetailResponse.PostData(
        post.getId(),
        post.getTitle(),
        post.getContent(),
        post.getThumbnailUrl(),
        post.getLikeCount(),
        post.getViewCount(),
        isLiked,
        commentData,
        post.getCreatedAt()
    );

    PostDetailResponse.UserData userData = new PostDetailResponse.UserData(
        writer.getId(),
        writer.getNickname(),
        writer.getImageUrl()
    );



    return new PostDetailResponse(postData, userData);
  }

  /** 게시글 삭제 */
  @Transactional
  public void deletePost(Long userId, Long postId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    if (post.getDeletedAt() != null) {
      throw new CustomException(PostErrorCode.POST_NOT_FOUND);
    }

    if (!post.getUser().getId().equals(userId)) {
      throw new CustomException(PostErrorCode.POST_FORBIDDEN);
    }

    List<Comment> comments = commentRepository.findByPostAndDeletedAtIsNull(post);
    for (Comment comment : comments) {
      comment.softDelete();
    }

    likeRepository.deleteByPost(post);

    post.softDelete();
  }

  /** 게시글 목록 (무한 스크롤) */
  @Transactional(readOnly = true)
  public PostListResponse getPostList(int currentPage, int pageSize) {
    Pageable pageable = PageRequest.of(currentPage, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
    Page<Post> postPage = postRepository.findByDeletedAtIsNullAndUser_DeletedAtIsNull(pageable);

    List<PostListResponse.PostSummary> content = postPage.getContent().stream()
        .filter(post -> post.getUser().getDeletedAt() == null)
        .map(post -> {
          User user = post.getUser();

          return new PostListResponse.PostSummary(
              new PostListResponse.PostData(
                  post.getId(),
                  post.getTitle(),
                  post.getContent(),
                  post.getLikeCount(),
                  post.getViewCount(),
                  post.getCommentCount(),
                  post.getCreatedAt()
              ),
              new PostListResponse.UserData(
                  user.getId(),
                  user.getNickname(),
                  user.getImageUrl()
              )
          );
        }).toList();

    PostListResponse.PageInfo pageInfo = new PostListResponse.PageInfo(
        postPage.getTotalPages(),
        postPage.getTotalElements()
    );

    return new PostListResponse(pageInfo, content);
  }
}

