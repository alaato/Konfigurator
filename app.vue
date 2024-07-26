<script setup lang="ts">
//imports
import Navbar from './components/general/Navbar.vue';

//consts

document.documentElement.classList.remove('dark')

const useIdFunction = () => useId()
useHead({
  title: 'Konfigurator',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  htmlAttrs: {
    class: 'light'
  },  
})

</script>


<template>
  <ConfigProvider :use-id="useIdFunction">
    <div id="app" class="max-h-screen flex flex-col">
      <Navbar></Navbar>
      <div class="main-page m-auto">
        <NuxtPage />
      </div>
    </div>
  </ConfigProvider>
</template>
<style>
@import "./style.css";
</style>
