<template>
  <div class="my-10 max-w-[960px] flex flex-col bg-slate-50">
    <form @submit.prevent="submitConfig" class="flex gap-5 text-center flex-col justify-center content-center">
      <Card>
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
      
      <Card>
        <CardHeader>
          <CardTitle>Wohnungen</CardTitle>
          <CardDescription>Wählen Sie aus, wie viele Wohnungen pro Etage</CardDescription>
        </CardHeader>
        <CardContent>
          <NumberField v-model="numberApartments" :required="true" :default-value="1" :min="1" :max="100">
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement/>
            </NumberFieldContent>
          </NumberField>
        </CardContent>

      </Card>
      <div>
        <button class="grow bg-arapawa-950 text-white text-center hover:bg-arapawa-900 w-1/2" type="submit">nächste</button>
      </div>
    </form>
  </div>
</template>

<script setup>

//imports and props
const { stages } = defineProps(['stages'])
import useFloorsStore from '~/store/floors';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// variables
const router = useRouter()
const numberApartments = useState("numberApartments", ()=> 1);
const numberFloors = useState("numberFloors", ()=> 1);
const visitedStore = useVisitedStore();
const FloorStore = useFloorsStore();
const {initilizeFloorsAndApartments} = FloorStore

// functions
const submitConfig = async () => {
  // alert(`${numberApartments.value} + ${numberFloors.value} `)
  // addFloors(numberFloors.value);
  initilizeFloorsAndApartments(numberFloors.value, numberApartments.value);
  const {floors} = storeToRefs(FloorStore);
  console.log(floors.value);
  router.push("/indoorStations")
};
</script>

<style src="../../styles/StageOne.css">
/* CSS */
</style>
