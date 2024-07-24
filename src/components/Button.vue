<template>
  <button class="btn" :class="className" type="button" @click="emit('click')">
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    require: true,
  },
  className: {
    type: String,
  },
});
const emit = defineEmits(["click"]);
</script>
<style scoped></style>
