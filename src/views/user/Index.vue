<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getAllPolitics");
    this.$store.dispatch("getAllClass");
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
