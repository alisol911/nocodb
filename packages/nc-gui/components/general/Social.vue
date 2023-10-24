<script lang="ts" setup>
</script>

<template>
<div></div>
</template>

<style scoped>
.icon {
  @apply cursor-pointer text-3xl rounded-full p-2 bg-gray-100 shadow-md hover:(shadow-lg bg-gray-200);
}

.discourse {
  height: 22px;
  width: 22px;
  background-image: url('assets/img/discourse-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.discourse::before {
  visibility: hidden;
  content: '';
}
</style>
