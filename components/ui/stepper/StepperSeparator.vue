<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import type { StepperSeparatorProps } from 'radix-vue'
import { StepperSeparator, useForwardProps } from 'radix-vue'

import { cn } from '@/lib/utils'

const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    v-bind="forwarded"
    :class="cn(
      'bg-neutral-300 dark:bg-neutral-800',
      // Disabled
      'group-data-[disabled]:bg-neutral-400 group-data-[disabled]:opacity-50 dark:group-data-[disabled]:bg-neutral-800',
      // Completed
      'group-data-[state=completed]:bg-neutral-900 dark:group-data-[state=completed]:bg-neutral-50',
      props.class,
    )"
  />
</template>
