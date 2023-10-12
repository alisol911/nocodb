<script setup lang="ts">
interface Props {
  modelValue?: number | null | string
}

const props = defineProps<Props>()

const column = inject(ColumnInj, null)!

const displayValue = computed(() => {
  if (props.modelValue === null) return null

  if (isNaN(Number(props.modelValue))) return null

  if (parseProp(column.value.meta).isLocaleString) return Number(props.modelValue).toLocaleString()

  return Number(props.modelValue)
})
</script>

<template>
  <div class="nc-cell-field truncate">{{ displayValue }}</div>
</template>
