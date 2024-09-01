<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <button class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style lang="css">
.button {
    background-color: var(--primary);
    border-radius: var(--rounded-sm);
    border: 1px var(--primary) solid;
    color: var(--white);
    padding: 16px 30px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
}

.button:focus-visible {
  outline: 2px solid var(--black);
}

.button:hover {
    opacity: 0.75;
}

.button:active {
    transform: translateY(2px);
}
</style>
