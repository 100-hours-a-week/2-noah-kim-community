package community.vaniila.domain.utils.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<CommonResponse<ErrorResponse>> handleCustomException(CustomException e) {
    ErrorResponse error = new ErrorResponse(e.getErrorCode(), e.getErrorMessage());
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .contentType(MediaType.APPLICATION_JSON)
        .body(CommonResponse.error("error occured", error));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonResponse<ErrorResponse>> handleServerException(Exception e) {
    ErrorResponse error = new ErrorResponse("Server-001", "서버 오류가 발생했습니다.");
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(CommonResponse.error("server error", error));
  }

}
