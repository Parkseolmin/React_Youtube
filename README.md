# 파지직 TV

<p align="center"><img src="https://github.com/user-attachments/assets/46388765-acd7-4c60-94fe-806e41bb4077" alt="Momentum이미지" width="400"/></p>
<p align="center">배포 URL : <a href="https://momentum-wine.vercel.app" target="_blank">https://momentum-wine.vercel.app/</a></p>

## 목적
Momentum은 Momentum Chrome 확장 프로그램의 기능을 React를 사용하여 재구현한 프로젝트입니다. 이 프로젝트의 목적은 사용자가 브라우저를 열 때마다 동기부여를 제공하고 생산성을 높이는 도구를 제공하는 것입니다.

## 요약
Momentum Clone은 사용자가 브라우저를 열 때마다 아름다운 배경 이미지, 영감을 주는 인용문, 할 일 목록, 현재 날씨 정보 등을 표시하여 사용자의 일상을 더욱 활기차게 만들어 줍니다.

## 목차
1. [소개](#소개)
2. [의존성](#의존성)
3. [설치 방법](#설치-방법)
4. [사용 방법](#사용-방법)

## 소개
<div align="center">
    <img src="https://github.com/user-attachments/assets/3603089c-cf49-4d31-813b-47bb07506c05" alt="main 페이지" width="33.333%">
    <img src="https://github.com/user-attachments/assets/8e917464-c6ee-437d-af7b-358ace33d469" alt="todo 페이지" width="33.333%">
    <img src="https://github.com/user-attachments/assets/403ce321-089b-47d1-89b1-17a29ab27f33" alt="pomodoro 페이지" width="33.333%">
</div>
Momentum Clone은 사용자가 하루를 시작할 때마다 힘을 주는 도구입니다. 프로그램은 사용자가 브라우저를 열 때마다 아름다운 배경 이미지를 보여주고, 영감을 주는 인용문을 표시합니다. 또한 사용자는 할 일 목록을 관리하고, 현재 위치의 날씨 정보를 확인할 수 있습니다.

## 의존성
- React
- Unsplash API
- Quotable API
- OpenWeatherMap API

## 설치 방법
1. GitHub 저장소를 클론합니다.
    ```bash
    git clone https://github.com/Parkseolmin/React_Momentum.git
    cd React_Momentum
    ```
2. `npm install` 명령어를 사용하여 의존성을 설치합니다.
    ```bash
    npm install
    ```
3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, API 키를 설정합니다.
    ```
   REACT_APP_UNSPLASH_API=your_unsplash_api_key
    REACT_APP_WEATHER_API=your_openweathermap_api_key
    REACT_APP_GPT_KEY=your_openweathermap_api_key
    ```

## 사용 방법

1. 프로젝트를 로컬 환경에서 실행합니다.
    ```bash
    npm start
    ```
2. Momentum 화면이 로드되면, 사용자는 감성적인 배경 이미지를 볼 수 있습니다. 배경 이미지는 5시간을 기준으로 변경됩니다.
   
3. 인용문은 클릭시 변경됩니다.
   
4. 사용자는 현재 위치의 날씨 정보를 확인할 수 있으며, 클릭시 정보가 갱신됩니다.
   
5. Pomodoro 타이머는 settings버튼을 통해 작업시간과 휴식시간을 정할 수 있습니다.
   
6. 사용자는 할 일 목록을 추가하고 관리할 수 있습니다.
    
7. GPT API를 이용해 할 일 목록에 작성한 내용을 기반으로 평가 및 조언을 작성해줍니다.
 - 첫 번째 버튼 - 할 일 목록에 작성한 내용을 기반
 - 두 번째 버튼 - TextArea에 작성한 내용을 기반
