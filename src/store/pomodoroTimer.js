import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { convert } from "@/components/PomodoroTimer/timeFormat";

export const usePomodoroTimerStore = defineStore("pomodoroTimer", () => {
  // State
  
  const workTime = ref(0);  // 作業時間
  const restTime = ref(0);  // 休憩時間
  const remainingTime = ref(0); // タイマーの残り時間
  const startTime = ref(0); // タイマー起動時刻
  const startRemainingTime = ref(0);  // タイマー起動時の残り時間
  const type = ref(1); // 1: 作業中, -1: 休憩中
  const count = ref(0); // 何セット目か

  // Getter
  
  // タイマーの残り時間を表示形式に変換
  const getRemainingTimeDisplayValue = computed(() => {
    const { secondsDisplayValue, minutsDisplayValue } = convert(
      remainingTime.value
    );
    return `${minutsDisplayValue} 分 ${secondsDisplayValue} 秒`;
  });

  // Action

  // 作業時間設定時に残り時間を設定する処理
  const initRemainingTimeSet = () => {
    remainingTime.value = workTime.value * 60000;
  };

  // タイマー起動処理
  const setStartTime = () => {
    // 初回実行時は必ずcountを増やす
    if (count.value === 0){
      count.value++;
    }

    // 作業中/休憩中の切り替え時の処理
    if (remainingTime.value <= 0) {
      // 残り時間の再設定
      remainingTime.value =
        type.value === 1 ? workTime.value * 60000 : restTime.value * 60000;

      // 作業中に切り替わったタイミングでカウントを追加
      if (type.value === 1) {
        count.value++;
      }
    }

    // タイマー開始時の時刻と残り時間の保存
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
    remainingTime.value = workTime.value * 60000;
    count.value = 0;
    type.value = 1;
  };

  return {
    workTime,
    restTime,
    remainingTime,
    startTime,
    getRemainingTimeDisplayValue,
    type,
    count,
    initRemainingTimeSet,
    setStartTime,
    countdown,
    reset,
  };
});
