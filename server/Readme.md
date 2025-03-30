## 실행 방법

1. 비밀키를 추가해야 합니다. _(당연히 비공개입니다.)_

   [`application.properties`](http://application.properties) (JWT 관련 비밀값)

   [`application-private.properties`](http://application-private.properties) (S3 관련 비밀값)

## 주요 개념

- 각 서비스별로 파일을 분리하여 `domain` 폴더 아래 정리했습니다.

## 폴더 구조

```
├── KtcApplication.java
├── SpringConfig.java
└── domain
    ├── S3                    // S3 서비스 관련
    │   ├── S3Config.java
    │   ├── S3Controller.java // 이미지 삭제, 이미지 업로드
    │   ├── S3Service.java
    │   └── response
    │       └── ImageUploadResponse.java
    ├── post
    │   ├── controller        // 게시글 관련
    │   │   └── PostController.java
    │   ├── dto
    │   │   ├── request
    │   │   │   ├── comment
    │   │   │   │   ├── CommentCreateRequest.java
    │   │   │   │   └── CommentUpdateRequest.java
    │   │   │   ├── like
    │   │   │   └── post
    │   │   │       ├── PostCreateRequest.java
    │   │   │       ├── PostListResponse.java
    │   │   │       └── PostModifyRequest.java
    │   │   └── response
    │   │       ├── comment
    │   │       │   ├── CommentCreateResponse.java
    │   │       │   └── CommentUpdateResponse.java
    │   │       └── post
    │   │           └── PostDetailResponse.java
    │   ├── entity
    │   │   ├── Comment.java
    │   │   ├── Like.java
    │   │   └── Post.java
    │   ├── repository
    │   │   ├── CommentRepository.java
    │   │   ├── LikeRepository.java
    │   │   └── PostRepository.java
    │   └── service
    │       ├── CommentService.java
    │       ├── LikeService.java
    │       └── PostService.java
    ├── user
    │   ├── controller
    │   │   └── UserController.java
    │   ├── dto
    │   │   ├── request
    │   │   │   ├── LoginRequest.java
    │   │   │   ├── ModifyRequest.java
    │   │   │   ├── PasswordModifyRequest.java
    │   │   │   └── RegisterRequest.java
    │   │   └── response
    │   │       ├── CreateResponse.java
    │   │       ├── LoginResponse.java
    │   │       ├── RegisterResponse.java
    │   │       └── UserDataResponse.java
    │   ├── entity
    │   │   └── User.java
    │   ├── repository
    │   │   ├── JpaUserRepository.java
    │   │   └── UserRepository.java
    │   └── service
    │       └── UserService.java
    └── utils
        ├── response
        │   ├── CommonResponse.java         // 공통 응답 형식
        │   ├── CustomException.java
        │   ├── GlobalExceptionHandler.java
        │   └── errorcode                   // 각 서비스별 응답 에러 코드
        │       ├── AuthErrorCode.java
        │       ├── CommentErrorCode.java
        │       ├── ErrorCode.java
        │       ├── JwtErrorCode.java
        │       ├── PostErrorCode.java
        │       └── S3ErrorCode.java
        └── security                        // JWT, 비밀번호 해싱 등 보안 관련
            ├── JwtProperties.java
            ├── JwtUtils.java
            └── PasswordUtils.java

```

### 회고

1. FE 개발자로써는 처음으로 BE 개발을 해보면서 어떤 로직이 불편하고 손이 많이가는지 약간은 이해하게 되었습니다.

   특히, 무한스크롤이랑 페이지네이션 방식 중에서 어떤 방식이 BE 입장에서 불편한지 항상 궁금했는데, 별반 차이가 없는것 같습니다.

1. 이번 과제를 하면서 가장 크게 느낀점은 한 분야에서만 능력자가 되기도 힘들겠다는 점입니다.

   이번 부트캠프 시작하면서 야심차게 백엔드 개발을 해보려고 했는데, 생각보다 첩첩산중인 것을 느꼈습니다.

   CRUD 개발은 기본이며, JPA, ERD 설계, 동시성 처리, AOP… 등등 할게 많았습니다.

   그렇다고 FE 개발이 편하고 좋은 것은 아닙니다.

   오히려 공부할게 많지만, 지금까지 해왔던 프로젝트가 대부분 FE 였어서 비교적 편리하게 진행한 것 같습니다.
