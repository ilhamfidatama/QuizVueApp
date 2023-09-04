<script setup>
  import {useRoute} from "vue-router";
  import {ref, onBeforeMount} from "vue";

  const route = useRoute()
  const {correctAnswered, totalQuestions} = JSON.parse(route.params.data)

  onBeforeMount(() => {
    console.log(route.params)
  })

</script>

<template>
  <div>
    <h1>{{ correctAnswered }}/{{ totalQuestions }}</h1>
  </div>
</template>

<style scoped>
</style>