<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getCourseByCollege");
    this.$store.dispatch("getStudentByCollege");
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
