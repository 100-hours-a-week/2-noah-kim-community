package community.vaniila.domain.utils.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<CommonResponse<Object>> handleCustomException(CustomException e) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .contentType(MediaType.APPLICATION_JSON)
        .body(CommonResponse.error(e.getErrorCode()));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonResponse<Object>> handleServerException(Exception e) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(CommonResponse.error("server error occured"));
  }

}
