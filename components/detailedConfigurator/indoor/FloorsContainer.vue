<template>
  <Card class="floors-container w-1/2 h-[500px] 2xl:h-[600px]">
    <CardContent>
      <div class="floors-action flex justify-start baseline w-full">
        <Button class="my-5 mx-1" @click="router.push('/')">back</Button>
        <Button id="increment-btn" @click="add"
          class="flex justify-center my-5 mx-1 items-center  w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900 text-xl">
          +
        </Button>
        <Button id="increment-btn" @click="reset"
          class="flex justify-center items-center my-5 mx-1 w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-5 h-5" />
        </Button>
      </div>
      <div class="top-0 overflow-scroll h-[400px] 2xl:h-[500px] p-2">
        <div class="flex flex-col-reverse">
          <Floor v-for="(floor, index) in floors" :key="index" :floorIndex="index" :apartments="floor.apartments"/>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
//imports
import { RotateCcw } from 'lucide-vue-next';
import type { Floor as FloorType } from '@/utils/interfaces';
import Floor from './Floor.vue';

//consts
const productStore = useSelectedProductsStore()
const props = defineProps<{
  floors: FloorType[]
}>()
const houseStore = useHousesStore()
const router = useRouter()
const { addFloor, resetFloors } = houseStore
const houseIndex : number = inject('houseIndex')

//functions
function reset() {
  resetFloors(houseIndex)
  productStore.resetIndoorNeededQuantity()
}

function add() {
  addFloor(houseIndex)
  productStore.incrementIndoorNeededQuantity(1)
}
</script>

<style></style>