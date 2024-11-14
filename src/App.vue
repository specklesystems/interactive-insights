<template>
  <main class="relative">
    <SpeckleViewer />
    <ControlPanel />
    <SelectionPanel />
  </main>
</template>

<script setup lang="ts">
import SpeckleViewer from './components/SpeckleViewer.vue'
import ControlPanel from './components/ControlPanel.vue'
import SelectionPanel from './components/SelectionPanel.vue'
</script>
