<script setup>
  import {useRouter} from "vue-router";
  import {ref} from "vue";

  const {correctAnswered, totalQuiz} = defineProps(['correctAnswered', 'totalQuiz'])
</script>

<template>
  <div>
    <h1>{{ correctAnswered }}/{{ totalQuiz }}</h1>
  </div>
</template>

<style scoped>
</style>