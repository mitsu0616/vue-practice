<script setup>
import { usePomodoroTimerStore } from "@/store/pomodoroTimer";
import { BGM, mp3 } from "./BGM.js";
import { watch } from "vue";

const store = usePomodoroTimerStore();

let intervalID;

// startボタン
const startTimer = () => {
  store.setStartTime();
  BGM.src = store.type === 1 ? mp3.workBGM : mp3.restBGM;
  BGM.play();
  intervalID = setInterval(timer, 100);
};

const timer = () => {
  store.countdown();
};

// stopボタン
const stopTimer = () => {
  BGM.pause();
  clearInterval(intervalID);
};

// resetボタン
const resetTimer = () => {
  store.reset();
};

// 作業/休憩の切り替え時にBGMを変更
watch(
  () => store.type,
  (type) => {
    if (store.count !== 0) {
      BGM.pause();
      BGM.src = type === 1 ? mp3.workBGM : mp3.restBGM;
      BGM.play();
    }
  }
);

// 作業時間設定時に残り時間も同時に設定
const changeWorkTime = () => {
  store.initRemainingTimeSet();
};
</script>

<template>
  <div class="container">
    <div class="col-left">
      <div class="input">
        <label for="workTime">作業時間(分)</label>
        <input
          type="number"
          v-model="store.workTime"
          id="workTime"
          @change="changeWorkTime"
        />
      </div>
      <div class="input">
        <label for="restTime">休憩時間(分)</label>
        <input type="number" v-model="store.restTime" id="restTime" />
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
