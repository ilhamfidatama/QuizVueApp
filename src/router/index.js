import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizResultView from '../views/QuizResultView.vue'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'home',
      component: HomeView
    }, 
    {
      path: "/quiz/:id",
      name: 'quiz',
      component: QuizView,
    },
    {
      path: "/results/:id/:data",
      name: 'results',
      component: QuizResultView,
      props: true
    }
  ]
});

export default router;