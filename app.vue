<script setup lang="ts" type="module">
//imports
import Navbar from './components/general/Navbar.vue';
useHead({ link: [{ rel: "manifest", href: "/TcsSpreschanlageKonfigurator.webmanifest" }] })
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/js/sw.js");
}

//consts

</script>


<template>
	<div id="app" class="h-screen">
		<Navbar></Navbar>
		<NuxtPage />
	</div>
</template>
<style>
@import "./style.css";
</style>
