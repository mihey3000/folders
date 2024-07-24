<template>
  <div v-if="modalVisibility" class="modal-overlay">
    <div
      class="modal"
      ref="modal"
      :style="`padding-bottom:${modalFooterPadding}px`"
    >
      <div class="close-wrapper">
        <span class="close-btn" @click="emit('updateVisibility', false)">
          Закрыть
        </span>
      </div>
      <div class="modal-header" ref="modalHeader">
        <h2>{{ modalLabel }}</h2>
      </div>
      <div
        class="modal-content"
        ref="modalContent"
        :style="`height:${modalContentHeight}px`"
      >
        <slot name="content"></slot>
      </div>
      <div class="modal-footer" ref="modalFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  watch,
  onUnmounted,
  nextTick,
  onBeforeMount,
} from "vue";
const props = defineProps({
  modalVisibility: {
    type: Boolean,
    default: false,
  },
  modalLabel: {
    type: String,
    require: true,
  },
});
const emit = defineEmits(["updateVisibility"]);
const modal = ref(null);
const modalHeader = ref(null);
const modalContent = ref(null);
const modalFooter = ref(null);
const modalContentHeight = ref(null);
const modalFooterPadding = ref(null);

function getContentHeight() {
  const modalHeight = modal?.value?.offsetHeight || 0;
  const headerHeight = modalHeader?.value?.offsetHeight || 0;
  const footerHeight = modalFooter?.value?.offsetHeight || 0;
  modalContentHeight.value = modalHeight - headerHeight - footerHeight - 40;
  modalFooterPadding.value = footerHeight;
}

watch(
  () => props.modalVisibility,
  (val) => {
    getContentHeight();
  },
  { deep: true }
);

watch(
  () => modal.value,
  (val) => {
    getContentHeight();
  },
  { deep: true }
);

onBeforeMount(() => {
  window.addEventListener("resize", getContentHeight, true);
});

onMounted(() => {
  // window.addEventListener("resize", getContentHeight);
  // getContentHeight();
});
onUnmounted(() => {
  window.removeEventListener("resize", getContentHeight);
});
</script>

<style scoped>
.modal-overlay {
  background: #393e46;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  padding: 20px;
  position: relative;
  z-index: 100;
  background: #fff;
  opacity: 1;
  width: 80%;
  height: 80%;
  border-radius: 10px;
}
.modal-content {
  overflow: auto;
  border: 1px solid #ececec;
  padding: 20px;
}
.modal-header {
  display: flex;
  justify-content: center;
}
.modal-footer {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}
.close-btn:hover {
  cursor: pointer;
  opacity: 0.5;
}
.close-wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
