package community.vaniila.domain.utils.response.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum AuthErrorCode implements ErrorCode {

  AUTH_EMAIL_ALREADY_EXISTS("auth-001", "이미 존재하는 이메일입니다", HttpStatus.CONFLICT),
  AUTH_USER_NOT_FOUND("auth-002", "해당 정보로 회원가입된 유저 없습니다.", HttpStatus.NOT_FOUND),
  AUTH_INVALID_PASSWORD("auth-003", "비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
  AUTH_INVALID_UPDATE_DATA("auth-004", "닉네임 또는 이미지 정보가 부족합니다.", HttpStatus.BAD_REQUEST);


  private final String code;
  private final String message;
  private final HttpStatus httpStatus;
}