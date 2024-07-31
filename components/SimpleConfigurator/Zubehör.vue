<template>
	<div class="zubehör min-w-96">
		<button class="mb-3" @click="weiter"> weiter</button>

		<ZubehörCard v-if="doorOpenerNeeded && data " :product="data?.getProductListing?.edges[0]?.node"></ZubehörCard>
	      </div>
</template>

<script setup >
import ZubehörCard from './ZubehörCard.vue';

const gotoStage = inject(`goToStage`)
 
function  weiter() {
  gotoStage("Übersicht")

  if (!visitedStore.visited.includes("Übersicht"))
  visitedStore.visited.push("Übersicht")
}
</script>
