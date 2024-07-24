<template>
  <div class="container">
    <Button
      className="primary"
      @click="isModalVisible = !isModalVisible"
      label="Открыть"
    />
  </div>

  <Modal
    :modal-visibility="isModalVisible"
    @update-visibility="isModalVisible = $event"
    modal-label="Заголовок модального окна"
  >
    <template #content>
      <div style="display: flex; flex-wrap: nowrap">
        <Folder
          v-for="folder in folders"
          :data="folder"
          @select="selectedFolder = $event"
          :selectedFolder="selectedFolder"
        />
      </div>
    </template>
    <template #footer>
      <Button className="primary" @click="selectLastFolder" label="Ок" />
    </template>
  </Modal>
</template>

<script setup>
import Folder from "./Folder.vue";
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import { ref } from "vue";
import folders from "./../common/folders";

const isModalVisible = ref(false);
const selectedFolder = ref(null);

const selectLastFolder = () => {
  alert(`folderId - ${selectedFolder.value}`);
  isModalVisible.value = false;
};
</script>
