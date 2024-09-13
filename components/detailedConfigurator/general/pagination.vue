<template>
	<div className="flex justify-between items-center pt-2 border-t">
	              <Button
	                @click= "$emit('handlePageChange', currentPage - 1)"
	                variant="outline"
	                size="sm"
					:disabled = "currentPage === 1"
	              >
	                <ChevronLeft class="h-4 w-4 mr-2" /> Previous
	              </Button>
	              <span className="text-sm text-gray-600">
	                Page {{currentPage}} of {{totalPages}}
	              </span>
	              <Button
	                @click="$emit('handlePageChange', currentPage + 1)"
	                :disabled="currentPage === totalPages"
	                variant="outline"
	                size="sm"
					class="flex items-center"
	              >
	                Next <ChevronRight class="h-4 w-4 ml-2" />
	              </Button>
	            </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
const emit = defineEmits(['handlePageChange'])
const currentPage = defineModel<number>('currentPage', { required: true })
const totalPages = defineModel<number>('totalPages', { required: true })

</script>
