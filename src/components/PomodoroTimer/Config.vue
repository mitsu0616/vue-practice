<script setup>
import { usePomodoroTimerStore } from "@/store/pomodoroTimer";
import { BGM, mp3 } from "./BGM.js";
import { ref, watch } from "vue";

const store = usePomodoroTimerStore();
const isRunning = ref(false);

let intervalID;

// startボタン
const startTimer = () => {
  isRunning.value = true;
  store.setStartTime();
  BGM.src = store.type === 1 ? mp3.workBGM : mp3.restBGM;
  BGM.play();

  // タイマー起動
  intervalID = setInterval(timer, 100);
};

// タイマー処理
const timer = () => {
  store.countdown();
};

// stopボタン
const stopTimer = () => {
  isRunning.value = false;
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
          :class="{ 'input--readonly': store.count > 0 }"
          type="number"
          v-model="store.workTime"
          id="workTime"
          :readonly="store.count != 0"
          @change="changeWorkTime"
        />
      </div>
      <div class="input">
        <label for="restTime">休憩時間(分)</label>
        <input
          :class="{ 'input--readonly': store.count > 0 }"
          type="number"
          v-model="store.restTime"
          id="restTime"
          :readonly="store.count != 0"
        />
      </div>
    </div>
    <div class="col-right">
      <button v-show="isRunning === false" @click="startTimer">Start</button>
      <button v-show="isRunning === true" @click="stopTimer">Stop</button>
      <button
        v-show="isRunning === false && store.count > 0"
        @click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;

  .col-left,
  .col-right {
    width: 400px;
    padding: 30px 20px;
    text-align: center;
  }

  .col-right {
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
  }

  .input {
    margin: 10px;
    label {
      padding: 10px 20px;
    }

    input {
      font-size: 16px;
      width: 80px;
      padding: 10px 10px;
      border-radius: 5px;
    }

    .input--readonly {
      background-color: #888;
    }
  }
}

button {
  width: 100px;
  height: 50px;
  margin: 0 20px;
  font-size: 24px;
  border-radius: 25px;
  background-color: #f8a5c2;

  &:hover {
    background-color: #f78fb3;
  }

  &:active {
    background-color: #cf6a87;
  }
}

@media screen and (max-width: 520px) {
  .container {
    .col-left,
    .col-right {
      padding: 0px 0px;
    }
  }
}
</style>
