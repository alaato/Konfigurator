<template>
	<Card class="grow w-96">
	          <CardHeader>
	            <CardTitle>Innenstationen</CardTitle>
	            <CardDescription>Wählen Sie aus, wie viele Innenstationen</CardDescription>
	          </CardHeader>
	          <CardContent>
	            <NumberField v-model="numberIndoorStaions" :required="true" :default-value="1" :min="1" :max="100">
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

const numberIndoorStaions = defineModel({type: Number, default: 1})

</script>
