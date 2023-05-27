<script setup>
import { usePomodoroTimerStore } from "@/store/pomodoroTimer";

const store = usePomodoroTimerStore();

let intervalID;

// startボタン
const startTimer = () => {
  store.setStartTime();
  intervalID = setInterval(timer, 100);
};

const timer = () => {
  store.countdown();
};

// stopボタン
const stopTimer = () => {
  clearInterval(intervalID);
};

// resetボタン
const resetTimer = () => {
  store.reset();
};
</script>

<template>
  <div class="container">
    <div class="col-left">
      <div class="input">
        <label for="workTime">作業時間(分)</label>
        <input type="text" v-model="store.workTime" id="workTime" />
      </div>
      <div class="input">
        <label for="restTime">休憩時間(分)</label>
        <input type="text" v-model="store.restTime" id="restTime" />
      </div>
    </div>
    <div class="col-right">
      <button @click="startTimer">Start</button>
      <button @click="stopTimer">Stop</button>
      <button @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: auto;
  display: flex;

  .col-left,
  .col-right {
    width: 50%;
    text-align: center;
  }

  .input {
    margin: 10px;
    label {
      padding: 10px 20px;
    }

    input {
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 5px;
    }
  }
}
</style>
