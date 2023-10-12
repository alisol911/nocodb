<script setup lang="ts">
import { enumColor as colors } from '#imports'

const { $e } = useNuxtApp()

const { lang: currentLang } = useGlobal()

const isRtlLang = computed(() => ['fa', 'ar'].includes(currentLang.value))

function openKeyboardShortcutDialog() {
  $e('a:actions:keyboard-shortcut')

  const isOpen = ref(true)

  const { close } = useDialog(resolveComponent('DlgKeyboardShortcuts'), {
    'modelValue': isOpen,
    'onUpdate:modelValue': closeDialog,
  })

  function closeDialog() {
    isOpen.value = false
    close(1000)
  }
}
</script>

<template>
  <a-card :body-style="{ padding: '0px' }" class="w-[300px] shadow-sm !rounded-lg">
    <a-list class="w-full" dense>
      <slot name="before" />


      <a-list-item @click="openKeyboardShortcutDialog">
        <div class="ml-3 flex items-center text-sm cursor-pointer">
          <component :is="iconMap.keyboard" class="text-lg text-primary" />
          <span class="ml-4">{{ $t('title.keyboardShortcut') }}</span>
        </div>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<style scoped>
:deep(.ant-list-item) {
  @apply hover:(bg-gray-100 !text-primary);
}
</style>
