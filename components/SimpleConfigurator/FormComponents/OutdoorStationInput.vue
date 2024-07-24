<template>
	<Card class="grow w-96">
	          <CardHeader>
	            <CardTitle>Aussenstationen</CardTitle>
	            <CardDescription>Wählen Sie aus, wie viele Aussenstationen</CardDescription>
	          </CardHeader>
	          <CardContent>
	            <NumberField v-model="numberOutdoorStaions" :required="true" :default-value="1" :min="1" :max="100">
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

const numberOutdoorStaions = defineModel()

</script>
