<script lang="ts">
import { defineComponent } from 'vue'
import { cva } from 'class-variance-authority'

export default defineComponent({
  props: {
    intent: {
      type: String,
      required: true,
      default: 'primary',
    },
  },
  data() {
    const card = cva('card', {
      variants: {
        intent: {
          primary: 'card--primary',
          success: 'card--success',
          failed: 'card--failed',
        },
      },
    })

    return { card }
  },
})
</script>

<template>
  <div :class="card({ intent })">
    <slot />
  </div>
</template>

<style lang="css">
.card {
    border-radius: var(--rounded-md);
    max-width: 886px;
    padding: 40px;
    margin: auto;
}

.card--primary {
  background-color: #F7F7F7;
  min-height: 528px;
}

.card--success {
  background-color: var(--success);
  min-height: 163px;
}

.card--failed {
  background-color: var(--failed);
  min-height: 163px;
}
</style>
