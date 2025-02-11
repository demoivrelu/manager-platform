<template>
  <el-aside :class="{ 'is-collapsed': isCollapsed }">
    <el-menu
      background-color="#545456"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <h3 v-show="!isCollapse">platform manager</h3>
      <h3 v-show="isCollapse">PM</h3>
      <el-menu-item
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="subItem in item.children"
            :index="subItem.path"
            :key="subItem.path"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { userAllDataStore } from "../stores";

const list = ref([
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "house",
    url: "Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "商品管理",
    icon: "video-play",
    url: "Mall",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "User",
  },
  {
    path: "/other",
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Page1",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Page2",
      },
    ],
  },
]);

const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));
const store = userAllDataStore();
const isCollapse = computed(() => store.isCollapse);
// const width = computed(() => (store.isCollapse ? "64px" : "180px"));
const isCollapsed = computed(()=>(store.isCollapse ? true : false))
onMounted(() => {
  // watch(store, (newVal, oldVal) => {
  //   document.documentElement.style.setProperty(
  //     "--width-animation",
  //     !newVal.isCollapse ? "growWidth 3s forwards" : "shinkwidth 3s forwards"
  //   );
  //   console.log(
  //     newVal,
  //     document.documentElement.style.getPropertyValue("--width-animation")
  //   );
  // });
});
</script>

<style lang="less" setup>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  height: 100vh;
  background-color: #545456;
  transition: width 1s ease; 
}

.is-collapsed {
  width: 64px !important;
}
.el-aside:not(.is-collapsed) {
  width: 180px;
}

</style>
