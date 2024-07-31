<template>
	<form class="flex flex-col gap-2" @submit.prevent="submitForm">
	    <NumberField v-model="numberButtons" id="anzahl-tasten" :default-value="1" :min="1">
	    <Label for="anzahl-tasten">Anzahl Tasten :</Label>
	    <NumberFieldContent>
	      <NumberFieldDecrement />
	      <NumberFieldInput/>
	      <NumberFieldIncrement />
	    </NumberFieldContent>
	  </NumberField>
	  <selectInput v-model="funktion" :place-holder="'Funktion auswählen'" class="funktion" :options="['Audio', 'Video']" />
	  <selectInput v-if="funktion == 'Video'" v-model="technologie" class="technologie" :place-holder="'Technologie auswählen'" :options="['TCS:BUS', 'Video-2-Draht']" />
	  <button>sumbit</button>
	  </form>
</template>

<script setup lang="ts">
import selectInput from './selectInput.vue'

const emit = defineEmits(['handleSubmit'])
const numberButtons = defineModel("numberButtons", {default: 1})
const funktion = defineModel("funktion")
const technologie = defineModel("technologie")
function submitForm(){
  console.log(numberButtons.value, funktion.value, technologie.value)
  emit('handleSubmit')
}
</script>
