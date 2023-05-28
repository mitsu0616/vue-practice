<script setup>
import { usePomodoroTimerStore } from "@/store/pomodoroTimer";

const store = usePomodoroTimerStore();
</script>

<template>
  <div class="container">
    <div class="container__item">
      <div class="type">{{ store.type === 1 ? "作業中" : "休憩中"  }}({{ store.count }} set)</div>
      <div class="remaining">{{ store.getRemainingTimeDisplayValue }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: auto;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    text-align: center;

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

}
</style>
