<template>
  <Dialog>
    <DialogTrigger as-child>
      <button class="bg-transparent text-black hover:bg-slate-100">{{ triggerText }}</button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">

      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>
      
      <slot />
      <ProductGrid v-if="products && products.length" :products="products"></ProductGrid>

      <DialogFooter>
      </DialogFooter>

    </DialogContent>
  </Dialog>

</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import ProductGrid from '~/components/SimpleConfigurator/ProductGrid.vue';
const props = defineProps<{
  title: string,
  triggerText: string,
  products?: []
}>()
</script>

<style></style>