<template>
  <Card class="apartment-card shadow-transparent w-[302px] px-6 h-44 text-center">
    
    <CardHeader>
      <CardTitle>Etage Aussenstation {{ index + 1 }}</CardTitle>
    </CardHeader>

    <CardContent class="apartment-actions flex justify-center items-center">
      <OutdoorSelectModal :outdoor-station="outdoorStation" />
      <DuplicateButton @click="handleDuplicateOutdoorStation" />
      <DeleteButton @click="handleDeleteOutdoorStation" />
    </CardContent>
    
  </Card>
</template>

<script lang="ts" setup>
//imports
import DeleteButton from '../general/DeleteButton.vue';
import OutdoorSelectModal from './OutdoorSelect.vue';
import DuplicateButton from '@/components/detailedConfigurator/general/DuplicateButton.vue'

//consts
const ProductStore = useSelectedProductsStore()
const { decrementOutdoorNeededQuantity, incrementOutdoorNeededQuantity } = ProductStore
const props = defineProps<{
  index: number
  outdoorStation?: Station
  floorIndex?: number
}>()
const houseStore = useHousesStore();
const { deleteFloorOutdoorStation, duplicateFloorOutdoorStation} = houseStore
const houseIndex: number = inject('houseIndex')

//funktions
function handleDeleteOutdoorStation() {
  decrementOutdoorNeededQuantity(1)
  deleteFloorOutdoorStation(houseIndex,props.floorIndex, props.index)
}
function handleDuplicateOutdoorStation() {
  incrementOutdoorNeededQuantity(1)
  duplicateFloorOutdoorStation(houseIndex,props.floorIndex, props.index)
}
</script>
