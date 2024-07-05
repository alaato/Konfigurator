<template>
  <Card class="floors-container">
    <CardContent>
      <div class="floors-action flex baseline">
        <button class="my-5" @click="router.back">back</button>
        <button id="increment-btn" @click="addFloor"
          class="flex justify-center m-5 items-center w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          +
        </button>
      </div>
      <div class=" top-0 overflow-scroll max-h-[600px] p-2">
        <div class="flex flex-col-reverse">
          <Floor v-for="(floor, index) in floors" :key="index" :floorNumber="index + 1" :apartments="floor.apartments"
            @addApartment="addApartment" @selectStation="selectStation" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import useFloorsStore from '../../store/floors.js';
import Floor from './Floor';
const floorsStore = useFloorsStore();
const router = useRouter()
const { addFloor, addApartment } = floorsStore;
const { floors } = storeToRefs(floorsStore);
</script>

<style></style>