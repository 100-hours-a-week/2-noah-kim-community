package community.vaniila.domain.utils.response.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum S3ErrorCode implements ErrorCode {

  EMPTY_FILE_EXCEPTION("s3-001", "업로드할 파일이 비어 있습니다.", HttpStatus.BAD_REQUEST),
  NO_FILE_EXTENSION("s3-002", "파일 확장자가 없습니다.", HttpStatus.BAD_REQUEST),
  INVALID_FILE_EXTENSION("s3-003", "지원하지 않는 파일 확장자입니다.", HttpStatus.UNSUPPORTED_MEDIA_TYPE),
  PUT_OBJECT_EXCEPTION("s3-004", "파일 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
  IO_EXCEPTION_ON_IMAGE_DELETE("s3-005", "이미지 삭제 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
  IO_EXCEPTION_ON_IMAGE_UPLOAD("s3-006", "이미지 업로드 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);

  private final String code;
  private final String message;
  private final HttpStatus httpStatus;
}