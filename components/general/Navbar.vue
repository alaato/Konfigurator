<script setup lang="ts">
const colorMode = useColorMode()
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sun } from 'lucide-vue-next';
import { Moon } from 'lucide-vue-next';
</script>

<template>
	<nav
		class="min-w-screen w-full flex items-center justify-around py-2 shadow-dark-mild bg-white dark:bg-black border-b border-gray-500 lg:py-4">

		<div>
			<a class="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="/">
				<img class="me-2 logo" src="public/TCS_Logo.png" height="120" width="120" alt="TCS Logo"
					loading="lazy" />
			</a>
		</div>

		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button variant="outline">
					<Moon color="#000000"
						class=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:hidden" />
					<Sun class="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
					<span class="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem @click="colorMode.preference = 'light'">
					Light
				</DropdownMenuItem>
				<DropdownMenuItem @click="colorMode.preference = 'dark'">
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem @click="colorMode.preference = 'system'">
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</nav>
</template>
