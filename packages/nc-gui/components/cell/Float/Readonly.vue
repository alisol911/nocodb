<script lang="ts" setup>
interface Props {
  modelValue?: number | null | string
}

defineProps<Props>()
</script>

<template>
  <div class="nc-cell-field truncate">{{ modelValue }}</div>
</template>
