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
  let quiz;
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
    var tempQuiz = quizData.find(q => q.id === quizId)
    tempQuiz.questions = tempQuiz.questions.map(q => {
      var tempOptions = q.options.map(o => {
        return {...o, isSelected: false}
      })
      return {...q, options: tempOptions}
    })
    quiz = tempQuiz
    console.log("onBeforeMount", quiz);
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

  const onSelectedAnswer = (options) => {
    quiz.questions[currentQuestion.value-1].options = options
  }

  const onSubmit = () => {
    // TODO: count questions that have aswered correctly and navigate to result view
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
    <div class="nav-question" :style="{justifyContent: navJustify}">
      <Button @click="onBack()" v-show="navQuestion.back" text="Back Question"></Button>
      <Button @click="onSubmit()" v-show="navQuestion.back" text="Submit Answers" v-if="submittedQuestion"></Button>
      <Button @click="onNext()" v-show="navQuestion.next" text="Next Question" v-else></Button>
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