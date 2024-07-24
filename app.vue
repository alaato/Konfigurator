<script setup lang="ts">
import Navbar from './components/general/Navbar.vue';
// import fetchIndoorStations from './qraphql/indoorQuery';
// import fetchOutdoorStations from './qraphql/outdoorQuery';
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)

const useIdFunction = () => useId()

// const { result: indoorstations } = fetchIndoorStations(filter)
// const { result: outdoorStations } = fetchOutdoorStations(filter)

// watchEffect(() => {
//   console.log("indoor:", indoorstations.value)
// })
// watchEffect(() => {
//   console.log("outdoor:", outdoorStations.value)
// })
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div id="app" class="max-h-screen flex flex-col">
      <Navbar></Navbar>
      <div class="main-page m-auto" >
        <NuxtPage />
      </div>
      </div>
  </ConfigProvider>
</template>
<style>
@import "./style.css";
</style>
