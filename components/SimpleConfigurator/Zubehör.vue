<template>
	<div class="zubehör flex justify-center items-center flex-col">
		<div><button class="mb-3 grow-0" @click="weiter"> weiter</button></div>
		<div class=" flex gap-1">
			<p v-if="!(umSchalterNeeded && doorOpener)">Keine Zubehör verfügbar</p>
			<ZubehörCard v-if="Umtauscher" :product="Umtauscher.node"></ZubehörCard>
			<ZubehörCard v-if="doorOpener" :product="doorOpener.node"></ZubehörCard>
		</div>
	</div>
</template>

<script setup>
import ZubehörCard from './ZubehörCard.vue';
import zubehör from '@/data/Zubehoer.json'
import funktionErweiterungen from '@/data/Funktionserweiterung.json'

//const
const selectedProductsStore = useSelectedProductsStore()
const { selectedProducts } = storeToRefs(selectedProductsStore)
const umSchalterNeeded = selectedProducts.value.outdoorProducts.neededQuantity > 1 ? true : false
const visitedStore = useVisitedStore()

const doorOpenerNeeded = umSchalterNeeded;

const Umtauscher = umSchalterNeeded ? funktionErweiterungen.data.getProductListing.edges.find(product => product.node.MNR.includes("FVU1401-0400")) : null
const doorOpener = doorOpenerNeeded ? funktionErweiterungen.data.getProductListing.edges.find(product => product.node.MNR.includes("FAA1200-0400")) : null
if(Umtauscher)
	selectedProductsStore.addAccessories(Umtauscher.node, 1)
if(doorOpener)
	selectedProductsStore.addAccessories(doorOpener.node, 1)
console.log(selectedProducts.value.outdoorProducts.neededQuantity > 1 ? true : false)

//functions
const gotoStage = inject(`goToStage`)

function weiter() {
	gotoStage("Übersicht")

	if (!visitedStore.visited.includes("Übersicht"))
		visitedStore.visited.push("Übersicht")
}
</script>
