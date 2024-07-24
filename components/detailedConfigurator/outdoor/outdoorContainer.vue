<template>
  <Card class="Outdoor-container w-1/2 h-[500px] 2xl:h-[600px]">
    <CardContent>
      <div class="floors-action flex justify-start">
        <button id="increment-btn" @click="add"
          class="flex justify-center my-5 mx-1 items-center  w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900 text-xl">
          +
        </button>
        <button id="increment-btn" @click="reset"
          class="flex justify-center items-center my-5 mx-1 w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-5 h-5" />
        </button>
      </div>
      <div class="flex content-start overflow-y-auto w-full h-[400px] 2xl:h-[500px] flex-wrap">
        <OutdoorStation v-for="(station, index) in outdoorStations" :index="index" :key="index">
        </OutdoorStation>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { RotateCcw } from 'lucide-vue-next';
import OutdoorStation from './OutdoorStation.vue';
// consts
const props = defineProps({
  outdoorStations: Array,
  index: Number,
})

const productStore = useSelectedProductsStore()
const { selectedProducts } = storeToRefs(productStore);
const { outdoorProducts } = selectedProducts.value

const HousesStore = useHousesStore()
const { addOutdoorStation, resetOutdoors} = HousesStore
const {houses} = storeToRefs(HousesStore)

//funktions
function add() {
  addOutdoorStation(props.index, {})
  productStore.incrementOutdoorNeededQuantity(1)
}

function reset() {
  productStore.resetOutdoorNeededQuantity()
  resetOutdoors(props.index)
}
</script>

<style></style>