package community.vaniila.domain.utils.response.errorcode;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
  String getCode();
  String getMessage();
  HttpStatus getHttpStatus();
}