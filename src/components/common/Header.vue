<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <header class="head">
    <div class="home">
      <p class="home__text">Vue Practice</p>
    </div>
    <div class="title">
      <p class="home__text">{{ props.title }}</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 100px;
  background-color: #f19066;
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  .home {
    flex: 1;
    text-align: center;
  }

  .title {
    flex: 3;
    text-align: center;
    font-size: 28px;
  }
}
</style>
