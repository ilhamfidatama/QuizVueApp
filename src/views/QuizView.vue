<script setup>
  import {ref, onBeforeMount, onMounted, computed} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import quizData from "../../data.json";
  import Question from "../components/Question.vue";
  import Button from "../components/Button.vue";
  import QuizResult from "../components/QuizResult.vue";

  const route = useRoute()
  const router = useRouter()
  const quizId = parseInt(route.params.id)
  const currentQuestion = ref(1)
  const correctAnswered = ref(0)
  let quiz;
  const quizRef = ref({})
  const submittedQuestion = computed(() => (currentQuestion.value) === quiz.questions.length)
  const questionStatus = computed(() => `${currentQuestion.value}/${quiz.questions.length}`)
  const questionBar = computed(() => `${(currentQuestion.value/quiz.questions.length)*100}%`)
  const navJustify = computed(() => {
    if (!navQuestion.value.back) return "end"
    return "space-between"
  })

  const navQuestion = computed(() => {
    return {
      next: currentQuestion.value < quiz.questions.length,
      back: currentQuestion.value > 1
    }
  })

  onBeforeMount(() => {
    quiz = quizData.find(q => q.id === quizId)
    // quiz.questions = quiz.questions.map(q => {return {...q, isSelected: false}})
    console.log("onBeforeMount", quiz);
  })

  onMounted(() => {
    quizRef.value = quiz
    quizRef.value.questions = quizRef.value.questions.map(q => {
      var tempOptions = q.options.map(o => {
        return {...o, isSelected: false}
      })
      return {...q, options: tempOptions}
    })
    console.log("onMounted", quizRef);
  })

  const onNext = () => {
    if (currentQuestion.value === quiz.questions.length) {
      console.log("show results component");
    }
    if (currentQuestion.value < quiz.questions.length) {
      currentQuestion.value++
    }
  }

  const onBack = () => {
    if (currentQuestion.value > 1) {
      currentQuestion.value--
    }
  }

  const onSelectedAnswer = (questionId, optionId) => {
    quizRef.value.questions[questionId].options = quizRef.value.questions[questionId].options.map(option => {
      if (option.id === optionId) return {...option, isSelected: true}
      return {...option, isSelected: false}
    })

    console.log(`question: ${questionId} selected answer ${optionId}`);
  }

</script>

<template>
  <div>
    <header>
      <h4>Question {{ questionStatus }}</h4>
      <div class="bar">
        <div class="completion" :style="{width: questionBar}"></div>
      </div>
    </header>
    <div>
      <Question
        :key="quiz.questions[currentQuestion-1].id" 
        :question="quiz.questions[currentQuestion-1]" @selected-answer="onSelectedAnswer" />
    </div>
    <div class="nav-question" :style="{justifyContent: navJustify}" v-if="!submittedQuestion">
      <Button @click="onBack()" v-show="navQuestion.back" text="Back Question"></Button>
      <Button @click="onNext()" v-show="navQuestion.next" text="Next Question"></Button>
    </div>
    <div class="nav-finish" v-else>
      <Button @click="onBack()" v-show="navQuestion.back" text="Submit Answers"></Button>
    </div>
  </div>
</template>

<style scoped>
  header {
    margin-top: 20px;
  }

  header h4 {
    font-size: 30px;
  }

  .bar {
    width: 300px;
    height: 50px;
    border: 3px solid bisque;
  }

  .completion {
    height: 100%;
    width: 0%;
    background-color: bisque;
  }

  .nav-question {
    display: flex;
    justify-content: space-between;
    padding: 12px 20px;
  }

  .nav-finish {
    display: flex;
    justify-content: end;
    padding: 12px 20px;
  }
</style>