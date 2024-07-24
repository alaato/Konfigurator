<template>
  <Card class="apartment-card shadow-transparent h-44">
    <CardHeader>
      <CardTitle>Wohnung {{ apartmentIndex + 1 }}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="apartment-actions flex justify-center items-center">
      <button class="bg-transparent text-black  hover:bg-slate-100">Innenstation auswählen</button>
      <DeleteButton @click="HandleDeleteApartment" :floorIndex="floorIndex" :apartmentIndex="apartmentIndex" />

    </CardContent>
  </Card>

  <!-- <img :src="apartment.stationImage" alt="Selected Station" v-if="apartment.stationImage" /> -->
  <!-- <button @click="selectStation">Innenstation auswählen</button>
    <IndoorStationSelector v-if="showSelector" @stationSelected="stationSelected" /> -->

</template>

<script lang="ts" setup>
import DeleteButton from './DeleteButton.vue'
import {type Apartment} from '~/utils/interfaces'
const props = defineProps<{
  apartment: Apartment,
  floorIndex: number,
  apartmentIndex: number,

}>()

const productStore = useSelectedProductsStore()

const houseStore = useHousesStore()
const { deleteApartment, deleteIndoorStation } = houseStore
const houseIndex : number = inject('houseIndex')

function HandleDeleteApartment() {
  deleteApartment(houseIndex, props.floorIndex, props.apartmentIndex);
  productStore.decrementIndoorNeededQuantity(1)
}
</script>
