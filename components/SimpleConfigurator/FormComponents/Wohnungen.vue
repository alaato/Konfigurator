<template>
	<Card class="grow w-96">
	          <CardHeader>
	            <CardTitle>Wohnungen</CardTitle>
	            <CardDescription>Wählen Sie aus, wie viele Wohnungen pro Etage</CardDescription>
	          </CardHeader>
	          <CardContent>
	            <NumberField v-model="numberApartments" :required="true" :default-value="1" :min="1" :max="100">
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
const numberApartments = defineModel({type: Number, default: 1})
</script>
