import { createRouter, createWebHistory } from "vue-router";

import PomodoroTimer from "@/components/PomodoroTimer/PomodoroTimer.vue";

const routes = [
  {
    path: "/pomodoro",
    component: PomodoroTimer,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
