import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { convert } from "@/components/PomodoroTimer/timeFormat";

export const usePomodoroTimerStore = defineStore("pomodoroTimer", () => {
  // State
  const workTime = ref(0);
  const restTime = ref(0);
  const remainingTime = ref(0);
  const startTime = ref(0);
  const startRemainingTime = ref(0);
  const type = ref(1); // 1: work, 1: rest
  const count = ref(0);

  // Getter
  const getRemainingTimeDisplayValue = computed(() => {
    const { secondsDisplayValue, minutsDisplayValue } = convert(
      remainingTime.value
    );
    return `${minutsDisplayValue} 分 ${secondsDisplayValue} 秒`;
  });

  // Action
  const setStartTime = () => {
    // 残り時間の設定
    if (remainingTime.value <= 0) {
      remainingTime.value = type.value === 1 ? workTime.value : restTime.value;
      if (type.value === 1) {
        count.value++;
      }
    }

    // タイマー開始時の残り時間設定
    startTime.value = new Date().getTime();
    startRemainingTime.value = remainingTime.value;
  };

  // タイマー処理
  const countdown = () => {
    const nowTime = new Date().getTime();
    remainingTime.value =
      startRemainingTime.value - (nowTime - startTime.value);

    // 残り時間が0を下回ったら切り替え
    if (remainingTime.value < 0) {
      type.value *= -1;
      setStartTime();
    }
  };

  // タイマーの初期化
  const reset = () => {
    remainingTime.value = 0;
    count.value = 0;
    type.value = 1;
  };

  return {
    workTime,
    restTime,
    remainingTime,
    startTime,
    getRemainingTimeDisplayValue,
    count,
    setStartTime,
    countdown,
    reset,
  };
});
