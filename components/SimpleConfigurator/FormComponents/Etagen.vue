<template>
	<Card class="grow w-96">
	          <CardHeader>
	            <CardTitle>Etagen</CardTitle>
	            <CardDescription>Wählen Sie aus, wie viele Etagen</CardDescription>
	          </CardHeader>
	          <CardContent>
	            <NumberField v-model="numberFloors" :required="true" :default-value="1" :min="1" :max="100">
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

const numberFloors = defineModel()

</script>
