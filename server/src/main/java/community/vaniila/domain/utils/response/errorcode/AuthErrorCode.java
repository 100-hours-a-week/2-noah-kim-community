package community.vaniila.domain.utils.response.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum AuthErrorCode implements ErrorCode {

  AUTH_EMAIL_ALREADY_EXISTS("auth-001", "이미 존재하는 이메일입니다", HttpStatus.CONFLICT),
  AUTH_NICKNAME_DUPLICATED("auth-002", "이미 사용 중인 닉네임입니다.", HttpStatus.CONFLICT),
  AUTH_USER_NOT_FOUND("auth-003", "해당 정보로 회원가입된 유저 없습니다.", HttpStatus.NOT_FOUND),
  AUTH_INVALID_PASSWORD("auth-004", "비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
  AUTH_INVALID_UPDATE_DATA("auth-005", "정보가 부족합니다.", HttpStatus.BAD_REQUEST);


  private final String code;
  private final String message;
  private final HttpStatus httpStatus;
}