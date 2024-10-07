<template>
  <h3>{{ title? title : 'Ihre Auswahl'}} <span>{{max && (selectedQuantity + " / " + max )}}</span> </h3>
  <li class="flex justify-between items-center gap-1" v-for="product in products" :key="product.id">
    <div class="font-medium w-[200px] flex items-center gap-1 ">
      <NuxtImg :src="product?.FrontalAnsichtFrei?.assetThumb? `https://pim.tcsapps.de${product.FrontalAnsichtFrei.assetThumb}` : '/' + product.id" alt="Kein Bild vorhanden" width="30" height="30" class="object-scale-down" />
      {{ product?.MNR }}
    </div>
    <p>{{ product?.quantity }}X</p>
    <div>{{ product?.PERIODE1 }}€</div>
    <Button @click="removeItem(product)" variant="ghost" size="icon">
      <TrashIcon class="h-4 w-4" />
    </Button>

  </li>
</template>

<script setup>
import { TrashIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
const props = defineProps(['products', 'max', 'title', 'selectedQuantity'])

const selectedProductsStore = useSelectedProductsStore()
const {removeIndoorProducts, removeOutdoorProducts, removeAccessories, removeExtension} = selectedProductsStore
function removeItem(product) {
  
  if (props.title == 'Innenstationen') {
    removeIndoorProducts(product)
  } else if (props.title == 'Aussenstationen') {
    removeOutdoorProducts(product)
  }
  else if (props.title == 'Zubehör')
    removeAccessories(product)
  else if (props.title == 'Erweiterungen')
    removeExtension(product)
}
</script>

<style></style>