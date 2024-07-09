<template>
	<Button
	        class="p-1 h-max rounded-full w-max focus:outline-none bg-white "
	        @click="emitDelete">
	        <Trash2 color="red"/>
	</Button>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
const emit = defineEmits(['click'])
const props = defineProps({
	floorNumber: { type: Number, required: true },
	apartmentIndex: { type: Number, required: false },
})
const emitDelete = () => {
	if(props.apartmentIndex)
		emit('click', props.floorNumber, props.apartmentIndex)
	else
		emit('click', props.floorNumber)

}
</script>


