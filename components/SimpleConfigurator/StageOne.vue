<template>
  <div class="my-10 max-w-[960px] bg-slate-50">
    <form  ref="form" @submit.prevent="submitConfig" class="flex text-center flex-col justify-center content-center">
      <Card class="number-of-apartments flex justify-center">
        <!-- <Etagen v-model="numberFloors" />
        <Wohnungen v-model="numberApartments" /> -->
        <IndoorStationInput v-model="numberIndoorStation" />
        <OutdoorStationInput v-model="numberOutdoorStation" />
      </Card>
      <div class="funktion-and-technologie-container">
        <Funktion v-model="funktion" />

        <Technologie :funktion="funktion" v-model="technologie" />

      </div>
      <button class=" bg-arapawa-950 text-white text-center hover:bg-arapawa-900 min-w-1/2" type="submit">
        bestätigen
      </button>
    </form>
  </div>
</template>


<script lang="ts" setup>

//imports and props
const { stages } = defineProps(['stages'])
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSelectedProductsStore } from '~/stores/products';
import IndoorStationInput from './FormComponents/IndoorStationInput.vue';
import OutdoorStationInput from './FormComponents/OutdoorStationInput.vue';
import Etagen from './FormComponents/Etagen.vue'
import Wohnungen from './FormComponents/Wohnungen.vue'
import Funktion from './FormComponents/Funktion.vue'
import Technologie from './FormComponents/Technologie.vue'
// variables
const numberApartments = useState("numberApartments", () => 1);
const numberFloors = useState("numberFloors", () => 1);
const funktion = ref("");
const technologie = ref("");
const funktionRef = ref<InstanceType<typeof HTMLDivElement> | null>(null);
const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
const numberIndoorStation = useState("numberIndoorStation", () => 1);
const numberOutdoorStation = useState("numberOutdoorStation", () => 1);

// stores
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore()
const { setNeededProductsQuantity, resetAllProducts } = selectedProductsStore
const {filter} = storeToRefs(selectedProductsStore)

// functions
const goToStage: Function = inject('goToStage')
const submitConfig = async () => {
  // alert(`${numberOutdoorStation.value} + ${numberIndoorStation.value} + ${funktion.value} + ${technologie.value} `)
  const totalApartments = numberApartments.value * numberFloors.value
  setNeededProductsQuantity(numberIndoorStation.value, numberOutdoorStation.value)
  filter.value.funktion = funktion.value
  funktion.value == "Video"? filter.value.Video = true : filter.value.Video = false;
  if(technologie.value == "Video-6-Draht" && funktion.value == "Video")
    filter.value.technologie = "TCS:BUS"  
  else
    filter.value.technologie = "Video-2-Draht"

  resetAllProducts();
  goToStage(stages[1])
  if (!visitedStore.visited.includes(stages[1]))
    visitedStore.visited.push(stages[1])
};

watchEffect(() => {
  console.log(funktionRef.value)
  if(funktionRef.value)
    form.value.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
