<template>
  <Card class="floors-container">
    <CardContent>
      <div class="floors-action flex justify-start baseline w-full">
        <button class="my-5" @click="router.push('/')">back</button>
        <button id="increment-btn" @click="addFloor"
          class="flex justify-center m-5 items-center w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          +
        </button>
        <button id="increment-btn" @click="reset"
          class="flex  m-5 w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-6 h-6" />
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
  <button class="my-5" @click="router.push('/outdoor')">next</button>

</template>

<script setup>
import useFloorsStore from '../../stores/floors.js';
import Floor from './Floor';
import { RotateCcw } from 'lucide-vue-next';

const floorsStore = useFloorsStore();
const router = useRouter()
const { addFloor, addApartment, reset } = floorsStore;
const { floors } = storeToRefs(floorsStore);
</script>

<style></style>