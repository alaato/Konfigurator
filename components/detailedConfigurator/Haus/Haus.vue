<template>
  <div class="embla__slide">
  <div class="haus-header flex justify-center my-2">
  <h2 class="text-2xl font-bold">Haus {{ houseindex + 1 }}</h2>
    <DeleteButton @click="handleDeleteHouse"></DeleteButton>
  </div>
  <Tabs default-value="Innen" >
    <TabsList>
      <TabsTrigger value="Innen">
        Innen
      </TabsTrigger>
      <TabsTrigger value="Aussen">
        Aussen
      </TabsTrigger>
    </TabsList>
    <TabsContent value="Innen">
      <FloorsContainer :floors="house.floors"></FloorsContainer>
    </TabsContent>
    <TabsContent value="Aussen">
    <OutdoorContainer :outdoor-stations="house.outdoorStations"></OutdoorContainer>
  </TabsContent>
  </Tabs>
</div>

</template>

<script lang="ts" setup>
import DeleteButton from '../general/DeleteButton.vue';

import FloorsContainer from '@/components/detailedConfigurator/indoor/FloorsContainer.vue';
import OutdoorContainer from '@/components/detailedConfigurator/outdoor/OutdoorContainer.vue';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
const props = defineProps(['houseindex', 'house'])
provide('houseIndex', props.houseindex)

const houseStore = useHousesStore()
const { deleteHouse } = houseStore

function handleDeleteHouse(){
  deleteHouse(props.houseindex)
}
</script>
<style></style>