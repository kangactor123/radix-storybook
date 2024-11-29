# Radix UI Storybook

이 프로젝트는 Radix UI, @tanstack/react-table, Storybook으로 구현한 예제입니다. Radix UI의 다양한 컴포넌트를 쉽게 탐색하고 사용법을 확인할 수 있습니다.

## 환경

- node: ^20
- pnpm: 9.12.2

### 설명

- Node.js 20버전 이상을 사용할 것을 권고합니다.
- 해당 패키지는 pnpm@9.12.2버전을 사용하고 있습니다. corepack을 활용해 패키지 매니저와 버전을 고정했으니 참고 바랍니다.

## 기술 스택

- React
- TypeScript
- Radix UI
- Storybook
- @tanstack/react-table

## 시작하기

이 프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요:

1. 저장소를 클론합니다:

```
git clone https://github.com/kangactor123/radix-storybook.git
```

2. 프로젝트 디렉토리로 이동합니다

```
cd radix-storybook
```

4. 스토리북을 실행하세요.

```
npm run storybook
pnpm run storybook
yarn storybook
```

## 구현된 컴포넌트

현재 구현된 Radix UI 컴포넌트는 다음과 같습니다.

- SingleSelect
- MultiSelect
- Checkbox
- Switch
- Table
- Input
- Dialog
- Title

각 컴포넌트의 사용법과 props는 Storybook 혹은 소스 코드에서 확인할 수 있습니다.
