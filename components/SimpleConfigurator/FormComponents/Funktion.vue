<template>
	<Card class="funktion-container grow">
		<CardHeader>
			<CardTitle>Funktion</CardTitle>
			<CardDescription>Wählen Sie aus, Audio oder Video</CardDescription>
		</CardHeader>
		<CardContent class="flex justify-center">
			<div class="w-max ">
				<input required class="peer opacity-0" type="radio" id="Audio" name="Funktion" v-model="funktion" value="Audio" />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950  peer-checked:font-bold peer-checked:text-white"
					for="Audio">Audio</label>
			</div>
			<div class="w-max">
				<input class="peer opacity-0" n type="radio" id="Video" name="Funktion" v-model="funktion" value="Video" />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950 peer-checked:font-bold peer-checked:text-white"
					for="Video">Video</label>
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
const funktion = defineModel()
</script>
