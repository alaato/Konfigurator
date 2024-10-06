<script setup lang="ts">
//imports
import Navbar from './components/general/Navbar.vue';
useHead({ link: [{ rel: "manifest", href: "/TcsSpreschanlageKonfigurator.webmanifest" }] })
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
