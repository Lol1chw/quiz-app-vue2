<script lang="ts">
import { defineComponent, ref } from 'vue'
import RadioButton from '@/components/RadioButton/RadioButton.vue'
import Card from '@/components/ui/Card/Card.vue'
import ProgressBar from '@/components/Progress/ProgressBar.vue'
import ResultList from '@/components/QuizResult/Result/ResultList.vue'
import quiz from '@/const/quiz.json'
import type { Answer } from '@/types/question'

export default defineComponent({
  components: { RadioButton, Card, ProgressBar, ResultList },
  setup() {
    const selectedAnswers = ref<Answer[]>([])
    const progress = ref<number>(0)

    return { selectedAnswers, progress }
  },
  data() {
    const questions = [...quiz.questions]
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
      <h1>
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
                :id="`answer-${answer.id}`"
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
    <ResultList v-if="selectedAnswers.length === questions.length" :selected-answers="selectedAnswers" :questions="questions"/>
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
