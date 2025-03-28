package community.vaniila.domain.utils.response;

import community.vaniila.domain.utils.response.errorcode.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  // @Valid에서 데이터 오류가 발생한 경우
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<CommonResponse<Object>> handleValidationException(
      MethodArgumentNotValidException ex) {
    String errorMessage = ex.getBindingResult().getFieldErrors().stream()
        .map(fieldError -> fieldError.getDefaultMessage())
        .findFirst()
        .orElse("요청 데이터가 유효하지 않습니다.");

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(CommonResponse.error("validation error " + errorMessage));
  }

  @ExceptionHandler(CustomException.class)
  public ResponseEntity<CommonResponse<Object>> handleCustomException(CustomException e) {
    ErrorCode errorCode = e.getErrorCode();

    return ResponseEntity
        .status(errorCode.getHttpStatus())  // <- 여기서 HTTP 상태코드 적용
        .contentType(MediaType.APPLICATION_JSON)
        .body(CommonResponse.error(errorCode.getCode()));  // 메시지도 원하면 포함 가능
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonResponse<Object>> handleServerException(Exception e) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(CommonResponse.error("server error occured"));
  }

}
