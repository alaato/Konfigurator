<template>
  <div class="">
    <form @submit.prevent="submitConfig" class="my-5 flex gap-5 text-center flex-col justify-center content-center">
      <Card>
        <CardHeader>
          <CardTitle>Etagen</CardTitle>
          <CardDescription>Wählen Sie aus, wie viele Etagen</CardDescription>
        </CardHeader>
        <CardContent>
          <NumberField v-model="numberFloors" :required="true" :default-value="1" :min="0" :max="100">
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wohnungen</CardTitle>
          <CardDescription>Wählen Sie aus, wie viele Wohnungen pro Etage</CardDescription>
        </CardHeader>
        <CardContent>
          <NumberField v-model="numberApartments" :required="true" :default-value="1" :min="0" :max="100">
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </CardContent>

      </Card>
      <div>
        <button class="grow text-center hover:bg-arapawa-900 w-1/2" type="submit">Submit</button>
      </div>
      <!-- 
      <fieldset class="flex gap-1 flex-wrap justify-center content-center text-xl">
        <legend class="my-2">Funktion:</legend>
        <div class="w-max ">
          <input class="peer hidden" type="radio" id="Audio" name="Funktion" v-model="funktion" value="Audio" />
          <label
            class="button-80 text-center peer-checked:bg-blue-950  peer-checked:font-bold peer-checked:text-white"
            for="Audio">Audio</label>
        </div>
        <div class="w-max">
          <input class="peer hidden" n type="radio" id="Video" name="Funktion" v-model="funktion" value="Video" />
          <label
            class="button-80 w-full text-center peer-checked:bg-blue-950 peer-checked:font-bold peer-checked:text-white"
            for="Video">Video</label>
        </div>
      </fieldset>

      <fieldset class="flex gap-1 -flex-wrap justify-center content-center text-xl" v-if="funktion == 'Video'">
        <legend class="my-2">Technologie:</legend>
        <div class="w-max">
          <input class="peer hidden" n type="radio" id="Video-6-Draht" name="Technologie" v-model="technologie"
            value="Video-6-Draht" />
          <label
            class="button-80 w-full text-center peer-checked:bg-blue-950 arapawa-950 peer-checked:font-bold peer-checked:text-white"
            for="Video-6-Draht">Video-6-Draht</label>
        </div>
        <div class="w-max">
          <input class="peer hidden" n type="radio" id="Video-2-Draht" name="Technologie" v-model="technologie"
            value="Video-2-Draht" />
          <label
            class="button-80 w-full text-center peer-checked:bg-blue-950 blue-950 peer-checked:font-bold peer-checked:text-white "
            for="Video-2-Draht">Video-2-Draht</label>
        </div>
      </fieldset class="flex gap-1 flex-wrap justify-center content-center "> -->

    </form>
  </div>
</template>

<script setup>
//imports and props
const { stages } = defineProps(['stages'])
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// variables
const numberApartments = useState("numberApartments", ()=> 1);
const numberFloors = useState("numberFloors", ()=> 1);
// const funktion = ref("");
// const technologie = ref("");
// stores
const visitedStore = useVisitedStore();
console.log(stages)
// functions
const goToStage = inject('goToStage')
const submitConfig = async () => {
  alert(`${numberApartments.value} + ${numberFloors.value} `)
  goToStage(stages[1])
  if (!visitedStore.visited.includes(stages[1]))
    visitedStore.visited.push(stages[1])
};
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
