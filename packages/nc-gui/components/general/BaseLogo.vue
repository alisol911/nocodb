<script setup lang="ts">
import LogosPostgresql from '~icons/nc-icons/postgresql'

const { sourceType } = defineProps<{ sourceType?: string; color?: string }>()

const baseIcon = computed(() => {
  return LogosPostgresql
})
</script>

<template>
  <component :is="baseIcon" :style="color ? { color } : {}" />
</template>
