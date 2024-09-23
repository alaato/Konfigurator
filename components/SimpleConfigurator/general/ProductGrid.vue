<template>
	<section>
		<div v-if="currentStage == 'Aussenstation'" class="flex flex-wrap justify-center gap-2">
			<OutdoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
		<div v-if="currentStage == 'Innenstation'" class="flex flex-wrap justify-center gap-2">
			<IndoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
		<div v-if="currentStage == 'Zubehör'" class="flex flex-wrap justify-center gap-2">
			<ZubehorCard v-for="product in products" :product="product" :key="product.id" />
			<slot/>
		</div>
	</section>
</template>

<script setup>
import ZubehorCard from '../Zubehör/ZubehorCard.vue';
import IndoorProduct from './IndoorProduct.vue';
import OutdoorProduct from './OutdoorProduct.vue';
import ProductCard from './ProductCard.vue';

//stores

const currentStagestore = useCurrentStageStore()
const {currentStage} = storeToRefs(currentStagestore)
const props = defineProps(['products'])

</script>

<style></style>