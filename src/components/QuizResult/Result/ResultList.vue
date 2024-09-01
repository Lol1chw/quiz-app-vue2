<script lang="ts">
import { defineComponent } from 'vue'
import ResultCard from '../Card/ResultCard.vue'
import type { Answer, Question } from '@/types/question'

export default defineComponent({
  components: { ResultCard },
  props: {
    selectedAnswers: {
      type: Array<Answer>,
      required: true,
    },
    questions: {
      type: Array<Question>,
      required: true,
    },
  },
})
</script>

<template>
  <ul role="list">
    <li
      v-for="(answer, index) in selectedAnswers"
      :key="`result-${index}-${answer.id}`"
      :style="{ marginBottom: index !== questions.length && '20px' }"
    >
      <ResultCard
        :is-correct="answer.isCorrect"
        :question-text="questions[index].text"
        :answer-text="answer.text"
      />
    </li>
  </ul>
</template>
