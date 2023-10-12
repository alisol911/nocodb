<script lang="ts" setup>
import type { VNodeRef } from '@vue/runtime-core'

interface Props {
  modelValue?: number | null | string
}

interface Emits {
  (event: 'update:modelValue', model: number): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const editEnabled = inject(EditModeInj, ref(false))

const isEditColumn = inject(EditColumnInj, ref(false))

const readOnly = inject(ReadonlyInj, ref(false))

const _vModel = useVModel(props, 'modelValue', emits)

const vModel = computed({
  get: () => _vModel.value,
  set: (value) => {
    if (value === '') {
      _vModel.value = null
    } else {
      _vModel.value = value
    }
  },
})

const isExpandedFormOpen = inject(IsExpandedFormOpenInj, ref(false))!

const isForm = inject(IsFormInj)!

const focus: VNodeRef = (el) =>
  !isExpandedFormOpen.value && !isEditColumn.value && !isForm.value && (el as HTMLInputElement)?.focus()
</script>

<template>
  <!-- eslint-disable vue/use-v-on-exact -->
  <input
    :ref="focus"
    v-model="vModel"
    class="nc-cell-field outline-none px-1 border-none w-full h-full"
    type="number"
    step="0.1"
    :disabled="readOnly"
    @blur="editEnabled = false"
    @keydown.down.stop
    @keydown.left.stop
    @keydown.right.stop
    @keydown.up.stop
    @keydown.delete.stop
    @keydown.alt.stop
    @selectstart.capture.stop
    @mousedown.stop
  />
</template>

<style scoped lang="scss">
input[type='number']:focus {
  @apply ring-transparent;
}
</style>
