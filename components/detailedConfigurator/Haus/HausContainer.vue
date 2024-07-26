<script setup lang="ts">
//imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Haus from './Haus.vue';

//consts
const router = useRouter()
const houseStore = useHousesStore()
const { houses } = storeToRefs(houseStore);
const { addHouse } = houseStore
const productStore = useSelectedProductsStore()

const EnoughProductsSelected = computed(() => {
  const enoughIndoor = productStore.selectedProducts.indoorProducts.neededQuantity - productStore.selectedProducts.indoorProducts.SelectedQuantity == 0;
  const enoughOutdoor = productStore.selectedProducts.outdoorProducts.neededQuantity - productStore.selectedProducts.outdoorProducts.SelectedQuantity == 0;
  console.log(productStore.selectedProducts.indoorProducts.neededQuantity, productStore.selectedProducts.indoorProducts.SelectedQuantity)
  console.log(productStore.selectedProducts.outdoorProducts.neededQuantity, productStore.selectedProducts.outdoorProducts.SelectedQuantity)
  return enoughIndoor && enoughOutdoor
})

if (houses.value.length === 0) {
  addHouse()
  productStore.incrementIndoorNeededQuantity(1)
  productStore.incrementOutdoorNeededQuantity(1)
}
</script>

<template>
  <div class="haus-container min-w-[1280px] max-w-screen-xl h-[600px] 2xl:h-[720px] justify-end flex flex-col">

    <Carousel v-if="houses.length > 0" class="relative text-center ">
      <CarouselContent>
        <CarouselItem v-for="(house, index) in houses" :key="index">
          <Haus :house="house" :houseindex="index"></Haus>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="text-black" />
      <CarouselNext class="text-black" />
    </Carousel>

    <div class="haus-container-actions gap-1 flex my-2 justify-self-end">
      <button :disabled="!EnoughProductsSelected" class=" hover:bg-arapawa-900">next</button>
      <button class="flex justify-center items-center text-white focus:outline-none hover:bg-arapawa-900"
        @click="addHouse">+ Haus
      </button>
    </div>

  </div>
</template>