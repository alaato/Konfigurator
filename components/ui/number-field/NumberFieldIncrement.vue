<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'radix-vue'
import { NumberFieldIncrement, useForwardProps } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
	<NumberFieldIncrement data-slot="increment" v-bind="forwarded"
		:class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20 rounded-lg p-3 bg-transparent text-2xl text-arapawa-950 dark:text-arapawa-600 hover:bg-arapawa-900 hover:text-white', props.class)">
		<slot>
			<Plus class="h-5 w-5" />
		</slot>
	</NumberFieldIncrement>
</template>
