<template>
  <Card class="apartment-card shadow-transparent h-44">
    <CardHeader>
      <CardTitle>Wohnung {{ apartmentIndex + 1 }}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="apartment-actions flex justify-center items-center">
      <ProductsModal title="Innenstation auswählen" trigger-text="Innenstation auswählen"></ProductsModal>
      <DeleteButton @click="handleDeleteApartment" :floorIndex="floorIndex" :apartmentIndex="apartmentIndex" />
      <DuplicateButton @click="handleDuplicateApartment" ></DuplicateButton>
    </CardContent>
  </Card>

  <!-- <img :src="apartment.stationImage" alt="Selected Station" v-if="apartment.stationImage" /> -->
  <!-- <button @click="selectStation">Innenstation auswählen</button>
    <IndoorStationSelector v-if="showSelector" @stationSelected="stationSelected" /> -->

</template>

<script lang="ts" setup>
import DeleteButton from '../general/DeleteButton.vue';
import {type Apartment} from '~/utils/interfaces'
import DuplicateButton from '../general/DuplicateButton.vue';
const props = defineProps<{
  apartment: Apartment,
  floorIndex: number,
  apartmentIndex: number,

}>()
import ProductsModal from '../general/ProductsModal.vue';

//consts 
const productStore = useSelectedProductsStore()
const houseStore = useHousesStore()
const { deleteApartment, duplicateApartment } = houseStore
const houseIndex : number = inject('houseIndex')

function handleDeleteApartment() {
  deleteApartment(houseIndex, props.floorIndex, props.apartmentIndex);
  productStore.decrementIndoorNeededQuantity(1)
}

function handleDuplicateApartment(){
duplicateApartment(houseIndex, props.floorIndex, props.apartmentIndex)
productStore.incrementIndoorNeededQuantity(1);
}
</script>
