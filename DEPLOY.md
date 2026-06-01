# 윤앤정 AI 셀라이프 — 배포 가이드 (DEPLOY)

가정예배 PWA와 동일한 워크플로우입니다. 프로젝트는 **이미 빌드 검증까지 끝난 상태**라, 아래 명령어만 순서대로 실행하시면 됩니다.

---

## 0. 프로젝트 구조 (완성됨)

```
yunjeong-ai-cellife/
├── public/
│   ├── logo.png          # 로고 (네비·푸터·파비콘)
│   ├── hero.png          # 히어로 배너
│   ├── host-yunhee.png   # 이윤희 프로필
│   ├── host-junghyo.png  # 이정효 프로필
│   └── intro.mp4         # 소개 영상 (4MB, public 직접 호스팅)
├── src/
│   ├── App.jsx           # 본체 (base64 제거 완료, 642KB → 39KB)
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

> base64로 박혀 있던 이미지·영상은 전부 `public/` 원본 파일로 분리했습니다.
> 파일명은 한글 → 영문(ASCII)으로 통일했습니다(CDN·경로 안정성).

---

## 1. 로컬 테스트 (먼저 눈으로 확인)

```bash
cd yunjeong-ai-cellife
npm install
npm run dev
```

→ 브라우저에서 `http://localhost:5173` 접속. 소개 영상 팝업·모달·진도 데모까지 동작 확인.

빌드 확인까지 보려면:

```bash
npm run build      # dist/ 생성 (이미 검증 완료)
npm run preview    # 빌드 결과 미리보기
```

---

## 2. GitHub 저장소 생성 + push

GitHub에서 **빈 저장소** `yunjeong-ai-cellife` 를 먼저 만드세요 (계정 `junho908-svg`, README 체크 해제).

그다음 로컬에서:

```bash
cd yunjeong-ai-cellife
git init
git add .
git commit -m "feat: 윤앤정 AI 셀라이프 초기 배포본

- 단일 JSX → Vite + React 구조화
- base64 자산 → public/ 분리 (642KB → 39KB)
- 효능 표현 순화 2건 적용 (줄기세포→인체양수세포배양액, Detox→Care)

Co-Authored-By: Claude <noreply@anthropic.com>"
git branch -M main
git remote add origin https://github.com/junho908-svg/yunjeong-ai-cellife.git
git push -u origin main
```

> 인증 창이 뜨면 GitHub 사용자명 + **Personal Access Token**(비밀번호 아님)을 입력하세요.

---

## 3. Vercel 연결 → 자동 배포

1. https://vercel.com → **Add New → Project**
2. `junho908-svg/yunjeong-ai-cellife` 저장소 **Import**
3. Vercel이 Vite를 자동 감지합니다. 그대로 두면 됩니다:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy** → 1~2분 후 `https://yunjeong-ai-cellife.vercel.app` 발급
5. 이후 `git push` 할 때마다 자동 재배포 (가정예배 PWA와 동일)

---

## 4. (선택) 소개 영상을 CDN으로 분리하고 싶을 때

지금은 4MB 영상을 `public/intro.mp4`로 직접 호스팅합니다(Vercel에서 정상 동작, 추가 작업 불필요).
나중에 가정예배 BGM처럼 jsDelivr CDN으로 빼고 싶으면:

1. 별도 repo (예: `yunjeong-assets`)에 `intro.mp4` push
2. `src/App.jsx`의 `<video src="/intro.mp4" ...>` 를
   `<video src="https://cdn.jsdelivr.net/gh/junho908-svg/yunjeong-assets@main/intro.mp4" ...>` 로 교체
3. `public/intro.mp4` 삭제 후 재배포

---

## 5. 다음 단계 (배포 후 단계적으로)

- 회원 로그인·진도 저장: 현재는 프런트 데모(`useState`). 실제 기능은 백엔드/인증 붙일 때 구현.
- 푸터 링크(YouTube·자료실·문의): 현재 `#` 플레이스홀더 → 실제 주소 연결.
- 도메인 연결: Vercel → Settings → Domains 에서 커스텀 도메인 추가 가능.

---

## 6. 끝까지 지킨 원칙 (확인용)

- 제품 효능 표현: "줄기세포 재생 / 독소 / 질병 치료 / 수술 대체" 표현 없음. 화장품·위생용품 범위(수분·피부결·청결 케어)로만 공개.
- Clinical Case·시술 가격: 미포함.
- 책임 고지 문구: 회원 강의실 하단에 유지(과장 수익 보장·비현실적 기대 조장 금지).
- 출력: 코드 + .md. docx/pdf 없음.

서명: 전준호 집사
