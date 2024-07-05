<script setup lang="ts">
import { NumberFieldInput } from 'radix-vue'
import { cn } from '@/lib/utils'
</script>

<template>
  <NumberFieldInput data-slot="input" :class="cn('flex m-auto h-20 w-24 bg-slate-100 border border-neutral-200 py-2 text-3xl text-center ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2')" />
</template>
