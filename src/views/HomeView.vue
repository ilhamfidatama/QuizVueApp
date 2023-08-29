<script setup>
  import {ref, watch} from "vue"
  import QuizCard from "../components/QuizCard.vue"
  import quizJson from "../../data.json"

  const search = ref("");
  const quizData = ref(quizJson);

  watch(search, () => {
    console.log(`search: ${search.value}`, quizData.value);
    if(search.value.length === 0) {
      quizData.value = quizJson;
      return;
    }
    quizData.value = quizJson.filter(quiz => quiz.name.toLowerCase().includes(search.value.toLowerCase()))
  });

</script>

<template>
  <div class="container">
    <header>
      <h1>Quizes</h1>
      <input type="text" placeholder="Search..." v-model.trim="search">
    </header>
    <div class="options-container">
      <QuizCard v-for="quiz in quizData" :key="quiz.id" :quiz="quiz" />
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto
  }

  header {
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: center;
  }

  header h1 {
    font-weight: bold;
    margin-right: 30px;
  }

  header input {
    border: none;
    background-color: rgba(128,128,128,0.1);
    padding: 10px;
    border-radius: 5px;
  }

  .options-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
  }
</style>