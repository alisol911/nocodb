<script setup lang="ts">
import LogosPostgresql from '~icons/nc-icons/postgresql'

const { sourceType } = defineProps<{ sourceType?: string }>()

const baseIcon = computed(() => {
  return LogosPostgresql
})
</script>

<template>
  <component :is="baseIcon" />
</template>
