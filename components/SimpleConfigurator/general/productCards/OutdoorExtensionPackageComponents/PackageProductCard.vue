<template>
  <Card class="text-left rounded-lg shadow-lg overflow-hidden w-80 h-96 max-w-sm">
    <div class="bg-white relative top-0">
      <div class="flex justify-between p-1">
        <ProductInformation :product="productRef"></ProductInformation>
        <slot />
      </div>
      <NuxtImg ref="ProductImage" :src="imgsrc" @error="onImgError" alt="Product Image"
        class="w-full h-44 object-scale-down" />
    </div>
    <div @click="replaceCamera(product)" class="px-4 py-2 flex flex-col">
      <h3 class="text-xl font-bold mb-2"> Serie: {{ productRef?.parent?.MNR.slice(0, 20) }}</h3>
      <h3 class=" MNR text-l font-bold mb-2">Article : {{ productRef?.MNR }}</h3>
      <h3 class=" MNR text-l font-bold mb-2">Preis : {{ productRef?.PERIODE1}}€</h3>
    </div>
    <CardFooter>
      <Button @Click="replaceCamera(productRef)" v-if="props.camera">auswaehlen</Button>
    </CardFooter>
  </Card>
</template>

<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue';
import ProductInformation from '@/components/general/ProductInformation.vue';

// variables
const props = defineProps<{
  product: DeviceData
  camera?: boolean
}>()
const productRef = ref<DeviceData>(props.product)
const productImage = useTemplateRef<HTMLImageElement>('ProductImage')
const imgsrc = computed(() => productRef?.value.FrontalAnsichtFrei?.assetThumb ? `https://pim.tcsapps.de${productRef.value.FrontalAnsichtFrei.assetThumb}` : "/ProductImages" + productRef.value.id)
const onImgError = () => {
  productImage.value.src = '/' + props.product.id
}
const replaceCamera : Function = inject(`replaceCamera`)
watchEffect(() => {
  productRef.value = props.product
})
</script>