<template>
  <Card class="apartment-card shadow-transparent w-72 h-44 text-center">
    <CardHeader>
      <CardTitle>Aussenstation {{ index + 1 }}</CardTitle>
    </CardHeader>
    <CardContent class="apartment-actions flex justify-center items-center">
      <outdoorSelectModal  title="Aussenstation auswählen" trigger-text="Aussenstation auswählen"></outdoorSelectModal>
      <DeleteButton @click="handleDeleteOutdoorStation" />
      <DuplicateButton @click="handleDuplicateOutdoorStation" />
    </CardContent>
  </Card>

  <!-- <img :src="apartment.stationImage" alt="Selected Station" v-if="apartment.stationImage" /> -->
  <!-- <Button @click="selectStation">Innenstation auswählen</Button>
    <IndoorStationSelector v-if="showSelector" @stationSelected="stationSelected" /> -->

</template>

<script lang="ts" setup>
//imports
import DeleteButton from '../general/DeleteButton.vue';
import outdoorSelectModal from './OutdoorSelect.vue';
import DuplicateButton from '@/components/detailedConfigurator/general/DuplicateButton.vue'

//consts
const ProductStore = useSelectedProductsStore()
const { decrementOutdoorNeededQuantity, incrementOutdoorNeededQuantity } = ProductStore
const props = defineProps<{
  index: number
}>()
const houseStore = useHousesStore();
const { deleteOutdoorStation, duplicateOutdoorStation} = houseStore
const houseIndex: number = inject('houseIndex')

//funktions
function handleDeleteOutdoorStation() {
  decrementOutdoorNeededQuantity(1)
  deleteOutdoorStation(houseIndex, props.index)
}
function handleDuplicateOutdoorStation() {
  incrementOutdoorNeededQuantity(1)
  duplicateOutdoorStation(houseIndex, props.index)
}
</script>
