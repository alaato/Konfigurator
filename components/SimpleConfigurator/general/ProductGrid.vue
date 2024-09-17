<template>
	<section>
		<div v-if="currentStage == 'Aussenstation'" class="flex flex-wrap justify-center gap-2">
			<OutdoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
		<div v-if="currentStage == 'Innenstation'" class="flex flex-wrap justify-center gap-2">
			<IndoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
	</section>
</template>

<script setup>
import IndoorProduct from './IndoorProduct.vue';
import OutdoorProduct from './OutdoorProduct.vue';

//stores

const currentStagestore = useCurrentStageStore()
const {currentStage} = storeToRefs(currentStagestore)
const props = defineProps(['products', 'remainingProducts'])

</script>

<style></style>