# 나만의 작은 SNS - 'MINI'

빠르게 변하는 사회와 바쁘디 바쁜 현대 사회 구성원들의 하루는 어땠는지, 
다른 사람들은 어떻게 지내는지 공유하고 소통할 수 있는 SNS를 만들어 보았습니다.

링크 : https://mini-mindong2.web.app/

      
## 사용한 기술
#### 언어 및 라이브러리
- REACT
- TypeScript
#### 번들러
- Vite
#### 스타일
- Styled-Component
#### API 및 배포
- Firebase

      
## 로컬 환경 설치 방법

```
$ npm install
```

      
## 페이지 설명

- ### Authentication

#### 회원가입 페이지
![회원가입1](https://github.com/mindong2/MINI/assets/73930706/c86b5bad-fc73-4d93-accd-b3038de0f2e3)
 
간단하게 이메일 가입이 가능하며, 로그인 페이지에는 깃허브 / 구글 로그인 기능도 추가했습니다.   
   

#### 비밀번호 재설정 이메일 송신 페이지
![이메일 1](https://github.com/mindong2/MINI/assets/73930706/54903f7a-f73a-46a1-8014-c8738291e73d)

      
가입하신 이메일로 비밀번호 재설정 이메일을 수신 받을 수 있습니다.

      
![이메일 2](https://github.com/mindong2/MINI/assets/73930706/ae1b8d61-8183-4f6b-a9ed-91f67111737a)
위 링크를 누르면 비밀번호 재설정 페이지로 Redirect됩니다.

- ### Thread
     
  #### 게시물 작성
    
![게시물](https://github.com/mindong2/MINI/assets/73930706/ab4643b4-71bb-4a37-885f-73175b29964f)

  상단의 텍스트창이나, 사이드바의 '글쓰기' 버튼을 눌러 글을 작성 가능합니다.
  물론 본인의 글은 수정 / 삭제가 가능합니다.


  #### 댓글과 좋아요

![댓글, 좋아요](https://github.com/mindong2/MINI/assets/73930706/6c17012d-9653-4aef-b2ac-fb900ad35e40)

댓글과 좋아요 기능을 추가했습니다.
이 과정에서 조금 헷갈렸는데, Firebase에서 기본으로 제공하는 user내에서는 현재 사용자 정보밖에 없어서 Firestore에 UserInfo라는 Doc을 추가하여 회원가입 시 그 유저 정보를 쌓아 그 정보들을 활용하였습니다.

- ### User
#### 프로필 페이지

![프로필](https://github.com/mindong2/MINI/assets/73930706/273cfd1e-254a-4386-8cce-cb383f955d08)
프로필 페이지입니다.
본인의 프로필사진과 이름 옆에 아이콘을 추가하여 수정이 가능하다는 걸 보여주고 있습니다.


#### 프로필 수정
   
   ![프로필 수정](https://github.com/mindong2/MINI/assets/73930706/7d58e63c-4579-49d3-9b4b-f1c08568d2cb)
프로필은 물론 수정이 가능하며, 프로필 변경시 작성했던 글에서도 닉네임 혹은 프로필사진 변경 사항을 확인할 수 있습니다.
   
#### 추천친구 페이지

![추천친구](https://github.com/mindong2/MINI/assets/73930706/45e7c604-3add-448c-9957-1b545c3fdd4e)

추천친구 페이지입니다.
클릭시 해당 유저의 프로필로 이동가능하며 해당 유저의 쓰레드를 확인 가능합니다.



- ### 반응형 레이아웃

![반응형](https://github.com/mindong2/MINI/assets/73930706/7c6a3bf6-7bf2-4e75-8c87-2649898f69e3)

반응형 레이아웃으로 모바일 환경에서도 부담없이 사용 가능합니다.

    
## 버그제보 및 피드백 
버그제보 및 피드백을 환영합니다.   
[이메일링크] : qlsnaos12@naver.com
