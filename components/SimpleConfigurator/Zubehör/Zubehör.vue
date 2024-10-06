<template>
	<div class="zubehör flex justify-center items-center flex-col gap-2">
		<p v-if="(!umSchalterNeeded && doorOpener && products.length <= 0)">Keine Zubehör verfügbar</p>
		<ProductSelection :selectedProducts="selectedProducts.outdoorProducts" :products="products" >
			<ZubehörCard v-if="umSchalterNeeded" :product="Umtauscher" />
			<ZubehörCard v-if="umSchalterNeeded" :product="doorOpener" />
		</ProductSelection>
	</div>
</template>

<script setup lang="ts">
import ZubehörCard from './RequiredCard.vue'
import zubehörs from '@/data/Zubehoer.json'
import ProductSelection from '@/components/SimpleConfigurator/general/productCards/ProductSelectionGrid.vue';
import funktionErweiterungen from '@/data/Funktionserweiterung.json'
import { type DeviceData } from '@/utils/interfaces.js'
//const

const selectedProductsStore = useSelectedProductsStore()
const { selectedProducts, getAllSelectedProducts } = storeToRefs(selectedProductsStore)
const umSchalterNeeded = selectedProducts.value.outdoorProducts.neededQuantity > 1 ? true : false
const neededZube = getAllSelectedProducts.value.map((product: DeviceData) => {
	const ids = product.HatZubehoer?.map(elem => elem?.id)
	const quantity = product.quantity;
	return {ids, quantity}
})
const doorOpenerNeeded = umSchalterNeeded;
const Umtauscher: DeviceData = umSchalterNeeded ? funktionErweiterungen.find(product => product.MNR.includes("FVU1401-0400")) : null
const doorOpener: DeviceData = doorOpenerNeeded ? funktionErweiterungen.find(product => product.MNR.includes("FAA1200-0400")) : null

if (Umtauscher && selectedProducts.value.accessories.products.length == 0)
	selectedProductsStore.addAccessories({ ...Umtauscher, quantity: 1 })
if (doorOpener && selectedProducts.value.accessories.products.length < 2)
	selectedProductsStore.addAccessories({ ...doorOpener, quantity: selectedProducts.value.outdoorProducts.neededQuantity })

const products = []  as DeviceData[]
neededZube.forEach((zubehör) => {
	zubehör?.ids?.forEach((id) => {
		if(!id) return
		const zube : DeviceData = zubehörs.find((zubehörs) => zubehörs.id == id) as DeviceData
		zube.quantity = zubehör?.quantity
		products.push(zube)
	})
})
</script>
