<template>
	<TableRow v-for="product in products" :key="product.id">
	        <TableCell class="font-medium w-[200px] flex items-center">
	            <img src="" alt="Kein Bild vorhanden" width="30" height="30" class="object-scale-down" />
	          {{product?.MNR}}
	        </TableCell>
	        <TableCell>{{product?.quantity? product?.quantity : 1}}</TableCell>
	        <TableCell>{{ product?.PERIODE1 }}</TableCell>
	        <TableCell class="text-right">
	          {{ product?.quantity? product?.quantity * product?.PERIODE1 : product?.PERIODE1}}€
	        </TableCell>
	      </TableRow>
</template>

<script setup lang="ts">
import {TableCell , TableRow} from '@/components/ui/table';
const props = defineProps<{ 
	products: any[]; 
}>()
</script>
