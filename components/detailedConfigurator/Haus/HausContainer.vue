<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Haus from './Haus.vue';
const router = useRouter()

const houseStore = useHousesStore()

const { houses } = storeToRefs(houseStore);
const { addHouse } = houseStore
console.log(houses.value)
</script>

<template>
  <div class="haus-container min-w-[1280px] max-w-screen-xl h-[700px] justify-end flex flex-col">

    <Carousel v-if="houses.length > 0" class="relative text-center ">
      <CarouselContent >
        <CarouselItem v-for="(house, index) in houses" :key="index">
          <Haus :house="house" :index="index"></Haus>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div class="haus-container-actions gap-1 flex my-2 justify-self-end">
      <button class=" hover:bg-arapawa-900">next</button>
      <button class="flex justify-center items-center text-white focus:outline-none hover:bg-arapawa-900"
        @click="addHouse">+ Haus
      </button>
    </div>

  </div>
</template>