<template>
	<Card class="w-96">
			<CardHeader class="h-1/2">
				<CardTitle>{{title}}</CardTitle>
				<CardDescription> {{description? description :  `Wählen Sie aus, wie viele ${title}` }}</CardDescription>
			</CardHeader>
			<CardContent>
				<NumberField class="h-1/2" v-model="number" :required="true" :default-value="1" :min="min==0? min: 1" :max="max? max : 100">
					<NumberFieldContent>
						<NumberFieldDecrement />
						<NumberFieldInput />
						<NumberFieldIncrement />
					</NumberFieldContent>
				</NumberField>
			</CardContent>
		</Card>
</template>

<script setup lang="ts">
defineProps<{ 
	title: string;
	description?: string
	max?: number
	min?: number
}>()
const number = defineModel({type: Number, default: 1})
</script>
