package community.vaniila.domain.utils.response;
import org.springframework.http.HttpStatus;

public enum ErrorCode {

  AUTH_EMAIL_ALREADY_EXISTS("auth-001", "이미 존재하는 이메일입니다", HttpStatus.CONFLICT),
  AUTH_USER_NOT_FOUND("auth-002", "해당 이메일로 회원가입된 유저 없습니다.", HttpStatus.BAD_REQUEST),
  AUTH_INVALID_PASSWORD("auth-003", "비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
  AUTH_INVALID_UPDATE_DATA("auth-004", "닉네임 또는 이미지 정보가 부족합니다.", HttpStatus.BAD_REQUEST),

  JWT_INVALID_TOKEN("jwt-001", "유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED),
  JWT_EXPIRED_TOKEN("jwt-002", "토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;

  ErrorCode(String code, String message, HttpStatus httpStatus) {
    this.code = code;
    this.message = message;
    this.httpStatus = httpStatus;
  }

  public String getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }

  public HttpStatus getHttpStatus() {
    return httpStatus;
  }
}