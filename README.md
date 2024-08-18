# 파지직 TV⚡

<p align="center"><img src="https://github.com/user-attachments/assets/46388765-acd7-4c60-94fe-806e41bb4077" alt="Momentum이미지" width="300"/></p>
<p align="center">배포 URL : <a href="https://momentum-wine.vercel.app" target="_blank">https://momentum-wine.vercel.app/</a></p>

## 목적
파지직TV는 현대 웹 개발의 핵심 기술들을 실제 프로젝트에 적용하며 깊이 있게 이해하고자 만들어진 Youtube 영상 사이트입니다. 이 프로젝트의 주요 목적은 다음과 같습니다:

Youtube Open API를 활용한 실제 데이터 기반의 애플리케이션 구축 경험 획득
비동기 통신 로직에 대한 심도 있는 이해와 실전 적용 능력 향상
최신 상태 관리 라이브러리인 Tanstack/React Query와 Zustand의 효과적인 사용법 숙달
Firebase를 통한 서버리스 아키텍처 및 실시간 데이터베이스 운용 능력 개발
Tailwind CSS를 이용한 현대적이고 반응형 UI 설계 및 구현 능력 강화
React 기반의 대규모 애플리케이션 설계 및 개발 경험 축적

이 프로젝트를 통해, 단순한 기술 학습을 넘어 실제 서비스와 유사한 환경에서의 개발 경험을 쌓고, 각 기술의 장단점을 직접 체험하며 최적의 사용 방법을 모색하고자 했습니다. 또한, 사용자 경험(UX)을 고려한 인터페이스 설계와 성능 최적화 등 실제 서비스 개발에서 중요한 요소들을 고려하며 개발 역량을 전반적으로 향상시키는 것을 목표로 하였습니다.

## 목차
1. [소개](#소개)
2. [주요 기능](#주요-기능)
3. [의존성](#의존성)
4. [설치 방법](#설치-방법)
5. [사용 방법](#사용-방법)

## 소개
<div align="center">
    <img src="https://github.com/user-attachments/assets/3603089c-cf49-4d31-813b-47bb07506c05" alt="main 페이지" width="32.3%">
    <img src="https://github.com/user-attachments/assets/8e917464-c6ee-437d-af7b-358ace33d469" alt="todo 페이지" width="32.3%">
    <img src="https://github.com/user-attachments/assets/403ce321-089b-47d1-89b1-17a29ab27f33" alt="pomodoro 페이지" width="32.3%">
</div>

파지직TV는 YouTube Open API를 활용한 프로젝트입니다. 이 애플리케이션은 사용자에게 YouTube와 유사한 경험을 제공하면서도 몇 가지 기능을 추가하여 개인화된 경험을 제공합니다.

## 주요 기능
- YouTube Open API를 이용한 다양한 카테고리별 영상 제공
- Firebase를 통한 Google 로그인 지원
- 로그인 사용자를 위한 실제 YouTube 구독 채널 표시
- 영상별 '좋아요' 기능과 좋아요 표시한 영상 모아보기

이 프로젝트는 React를 기반으로 구축되었으며, 상태 관리를 위해 Tanstack Query와 Zustand를 사용하였습니다. UI 구성에는 SASS와 React Icons를 활용하였고, 시간 표시를 위해 timeago.js를 사용하였습니다.

## 설치 방법
1. GitHub 저장소를 클론합니다.
    ```bash
    git clone https://github.com/Parkseolmin/React_Youtube.git
    cd React_Youtube
    ```
2. `npm install` 명령어를 사용하여 의존성을 설치합니다.
    ```bash
    npm install
    ```
3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, API 키를 설정합니다.
    ```
    REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_authdomain_api_key
    REACT_APP_FIREBASE_PROJECTID=your_firebase_project_id_api_key
    REACT_APP_CLIENTID=your_googlecloudid_key
    ```

## 프로젝트 동기
