<script setup lang="ts">
//imports
import Navbar from './components/general/Navbar.vue';
import { ConfigProvider } from 'radix-vue'

//consts

const useIdFunction = () => useId()
</script>


<template>
	<ConfigProvider :use-id="useIdFunction">
		<div id="app" class="flex flex-col">
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
