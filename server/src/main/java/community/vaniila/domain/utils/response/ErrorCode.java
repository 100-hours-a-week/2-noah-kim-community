package community.vaniila.domain.utils.response;

public enum ErrorCode {

  AUTH_EMAIL_ALREADY_EXISTS("auth-001", "이미 존재하는 이메일입니다."),
  AUTH_USER_NOT_FOUND("auth-002", "없는 유저입니다."),
  AUTH_INVALID_PASSWORD("auth-003", "비밀번호가 일치하지 않습니다.");

  private final String code;
  private final String message;

  ErrorCode(String code, String message) {
    this.code = code;
    this.message = message;
  }

  public String getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }
}