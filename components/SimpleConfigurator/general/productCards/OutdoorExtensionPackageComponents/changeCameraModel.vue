<template>
  <Dialog>
    <DialogTrigger asChild>
      <ReplaceIcon
        class="w-5 h-5 text-neutral-950 dark:text-white cursor-pointer transition-transform hover:scale-110 hover:text-black" />
    </DialogTrigger>
    <DialogContent class="max-w-7xl overflow-y-scroll">
      <DialogTitle>choose camera</DialogTitle>
      <DialogHeader class="max-w-7xl overflow-x-scroll">
        <div class="flex flex-wrap flex-col  lg:flex-row p-4 max-h-[500px]">
          <PackageProductCard v-for="product in products" :product="product" />
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { InfoIcon, ReplaceIcon } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import PackageProductCard from './PackageProductCard.vue';

const props = defineProps<{
  products: DeviceData[]
}>()
const emit = defineEmits(['setCamera'])
</script>
