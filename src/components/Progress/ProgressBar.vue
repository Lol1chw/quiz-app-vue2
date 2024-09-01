<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    progressLength: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const lineProgress = ref<number>(0)
    const progressIsUpdated = ref<boolean>(false)
    const timeoutCounterAnimation = ref<null | NodeJS.Timeout>(null)

    return { lineProgress, progressIsUpdated, timeoutCounterAnimation }
  },
  watch: {
    progress(newVal) {
      if (this.timeoutCounterAnimation) {
        clearTimeout(this.timeoutCounterAnimation)
      }

      if (this.progressLength) {
        this.lineProgress = 0
      }

      this.progressIsUpdated = true
      this.lineProgress = (newVal / this.progressLength) * 100

      this.timeoutCounterAnimation = setTimeout(() => {
        this.progressIsUpdated = false
      }, 3000)
    },
  },
})
</script>

<template>
  <div class="progress">
    <div class="count-steps">
      <span class="text--bold text--base">0</span>
      <span class="text--bold text--base">{{ progressLength }}</span>
    </div>
    <div class="line">
      <div class="line__progress" :style="{ width: `${lineProgress}%` }">
        <span
          :class="{ 'line__counter--visible': progressIsUpdated }"
          class="line__counter text--bold text--base"
        >
          {{ progress }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.progress {
    width: 100%;
    max-width: 886px;
}

.count-steps {
    display: flex;
    justify-content: space-between;
}

.line {
    position: relative;
    width: 100%;
    min-height: 12px;
    border: 1px solid var(--card);
    border-radius: var(--rounded);
    background-color: var(--card);
}

.line__progress {
    position: absolute;
    display: flex;
    justify-content: end;
    background-color: var(--primary);
    border-radius: var(--rounded);
    min-height: 12px;
    z-index: 9999;
}

.line__counter {
    position: absolute;
    top: 12px;
    opacity: 0;
    transition: opacity 3s ease-in-out;
}

.line__counter--visible {
    opacity: 1;
}
</style>
