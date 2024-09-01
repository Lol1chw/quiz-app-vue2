<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/ui/Card/Card.vue'

export default defineComponent({
  components: { Card },
  props: {
    isCorrect: {
      type: Boolean,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    answerText: {
      type: String,
      required: true,
    },
  }
})
</script>

<template>
  <div>
    <h1 class="text--2xl text--bold">{{ isCorrect ? 'Правильный ответ' : 'Неправильный ответ' }}</h1>
    <Card :intent="isCorrect ? 'success' : 'failed'">
      <h2 class="mt--0 mb--15 text--xl">{{ questionText }}</h2>
      <p class="my--15">{{ answerText }}</p>
    </Card>
  </div>
</template>