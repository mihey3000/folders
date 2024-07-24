<template>
  <div class="tree-wrapper">
    <div
      class="folder"
      :class="[
        isVisibleTree ? 'opened' : 'closed',
        selectedFolder === data.id ? 'selected' : '',
      ]"
      @dblclick="isVisibleTree = !isVisibleTree"
      @click="emit('select', data.id)"
    ></div>

    <div v-if="isVisibleTree" class="tree">
      <Folder
        v-for="treeItem in tree"
        :data="treeItem"
        @select="emit('select', $event)"
        :selectedFolder="selectedFolder"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
  selectedFolder: {
    type: Number,
  },
});
const emit = defineEmits(["click", "select"]);
import folders from "./../common/folders";
import { getDeepCopyObject, getUniqueKey } from "./../common/helpers";

const isVisibleTree = ref(false);
const label = computed(() => {
  return isVisibleTree.value ? "Закрыть" : "Раскрыть";
});
const tree = ref(
  getDeepCopyObject(
    folders.map((item) => {
      return { ...item, id: getUniqueKey() };
    })
  )
);
</script>
<style scoped>
.folder {
  border-radius: 10px;
  padding: 10px 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.opened.selected {
  background-image: url("./../assets/images/selected-opened-folder.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.closed.selected {
  background-image: url("./../assets/images/selected-closed-folder.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.closed {
  background-image: url("./../assets/images/folder.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.opened {
  background-image: url("./../assets/images/opened-folder.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.folder:hover {
  cursor: pointer;
}
.tree {
  display: flex;
  flex-direction: column;
}
.tree-wrapper {
  display: flex;
}
</style>
