<template>
	<Button class="p-1 h-max rounded-full w-max focus:outline-none hover:bg-transparent bg-transparent" @click="emitDelete">
		<Trash2 color="red" />
	</Button>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next';
const emit = defineEmits(['click'])
const props = defineProps({
	floorIndex: { type: Number, required: false },
	apartmentIndex: { type: Number, required: false },
	product: { type: Object, required: false },
})
const emitDelete = () => {
	emit('click');
}
</script>
