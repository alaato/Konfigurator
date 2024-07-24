<template>
  <Card class="apartment-card shadow-transparent w-72 h-44 text-center">
    <CardHeader>
      <CardTitle>Aussenstation {{ index + 1 }}</CardTitle>
    </CardHeader>
    <CardContent class="apartment-actions flex justify-center items-center">
      <button class="bg-transparent text-black hover:bg-slate-100" @click="selectStation">Aussenstation auswählen</button>
      <DeleteButton @click="handleDeleteOutdoorStation"  />
    </CardContent>
  </Card>

  <!-- <img :src="apartment.stationImage" alt="Selected Station" v-if="apartment.stationImage" /> -->
  <!-- <button @click="selectStation">Innenstation auswählen</button>
    <IndoorStationSelector v-if="showSelector" @stationSelected="stationSelected" /> -->

</template>

<script lang="ts" setup>
import DeleteButton from '../indoor/DeleteButton.vue';
const ProductStore = useSelectedProductsStore()
const {decrementOutdoorNeededQuantity} = ProductStore
const props = defineProps<{
index : number
}>()
const houseStore = useHousesStore();
const {deleteOutdoorStation} = houseStore
const houseIndex : number = inject('houseIndex')

function handleDeleteOutdoorStation() {
  decrementOutdoorNeededQuantity(1)
  deleteOutdoorStation(houseIndex, props.index)
}
</script>
