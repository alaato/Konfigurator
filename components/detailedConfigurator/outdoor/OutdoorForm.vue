<template>
	<form class="flex flex-col gap-2 w-96" @submit.prevent="submitForm">
	    <NumberField v-model="numberButtons" id="anzahl-tasten" :default-value="1" :min="1">
	    <label for="anzahl-tasten">Anzahl Tasten :</label>
	    <NumberFieldContent>
	      <NumberFieldDecrement />
	      <NumberFieldInput/>
	      <NumberFieldIncrement />
	    </NumberFieldContent>
	  </NumberField>
	  <selectInput v-model="funktion" :place-holder="'Funktion auswählen'" class="funktion" :options="['Audio', 'Video']" />
	  <selectInput v-if="funktion == 'Video'" v-model="technologie" class="technologie" :place-holder="'Technologie auswählen'" :options="['TCS:BUS', 'Video-2-Draht']" />
	  <Button type="submit">sumbit</Button>
	  </form>
</template>

<script setup lang="ts">
import selectInput from './selectInput.vue'

const emit = defineEmits(['handleSubmit'])
const numberButtons = defineModel("numberButtons", {default: 1, })
const funktion = defineModel<string>("funktion")
const technologie = defineModel<string>("technologie")
function submitForm(){
  console.log(numberButtons.value, funktion.value, technologie.value)
  emit('handleSubmit')
}
</script>
