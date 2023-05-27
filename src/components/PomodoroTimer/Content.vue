<script setup>
import { usePomodoroTimerStore } from "@/store/pomodoroTimer";
import { convert } from "./timeFormat";

const store = usePomodoroTimerStore();
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="type">{{ store.type = 1 ? "作業中" : "休憩中"  }}</div>
      <div class="remaining">{{ store.getRemainingTimeDisplayValue }}</div>
    </div>
    <div class="right">{{ store.count }} Set</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: auto;
  padding: 40px;
  display: flex;
  align-items: center;

  .left {
    text-align: center;
    flex: 5;

    * {
      padding: 10px 0;
    }
    .type{
      font-size: 24px;
    }
    .remaining{
      font-size: 32px;
    }
  }

  .right {
    text-align: center;
    flex: 1;
    font-size: 24px;
  }
}
</style>
