<template>
  <div class="my-10 max-w-[960px] bg-slate-50">
    <form  ref="form" @submit.prevent="submitConfig" class="flex text-center flex-col justify-center content-center">
      <Card class="number-of-apartments flex justify-center">
        <Etagen v-model="numberFloors" />
        <Wohnungen v-model="numberApartments" />
        <!-- <IndoorStationInput v-model="numberIndoorStation" /> -->
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
import {Card} from '@/components/ui/card'
import { useSelectedProductsStore } from '~/stores/products';
import IndoorStationInput from '@/components/SimpleConfigurator/FormComponents/IndoorStationInput.vue';
import OutdoorStationInput from '@/components/SimpleConfigurator/FormComponents/OutdoorStationInput.vue';
import Etagen from '@/components/SimpleConfigurator/FormComponents/Etagen.vue'
import Wohnungen from '@/components/SimpleConfigurator/FormComponents/Wohnungen.vue'
import Funktion from '@/components/SimpleConfigurator/FormComponents/Funktion.vue'
import Technologie from '@/components/SimpleConfigurator/FormComponents/Technologie.vue'

// variables
const numberApartments = useState("numberApartments", () => 1);
const numberFloors = useState("numberFloors", () => 1);
const funktion = ref("");
const technologie = ref("");
const numberIndoorStation = useState("numberIndoorStation", () => 1);
const numberOutdoorStation = useState("numberOutdoorStation", () => 1);
const router = useRouter()

// stores
const selectedProductsStore = useSelectedProductsStore()
const { setNeededProductsQuantity, resetAllProducts } = selectedProductsStore
const houseStore = useHousesStore()
const {initilizeAll} = houseStore

// functions
const goToStage: Function = inject('goToStage')
const submitConfig = async () => {
  // alert(`${numberOutdoorStation.value} + ${numberIndoorStation.value} + ${funktion.value} + ${technologie.value} `)
  // const totalApartments = numberApartments.value * numberFloors.value
  setNeededProductsQuantity(numberIndoorStation.value, numberOutdoorStation.value)
  initilizeAll(numberFloors.value, numberApartments.value, numberOutdoorStation.value);
  selectedProductsStore.incrementIndoorNeededQuantity((numberApartments.value * numberFloors.value))
  selectedProductsStore.incrementIndoorNeededQuantity(numberOutdoorStation.value)
  resetAllProducts();
  router.push('/test')
};

</script>

<style src="@/styles/StageOne.css">
/* CSS */
</style>
