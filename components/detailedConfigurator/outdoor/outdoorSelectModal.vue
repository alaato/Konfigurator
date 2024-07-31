<template>
<ProductsModal :numberButtons="numberButtons" :products="products" title="Aussenstation auswählen" trigger-text="Aussenstation auswählen">
  <OutdoorForm :handleSubmit="handleSubmit" :funktion="funktion" :technologie="technologie" :numberButtons="numberButtons" :submitForm="submitForm" />
</ProductsModal>
</template>

<script lang="ts" setup>
import ProductsModal from '../general/ProductsModal.vue';
import OutdoorForm from './OutdoorForm.vue'
import fetchOutdoorStations from '~/qraphql/outdoorQuery';
//consts
const numberButtons = defineModel("numberBUttons", {default: 1})
const funktion = defineModel("funktion")
const technologie = defineModel("technologie")
interface FilterOptions {
  [key: string]: any
}

let anzahlTasten = numberButtons.value < 10 ? `_0${numberButtons.value}` : `_____${numberButtons.value}`
const FilterOptions: FilterOptions = {
	Aussenstation: true,
	MNR :  {"$like" :`%${anzahlTasten}%`}
}
if(funktion.value == "Video"){
	FilterOptions.Kommunikationstechnologie4164 = technologie.value
  FilterOptions.Video2 = true
}

const variables = {
	filter: JSON.stringify(FilterOptions),
	first: 30,
};
let products
const {result: data, loading} = fetchOutdoorStations(variables)

watchEffect(() => {
  console.log(products)
})
</script>

<style>

</style>