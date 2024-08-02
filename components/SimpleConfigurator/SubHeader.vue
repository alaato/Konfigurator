<template>
	<TableRow class="font-bold p-0 bg-slate-200">
	          <TableCell >{{ title }}</TableCell>
	          <TableCell class></TableCell>
	          <TableCell class></TableCell>
	          <TableCell class></TableCell>
	        </TableRow>
</template>

<script setup>
const props = defineProps({
	title: String
})
</script>