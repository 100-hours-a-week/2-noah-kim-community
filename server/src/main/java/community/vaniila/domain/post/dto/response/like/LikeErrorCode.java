package community.vaniila.domain.post.dto.response.like;


import community.vaniila.domain.utils.response.errorcode.ErrorCode;
import org.springframework.http.HttpStatus;

public enum LikeErrorCode implements ErrorCode {

  LIKE_DUMMY_ERROR("like-001", "이미 좋아요를 눌렀습니다.", HttpStatus.BAD_REQUEST);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;

  LikeErrorCode(String code, String message, HttpStatus httpStatus) {
    this.code = code;
    this.message = message;
    this.httpStatus = httpStatus;
  }

  @Override
  public String getCode() {
    return code;
  }

  @Override
  public String getMessage() {
    return message;
  }

  @Override
  public HttpStatus getHttpStatus() {
    return httpStatus;
  }
}