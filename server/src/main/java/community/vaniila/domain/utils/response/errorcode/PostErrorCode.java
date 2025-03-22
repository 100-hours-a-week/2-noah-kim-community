package community.vaniila.domain.utils.response.errorcode;
import org.springframework.http.HttpStatus;

public enum PostErrorCode implements ErrorCode {

  POST_ERROR_DUMMY("post-001", "유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;

  PostErrorCode(String code, String message, HttpStatus httpStatus) {
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