<template>
	<div class="zubehör flex justify-center items-center flex-col gap-2">
		<p v-if="(!umSchalterNeeded && doorOpener && products.length <= 0)">Keine Zubehör verfügbar</p>
		<ProductSelection :selectedProducts="selectedProducts.outdoorProducts" :products="products">
			<RequiredZubehörCard v-if="umSchalterNeeded" :product="Umtauscher" />
			<RequiredZubehörCard v-if="umSchalterNeeded" :product="doorOpener" />
		</ProductSelection>
	</div>
</template>

<script setup lang="ts">
import RequiredZubehörCard from './RequiredCard.vue'
import zubehörs from '@/data/Zubehoer.json'
import ProductSelection from '@/components/SimpleConfigurator/general/productCards/ProductSelectionGrid.vue';
import funktionErweiterungen from '@/data/Funktionserweiterung.json'
import { type DeviceData } from '~/utils/interfaces/interfaces.js'
//const

const selectedProductsStore = useSelectedProductsStore()
const { selectedProducts, getAllSelectedProducts } = storeToRefs(selectedProductsStore)
const umSchalterNeeded = selectedProducts.value.outdoorProducts.neededQuantity > 1 ? true : false
const neededZube = []
getAllSelectedProducts.value.forEach((product: DeviceData) => {
	product.HatZubehoer?.forEach((elem) => {
		const exists = neededZube.find(zube => zube.id == elem.id)
		const quantity = product.quantity;
		if (exists) exists.quantity += quantity
		else neededZube.push({ id: elem.id, quantity: quantity })
	})
})
const doorOpenerNeeded = umSchalterNeeded;
const Umtauscher: DeviceData = umSchalterNeeded ? funktionErweiterungen.find(product => product.MNR.includes("FVU1401-0400")) : null
const doorOpener: DeviceData = doorOpenerNeeded ? funktionErweiterungen.find(product => product.MNR.includes("FAA1200-0400")) : null

if (Umtauscher && selectedProducts.value.accessories.products.length == 0)
	selectedProductsStore.addAccessories({ ...Umtauscher, quantity: 1 })
if (doorOpener && selectedProducts.value.accessories.products.length < 2)
	selectedProductsStore.addAccessories({ ...doorOpener, quantity: selectedProducts.value.outdoorProducts.neededQuantity })

const products = [] as DeviceData[]
console.log(neededZube)
neededZube.forEach((zubehör) => {
	if (!zubehör.id) return
	const zube: DeviceData = zubehörs.find((zube) => zube.id == zubehör.id) as DeviceData
	if (!zube) return
	zube.quantity = zubehör.quantity || 0
	products.push(zube)
})
console.log(products)
</script>
