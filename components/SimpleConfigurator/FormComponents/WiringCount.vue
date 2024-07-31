<template>
	<Card class="">
		<CardHeader class="m-0 pb-3">
			<CardTitle>Anzahl Adern</CardTitle>
			<CardDescription>Wählen Sie aus, wie veile Adern </CardDescription>
		</CardHeader>
		<CardContent class="flex justify-center">
			<div class="w-max ">
				<input required class="w-0 h-0 peer opacity-0" type="radio" id="2" name="Adern" v-model="wiringCount" value=2 />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950  peer-checked:font-bold peer-checked:text-white"
					for="2">2</label>
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-0 h-0" type="radio" id="6" name="Adern" v-model="wiringCount" value=6 />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950 peer-checked:font-bold peer-checked:text-white"
					for="6">6</label>
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-0 h-0" type="radio" id="8" name="Adern" v-model="wiringCount" value=8 />
				<label
					class="button-80 w-full text-center peer-checked:bg-arapawa-950 peer-checked:font-bold peer-checked:text-white"
					for="8">8</label>
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
const wiringCount = defineModel()
</script>
