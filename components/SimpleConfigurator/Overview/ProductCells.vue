<template>
	<TableCell class="font-medium w-[200px]">
		<NuxtImg :src="imgsrc" alt="Kein Bild vorhanden" densities="x1 x2"
			class="object-scale-down w-10 max-h-[50px] mr-2" />
	</TableCell>
	<TableCell class="font-medium w-[200px]">
		<span>{{ product?.MNR }}</span>
	</TableCell>
	<TableCell>
		{{ product.KTXT }}
	</TableCell>
	<TableCell> {{ product.PREISKNZ ? product.PREISKNZ - 200 : "" }}</TableCell>

	<TableCell class="bg-transparent w-fit h-full" v-if="isPack">
		<div class="text-center flex justify-center items-center">
			<Edit class="h-5 w-5" />
			<input  min="1" type="number" class="w-5 text-center" v-model="packQuantity" />
		</div>
	</TableCell>
	<TableCell v-else class="text-center">{{ product.quantity ? product.quantity : 1 }}</TableCell>
	<TableCell>{{ !noPrice ? product?.PERIODE1 + "€" : "" }}</TableCell>
	<TableCell class="text-right">
		{{ noPrice ? "" : product?.PERIODE1 * product.quantity + "€" }}
	</TableCell>
</template>
<script setup lang="ts">
import { Edit } from 'lucide-vue-next'

import { type DeviceData } from '~/utils/interfaces/interfaces.js'
const props = defineProps<{
	product: DeviceData;
	noPrice?: boolean;
	isPack?: boolean
}>()
const selectedProductStore = useSelectedProductsStore()
const { editControlUnit, editIndoorProduct, editOutdoorProduct, editPaket } = selectedProductStore
const { selectedProducts } = storeToRefs(selectedProductStore)
const packQuantity = ref<number>(props.product.quantity)

const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb && `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}`

watch(packQuantity, () => {
	
	if (props.isPack && packQuantity.value > 0) {
		editPaket("quantity", packQuantity.value, null, 0)
		editControlUnit("quantity", packQuantity.value)
		editIndoorProduct("quantity", selectedProducts.value.indoorProducts.SelectedQuantity * packQuantity.value, null, 0)
		editOutdoorProduct("quantity", selectedProducts.value.outdoorProducts.SelectedQuantity * packQuantity.value, null, 0)
	}
})
</script>