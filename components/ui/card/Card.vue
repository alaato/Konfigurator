<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border border-neutral-200 bg-white text-neutral-950 dark:rounded-none dark:bg-black dark:text-blue-50 dark:border-slate-800  shadow-md shadow-inherit',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
