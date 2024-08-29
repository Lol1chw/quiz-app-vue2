<script lang="ts">
import { defineComponent, ref } from 'vue'
import Counter from '@/components/Counter.vue'

export default defineComponent({
  components: { Counter },

  setup() {
    const items = [1, 2, 3, 4, 5]
    const msg = ref<string>('msg _string')

    return { items, msg }
  },
})
</script>

<template>
  <div>
    <Counter />
    <ul>
      <li>{{ msg }}</li>
      <template v-for="item in items">
        <li :key="item">
          {{ item }}
        </li>
      </template>
    </ul>
  </div>
</template>
