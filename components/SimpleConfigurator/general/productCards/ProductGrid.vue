<template>
	<section>
		<div v-if="currentStage == 'Aussenstation' && products.length > 0 || packs?.length > 0" class="flex flex-wrap gap-1 justify-center">
			<OutdoorProduct :class="showLast(index, products.length) ? 'order-1' : ''" v-for="(product, index) in products" :product="product"
				:key="product.id" />
			<OutdoorExtensionPackage v-for="pack in packs" :pack="pack" />
		</div>
		<div v-if="currentStage == 'Innenstation'" class="flex flex-wrap gap-1 justify-center  ">
			<IndoorProduct v-for="product in products" :product="product" :key="product.id" />
		</div>
		<div v-if="currentStage == 'Zubehör'" class="flex flex-wrap gap-1 justify-center  ">
			<slot />
			<ZubehorCard v-for="product in products" :product="product" :key="product.id" />
		</div>
	</section>
</template>

<script lang="ts" setup>
import ZubehorCard from '@/components/SimpleConfigurator/Zubehör/ZubehorCard.vue';
import IndoorProduct from './IndoorProduct.vue';
import OutdoorProduct from './OutdoorProduct.vue';
import OutdoorExtensionPackage from './OutdoorExtensionPackageComponents/OutdoorExtensionPackage.vue';
import { type DeviceData } from '@/utils/interfaces';
//stores

const currentStagestore = useCurrentStageStore()
const productStore = useSelectedProductsStore()
const { selectedProducts } = productStore
const { currentStage } = storeToRefs(currentStagestore)
const props = defineProps<{
	products: DeviceData[]
	packs: Pack<DeviceData>[]
}>()
console.log(props.packs)
function showLast(index: number, length: number){
	if(length % 2 == 1 && index == length - 1)
		return true

}
</script>

<style></style>