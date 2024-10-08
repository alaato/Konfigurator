<template>
	<main >

		<section ref="hero" class="flex landing-page-main flex-col items-center justify-center md:h-screen gap-2">
			<h1 class="text-center text-2xl sm:text-7xl text-white">Sprechanlagen</h1>
			<h1 class="text-center text-2xl sm:text-7xl text-white">Konfigurator</h1>
			<div class="versions flex gap-2">
				<NuxtLink class="border p-3 rounded-md bg-transparent hover:bg-black  text-white" to="simple">
					Schnell</NuxtLink>
				<NuxtLink class="border p-3 rounded-md bg-transparent hover:bg-black  text-white" to="requirements">
					Custom</NuxtLink>
			</div>
		</section>

		<section
			class="w-fullw-full py-12 md:py-24 lg:py-32 flex justify-center items-center bg-zinc-50 dark:bg-zinc-900">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center justify-center text-center">
					<div class="space-y-6">
						<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
						<p
							class="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
							Stellen Sie Ihre Türsprechanlage schnell und fehlerfrei nach Ihren Wünschen zusammen. Wir
							fertigen Made in Germany und liefern innerhalb von 24 Stunden an den Elektro-Großhandel </p>
					</div>
				</div>
				<div class="mx-auto space-y-6 grid max-w-5xl items-center gap-6 lg:grid-cols-3">
					<div v-for="feature in features" :key="feature.title"
						class="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
						<div class="p-2 bg-primary rounded-full bg-arapawa-950 dark:bg-black">
							<CheckCircleIcon class="h-6 w-6 text-white" />
						</div>
						<h3 class="text-xl font-bold">{{ feature.title }}</h3>
						<p class="text-sm text-zinc-500 dark:text-zinc-400 text-center">{{ feature.description }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-neutral-950 text-black dark:text-white"
			ref="howItWorksSection">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">So funktioniert es</h2>
						<p
							class="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
							Beginnen Sie mit unserer Tool in 5 einfachen Schritten
						</p>
					</div>
				</div>
				<TransitionGroup name="fade-slide" tag="div"
					class="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
					<div v-for="(step, index) in visibleSteps" :key="step.title"
						class="flex flex-col items-center space-y-2 border border-gray-200 dark:border-gray-800 p-6 rounded-lg relative">
						<div
							class="absolute -top-4 left-4 bg-primary bg-arapawa-950 dark:bg-white text-white dark:text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
							{{ index + 1 }}
						</div>
						<component :is="step.icon" class="h-12 w-12 text-primary" />
						<h3 class="text-xl font-bold">{{ step.title }}</h3>
						<p class="text-sm text-zinc-500 dark:text-zinc-400 text-center">{{ step.description }}</p>
					</div>
				</TransitionGroup>
			</div>
		</section>

		<section class="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900">
			<div class="container px-4 md:px-6">
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-arapawa-950 dark:text-white">
							Noch Fragen?</h2>
						<p
							class="max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
							erreichen Sie uns unter +49 4194 9881-166
						</p>
						<p
							class="max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
							oder</p>
						<p
							class="max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
							angebote@tcsag.de</p>
					</div>
					<div class="w-full max-w-sm space-y-2">

					</div>
				</div>
			</div>
		</section>

	</main>

	<Footer />

</template>

<script lang="ts" setup>
import { CheckCircleIcon } from "lucide-vue-next"
import Footer from "@/components/general/Footer.vue"
const hero = useTemplateRef('hero')
const d = new Date();
let year = d.getFullYear();

const howItWorksSection = ref(null)
const visibleSteps = ref([])

const features = [
	{
		title: "Sprechanlage planen",
		description: "Audio- und Video-Sprechanlagen in vielen Design- und Montagevarianten auswählen",
	},
	{
		title: "Mehr Möglichkeiten",
		description: "bis zum 4 Aussenstationen und 40 Innenstationen",
	},
	{
		title: "Benutzerfreundlich",
		description: "Stellen Sie Ihr individuelles System ganz einfach mit dem intuitiven Tool zusammen",
	},
]
const howItWorks = [
	{
		title: "Stationsanzahl und gewünschte Technologie",
		description: "Wählen Sie die Anforderungen für Ihr System.",
	},
	{
		title: "Aussenstationen",
		description: " Wählen Sie aus verschiedenen Varianten eine oder mehrere Außenstationen aus.",
	},
	{
		title: "Innernstationen",
		description: "Wählen Sie Innenstationen, die die Außenstationen passieren.",
	},
	{
		title: "Zubehore",
		description: "Wenn Sie möchten, können Sie Zubehör für die ausgewählten Produkte auswählen.",
	},
	{
		title: "Fertig!",
		description: "Jetzt können Sie Ihre Liste als PDF oder Excel exportieren oder direkt kaufen",
	},

]
const checkScroll = () => {
	if (howItWorksSection.value) {
		const rect = howItWorksSection.value.getBoundingClientRect()
		const triggerPoint = window.innerHeight * 0.7

		if (rect.top <= triggerPoint) {
			const stepsToShow = Math.ceil((triggerPoint - rect.top) / (rect.height / howItWorks.length))
			visibleSteps.value = howItWorks.slice(0, Math.min(stepsToShow, howItWorks.length))
		}
	}
}
onMounted(() => {
	hero.value.scrollIntoView({ behavior: "instant",inline: 'center', block: 'start' })
	window.addEventListener('scroll', checkScroll)
	checkScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', checkScroll)
})
</script>

<style>
.landing-page-main {
	position: relative;
	background: url("public/landingPageBG.jpg") no-repeat center center fixed;
	background-size: fit-content;
	box-shadow: 0px 4px 4px 0px #00000040, inset 0 0 0 1000px rgba(0, 0, 0, .4);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>