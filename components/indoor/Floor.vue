<template>
  <Card class="floor-card flex justify-center items-center gap-2 p-2 m-3 border-2">
    <CardHeader>
      <CardTitle> Etage {{ floorNumber }}</CardTitle>
      <button
        class="flex justify-center m-5 items-center w-10 h-10 rounded-full text-white focus:outline-none  hover:bg-arapawa-900"
        @click="addApartment">+</button>
    </CardHeader>
    <div ref="cardContent" class="flex apartment-container p-0 items-center gap-2 px-2 max-h-56 w-[500px] overflow-scroll">
      <Apartment  v-for="apartment in apartments" :apartment="apartment" :key="apartment.id"
        @selectStation="selectStation" />
    </div>
  </Card>
</template>

<script setup>
import Apartment from './Apartment.vue';
import { ref, onMounted } from 'vue'



const props = defineProps(['floorNumber', 'apartments'])
const emit = defineEmits(['addApartment', 'selectStation'])
const cardContent = ref(null);

onMounted(() => console.log(cardContent.value))

function addApartment() {
  emit('addApartment', props.floorNumber);
  nextTick(() => {
    const newApartment = cardContent.value?.lastElementChild;
    if (newApartment) {
      newApartment.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }})
}
function selectStation(apartmentId, station) {
  emit('selectStation', this.floorNumber, apartmentId, station);
}
</script>
