<script lang="ts" setup>
import type { BaseType, SourceType } from 'nocodb-sdk'

const props = defineProps<{
  source: SourceType
  base: BaseType
}>()

const source = toRef(props, 'source')

const base = toRef(props, 'base')

const { isUIAllowed } = useRoles()

const baseRole = computed(() => base.value.project_role || base.value.workspace_role)

const { $e } = useNuxtApp()

function openQuickImportDialog(type: string) {
  if (!source.value?.id || !source.value.base_id) return

  $e(`a:actions:import-${type}`)

  const isOpen = ref(true)

  const { close } = useDialog(resolveComponent('DlgQuickImport'), {
    'modelValue': isOpen,
    'importType': type,
    'baseId': source.value.base_id,
    'sourceId': source.value.id,
    'onUpdate:modelValue': closeDialog,
  })

  function closeDialog() {
    isOpen.value = false

    close(1000)
  }
}
</script>

<template>
  <!-- Quick Import From -->
  <NcSubMenu class="py-0" data-testid="nc-sidebar-base-import" variant="small">
    <template #title>
      <GeneralIcon icon="download" class="opacity-80" />
      {{ $t('labels.importData') }}
    </template>


    <NcMenuItem
      v-if="isUIAllowed('csvImport', { roles: baseRole, source })"
      key="quick-import-csv"
      @click="openQuickImportDialog('csv')"
    >
      <div v-e="['c:import:csv']" class="flex gap-2 items-center">
        <GeneralIcon icon="csv" class="w-4" />
        {{ $t('labels.csvFile') }}
      </div>
    </NcMenuItem>

    <NcMenuItem
      v-if="isUIAllowed('jsonImport', { roles: baseRole, source })"
      key="quick-import-json"
      @click="openQuickImportDialog('json')"
    >
      <div v-e="['c:import:json']" class="flex gap-2 items-center">
        <GeneralIcon icon="ncFileTypeJson" class="w-4" />
        {{ $t('labels.jsonFile') }}
      </div>
    </NcMenuItem>

    <NcMenuItem
      v-if="isUIAllowed('excelImport', { roles: baseRole, source })"
      key="quick-import-excel"
      @click="openQuickImportDialog('excel')"
    >
      <div v-e="['c:import:excel']" class="flex gap-2 items-center">
        <GeneralIcon icon="excel" class="max-w-4" />
        {{ $t('labels.microsoftExcel') }}
      </div>
    </NcMenuItem>
  </NcSubMenu>
</template>
