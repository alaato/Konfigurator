<template>
	<Card class="">
		<CardHeader class="m-0 pb-3">
			<CardTitle>Anzahl Adern</CardTitle>
			<CardDescription>Wählen Sie aus, wie viele Adern Ihr  </CardDescription>
		</CardHeader>
		<CardContent class="flex justify-center gap-1">
			<div class="w-max ">
				<input required class="w-0 h-0 peer opacity-0" type="radio" id="2" name="Adern" v-model="wiringCount" value=2 />
				<RadioInput text="2" />
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-0 h-0" type="radio" id="4" name="Adern" v-model="wiringCount" value=4 />
				<RadioInput text="4" />
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-0 h-0" type="radio" id="6" name="Adern" v-model="wiringCount" value=6 />
				<RadioInput text="6" />
			</div>
			<div class="w-max">
				<input class="peer opacity-0 w-0 h-0" type="radio" id="8" name="Adern" v-model="wiringCount" value=8 />
				<RadioInput text="8" />
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import RadioInput from './RadioInput.vue';

	const wiringCount = defineModel()
</script>
