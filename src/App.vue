<script lang="ts">
import { defineComponent, ref } from 'vue'
import RadioButton from '@/components/RadioButton/RadioButton.vue'
import Card from '@/components/ui/Card/Card.vue'
import ProgressBar from '@/components/Progress/ProgressBar.vue'
import ResultCard from '@/components/QuizResult/Card/ResultCard.vue'
import type { Answer, Question } from '@/types/question'

export default defineComponent({
  components: { RadioButton, Card, ProgressBar, ResultCard },
  setup() {
    const selectedAnswers = ref<Answer[]>([])
    const progress = ref<number>(0)

    return { selectedAnswers, progress }
  },
  data() {
    const questions: Question[] = [
      {
        id: 1,
        text: 'Что такое операционная система?',
        answers: [
          { id: 1, text: 'Это просто программа на компьютере, как и другие - Word или Chrome', isCorrect: false },
          { id: 2, text: 'Это показатель того, какой процессор используется на компьютере. Например, 32-битный или 64-битный', isCorrect: false },
          { id: 3, text: 'Это набор взаимосвязанных программ, осуществляющих управление компьютером и взаимодействие с пользователем', isCorrect: true },
          { id: 4, text: 'Нет такого понятия, есть понятие "файловая система"', isCorrect: false },
        ],
      },
      {
        id: 2,
        text: 'Что такое операционная система? question-2',
        answers: [
          { id: 5, text: 'Это просто программа на компьютере, как и другие - Word или Chrome', isCorrect: false },
          { id: 6, text: 'Это показатель того, какой процессор используется на компьютере. Например, 32-битный или 64-битный', isCorrect: false },
          { id: 7, text: 'Это набор взаимосвязанных программ, осуществляющих управление компьютером и взаимодействие с пользователем', isCorrect: true },
          { id: 8, text: 'Нет такого понятия, есть понятие "файловая система"', isCorrect: false },
        ],
      },
    ]

    return { questions }
  },
  methods: {
    updateSelectedAnswers(answer: Answer) {
      this.selectedAnswers.push(answer)
      this.progress++
    },
  },
})
</script>

<template>
  <div class="base-layout">
    <div class="quiz">
      <h1 class="title">
        Тестирование
      </h1>
      <template v-for="question in questions">
        <Card v-if="progress + 1 === question.id" :key="`question-${question.id}`" intent="primary">
          <ul role="list">
            <h2 class="mt--0 mb--20">
              {{ question.text }}
            </h2>
            <li
              v-for="(answer, index) in question.answers"
              :key="`answer-${answer.id}`"
              :style="{ marginBottom: index + 1 < question.answers.length ? '20px' : '' }"
            >
              <RadioButton
                :label-text="answer.text"
                :radio-group-name="`question-${question.id}`"
                @update:selected="updateSelectedAnswers(answer)"
              />
            </li>
          </ul>
        </Card>
      </template>
    </div>
    <ProgressBar v-if="progress < questions.length" :progress-length="questions.length" :progress="progress" />
    <div v-if="selectedAnswers.length === questions.length">
      <template v-for="(answer, index) in selectedAnswers">
        <ResultCard
          :key="`result-${index}-${answer.id}`"
          :is-correct="answer.isCorrect"
          :question-text="questions[index].text"
          :answer-text="answer.text"
        />
      </template>
    </div>
  </div>
</template>

<style lang="css">
.base-layout {
  display: grid;
  grid-template-rows: auto auto;
  place-items: center;
  min-height: 100%;
  padding: 10px;
}
</style>
