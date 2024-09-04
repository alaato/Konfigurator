<template>
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full flex-col items-center justify-center"
      :step="step.step"
    >
      <StepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
        class="absolute block top-5 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 rounded-full shrink-0"
      />

      <StepperTrigger as-child>
        
      </StepperTrigger>

      <div class="mt-5 flex flex-col items-center text-center">
        <StepperTitle
          :class="[state === 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </StepperTitle>
        <StepperDescription
          :class="[state === 'active' && 'text-primary']"
          class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
        >
          {{ step.description }}
        </StepperDescription>
      </div>
    </StepperItem>
</template>

<script setup>
//imports
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { Check, Circle, Dot } from 'lucide-vue-next'

//consts
const props = defineProps(['currentStage', 'stages'])
const visitedStore = useVisitedStore();
const goToStage = inject(`goToStage`)
const steps = [
  {
    step: 1,
    title: props.stages[0],
    description: 'Objektdetails angeben',
  },
  {
    step: 2,
    title: props.stages[1],
    description: 'Aussenstation auswählen',
  },
  {
    step: 3,
    title: props.stages[2],
    description: 'Innenstation auswählen',

  },
  {
    step: 4,
    title: props.stages[3],
    description: 'Bestellung Bestätigen',
  }
]

</script>

<style>
/* .stage-item {
  position: relative;
}

.stage-item:disabled {
  background-color: gray;
  transition: 0;
}

.stage-item::after {
  content: " ";
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: black;
  transform: translateX(19px) translateY(10px)
}

.dark .stage-item::after {
  background-color: white;
}

.stage-item:last-of-type::after {
  width: 0;
  height: 0;
}

.stage-item:disabled:hover,
.stage-item:disabled:focus,
.stage-item:disabled:focus-visible {
  cursor: default;
  border: solid 1px gray;
} */
</style>
<Button
         :disabled="!visitedStore.visited.includes(step.title)"
         @click="$emit('goToStage', step.title)"
          :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
          size="icon"
          class="z-10 rounded-full shrink-0"
          :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
        >
          <Check v-if="state === 'completed'" class="size-5" />
          <Circle v-if="state === 'active'" />
          <Dot v-if="state === 'inactive'" />
        </Button>