<template>
	<div class="side-cart-mobile-bar flex justify-center gap-4 md:hidden">
		<SideCartModal />
		<Button :disabled="!canGo" v-if="currentStage === 'Zubehör'" class=" border border-white" @click="weiter">
			weiter
		</Button>
	</div>

	<aside class="side-cart hidden md:block sm:w-3/4 md:w-full">
		<Card class="overflow-hidden shadow-sm sm:rounded-lg sticky top-6">
			<div class="p-6">
				<h2 class="text-2xl font-semibold mb-4">Ihre Auswahl</h2>
				<ScrollArea class="flex-grow">
					<SideCardItemList />
				</ScrollArea>
				<Button :disabled="!canGo" v-if="currentStage === 'Zubehör'" class="ml-4 border border-white"
					@click="weiter"> weiter</Button>
			</div>
		</Card>
	</aside>
</template>

<script lang="ts" setup>
import SideCartModal from './SideCartModal.vue'
import SideCardItemList from './SideCardItemList.vue'
import StageTrackerMobile from '../stageTracker/stageTrackerMobile.vue';


// Mock data for demonstration

const selectedProductsStore = useSelectedProductsStore();
const currentStageStore = useCurrentStageStore();
const visitedStore = useVisitedStore()
const { currentStage } = storeToRefs(currentStageStore)
const { selectedProducts, getRemainingIndoorNeeded, getRemainingOutdoorNeeded } = storeToRefs(selectedProductsStore)

const gotoStage: Function = inject(`goToStage`)

const canGo = computed(() => {
	return (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0)
})

function weiter() {
	if (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0) {
		gotoStage("Übersicht")
		if (!visitedStore.visited.includes("Übersicht"))
			visitedStore.visited.push("Übersicht")
	}
}


</script>