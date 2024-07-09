<template>
  <Card class="floor-card flex justify-center items-center gap-2 p-2 m-3 border-2">
    <CardHeader>
      <CardTitle class="text-center"> Etage {{ floorNumber }}</CardTitle>
      <button
        class="flex justify-center m-5 items-center w-10 h-10 rounded-full text-white focus:outline-none  hover:bg-arapawa-900"
        @click="addApartment">+
      </button>
      <DeleteButton class="m-auto" :floorNumber="floorNumber" @click="deleteFloor"></DeleteButton>
    </CardHeader>
    <div ref="cardContent" class="flex apartment-container items-center gap-2 p-2 max-h-56 w-[500px] overflow-scroll">
      <Apartment  v-for="(apartment, index) in apartments" :floorNumber="floorNumber" :apartmentIndex="index" :apartment="apartment" :key="index"
        @selectStation="selectStation" />
    </div>
  </Card>
</template>

<script setup>
import Apartment from './Apartment.vue';
import { ref } from 'vue'
import DeleteButton from './DeleteButton.vue';
import useFloorsStore from '~/stores/floors';


const props = defineProps(['floorNumber', 'apartments'])
const emit = defineEmits(['addApartment', 'selectStation'])
const cardContent = ref(null);
console.log(props.apartments)
const floorsStore = useFloorsStore();
const {deleteFloor} = floorsStore;

function addApartment() {
  emit('addApartment', props.floorNumber);
  nextTick(() => {
    const newApartment = cardContent.value?.lastElementChild;
    if (newApartment) {
      newApartment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }})
}
function selectStation(apartmentId, station) {
  emit('selectStation', this.floorNumber, apartmentId, station);
}
</script>
