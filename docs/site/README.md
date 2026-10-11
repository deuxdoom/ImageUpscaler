# 소개 페이지 원본

`../index.html`은 생성된 독립 HTML이다. 이미지·폰트·CSS·JS가 내부에 포함돼 오프라인에서 열린다.
`index.template.html`, `site.css`, `app-demo.css`, `site.js`를 수정한 뒤 프로젝트 루트에서 `tools/Build-Site.ps1`을 실행한다.
배포 EXE를 다시 빌드할 때에도 버전·용량·SHA-256이 자동 갱신된다.

- `fonts`: 원본 Pretendard에서 페이지 글자를 추린 hinting 없는 WOFF2. 내부 이름은 ImageUpscaler Site Sans, OFL.
- `media/before.png`, `after.webp`: 프로젝트 자체 테스트용 일러스트와 앱 이미지 AI 4배 출력. 개발 앱의 `--build-hero-sample`로 다시 만든다.
- `media/photo-before.png`, `photo-after.webp`: Unsplash의 360×240 입력과 앱 사진 AI 4배 출력.
- `media/photo-source.json`: 출처·크기·모델·실제 입력/출력 SHA-256.
- `media/app-comparison.png`: README 사용 안내에 참조하는 실제 네이티브 앱 화면.
- `media/social-preview.png`, `social-preview-ko.png`: GitHub 저장소 Settings → Social preview에 올리는 1280×640 카드(영어·한국어). `tools/Build-SocialPreview.mjs`가 UI 테스트의 실제 2배 화면 캡처로 만든다.
- `media/app-icon.png`: README 제목 아이콘. 공개 저장소에 `assets`가 없으므로 `Build-Site.ps1`이 앱 아이콘을 복사한다.
- 웹 앱 체험은 HTML/CSS로 앱 레이아웃을 재구성하고 실제 사진 입력/출력을 중앙 비교 화면에 넣는다.
- 아이콘은 `../../assets/branding/app-icon.svg` 및 `../../assets/icons`에서 가져온다.

상단 카테고리는 소개→앱 체험→처리 방식→사용법→다운로드→FAQ 순서다. 오른쪽 `KO | EN` 버튼은 `data-i18n` 요소를 `site.js`의 영어 사전으로 바꾼다.
언어는 `?lang=` 매개변수, 저장된 선택, 브라우저 언어 순서로 정한다.
모바일에서는 카테고리를 가로로 스크롤한다. 현재 섹션은 `aria-current`로 표시한다.
사진 시뮬레이터와 앱 화면을 하나로 통합했다. 중앙 비교선은 드래그·터치·키보드로 조작하며
가운데로 버튼은 비교선·슬라이더·백분율을 함께 초기화한다. 옆 설정은 해당 샘플에 사용한 값이다.
검증 JSON/화면은 `../../tools/reports`, EXE 메타데이터는 `../../build`에서 참조한다.

사진: [Thomas Roach / Unsplash](https://unsplash.com/photos/snow-capped-mountain-reflected-in-a-calm-lake-t-197CjKce8),
[Unsplash License](https://unsplash.com/license). 사이트 전후 비교에는 AI가 만든 실제 결과를 사용한다.
폰트 저작권/OFL 전문은 `../../licenses/Pretendard-OFL.txt`와 생성된 페이지 하단에 포함한다.

폰트를 다시 생성하려면 F: temp 환경에서 fonttools==4.66.1, brotli==1.2.0을 임시 target에 설치하고
PYTHONPATH를 그 위치로 지정해 `python -B tools/Prepare-SiteFonts.py`를 실행한다.
샘플은 개발 앱의 `--build-web-sample <원본 경로>` 도구가 실제 업스케일 파이프라인으로 생성한다.
`tools/Test-Site.mjs`는 별도 F: 임시 Chrome 프로필로 리소스·반응형·드래그·키보드·모드 안내를 검사한다.
