<template>
  <div :class="'haus' + index">
  <div class="haus-header flex justify-center my-2">
    <h2 class="text-2xl font-bold">Haus {{ index + 1 }}</h2>
    <DeleteButton @click="deleteHouse"></DeleteButton>
  </div>

  <div class="flex">
    <FloorsContainer :index="index" :floors="house.floors"></FloorsContainer>
    <outdoorContainer :index="index" :outdoor-stations="house.outdoorStations"></outdoorContainer>
  </div>
</div>
  <!-- <ResizablePanelGroup direction="horizontal">
    <ResizablePanel id="group-1-panel-1" :min-size="50"> -->
  <!-- </ResizablePanel>
    <ResizablePanel id="group-1-panel-2" :min-size="50"> -->
  <!-- </ResizablePanel>
  </ResizablePanelGroup> -->
</template>

<script lang="ts" setup>
import DeleteButton from '../general/DeleteButton.vue';

import FloorsContainer from '~/components/detailedConfigurator/indoor/FloorsContainer.vue';
import outdoorContainer from '~/components/detailedConfigurator/outdoor/outdoorContainer.vue';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
const props = defineProps(['index', 'house'])

provide('houseIndex', props.index)
const houseStore = useHousesStore()
const { deleteHouse } = houseStore
</script>
<style></style>