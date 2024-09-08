<script setup lang="ts">
//imports
import Navbar from './components/general/Navbar.vue';

//consts

</script>


<template>
    <div id="app" class="h-screen flex flex-col">
      <Navbar></Navbar>
      <div class="main-page m-auto">
        <NuxtPage />
      </div>
    </div>
</template>
<style>
@import "./style.css";
</style>
