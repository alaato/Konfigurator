<template>
  <Card class="Outdoor-container w-1/2 h-[500px] 2xl:h-[600px]">
    <CardContent class="p-3 pt-0">
      <div class="container-action flex justify-start">
        <Button id="increment-btn" @click="add"
          class="flex justify-center my-5 mx-1 items-center  w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900 text-xl">
          +
        </Button>
        <Button id="increment-btn" @click="reset"
          class="flex justify-center items-center my-5 mx-1 w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-5 h-5" />
        </Button>
      </div>
      <div class="flex m-auto gap-1 content-start overflow-y-auto w-full h-[400px] 2xl:h-[500px] flex-wrap">
        <OutdoorStation v-for="(station, index) in outdoorStations" :index="index" :key="index">
        </OutdoorStation>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts"  setup>
//imports
import { RotateCcw } from 'lucide-vue-next';
import OutdoorStation from './OutdoorStation.vue';

// consts
const props = defineProps({
  outdoorStations: Array,
})

const productStore = useSelectedProductsStore()
const HousesStore = useHousesStore()
const { addOutdoorStation, resetOutdoors} = HousesStore
const {incrementOutdoorNeededQuantity, resetOutdoorNeededQuantity} = productStore
const houseIndex : number = inject('houseIndex');

//funktions
function add() {
  addOutdoorStation(houseIndex, {})
  incrementOutdoorNeededQuantity(1)
}

function reset() {
  resetOutdoorNeededQuantity()
  resetOutdoors(houseIndex)
}
</script>

<style></style>