package community.vaniila.domain.utils.response;

import community.vaniila.domain.utils.response.errorcode.ErrorCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
  private final ErrorCode errorCode;

  public CustomException(ErrorCode errorCode) {
    super(errorCode.getMessage());
    this.errorCode = errorCode;
  }
}