<template>
	<div class="zubehör flex justify-center items-center flex-col gap-2">
		<SelectedProductsSideBarContainer />
		<div class="flex gap-1">
			<p v-if="(!umSchalterNeeded && doorOpener && products.length<=0)">Keine Zubehör verfügbar</p>
			<ProductGrid :products="products">
				<ZubehörCard v-if="umSchalterNeeded" :product="Umtauscher" />
				<ZubehörCard v-if="umSchalterNeeded" :product="doorOpener"/>

			</ProductGrid>
			</div>
		<div><Button class="mb-3 grow-0" @click="weiter"> weiter</Button></div>
	</div>
</template>

<script setup lang="ts">
import ZubehörCard from './RequiredCard.vue'
import zubehör from '@/data/Zubehoer.json'
import SelectedProductsSideBarContainer from '../general/SelectedProductsSideBarContainer.vue';
import funktionErweiterungen from '@/data/Funktionserweiterung.json'
import ProductGrid from '../general/ProductGrid.vue';
import {type DeviceData} from '@/utils/interfaces.js'
//const

const selectedProductsStore = useSelectedProductsStore()
const { selectedProducts, getAllSelectedProducts} = storeToRefs(selectedProductsStore)
const umSchalterNeeded = selectedProducts.value.outdoorProducts.neededQuantity > 1 ? true : false
const visitedStore = useVisitedStore()
const neededZube = 	getAllSelectedProducts.value.flatMap((product: DeviceData)=> {
	const ids = product.HatZubehoer?.map(elem => elem.id)
	return ids
})

const doorOpenerNeeded = umSchalterNeeded;

const Umtauscher: DeviceData = umSchalterNeeded ? funktionErweiterungen.find(product => product.MNR.includes("FVU1401-0400")) : null
const doorOpener: DeviceData = doorOpenerNeeded ? funktionErweiterungen.find(product => product.MNR.includes("FAA1200-0400")) : null
if(Umtauscher && selectedProducts.value.accessories.products.length == 0)
	selectedProductsStore.addAccessories({...Umtauscher, quantity: 1})
if(doorOpener && selectedProducts.value.accessories.products.length < 2)
	selectedProductsStore.addAccessories({...doorOpener, quantity: 1 })

const products = zubehör.filter((zubehör)=>neededZube.includes(zubehör.id))
console.log(products.length)
//functions
const gotoStage : Function = inject(`goToStage`)

function weiter() {
	gotoStage("Übersicht")

	if (!visitedStore.visited.includes("Übersicht"))
		visitedStore.visited.push("Übersicht")
}
</script>
