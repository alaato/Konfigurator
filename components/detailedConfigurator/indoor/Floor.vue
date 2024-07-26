<template>
  <Card class="floor-card flex justify-center items-center gap-2 p-1 m-3 border-2">
    <CardHeader>
      <CardTitle class="text-center"> Etage {{ floorIndex + 1 }}</CardTitle>
      <div class="card-action flex gap-1 justify-center items-center">
        <button :disabled="enoughApartments == true"
          class="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none  hover:bg-arapawa-900"
          @click="handleAddAparmtent">+
        </button>
        <DuplicateButton @click="handleDuplicateFloor"></DuplicateButton>
        <DeleteButton class="m-auto" @click="handleFloorDelete"></DeleteButton>
      </div>

    </CardHeader>
    <div ref="cardContent" class="flex apartment-container items-center gap-2 p-2 max-h-56 w-[900px] overflow-scroll">
      <Apartment v-for="(apartment, index) in apartments" :floorIndex="floorIndex" :apartmentIndex="index"
        :apartment="apartment" :key="index" />
    </div>
  </Card>
</template>

<script lang="ts" setup>
import Apartment from './Apartment.vue';
import { ref } from 'vue'
import DeleteButton from '../general/DeleteButton.vue';
import DuplicateButton from '../general/DuplicateButton.vue';

const props = defineProps(['floorIndex', 'apartments'])
const emit = defineEmits(['addApartment', 'deleteFloor'])
const cardContent = ref(null);
let enoughApartments = computed(() => {
  return props.apartments.length >= 10
})
const houseIndex: number = inject('houseIndex');
const houseStore = useHousesStore()
const productStore = useSelectedProductsStore()
const { addApartment, deleteFloor, duplicateFloor } = houseStore
// const floorsStore = useFloorsStore();
// const {deleteFloor} = floorsStore;

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
watchEffect(()=>{
    const newApartment = cardContent.value?.lastElementChild;
    if (newApartment) {
      newApartment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
})
function handleFloorDelete() {
  deleteFloor(houseIndex, props.floorIndex)
  productStore.decrementIndoorNeededQuantity(1)
}

function handleDuplicateFloor(){
  duplicateFloor(houseIndex, props.floorIndex)
}
</script>
