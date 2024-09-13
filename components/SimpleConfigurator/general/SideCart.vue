<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TrashIcon, MenuIcon, PlusIcon, MinusIcon } from 'lucide-vue-next';
import SideCartProductGroup from './SideCartProductGroup.vue';

const selectedProductsStore = useSelectedProductsStore();
const {getRemainingIndoorNeeded, getRemainingOutdoorNeeded, getAllSelectedProducts } = selectedProductsStore
const {selectedProducts} = storeToRefs(selectedProductsStore)

</script>

<template>
  <Sheet >
    <SheetTrigger class="flex items-center"><MenuIcon/></SheetTrigger>
    <SheetContent class="w-full">
      <SheetHeader>
        <SheetTitle>Ihre Stückliste</SheetTitle>
      </SheetHeader>
      <ScrollArea class="flex-grow">
          <div v-if="getAllSelectedProducts.length === 0" class="text-center text-muted-foreground mt-8">
            empty
          </div>
          <ul v-else class="space-y-4 p-4">

              <SideCartProductGroup title="Innenstationen" :products="selectedProducts.indoorProducts.products" :max="getRemainingIndoorNeeded" ></SideCartProductGroup>
              <SideCartProductGroup title="Aussenstationen":products="selectedProducts.outdoorProducts.products" :max="getRemainingOutdoorNeeded"></SideCartProductGroup>
              <SideCartProductGroup title="Zubehör" :products="selectedProducts.accessories.products" ></SideCartProductGroup>
          </ul>
        </ScrollArea>
    </SheetContent>
  </Sheet>
</template>