# 포터블 실행과 업데이트 안내

## 저장되는 위치

앱은 어느 드라이브에서나 실행된다. EXE 옆에 파일을 만들 수 있는 폴더를 선택한다.
개발 작업의 F: 제한은 사용자용 앱 실행에 적용하지 않는다.

```text
ImageUpscaler.exe
bin/
  settings.json     배율·모드·형식·저장 위치·업데이트 옵션·창 위치
  temp/
    run-…/          포함된 런타임·모델 추출
    job-…/          이미지 중간 파일
    update-…/       다운로드·백업·업데이트 helper
output/             기본 결과 위치, 앱에서 변경 가능
```

`bin`은 항상 EXE 바로 옆이다. 정상 종료 후 `run-…`, 작업 완료/오류/취소 후 `job-…`를 정리한다.
업데이트 성공 시 새 앱이 helper 종료를 기다렸다가 해당 `update-…` 폴더를 정리한다.
앱이 사용 중인 `bin/temp`를 수동으로 지우지 않는다. 강제 종료 뒤 남은 임시는 앱을 완전히 닫고 정리할 수 있다.

앱을 옮길 때는 EXE와 `bin/settings.json`을 함께 옮기면 설정을 유지한다.
설정의 결과 폴더가 절대 경로라면 새 위치에서도 접근할 수 있는지 확인한다.
설정 파일이 잘못된 JSON이면 기본값으로 시작한다. 원본 이미지는 수정하지 않는다.

## 자동 업데이트 과정

공식 저장소는 [deuxdoom/ImageUpscaler](https://github.com/deuxdoom/ImageUpscaler)다.
현재 버전보다 큰 정식 릴리스만 설치하며 초안·사전 릴리스는 제외한다.

1. GitHub 릴리스에서 `ImageUpscaler.exe`와 검증값을 확인한다. 공식 릴리스 URL인지 검사한다.
2. asset의 `sha256:` digest를 우선 사용하고 없으면 같은 릴리스 `SHA256SUMS.txt`의 정확한 EXE 항목을 읽는다.
3. `bin/temp/update-…`에 다운로드한다. 크기·SHA-256·Windows x64 실행 파일 헤더를 검증한다.
4. 별도 helper가 SHA-256을 다시 확인하고 기존 앱/실행기의 종료를 기다린다.
5. 이전 EXE를 백업하고 새 파일로 교체한 뒤 설치된 파일의 SHA-256을 다시 확인한다. 새 앱의 시작 확인을 받은 뒤 이전 EXE를 삭제한다.
6. 완료창은 **5초 뒤 자동으로 닫힌다**. 새 앱이 helper와 그 임시 폴더를 정리한다.

해시·크기가 다르거나 검증값이 없으면 기존 EXE를 교체하지 않는다.
교체 후 새 앱 시작에 실패하면 이전 EXE를 복구한다. 복구 자체가 실패하면 복구 파일 위치를 표시한다.
SHA-256은 다운로드 파일이 릴리스 검증값과 일치하는지 확인하는 수단이다.

`bin/settings.json`에서 `CheckUpdates: false`는 시작 시 확인을,
`AutoInstallUpdates: false`는 자동 설치를 끈다. 상단 버튼과 트레이에서 직접 확인할 수도 있다.
릴리스가 아직 없으면 새 버전 없음으로 처리한다. 이미지 처리는 PC 안에서만 이루어진다.

## 배포자가 유지할 파일

- `src/ImageUpscaler.csproj`의 `Version`을 올리고 `tools/Build.ps1`로 빌드한다.
- 생성된 `dist/ImageUpscaler.exe`, `dist/SHA256SUMS.txt`를 같은 정식 GitHub 릴리스에 올린다.
- `RELEASE.md`는 현재 EXE의 해시, `build/releases.json`은 빌드 이력이다.
- `CHANGELOG.md`에는 해시를 넣지 않는다. 배포 전은 `배포 예정`, 커밋·푸시로 공개할 때 날짜를 쓴다. 빌드는 기록된 날짜를 유지한다.
- 버전 사이에는 `---`를 두고 후속 버전은 이전 태그와 현재 태그의 compare 링크를 사용한다.

빌드 스크립트는 커밋·푸시·GitHub 릴리스 공개를 수행하지 않는다.
업데이트 구현과 검증 도구는 이 배포 안내 저장소에 공개하지 않는다.
