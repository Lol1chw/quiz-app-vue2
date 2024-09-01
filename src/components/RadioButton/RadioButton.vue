<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    labelText: String,
    id: String,
    radioGroupName: String,
  },
  emits: ['update:selected'],
})
</script>

<template>
  <label :for="id" class="radio">
    {{ labelText }}
    <input :id="id" type="radio" :value="labelText" :name="radioGroupName" @change="$emit('update:selected')">
    <span class="radio__checkmark" />
  </label>
</template>

<style lang="css">
.radio {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: start;
    gap: 5px;
    position: relative;
    cursor: pointer;
    user-select: none;
    width: fit-content;
}

.radio input {
    opacity: 0;
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 9999;
}

.radio__checkmark {
    background-color: transparent;
    border-radius: var(--rounded);
    border: 1px solid var(--black);
    min-width: 20px;
    min-height: 20px;
    margin-right: 20px;
}

.radio:hover input ~ .radio__checkmark,
.radio:focus-visible input ~ .radio__checkmark {
    -webkit-box-shadow: 0px 0px 8px 4px rgba(51, 0, 255, 0.22);
    -moz-box-shadow: 0px 0px 8px 4px rgba(51, 0, 255, 0.22);
    box-shadow: 0px 0px 8px 4px rgba(51, 0, 255, 0.22);
    border-color: var(--primary);
    background-color: var(--primary);
}

.radio input:checked ~ .radio__checkmark {
    background-color: var(--primary);
    border-color: var(--primary);
}
</style>
