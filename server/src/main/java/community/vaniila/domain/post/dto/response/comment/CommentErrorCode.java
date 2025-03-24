package community.vaniila.domain.post.dto.response.comment;

import community.vaniila.domain.utils.response.errorcode.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum CommentErrorCode implements ErrorCode {

  COMMENT_INVALID_DATA("comment-001", "댓글 내용이 비어 있습니다.", HttpStatus.BAD_REQUEST),
  COMMENT_NOT_FOUND("comment-002", "존재하지 않는 댓글입니다.", HttpStatus.NOT_FOUND),
  COMMENT_DELETED("comment-003", "이미 삭제된 댓글입니다!", HttpStatus.BAD_REQUEST),
  COMMENT_UNAUTHORIZED("comment-004", "해당 댓글을 수정할 권한이 없습니다.", HttpStatus.FORBIDDEN);


  private final String code;
  private final String message;
  private final HttpStatus httpStatus;
}