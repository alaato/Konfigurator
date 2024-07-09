<template>
  <Card class="apartment-card shadow-transparent h-44">
    <CardHeader>
      <CardTitle>Wohnung {{ apartmentIndex + 1 }}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="apartment-actions flex justify-center items-center">
      <button class="bg-transparent text-black hover:border-black" @click="selectStation">Innenstation auswählen</button>
      <DeleteButton @click="deleteApartment" :floorNumber="floorNumber" :apartmentIndex="apartmentIndex" />

    </CardContent>
  </Card>

  <!-- <img :src="apartment.stationImage" alt="Selected Station" v-if="apartment.stationImage" /> -->
  <!-- <button @click="selectStation">Innenstation auswählen</button>
    <IndoorStationSelector v-if="showSelector" @stationSelected="stationSelected" /> -->

</template>

<script setup>
import { ref } from 'vue'
import IndoorStationSelector from './IndoorStationSelector.vue';
import useFloorsStore from '~/stores/floors';
import DeleteButton from './DeleteButton.vue'

const props = defineProps({
  apartment: {
    type: Object,
    required: true
  },
  floorNumber: Number,
  apartmentIndex: Number
})

const floorsStore = useFloorsStore();
const { deleteApartment } = floorsStore;
const showSelector = ref(false)

const selectStation = () => {
  showSelector.value = true
}

const stationSelected = (station) => {
  showSelector.value = false
  emit('selectStation', props.apartment.id, station)
}

</script>
