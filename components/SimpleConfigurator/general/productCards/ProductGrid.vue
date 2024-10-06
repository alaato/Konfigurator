<template>
	<section>
		<div v-if="currentStage == 'Aussenstation' && !showPackages" class="flex flex-wrap gap-1 justify-center  ">
			<OutdoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
		<ScrollArea v-if="currentStage == 'Aussenstation' && showPackages" class="flex flex-wrap gap-1 justify-center max-h-[6500px] overflow-y-scroll ">
			<OutdoorExtensionPackage v-for="pack in products" :pack="pack" />

		</ScrollArea>
		<div v-if="currentStage == 'Innenstation'" class="flex flex-wrap gap-1 justify-center  ">
			<IndoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
		<div v-if="currentStage == 'Zubehör'" class="flex flex-wrap gap-1 justify-center  ">
			<ZubehorCard v-for="product in products" :product="product" :key="product.id" />
			<slot/>
		</div>
	</section>
</template>

<script setup>
import ZubehorCard from '@/components/SimpleConfigurator/Zubehör/ZubehorCard.vue';
import IndoorProduct from './IndoorProduct.vue';
import OutdoorProduct from './OutdoorProduct.vue';
import OutdoorExtensionPackage from './OutdoorExtensionPackageComponents/OutdoorExtensionPackage.vue';

//stores

const currentStagestore = useCurrentStageStore()
const productStore = useSelectedProductsStore()
const {selectedProducts} = productStore
const showPackages = selectedProducts.indoorProducts.neededQuantity >= 24
const {currentStage} = storeToRefs(currentStagestore)
const props = defineProps(['products'])

</script>

<style></style>