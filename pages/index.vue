<template>
  <div ref="main" class="flex flex-col items-center justify-center md:h-screen py-2 gap-4">
    <h1 class="text-center text-2xl sm:text-5xl">Sprechanlagen Konfigurator</h1>
    <div class="versions flex gap-2">
      <NuxtLink class="border p-3 rounded-md bg-arapawa-950 dark:bg-white text-white dark:text-black" to="simple">Schnell</NuxtLink>
      <NuxtLink class="border p-3 rounded-md bg-arapawa-950 dark:bg-white text-white dark:text-black" to="detail">Custom</NuxtLink>
    </div>

  </div>

</template>

<script lang="ts" setup>
const main = ref(null)
onMounted(() => {
  main.value.scrollIntoView({behavior: 'smooth', block: 'nearest'})
})
</script>

<style>

</style>