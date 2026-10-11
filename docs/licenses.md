# 포함 자산과 제3자 라이선스

아래 파일은 앱에 포함한 의존성과 자산의 출처·고지를 찾기 위한 안내다.
라이선스 전문은 프로젝트 [licenses](../licenses)에 보관하며 배포 EXE payload에도 포함한다.
의존성 파일의 고정 출처·버전·SHA-256은 빌드 기록에 고정하고 빌드할 때마다 검사한다.

| 구성 요소 | 사용 | 라이선스 / 고지 |
|---|---|---|
| Real-ESRGAN | 공식 x4plus / anime 6B 가중치 | [BSD-3-Clause](../licenses/Real-ESRGAN-BSD3.txt) |
| Real-ESRGAN NCNN Vulkan | 공식 추론 엔진 | [MIT](../licenses/Real-ESRGAN-ncnn-MIT.txt) |
| NCNN | 엔진 기반 | [BSD-3-Clause](../licenses/ncnn-BSD3.txt) |
| SkiaSharp / Skia native | 앱 캔버스·폰트·아이콘 | [MIT](../licenses/SkiaSharp-MIT.txt), [native 고지](../licenses/Skia-Native-NOTICES.txt) |
| Magick.NET / delegates | 이미지 코덱·색공간·보간 | [Apache-2.0](../licenses/Magick.NET-Apache2.txt), [delegate 고지](../licenses/Magick.NET-Delegate-NOTICE.txt) |
| Fluent UI System Icons | 앱 기능 아이콘 | [MIT](../licenses/FluentUI-MIT.txt) |
| Octicons | GitHub 저장소 아이콘 | [MIT](../licenses/Octicons-MIT.txt) |
| Pretendard | 앱 폰트·소개 페이지 파생 폰트 | [SIL OFL 1.1](../licenses/Pretendard-OFL.txt) |
| 엔진 보조 구성 | glslang / stb / dirent / libwebp | [licenses 폴더의 각 전문](../licenses) |
| .NET 8 런타임 | 설치 없는 WinForms 실행 | 패키지의 LICENSE / THIRD-PARTY-NOTICES를 빌드 시 payload `licenses`에 복사 |
| Microsoft VC OpenMP | 공식 엔진의 `vcomp140.dll` | 공식 배포 원본에서 가져온 Microsoft 구성 요소이며 엔진 소스의 MIT 대상 아님 |

## 소개 페이지 자산

- 앱 심볼은 프로젝트에서 만든 SVG이며 참고한 로고를 그대로 복제하지 않았다.
- 일러스트 비교 예시는 프로젝트 자체 fixture와 앱 이미지 AI 4배 결과다.
- 사진 비교 예시는 [Thomas Roach / Unsplash](https://unsplash.com/photos/snow-capped-mountain-reflected-in-a-calm-lake-t-197CjKce8)의
  사진과 앱 사진 AI 4배 결과다. [Unsplash License](https://unsplash.com/license), 입력·출력 해시는
  [photo-source.json](site/media/photo-source.json)에 기록했다. 페이지에서도 사진가·원본 링크를 표시한다.
- 페이지 폰트는 Pretendard의 필요한 글자만 추린 WOFF2다. hinting을 제거하고 파생 폰트 이름을
  **ImageUpscaler Site Sans**로 변경했다. 원본 저작권·OFL 전문은 독립 HTML 내부에도 들어 있다.
- Upscayl은 모델 비교 참고 자료다. 앱/AGPL 변형 엔진을 이 배포본에 포함하지 않는다.

자산을 교체할 때는 이 안내, 라이선스 전문과 의존성 출처를 함께 갱신한다.
