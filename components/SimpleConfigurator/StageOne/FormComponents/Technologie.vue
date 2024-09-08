<template>
	<Card class="grow">
	          <CardHeader class="pb-3">
	            <CardTitle>Tech</CardTitle>
	            <CardDescription>Wählen Sie aus, 6 oder 2</CardDescription>
	          </CardHeader>
	          <CardContent class="flex justify-center">
	            <div ref="funktionRef" class="w-max">
	              <input class="peer opacity-0 w-0 h-0" required type="radio" id="Video-6-Draht" name="Technologie" v-model="technologie"
	                value="Video-6-Draht" />
					<RadioInput text="Video-6-Draht" />
	            </div>
	            <div class="w-max">
	              <input class="peer opacity-0 w-0 h-0 " type="radio" id="Video-2-Draht" name="Technologie" v-model="technologie"
	                value="Video-2-Draht" />
					<RadioInput text="Video-2-Draht" />
	            </div>
	          </CardContent>
			  <CardFooter>
				<p v-if=" technologie == 'Video-2-Draht'">keine verdrillten Leitungen *</p>
			  </CardFooter>
	        </Card>
</template>

<script setup lang="ts">
import RadioInput from './RadioInput.vue'

const technologie = defineModel({ type: String })
</script>
