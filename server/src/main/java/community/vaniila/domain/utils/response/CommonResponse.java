package community.vaniila.domain.utils.response;

import lombok.Getter;

@Getter
public class CommonResponse<T> {
  private String message;
  private T data;

  public CommonResponse(String message, T data) {
    this.message = message;
    this.data = data;
  }

  public static <T> CommonResponse<T> success(String message, T data) {
    return new CommonResponse<>(message, data);
  }

  public static <T> CommonResponse<T> error(String message) {
    return new CommonResponse<>(message, null);
  }
}