package community.vaniila.domain.utils.response;

public class ErrorResponse {
  private String errorCode;
  private String errorMessage;

  public ErrorResponse(String errorCode, String errorMessage) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  public String getErrorMessage() {
    return errorMessage;
  }
  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }
  public String getErrorCode() {
    return errorCode;
  }
  public void setErrorCode(String errorCode) {
    this.errorCode = errorCode;
  }

  // getter, setter
}