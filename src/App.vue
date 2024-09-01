<script lang="ts">
import { defineComponent, ref } from 'vue'
import RadioButton from '@/components/RadioButton/RadioButton.vue'
import Card from '@/components/Card/Card.vue'
import ProgressBar from '@/components/Progress/ProgressBar.vue'
import type { Question } from '@/types/question'

export default defineComponent({
  components: { RadioButton, Card, ProgressBar },
  setup() {
    const selectedAnswers = ref<boolean[]>([])
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
    ]

    return { questions }
  },
  methods: {
    updateSelectedAnswers(isCorrectValue: boolean) {
      this.selectedAnswers.push(isCorrectValue)
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
      <Card>
        <ul role="list">
          <template v-for="question in questions">
            <h2 :key="`question-${question.id}`" class="title">
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
                @update:selected="updateSelectedAnswers(answer.isCorrect)"
              />
            </li>
          </template>
        </ul>
      </Card>
    </div>
    <ProgressBar :progress-length="questions.length" :progress="progress"/>
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

.title {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
