<template>
	<TableCell class="font-medium w-[200px]">
		<NuxtImg :src="imgsrc" alt="Kein Bild vorhanden" densities="x1 x2"
			class="object-scale-down w-10 max-h-[50px] mr-2" />
		<span>{{ product?.MNR }}</span>
	</TableCell>
	<TableCell>
		{{ product.KTXT }}
	</TableCell>
	<TableCell class="bg-transparent w-fit text-center" v-if="isPack">
		<input class="w-5 text-center" v-model="packQuantity">
		</input>
	</TableCell>
	<TableCell v-else class="text-center">{{ product.quantity ? product.quantity : 1 }}</TableCell>
	<TableCell>{{ !noPrice ? product?.PERIODE1 + "€" : "" }}</TableCell>
	<TableCell class="text-right">
		{{ noPrice ? "" : product?.PERIODE1 * product.quantity + "€" }}
	</TableCell>
</template>
<script setup lang="ts">
import { type DeviceData } from '@/utils/interfaces.js'
const props = defineProps<{
	product: DeviceData;
	noPrice?: boolean;
	isPack?: boolean
}>()
const selectedProductStore = useSelectedProductsStore()
const { editControlUnit, editIndoorProduct, editOutdoorProduct } = selectedProductStore
const { selectedProducts } = storeToRefs(selectedProductStore)
const packQuantity = ref<number>(1)

console.log(props.product.quantity)
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb && `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}`

watch(packQuantity, () => {
	console.log(packQuantity.value)
	if (props.isPack) {
		props.product.quantity = packQuantity.value
		editControlUnit("quantity", packQuantity.value)
		editIndoorProduct("quantity", selectedProducts.value.indoorProducts.SelectedQuantity * packQuantity.value)
		editOutdoorProduct("quantity", selectedProducts.value.outdoorProducts.SelectedQuantity * packQuantity.value)
	}
})
</script>