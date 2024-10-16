<template>
  <Sheet>
    <SheetTrigger class="md:hidden"><List/></SheetTrigger>
    <SheetContent side="left" class="w-[300px] sm:w-[540px]">
      <ol class="tracker w-full flex flex-col gap-4 mt-3">
              <li
                v-for="stage in stages"
                :key="stage"
                class="stage-item flex items-center gap-2"
                :class="{ 'completed': completed(stage) }"
              >
                <div
                  class="button rounded-full flex justify-center items-center w-9 h-9 bg-white border-black border"
                >
                <SheetClose as-child>
                  <button
                    class="bg-arapawa-950 dark:bg-black disabled:bg-gray-500 rounded-full w-7 h-7 flex justify-center items-center"
                    :disabled="!visited(stage) || (stage === 'Übersicht' && !allProductsSelected)"
                    @click="goToStage(stage)"
                  >
                    <Dot v-if="!visited(stage)" />
                    <Circle v-if="currentStage === stage" class="text-white" />
                    <Check v-if="completed(stage)" color="white" />
                  </button>
                </SheetClose>
                </div>
                <span class="text-sm font-medium">{{ stage }}</span>
              </li>
            </ol>
    </SheetContent>
  </Sheet>
</template>

<script lang="ts" setup>
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Circle, Check, Dot, List } from 'lucide-vue-next'
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)
const stages = inject(`stages`)
const goToStage  : Function = inject(`goToStage`)
const allProductsSelected = computed(() => {
	const allOutdoorSelected = selectedProducts.value.outdoorProducts.SelectedQuantity == selectedProducts.value.outdoorProducts.neededQuantity
	const allIndoorSelected = selectedProducts.value.indoorProducts.SelectedQuantity == selectedProducts.value.indoorProducts.neededQuantity

	return allOutdoorSelected && allIndoorSelected
})

let visited = (stage) => visitedStore.visited.includes(stage)
const completed = (stage) => visited(stage) && (visitedStore.visited.indexOf(currentStage.value) > visitedStore.visited.indexOf(stage))
</script><style scoped>
.stage-item {
  position: relative;
  width: 100%;
}

.stage-item::after {
  content: " ";
  position: absolute;
  width: 2px;
  height: calc(100% + 1rem);
  background-color: rgb(233, 233, 233);
  left: 1.125rem;
  top: 2.25rem;
  transform: translateX(-50%);
}

.completed.stage-item::after {
  background-color: #040372;
}

.dark .stage-item::after {
  background-color: rgb(109, 109, 109);
}

.dark .completed.stage-item::after {
  background-color: white;
}

.stage-item:last-of-type::after {
  display: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>