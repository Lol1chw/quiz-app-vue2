<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="css">
.card {
    background-color: #F7F7F7;
    border-radius: var(--rounded-md);
    padding: 40px;
    max-width: 886px;
    min-height: 528px;
    margin: auto;
}
</style>
