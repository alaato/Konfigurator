<script setup lang="ts">
const colorMode = useColorMode()
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sun } from 'lucide-vue-next';
import { Moon } from 'lucide-vue-next';
</script>

<template>
  <nav class="w-screen flex items-center justify-around  py-2 shadow-dark-mild bg-white lg:py-4">
    
      <div>
        <a class="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
          <img class="me-2" src="public/logo.gif" alt="TE Logo" loading="lazy" />
        </a>
      </div>

    <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Moon  color="#000000" class=" h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Sun class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
