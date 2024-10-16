<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				{{ category }}
				<ChevronDown/>
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
const filterStore = useFilterStore()
if(props.category == 'Anzahl Tasten')
	model.value = filterStore.filter.anzahlTasten
watchEffect(() => {
	if (props.category == 'Anzahl Tasten')
		filterStore.setAnzahl(model.value as number)
})
</script>