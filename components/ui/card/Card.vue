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
        'rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-md',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
