package community.vaniila.domain.utils.response.errorcode;

import org.springframework.http.HttpStatus;

public enum JwtErrorCode implements ErrorCode {

  JWT_INVALID_TOKEN("jwt-001", "유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED),
  JWT_EXPIRED_TOKEN("jwt-002", "토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;

  JwtErrorCode(String code, String message, HttpStatus httpStatus) {
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