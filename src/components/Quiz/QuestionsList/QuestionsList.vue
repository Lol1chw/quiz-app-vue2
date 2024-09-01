<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import RadioButton from '@/components/RadioButton/RadioButton.vue'
import type { Answer } from '@/types/question'

export default defineComponent({
  components: { RadioButton },
  props: {
    question: {
      type: Object as PropType<Answer>,
      required: true,
    },
  },
  emits: ['update:selected'],
})
</script>

<template>
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
        @update:selected="$emit('update:selected', answer)"
      />
    </li>
  </ul>
</template>
