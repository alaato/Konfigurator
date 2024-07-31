<template>
  <div class="embla__slide">
  <div class="haus-header flex justify-center my-2">
  <h2 class="text-2xl font-bold">Haus {{ houseindex + 1 }}</h2>
    <DeleteButton @click="handleDeleteHouse"></DeleteButton>
  </div>

  <div class="flex">
    <FloorsContainer :floors="house.floors"></FloorsContainer>
    <outdoorContainer :outdoor-stations="house.outdoorStations"></outdoorContainer>
  </div>
</div>

</template>

<script lang="ts" setup>
import DeleteButton from '../general/DeleteButton.vue';

import FloorsContainer from '@/components/detailedConfigurator/indoor/FloorsContainer.vue';
import outdoorContainer from '@/components/detailedConfigurator/outdoor/outdoorContainer.vue';

const props = defineProps(['houseindex', 'house'])
provide('houseIndex', props.houseindex)

const houseStore = useHousesStore()
const { deleteHouse } = houseStore

function handleDeleteHouse(){
  deleteHouse(props.houseindex)
}
</script>
<style></style>