<script setup lang="ts">
  const useIdFunction = () => useId()
</script>

<template>
    <ConfigProvider :use-id="useIdFunction">

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</ConfigProvider>
</template>
<style>
@import "./style.css";
</style>
