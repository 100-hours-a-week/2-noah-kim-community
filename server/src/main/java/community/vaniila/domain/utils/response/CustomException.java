package community.vaniila.domain.utils.response;

public class CustomException extends RuntimeException {
  private final String errorCode;
  private final String errorMessage;

  public CustomException(ErrorCode errorCode) {
    super(errorCode.getMessage());
    this.errorCode = errorCode.getCode();
    this.errorMessage = errorCode.getMessage();
  }

  public String getErrorCode() {
    return errorCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }
}