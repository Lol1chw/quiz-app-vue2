<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import MyButton from './Button/Button.vue'

export default defineComponent({
  components: { MyButton },

  setup() {
    const counter = ref<number>(0)

    watch(counter, (newCounter) => {
      if (newCounter < 0) {
        counter.value = 0
      }

      if (newCounter > 10) {
        counter.value = 0
      }
    })

    return {
      counter,
    }
  },
})
</script>

<template>
  <div class="counter">
    <div class="buttons">
      <MyButton @click="counter++">
        increment
      </MyButton>
      <MyButton @click="counter--">
        decrement
      </MyButton>
    </div>
    <p class="counter__text">
      counter: {{ counter }}
    </p>
  </div>
</template>

<style>
.counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid red;
    max-width: min-content;
    padding: 4px;
}

.counter__text {
    border: 1px skyblue solid;
    padding: 4px;
}

.buttons {
    display: flex;
    gap: 5px;
}
</style>
