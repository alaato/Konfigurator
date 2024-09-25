<template>
  <h3>{{ title? title : 'Ihre Auswahl'}}</h3>
  <li class="flex justify-between items-center" v-for="product in products" :key="product.id">
    <div class="font-medium w-[200px] flex items-center gap-1 ">
      <NuxtImg :src="product?.FrontalAnsichtFrei?.assetThumb? `https://pim.tcsapps.de${product.FrontalAnsichtFrei.assetThumb}` : '/' + product.id" alt="Kein Bild vorhanden" width="30" height="30" class="object-scale-down" />
      {{ product?.MNR }}
    </div>
    <p>{{ product?.quantity }}</p>
    <div>{{ product?.PERIODE1 }}€</div>
    <Button @click="removeItem(product)" variant="ghost" size="icon" class="mt-2">
      <TrashIcon class="h-4 w-4" />
    </Button>

  </li>
</template>

<script setup>
import { TrashIcon, PlusIcon, MinusIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'
const props = defineProps(['products', 'max', 'title'])

const selectedProductsStore = useSelectedProductsStore()
const {removeIndoorProducts, removeOutdoorProducts, removeAccessories} = selectedProductsStore
function removeItem(product) {
  console.log("removing : ", product )
  if (props.title == 'Innenstationen') {
    
    removeIndoorProducts(product)
  } else if (props.title == 'Aussenstationen') {
    removeOutdoorProducts(product)
  }
  else if (props.title == 'Zubehör')
    removeAccessories(product)
}
</script>

<style></style>