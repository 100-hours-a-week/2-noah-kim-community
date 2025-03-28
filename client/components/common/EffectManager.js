export class EffectManager {
  constructor(component) {
    this.component = component
    this.effects = []
  }

  useEffect(callback, deps) {
    this.effects.push({
      callback, // 실행할 함수
      deps, // 의존성 배열
      hasRun: false, // 한 번이라도 실행된 적 있는지 여부 (최초 실행 여부 판단용)
      prevDeps: undefined, // 이전 렌더 시의 의존성 값들 (한 번 실행된 후 생깁니다)
    })
  }

  runEffects() {
    this.effects.forEach(effect => {
      const { callback, deps, hasRun, prevDeps } = effect

      /**
       * 아직 한 번도 실행 안 했거나(최초 렌더링)
       * 이전 deps가 없거나 (최초 상태 변경)
       * deps 중 하나라도 변경됐다면 (최초 아닌 상태 변경)
       */
      const shouldRun = !hasRun || !prevDeps || deps.some((dep, i) => dep !== prevDeps[i])

      if (shouldRun) {
        callback() // 실제 effect 실행
        effect.hasRun = true // 다음엔 무조건 실행 안 되게
        effect.prevDeps = [...deps] // 현재 deps를 저장 (깊은 복사)
      }
    })
  }

  reset() {
    // 렌더 타이밍이 바뀌어도 effects는 유지됨 (React처럼)
  }
}
