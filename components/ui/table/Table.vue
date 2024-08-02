<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  id?: HTMLAttributes['id']
}>()
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :id="props.id" :class="cn('w-full caption-top text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
