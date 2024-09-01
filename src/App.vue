<script lang="ts">
import { defineComponent, ref } from 'vue'
import RadioButton from '@/components/RadioButton/RadioButton.vue'
import Card from '@/components/ui/Card/Card.vue'
import ProgressBar from '@/components/Progress/ProgressBar.vue'
import ResultList from '@/components/QuizResult/Result/ResultList.vue'
import MyButton from '@/components/Button/Button.vue'
import quiz from '@/const/quiz.json'
import type { Answer } from '@/types/question'

export default defineComponent({
  components: { RadioButton, Card, ProgressBar, ResultList, MyButton },
  setup() {
    const selectedAnswers = ref<Answer[]>([])
    const progress = ref<number>(0)

    return { selectedAnswers, progress }
  },
  data() {
    const questions = [...quiz.questions]

    const titles = {
      test: 'Тестирование',
      excellent: 'Поздравляем!',
      great: 'Хороший результат!',
      oneMoreTry: 'Упс :(',
    }

    const resultDescriptionMessage = {
      excellent: `Вы правильно ответили на все вопросы. 
Вы действительно отлично разбираетесь в IT.`,
      great: `Вы ответили правильно на 5 вопросов. 
Так держать!`,
      oneMoreTry: `Вы неправильно ответили на все вопросы.
Нужно подучить теорию.`,
    }

    return { questions, titles, resultDescriptionMessage }
  },
  computed: {
    quizMessage() {
      if (this.selectedAnswers.length < this.questions.length) {
        return {
          title: this.titles.test,
        }
      }

      if (this.selectedAnswers.every(answer => answer.isCorrect === true)) {
        return {
          title: this.titles.excellent,
          description: this.resultDescriptionMessage.excellent,
        }
      }
      else if (this.selectedAnswers.filter(answer => answer.isCorrect).length >= 5) {
        return {
          title: this.titles.great,
          description: this.resultDescriptionMessage.great,
        }
      }
      else {
        return {
          title: this.titles.oneMoreTry,
          description: this.resultDescriptionMessage.oneMoreTry,
        }
      }
    },

  },
  created() {
    this.shuffleQuestions()
  },
  methods: {
    updateSelectedAnswers(answer: Answer) {
      this.selectedAnswers.push(answer)
      this.progress++
    },
    resetQuiz() {
      this.selectedAnswers = []
      this.progress = 0
      this.shuffleQuestions()
    },
    shuffleQuestions() {
      this.questions = this.questions.sort(() => Math.random() - 0.5)
      this.questions.forEach((question) => {
        question.answers = question.answers.sort(() => Math.random() - 0.5)
      })
    },
  },
})
</script>

<template>
  <div class="base-layout">
    <div class="quiz">
      <h1 class="text--extrabold mb--20 mt--0">{{ quizMessage.title }}</h1>
      <p v-if="quizMessage.description" class="quiz__description text--2xl">{{ quizMessage.description }}</p>
      <template v-for="(question, questionIndex) in questions">
        <Card v-if="progress === questionIndex" :key="`question-${question.id}`" intent="primary">
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
      <ProgressBar v-if="progress < questions.length" :progress-length="questions.length" :progress="progress" />
    </div>
    <ResultList v-if="selectedAnswers.length === questions.length" :selected-answers="selectedAnswers" :questions="questions" />
    <MyButton v-if="selectedAnswers.length === questions.length" @click="resetQuiz">
      Пройти еще раз
    </MyButton>
  </div>
</template>

<style lang="css">
.base-layout {
  display: grid;
  grid-template-rows: auto;
  place-items: center;
  min-height: 100%;
  margin: auto;
  max-width: 886px;
  padding: 10px;
}

.quiz {
  width: 100%;
}

.quiz__description {
  white-space: pre-wrap;
}
</style>
