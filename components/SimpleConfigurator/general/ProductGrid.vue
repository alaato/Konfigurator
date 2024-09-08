<template>
	<section>
		
		<div v-if="currentStage == 'Aussenstation'" class="flex justify-center gap-2 flex-wrap">
			<OutdoorProduct v-for="product in products" :product="product.node"
				:key="product.id"/>
		</div>
		<div v-else class="flex justify-center gap-2 flex-wrap">
			<IndoorProduct v-for="product in products" :product="product.node"
				:key="product.node.id"/>
		</div>
	</section>

</template>

<script setup>
import IndoorProduct from './IndoorProduct.vue';
import OutdoorProduct from './OutdoorProduct.vue';

const props = defineProps(['products','currentStage'])
</script>

<style></style>