package community.vaniila.domain.utils.security;

import community.vaniila.domain.utils.response.errorcode.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum JwtErrorCode implements ErrorCode {

  JWT_INVALID_TOKEN("jwt-001", "유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED),
  JWT_EXPIRED_TOKEN("jwt-002", "토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;
}