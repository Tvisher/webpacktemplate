<template>
  <section id="main">
    <div class="container">
      <h1>Webpack - {{ message }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: null,
    };
  },
  created() {
    this.message = this.$store.getters.getMessage;
  },
};
</script>

<style lang='scss' >
h1 {
  color: green;
  font-size: 42px;
  font-weight: 600;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>