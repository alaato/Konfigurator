<template>
  <div class="my-10 max-w-[960px] bg-slate-50">
    <form ref="form" @submit.prevent="submitConfig" class="flex text-center flex-col justify-center content-center">
      <WiringCount v-model="wiringCount"></WiringCount>
      
      <Card class="number-of-apartments flex justify-center">
        <IndoorStationInput v-model="numberIndoorStation" />
        <OutdoorStationInput v-model="numberOutdoorStation" />
      </Card>
      
      <div class="funktion-and-technologie-container">
        <Funktion v-model="funktion" />
        <Technologie v-if="funktion == 'Video' && numberIndoorStation <= 24 && wiringCount > 4" v-model="technologie" />
      </div>
      
      <Button class=" bg-arapawa-950 text-white text-center hover:bg-arapawa-900 min-w-1/2" type="submit">
        bestätigen
      </Button>
    
    </form>
  </div>
</template>


<script lang="ts" setup>
//imports and props
const { stages } = defineProps(['stages'])
import { Card } from '@/components/ui/card'
import { useSelectedProductsStore } from '~/stores/products';
import IndoorStationInput from './FormComponents/IndoorStationInput.vue';
import OutdoorStationInput from './FormComponents/OutdoorStationInput.vue';
import Funktion from './FormComponents/Funktion.vue'
import Technologie from './FormComponents/Technologie.vue'
import steuer from '@/data/steuer.json'
import WiringCount from './FormComponents/WiringCount.vue';

// variables
const funktion = defineModel<string>("funktion")
const technologie = defineModel<string>("technologie")
const funktionRef = ref<InstanceType<typeof HTMLDivElement> | null>(null);
const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
const numberIndoorStation = useState("numberIndoorStation", () => 1);
const numberOutdoorStation = useState("numberOutdoorStation", () => 1);
const wiringCount = ref(2);

// stores
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore()
const { setNeededProductsQuantity, resetAllProducts } = selectedProductsStore
const { filter} = storeToRefs(selectedProductsStore)

// functions
const goToStage: Function = inject('goToStage')

function setFilter() {

  filter.value.funktion = funktion.value
  funktion.value == "Video" ? filter.value.Video = true : filter.value.Video = null;
  
  if ((technologie.value == "Video-6-Draht" && funktion.value == "Video") || numberIndoorStation.value > 24 ){
    filter.value.technologie = "TCS:BUS"
  }
  else
    filter.value.technologie = "Video-2-Draht"
}

function setControlUnit() {
  let mnr: string;
  if (filter.value.funktion == "Audio") mnr = "BVS20-SG"
  else if (filter.value.technologie == "Video-2-Draht") mnr = "NVV1000-0400"
  else if (filter.value.technologie == "TCS:BUS") mnr =  "NBV2600-0400"

  const {node} = steuer.data.getProductListing.edges.find(product => product.node.MNR == mnr)
  selectedProductsStore.addControlUnit(node)
}

const submitConfig = async () => {
  setNeededProductsQuantity(numberIndoorStation.value, numberOutdoorStation.value)
  setFilter()
  resetAllProducts();
  setControlUnit()
  goToStage(stages[1])
  if (!visitedStore.visited.includes(stages[1]))
    visitedStore.visited.push(stages[1])
};

watchEffect(() => {
  console.log(funktionRef.value)
  if (funktionRef.value)
    form.value.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
