<script setup lang="ts">
//imports
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Haus from './Haus.vue';
import emblaCarouselVue from 'embla-carousel-vue';

//consts
const router = useRouter()
const houseStore = useHousesStore()
const { houses } = storeToRefs(houseStore);
const { addHouse } = houseStore
const productStore = useSelectedProductsStore()

const EnoughProductsSelected = computed(() => {
  const enoughIndoor = productStore.selectedProducts.indoorProducts.neededQuantity - productStore.selectedProducts.indoorProducts.SelectedQuantity == 0;
  const enoughOutdoor = productStore.selectedProducts.outdoorProducts.neededQuantity - productStore.selectedProducts.outdoorProducts.SelectedQuantity == 0;
  return enoughIndoor && enoughOutdoor
})
const carouselContainerRef = ref<InstanceType<typeof Carousel> | null>(null)

function accessApi() {
  carouselContainerRef.value?.carouselApi.on('select', () => {})
}
if (houses.value.length === 0) {
  addHouse()
  productStore.incrementIndoorNeededQuantity(1)
  productStore.incrementOutdoorNeededQuantity(1)
}
function handleAddHuas() {
  addHouse()
  nextTick(() => {
    carouselContainerRef.value?.scrollNext()
  })

}

</script>

<template>
  <div class="haus-container min-w-[1280px] max-w-screen-xl h-[600px] 2xl:h-[720px] justify-end flex flex-col">
    
    <Carousel ref="carouselContainerRef" v-if="houses.length > 0" class="relative text-center ">
      <CarouselContent>
        <CarouselItem v-for="(house, index) in houses" :key="index">
          <Haus :house="house" :houseindex="index"></Haus>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="text-black" />
      <CarouselNext class="text-black" />
    </Carousel>
    <div class="haus-container-actions gap-1 flex my-2 justify-self-end">
      <Button :disabled="!EnoughProductsSelected" class=" hover:bg-arapawa-900">next</Button>
      <Button class="flex justify-center items-center text-white focus:outline-none hover:bg-arapawa-900"
        @click="handleAddHuas">+ Haus
      </Button>
    </div>

  </div>
</template>

<style scoped>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
