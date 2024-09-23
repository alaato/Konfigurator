<template>
	<Card class="funktion-container">
		<CardHeader class="pb-0 mb-0">
			<CardTitle>Funktion</CardTitle>
			<CardDescription>Wählen Sie aus, Audio, Video oder Beide</CardDescription>
		</CardHeader>
		<CardContent class="flex justify-center">
			<div class="w-max">
				<input required class="peer opacity-0 w-1 h-1 p-0 m-0" type="radio" id="Audio" name="Funktion"
					v-model="funktion" value="Audio" />
				<RadioInput text="Audio" />
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-1 h-1 p-0 m-0" type="radio" id="Video" name="Funktion"
					v-model="funktion" value="Video" />
					<RadioInput text="Video" />
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-1 h-1 p-0 m-0" type="radio" id="Beide" name="Funktion"
					v-model="funktion" value="Beide" />
					<RadioInput text="Beide" />
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import RadioInput from './RadioInput.vue'
const funktion = defineModel()
</script>
