<template>

  <Dialog>
    <DialogTrigger as-child>
      <Button class="bg-transparent text-black hover:bg-slate-100">{{ text }}</Button>
    </DialogTrigger>
    <DialogContent class="w-max sm:max-w-[960px] max-h-[90vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>

      <slot />

      <DialogFooter>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
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
const props = defineProps<{
  title: string,
  text: string,
}>()
</script>

<style></style>