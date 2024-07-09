<template>
  <section>
    <button class="mx-14" @click="router.push('/indoorStations')">back</button>
    <div class="flex justify-center gap-2 flex-wrap">
      <OutdoorProductCardShad v-for="i in 10 " :key="i"></OutdoorProductCardShad>
    </div>
  </section>

</template>

<script lang="ts" setup>
const router = useRouter()

</script>

<style></style>