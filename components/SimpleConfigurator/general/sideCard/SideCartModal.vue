<template>
	<Sheet >
		<SheetTrigger class="lg:hidden">
			<ShoppingBag />
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Ihre Auswahl</SheetTitle>
			</SheetHeader>
			<ScrollArea class="flex-grow">
				<SideCardItemList />
			</ScrollArea>
		</SheetContent>
	</Sheet>
</template>

<script setup lang="ts">
import { ShoppingBag } from 'lucide-vue-next';
import SideCardItemList from './SideCardItemList.vue';

</script>
