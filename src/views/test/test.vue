<template>
  <div>
    <p>当前数字{{ count }}, 是{{ evenOrOdd }}</p>
    <input type="button" @click="increment" value="+1" />
    <input type="button" @click="decrement" value="-1" />
    <input type="button" @click="incrementIfOdd" value="奇数+1" />
    <input type="button" @click="incrementAsync" value="异步+1" />
  </div>
</template>

<script>
import { INCREMENT, DECREMENT } from "../../store/mutations_type";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    /* increment() {
      this.count++
    },
    decrement() {
      this.count--
    }, */
    ...mapMutations({
      increment: INCREMENT,
      decrement: DECREMENT
    }),
    /*
    incrementIfOdd() {
      if (this.count % 2 === 1) {
        this.count++
      }
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000);
    }, */
    ...mapActions(["incrementIfOdd", "incrementAsync"])
  },
  computed: {
    ...mapGetters(["evenOrOdd"]),
    ...mapState(["count"])
  }
};
</script>

<style lang="scss" scoped></style>
