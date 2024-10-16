<template>
  <Dialog>
    <DialogTrigger asChild>
      <ReplaceIcon
        class="w-5 h-5 text-neutral-950 dark:text-white cursor-pointer transition-transform hover:scale-110 hover:text-black" />
    </DialogTrigger>
    <DialogContent class="max-w-7xl overflow-y-scroll">
      <DialogTitle>choose camera</DialogTitle>
      <DialogHeader class="max-w-7xl overflow-x-scroll">
        <DialogClose class="flex flex-wrap flex-col gap-4 lg:flex-row justify-center p-4 max-h-[500px]">
            <PackageProductCard v-for="product in products" :camera="true":product="product" />
        </DialogClose>
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
  DialogClose
} from '@/components/ui/dialog'
import PackageProductCard from './PackageProductCard.vue';

const props = defineProps<{
  products: DeviceData[]
}>()


</script>
