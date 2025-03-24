package community.vaniila.domain.utils.response.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum PostErrorCode implements ErrorCode {

  POST_INVALID_DATA("post-001", "게시글 데이터가 올바르지 않습니다.", HttpStatus.BAD_REQUEST),
  POST_NOT_FOUND("post-002", "존재하지 않는 게시글입니다.", HttpStatus.NOT_FOUND),
  POST_FORBIDDEN("post-003", "해당 게시글에 대한 수정 권한이 없습니다.", HttpStatus.FORBIDDEN);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;
}