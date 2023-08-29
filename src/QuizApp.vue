<script setup>
  import {RouterView} from "vue-router";
  import { onBeforeMount } from "vue";

  onBeforeMount(() => {
    console.log("app");
  })

</script>

<template>
  <div>
    <RouterView />
  </div>
</template>