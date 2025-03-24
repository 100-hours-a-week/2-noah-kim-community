package community.vaniila.domain.post.service;

import community.vaniila.domain.post.dto.request.post.PostCreateRequest;
import community.vaniila.domain.post.dto.request.post.PostModifyRequest;
import community.vaniila.domain.post.dto.response.comment.CommentErrorCode;
import community.vaniila.domain.post.dto.response.post.PostDetailResponse;
import community.vaniila.domain.post.dto.response.post.PostDetailResponse.CommentData;
import community.vaniila.domain.post.dto.response.post.PostErrorCode;
import community.vaniila.domain.post.entity.Comment;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.CommentRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.security.JwtProperties;
import community.vaniila.domain.utils.security.JwtUtils;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;
  private final JwtUtils jwtUtils;


  @Autowired
  public PostService(PostRepository postRepository,UserRepository userRepository, CommentRepository commentRepository, JwtProperties jwtProperties,
      JwtUtils jwtUtils) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
    this.jwtUtils = jwtUtils;
  }

  /** 게시글 생성 */
  @Transactional
  public void createPost(Long userId, PostCreateRequest request) {
    if (request.isInvalid()) {
      throw new CustomException(PostErrorCode.POST_INVALID_DATA);
    }

    Post post = new Post(userId, request.getTitle(), request.getContent(), request.getImageUrl());
    postRepository.save(post);
  }

  /** 게시글 수정 */
  @Transactional
  public void updatePost(Long userId, Long postId, PostModifyRequest request) {
    if (request.isInvalid()) {
      throw new CustomException(PostErrorCode.POST_INVALID_DATA);
    }

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    if (!post.getUserId().equals(userId)) {
      throw new CustomException(PostErrorCode.POST_UNAUTHORIZED);
    }

    post.modify(request.getTitle(), request.getContent(), request.getImageUrl());
  }

  /** 단일 게시글 조회 */
  @Transactional(readOnly = true)
  public PostDetailResponse getPostDetail(Long postId) {
    /**  게시글이 없음 */
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    /**  게시글이 없음 (작성자의 회원탈퇴) */
    User writer = userRepository.findById(post.getUserId())
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    List<Comment> comments = commentRepository.findByPostIdAndDeletedAtIsNullOrderByCreatedAtDesc(postId);
    List<CommentData> commentData = comments.stream()
        .map(comment -> {
          User commentUser = userRepository.findById(comment.getUserId())
              .orElseThrow(() -> new CustomException(CommentErrorCode.COMMENT_DELETED));
          return new PostDetailResponse.CommentData(
              comment.getId(),
              commentUser.getId(),
              commentUser.getImageUrl(),
              comment.getContent(),
              comment.getCreatedAt()
          );
        }).toList();

    PostDetailResponse.PostData postData = new PostDetailResponse.PostData(
        post.getId(),
        post.getTitle(),
        post.getContent(),
        post.getThumbnailUrl(),
        post.getLikeCount(),
        post.getViewCount(),
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
}

