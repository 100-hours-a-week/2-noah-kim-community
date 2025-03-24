package community.vaniila.domain.post.controller;

import community.vaniila.domain.post.dto.request.comment.CommentCreateRequest;
import community.vaniila.domain.post.dto.request.comment.CommentUpdateRequest;
import community.vaniila.domain.post.dto.request.post.PostCreateRequest;
import community.vaniila.domain.post.dto.request.post.PostListResponse;
import community.vaniila.domain.post.dto.request.post.PostModifyRequest;
import community.vaniila.domain.post.dto.response.comment.CommentCreateResponse;
import community.vaniila.domain.post.dto.response.comment.CommentUpdateResponse;
import community.vaniila.domain.post.dto.response.post.PostDetailResponse;
import community.vaniila.domain.post.service.CommentService;
import community.vaniila.domain.post.service.LikeService;
import community.vaniila.domain.post.service.PostService;
import community.vaniila.domain.utils.response.CommonResponse;
import community.vaniila.domain.utils.security.JwtUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class PostController {

  private final PostService postService;
  private final CommentService commentService;
  private final LikeService likeService;
  private final JwtUtils jwtUtils;

  /** 게시글 생성 */
  @PostMapping
  public ResponseEntity<Void> createPost(
      @RequestHeader("Authorization") String authHeader,
      @RequestBody PostCreateRequest request
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    postService.createPost(userId, request);
    return ResponseEntity.noContent().build();  // 204 No Content
  }

  /** 단일 게시글 조회 */
  @GetMapping("/{postId}")
  public ResponseEntity<CommonResponse<PostDetailResponse>> getPostDetail(
      @RequestHeader(value = "Authorization", required = false) String authHeader,
      @PathVariable Long postId
  ) {
    Long userId = null;
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.replace("Bearer ", "").trim();
      userId = jwtUtils.getId(token);  // ✅ 유효한 경우만 추출
    }

    PostDetailResponse response = postService.getPostDetail(postId, userId);
    return ResponseEntity.ok(CommonResponse.success("게시글 상세 조회 완료", response));
  }

  /** 게시글 수정 */
  @PatchMapping("/{postId}")
  public ResponseEntity<Void> updatePost(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId,
      @RequestBody PostModifyRequest request
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    postService.updatePost(userId, postId, request);
    return ResponseEntity.noContent().build(); // 204 No Content
  }

  /** 게시글 삭제 */
  @DeleteMapping("/{postId}")
  public ResponseEntity<Void> deletePost(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    postService.deletePost(userId, postId);
    return ResponseEntity.noContent().build();  // 204 No Content
  }

  /** 게시글 목록  */
  @GetMapping("/list")
  public ResponseEntity<CommonResponse<PostListResponse>> getPostList(
      @RequestParam("currentPage") int currentPage,
      @RequestParam("pageSize") int pageSize
  ) {
    PostListResponse response = postService.getPostList(currentPage, pageSize);
    return ResponseEntity.ok(CommonResponse.success("게시글 목록 조회 성공", response));
  }

  /** 댓글 생성 */
  @PostMapping("/{postId}/comment")
  public ResponseEntity<CommonResponse<CommentCreateResponse>> createComment(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId,
      @RequestBody CommentCreateRequest request
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    CommentCreateResponse response = commentService.createComment(userId, postId, request);
    return ResponseEntity.ok(CommonResponse.success("created comment", response));
  }


  /** 댓글 수정 */
  @PatchMapping("/{postId}/comment/{commentId}")
  public ResponseEntity<CommonResponse<CommentUpdateResponse>> updateComment(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId,
      @PathVariable Long commentId,
      @RequestBody CommentUpdateRequest request
  ) {
    System.out.println("entered post comment updatee");
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    CommentUpdateResponse response = commentService.updateComment(userId, postId, commentId, request);

    return ResponseEntity.ok(CommonResponse.success("댓글을 수정하였습니다", response));
  }

  /** 댓글 삭제 (소프트 딜리트) */
  @DeleteMapping("/{postId}/comment/{commentId}")
  public ResponseEntity<Void> deleteComment(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId,
      @PathVariable Long commentId
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    commentService.deleteComment(userId, postId, commentId);
    return ResponseEntity.noContent().build(); // 204 No Content
  }

  /** 좋아요 생성 */
  @PostMapping("/{postId}/like")
  public ResponseEntity<Void> likePost(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    likeService.likePost(userId, postId);
    return ResponseEntity.noContent().build();  // 204 No Content
  }

  /** 좋아요 삭제 */
  @DeleteMapping("/{postId}/like")
  public ResponseEntity<Void> deleteLike(
      @RequestHeader("Authorization") String authHeader,
      @PathVariable Long postId
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    likeService.deleteLike(userId, postId);
    return ResponseEntity.noContent().build();  // 204 No Content
  }
}


