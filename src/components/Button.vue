<script setup>
  const {backgroundColor, textColor, text} = defineProps(["backgroundColor", "textColor", "text"])

</script>

<template>
  <div>
    <div class="button" 
      :style="{
        backgroundColor: backgroundColor, 
        color: textColor
      }">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
  .button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
  }
</style>