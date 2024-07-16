<template>
	<section>
		
		<div v-if="currentStage == 'Aussenstation'" class="flex justify-center gap-2 flex-wrap">
			<SimpleConfiguratorOutdoorProduct v-for="product in products" :product="product.node"
				:key="product.node.id"></SimpleConfiguratorOutdoorProduct>
		</div>
		<div v-else class="flex justify-center gap-2 flex-wrap">
			<SimpleConfiguratorIndoorProduct v-for="product in products" :product="product.node"
				:key="product.node.id"></SimpleConfiguratorIndoorProduct>
		</div>
	</section>

</template>

<script setup>
const props = defineProps(['products','currentStage'])
</script>

<style></style>