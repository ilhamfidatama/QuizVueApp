<script setup>
  import { ref, onBeforeMount, watch } from "vue"

  const {question} = defineProps(["question"])
  const emit = defineEmits(["selected-answer"])
  
  const optionRef = ref([])
  const optionIdSelected = ref(0)

  const onSelectedAnswer = (optionId) => {
    optionIdSelected.value = optionId
  }

  watch(optionIdSelected, () => {
    optionRef.value = question.options.map(option => {
      option.isSelected = option.id === optionIdSelected.value
      return option
    })
    emit("selected-answer", optionRef.value)
  })

  onBeforeMount(() => {
    optionRef.value = question.options
  })

</script>

<template>
  <div>
    <div class="question-container">
      <h1 class="question">
        {{ question.text }}
      </h1>
    </div>
    <div class="answer-container">
      <div class="option" v-for="option in optionRef" :key="option.id" 
      @click="onSelectedAnswer(option.id)">
        <p class="option-label" v-bind:style="option.isSelected ? 'background-color:#499F68; color:white'
        : 'background-color:bisque'">{{ option.label }}</p>
        <div class="option-value" v-bind:style="option.isSelected ? 'background-color:#157a6e; color:white'
        : 'background-color:rgb(244, 239, 239)'">{{ option.text }}</div>
      </div>
    </div>
  </div>  
</template>

<style scoped>
  .question-container {
    margin-top: 20px;
  }

  .question {
    font-size: 40px;
    margin-bottom: 20px;
  }

  .option {
    display: flex;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .option-label {
    background-color: bisque;
    width: 50px;
    height: 50px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option-value {
    background-color: rgb(244, 239, 239);
    width: 100%;
    font-size: 30px;
    padding: 0 20px;
  }
</style>