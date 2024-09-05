<template>
	<div className="flex justify-between items-center pt-2 border-t">
	              <Button
	                @click= "handlePageChange(currentPage - 1)"
	                v-if="currentPage === 1"
	                variant="outline"
	                size="sm"
	              >
	                <ChevronLeft class="h-4 w-4 mr-2" /> Previous
	              </Button>
	              <span className="text-sm text-gray-600">
	                Page {{currentPage}} of {{totalPages}}
	              </span>
	              <Button
	                @click="handlePageChange(currentPage + 1)"
	                v-if="currentPage === totalPages"
	                variant="outline"
	                size="sm"
					class="flex items-center"
	              >
	                Next <ChevronRight class="h-4 w-4 ml-2" />
	              </Button>
	            </div>
</template>

<script setup lang="ts">
defineProps<{ 
	handlePageChange: (newPage: number) => void;
}>()
const currentPage = defineModel<number>('currentPage', { required: true })
const totalPages = defineModel<number>('totalPages', { required: true })
</script>
