<template>
  <div class="my-10 max-w-[960px] h-full">
    <form  ref="form" @submit.prevent="submitConfig"
     class="gap-1 flex text-center flex-col content-center items-center justify-center">
      <div class="number-of-apartments flex flex-wrap justify-center gap-1 bg-transparent">
        <NumberInputBox title="Etage" v-model="numberFloors" />
        <NumberInputBox title="Wohnungen pro Etage" v-model="numberApartments" />
        <NumberInputBox title ="Aussenstationen pro Etage" :min="0" v-model="numberOutdoorStationFloor" />
        <NumberInputBox title ="Aussenstationen" v-model="numberOutdoorStation" />
      </div>
      <!-- <div class="funktion-and-technologie-container flex flex-col gap-1 bg-transparent">
        <Funktion v-model="funktion" />
        <Technologie :funktion="funktion" v-model="technologie" />
      </div> -->
      <Button class="bg-arapawa-950 grow mt-5 text-white text-center hover:bg-arapawa-900" type="submit">
        bestätigen
      </Button>
    </form>
  </div>
</template>


<script lang="ts" setup>

//imports and props
import { useSelectedProductsStore } from '@/stores/products';
import steuer from '@/data/steuer.json'
import NumberInputBox from '@/components/SimpleConfigurator/StageOne/FormComponents/NumberInputBox.vue'


// variables
const numberApartments = useState("numberApartments", () => 1);
const numberFloors = useState("numberFloors", () => 1);
const numberOutdoorStation = useState("numberOutdoorStation", () => 1);
const numberOutdoorStationFloor = useState("numberOutdoorStationFloor", () => 1);
const router = useRouter()

// stores
const selectedProductsStore = useSelectedProductsStore()
const { setNeededProductsQuantity, resetAllProducts, addControlUnit } = selectedProductsStore
const houseStore = useHousesStore()
const { initilizeAll } = houseStore
const { filter } = storeToRefs(selectedProductsStore)

// functions
const submitConfig = async () => {
	initilizeAll(numberFloors.value, numberApartments.value, numberOutdoorStation.value, numberOutdoorStationFloor.value);
	resetAllProducts();
	router.push('/test')
};

</script>

<style src="@/styles/StageOne.css">
/* CSS */
</style>
