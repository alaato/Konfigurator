<template>
    <ResizablePanelGroup direction="horizontal">
        <ResizablePanel id="group-1-panel-1" :min-size="30" :default-size="50">
            <FloorsContainer></FloorsContainer>
        </ResizablePanel>
        <ResizableHandle class="w-2 opacity-0" />
        <ResizablePanel  id="group-1-panel-2" :min-size="30" :default-size="50">
            <outdoorContainer></outdoorContainer>
        </ResizablePanel>
    </ResizablePanelGroup>
</template>
<script setup>
import FloorsContainer from '~/components/detailedConfigurator/indoor/FloorsContainer.vue';
import outdoorContainer from '~/components/detailedConfigurator/outdoor/outdoorContainer.vue';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
</script>
<style></style>
