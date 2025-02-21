<template>
  <div class="tags">
    <el-tag
      v-for="tag,index in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch,nextTick } from "vue";
import { userAllDataStore } from "../stores";
import { useRoute, useRouter } from "vue-router";
// import { userAllDataStore } from "@/stores";
const store = userAllDataStore();
let tags = store.state.tags;
// const tags = ref([
//     {
//         path: "/home",
//         name: "home",
//         label: "Home",
//         icon: "home",
//       },
//     {
//         path: "/user",
//         name: "user",
//         label: "User",
//         icon: "user",
//       },
//     ]);
const route = useRoute();
const router = useRouter()
let tmp = ref(0)

const handleMenu = (tag)=>{
  router.push(tag.name)
}

const handleClose= (tag, index)=>{
  tags.splice(index, 1)
  store.updateTags(tag)
  console.log("5555", index, tags.length, tags[index-1]['path'])
  if(index === tags.length){
    store.selectMenu(tags[index-1])
    router.push(tags[index-1].path)
  }else{
    store.selectMenu(tags[index])
    router.push(tags[index].path)

  }
}

onMounted(() => {
  watch(() => store.state.tags, (newVal, oldVal) => {
    console.log("=====", newVal, "newvalue..........")
  },{deep: true})
});
</script>

<style lang="less" setup>
.tags {
  margin: 20px 0 0 20px;
}

.el-tag {
  margin-right: 20px;
}
</style>
