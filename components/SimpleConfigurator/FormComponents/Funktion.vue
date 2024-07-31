<template>
	<Card class="funktion-container ">
		<CardHeader class="pb-0 mb-0">
			<CardTitle>Funktion</CardTitle>
			<CardDescription>Wählen Sie aus, Audio oder Video</CardDescription>
		</CardHeader>
		<CardContent class="flex justify-center">
			<div class="w-max">
				<input required class="peer opacity-0 w-1 h-1 p-0 m-0" type="radio" id="Audio" name="Funktion" v-model="funktion" value="Audio" />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950 m-0 p-1  peer-checked:font-bold peer-checked:text-white"
					for="Audio">Audio</label>
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-1 h-1 p-0 m-0" n type="radio" id="Video" name="Funktion" v-model="funktion" value="Video" />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950 m-0 p-1 peer-checked:font-bold peer-checked:text-white"
					for="Video">Video</label>
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
const funktion = defineModel()
</script>
