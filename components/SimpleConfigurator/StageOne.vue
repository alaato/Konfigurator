<template>
  <div class="my-10 max-w-[960px] bg-slate-50">
    <form  ref="form" @submit.prevent="submitConfig" class="flex text-center flex-col justify-center content-center">
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
            <div ref="funktionRef" class="w-max">
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
      <button class=" bg-arapawa-950 text-white text-center hover:bg-arapawa-900 min-w-1/2" type="submit">
        bestätigen
      </button>
    </form>
  </div>
</template>


<script lang="ts" setup>
//imports and props
const { stages } = defineProps(['stages'])
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSelectedProductsStore } from '~/stores/products';

// variables
const numberApartments = useState("numberApartments", () => 1);
const numberFloors = useState("numberFloors", () => 1);
const funktion = ref("");
const technologie = ref(null);
const funktionRef = ref<InstanceType<typeof HTMLDivElement> | null>(null);
const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
watchEffect(() => {
  console.log(funktionRef.value)
  if(funktionRef.value)
    form.value.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})

// stores
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore()
const { setNeededProductsQuantity, resetAllProducts } = selectedProductsStore
const {filter} = storeToRefs(selectedProductsStore)
// functions
const goToStage: Function = inject('goToStage')
const submitConfig = async () => {
  const totalApartments = numberApartments.value * numberFloors.value
  setNeededProductsQuantity(totalApartments, 1)
  filter.value.funktion = funktion.value
  funktion.value == "Video"? filter.value.Video = true : filter.value.Video = false;
  if(technologie.value == "Video-6-Draht" && funktion.value == "Video")
    filter.value.technologie = "TCS:BUS"  
  else
    filter.value.technologie = "Video-2-Draht"

  resetAllProducts();
  goToStage(stages[1])
  if (!visitedStore.visited.includes(stages[1]))
    visitedStore.visited.push(stages[1])
};
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
