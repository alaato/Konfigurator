<template>

    <Card class="floor-card flex items-center gap-2 p-1 m-3 border-2">
    <CardHeader>
      <CardTitle class="text-center"> Etage {{ floorIndex + 1 }}</CardTitle>
      <div class="card-action flex gap-1 justify-center items-center">
        <Button :disabled="enoughApartments == true"
          class="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none  hover:bg-arapawa-900"
          @click="handleAddAparmtent">+
        </Button>
        <DuplicateButton @click="handleDuplicateFloor"></DuplicateButton>
        <DeleteButton class="m-auto" @click="handleFloorDelete"></DeleteButton>
      </div>
    </CardHeader>
    <div ref="cardContent" class="flex apartment-container items-center gap-2 p-2 max-h-56 sm:w-96 sm:flex-wrap lg:flex-nowrap overflow-scroll">
      <Apartment v-for="(apartment, index) in floor.apartments" :floorIndex="floorIndex" :apartmentIndex="index"
        :apartment="apartment" :key="index" />
    </div>
    <div class="overflow-y-auto border-l h-44">
      <Button v-if="floor.outdoorStations.length == 0" :disabled="enoughApartments == true"
          class="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none  hover:bg-arapawa-900"
          @click="handleAddOutdoorStation">+
        </Button>
      <FloorOutdoorStation v-for="(outdoorStation, index) in floor.outdoorStations" :key="index" :index="index" :floorIndex="floorIndex" :outdoorStation = "outdoorStation"/>
  </div>
  </Card>

</template>

<script lang="ts" setup>
import Apartment from './Apartment.vue';
import { ref } from 'vue'
import DeleteButton from '../general/DeleteButton.vue';
import DuplicateButton from '../general/DuplicateButton.vue';
import FloorOutdoorStation from '../outdoor/FloorOutdoorStation.vue';
import { type Floor } from '@/utils/interfaces';
const props = defineProps<{
  floorIndex: number,
  floor: Floor
}>()
const emit = defineEmits(['addApartment', 'deleteFloor'])
const cardContent = ref(null);
let enoughApartments = computed(() => {
  return props.floor?.apartments?.length >= 10
})
const houseIndex: number = inject('houseIndex');
const houseStore = useHousesStore()
const productStore = useSelectedProductsStore()
const { addApartment, deleteFloor, duplicateFloor, addFloorOutdoorStation } = houseStore


function handleAddAparmtent() {
  addApartment(houseIndex, props.floorIndex)
  productStore.incrementIndoorNeededQuantity(houseStore.houses[houseIndex].floors.length)
  nextTick(() => {
    const newApartment = cardContent.value?.lastElementChild;
    if (newApartment) {
      newApartment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  })
}
function handleAddOutdoorStation() {
  addFloorOutdoorStation(houseIndex, props.floorIndex, {})
}
function handleFloorDelete() {
  deleteFloor(houseIndex, props.floorIndex)
  productStore.decrementIndoorNeededQuantity(1)
}

function handleDuplicateFloor(){
  duplicateFloor(houseIndex, props.floorIndex)
}

console.log(props.floor)
</script>
