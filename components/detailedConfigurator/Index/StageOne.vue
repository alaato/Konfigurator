<template>
  <div class="my-10 max-w-[960px] bg-slate-50">
    <form @submit.prevent="submitConfig" class="flex text-center flex-col justify-center content-center">
      <Card class="number-of-apartments flex justify-center">
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
      </Card>
      <div class="funktion-and-technologie-container">
      <Card class="funktion-container grow">
        <CardHeader>
          <CardTitle>Funktion</CardTitle>
          <CardDescription>Wählen Sie aus, Audio oder Video</CardDescription>
        </CardHeader>
        <CardContent class="flex justify-center">
          <div class="w-max ">
            <input class="peer hidden" type="radio" id="Audio" name="Funktion" v-model="funktion" value="Audio" />
            <label
              class="button-80 text-center peer-checked:bg-arapawa-950  peer-checked:font-bold peer-checked:text-white"
              for="Audio">Audio</label>
          </div>
          <div class="w-max">
            <input class="peer hidden" n type="radio" id="Video" name="Funktion" v-model="funktion" value="Video" />
            <label
              class="button-80 w-full text-center peer-checked:bg-arapawa-950 peer-checked:font-bold peer-checked:text-white"
              for="Video">Video</label>
          </div>
        </CardContent>
      </Card>

      <Card class="grow" v-if="funktion == 'Video'">
        <CardHeader>
          <CardTitle>Tech</CardTitle>
          <CardDescription>Wählen Sie aus, 6 oder 2</CardDescription>
        </CardHeader>
        <CardContent class="flex justify-center">
          <div class="w-max">
            <input class="peer hidden" n type="radio" id="Video-6-Draht" name="Technologie" v-model="technologie"
              value="Video-6-Draht" />
            <label
              class="button-80 w-full text-center peer-checked:bg-arapawa-950 peer-checked:font-bold peer-checked:text-white"
              for="Video-6-Draht">Video-6-Draht</label>
          </div>
          <div class="w-max">
            <input class="peer hidden" n type="radio" id="Video-2-Draht" name="Technologie" v-model="technologie"
              value="Video-2-Draht" />
            <label
              class="button-80 w-full text-center peer-checked:bg-arapawa-950 peer-checked:font-bold peer-checked:text-white "
              for="Video-2-Draht">Video-2-Draht</label>
          </div>
        </CardContent>
      </Card>

      </div>
      <button class=" bg-arapawa-950 text-white text-center hover:bg-arapawa-900 min-w-1/2"
          type="submit">nächste
        </button>
    </form>
  </div>
</template>

<script setup>

//imports and props
const { stages } = defineProps(['stages'])
import useFloorsStore from '~/stores/floors';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// variables
const router = useRouter()
const numberApartments = useState("numberApartments", () => 1);
const numberFloors = useState("numberFloors", () => 1);
const funktion = useState("funktion", () => 1);
const technologie = useState("technologie", () => 1);
const visitedStore = useVisitedStore();
const FloorStore = useFloorsStore();
const { initilizeFloorsAndApartments } = FloorStore

// functions
const submitConfig = async () => {
  // alert(`${numberApartments.value} + ${numberFloors.value} `)
  // addFloors(numberFloors.value);
  initilizeFloorsAndApartments(numberFloors.value, numberApartments.value);
  const { floors } = storeToRefs(FloorStore);
  console.log(floors.value);
  router.push("/indoorStations")
};
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
