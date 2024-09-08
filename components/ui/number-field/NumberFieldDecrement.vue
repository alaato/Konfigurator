<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'radix-vue'
import { NumberFieldDecrement, useForwardProps } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { Minus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
	<NumberFieldDecrement data-slot="decrement" v-bind="forwarded"
		:class="cn('absolute top-1/2 -translate-y-1/2 left-0  p-3 disabled:cursor-not-allowed disabled:opacity-20 bg-transparent text-red-600 hover:text-white hover:bg-red-600 dark:text-red-500', props.class)">
		<slot>
			<Minus class="h-4 w-4" />
		</slot>
	</NumberFieldDecrement>
</template>
