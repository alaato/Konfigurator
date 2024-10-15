<template>
	<div class="my-2 max-w-[960px]">
		<form ref="form" @submit.prevent="submitConfig" class="flex text-center flex-col justify-center content-center">
			<!-- <WiringCount v-model="wiringCount"></WiringCount> -->

			<div class="number-of-apartments flex justify-center my-1 gap-1 flex-col md:flex-row">
				<IndoorStationInput v-model="numberIndoorStation" />
				<OutdoorStationInput v-model="numberOutdoorStation" />
			</div>

			<div class="funktion-and-technologie-container gap-1">
				<Funktion v-model="funktion" />
				<Technologie v-if="funktion == 'Video' || funktion == 'Beide'" v-model="technologie"
					:number-outdoor-stations="numberOutdoorStation" :numeber-indoor-stations="numberIndoorStation" />
			</div>

			<Button class="bg-arapawa-950 justify-center text-white hover:bg-arapawa-800 min-w-1/2 my-1" type="submit">
				bestätigen
			</Button>

		</form>
	</div>
</template>


<script lang="ts" setup>
//imports and props
const { stages } = defineProps(['stages'])
import { useSelectedProductsStore } from '@/stores/products';
import IndoorStationInput from './FormComponents/IndoorStationInput.vue';
import OutdoorStationInput from './FormComponents/OutdoorStationInput.vue';
import Funktion from './FormComponents/Funktion.vue'
import Technologie from './FormComponents/Technologie.vue'

// variables
const funktion = defineModel<string>("funktion")
const technologie = defineModel<string>("technologie")
const funktionRef = ref<InstanceType<typeof HTMLDivElement> | null>(null);
const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
const numberIndoorStation = useState("numberIndoorStation", () => 1);
const numberOutdoorStation = useState("numberOutdoorStation", () => 1);


// stores
const visitedStore = useVisitedStore();
const filterStore = useFilterStore();
const selectedProductsStore = useSelectedProductsStore();
const { setNeededProductsQuantity, resetAllProducts, addControlUnit } = selectedProductsStore
const { filter } = storeToRefs(filterStore)
import { setFilter, setControlUnit } from '@/utils/ConfiguratorUtils/RequirementsUtils'
import { useFilterStore } from '~/stores/filter';
// functions
const goToStage: Function = inject('goToStage')

const submitConfig = async () => {
	if (numberOutdoorStation.value > 4) numberOutdoorStation.value = 4
	setNeededProductsQuantity(numberIndoorStation.value, numberOutdoorStation.value)
	setFilter(filter.value, funktion.value, technologie.value, numberIndoorStation.value)
	resetAllProducts();
	setControlUnit(filter.value, addControlUnit)
	visitedStore.resetVisited()
	if (!visitedStore.visited.includes(stages[1]))
		visitedStore.visited.push(stages[1])
	goToStage(stages[1])
};

watchEffect(() => {
	if (funktionRef.value)
		form.value.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})
</script>

<style>
/* CSS */
</style>
