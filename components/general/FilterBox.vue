<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				{{ category }}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56 max-h-56 overflow-y-scroll">
			<DropdownMenuLabel>{{ category }}</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuRadioGroup v-model="model">
				<DropdownMenuRadioItem v-for="option in options" :key="option" :value="option">
					{{ option }}
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
<script lang="ts" setup>
import { ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const props = defineProps<{
	category: string;
	options: string[]
}>()
const model = defineModel()
watchEffect(() => {
	if (props.category == 'Color')
		console.log(model.value)
})
</script>