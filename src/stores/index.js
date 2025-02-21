import { Model } from "echarts";
import { ElMention } from "element-plus";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import { defineStore } from "pinia";
import { watch, ref } from 'vue'

function initState() {
  return ( {
    isCollapse: true,
    tags: [
      {
        path: "/home",
        name: "home",
        label: "Home",
        icon: "home",
      },
    ],
    currentMenu: null,
    menuList: [],
    token: "",
    routerList: []
  });
}

export const userAllDataStore = defineStore("allData", () => {
  // const state =ref( {
  //   isCollapse: true,
  //   tags: [
  //     {
  //       path: "/home",
  //       name: "home",
  //       label: "Home",
  //       icon: "home",
  //     },
  //   ],
  //   currentMenu: null,
  //   menuList: [],
  //   token: "",
  //   routerList: []
  // });

  const state = ref(initState())

  // watch
  watch(state, (newVal, oldVal)=>{
    if (!newVal.token) return;
    localStorage.setItem("store", JSON.stringify(newVal))
  },{deep:true})

  function selectMenu(val) {
    if (val.name === "home") {
      state.value.currentMenu = null;
    } else {
      let index = state.value.tags.findIndex((item) => item.name === val.name);
      console.log(index);
      index === -1 ? state.value.tags.push(JSON.parse(JSON.stringify(val))) : "";
    }
  }

  const updateTags = (tag) => {
    const index = state.value.tags.findIndex((item) => item.name === tag.name);
    if (index !== -1) {
      state.value.tags.splice(index, 1);
    }
  };

  function updateMenuList(val) {
    state.value.menuList = JSON.parse(JSON.stringify(val));
    console.log(state.value.menuList, val)
  }

  function addMenu(router, type) {
    if (type === "refresh") {
      if(JSON.parse(localStorage.getItem('store'))){
        state.value = JSON.parse(localStorage.getItem('store'))
        state.value.routerList = []
      }else{
        return
      }
    }
    const menu = state.value.menuList;
    const module = import.meta.glob('../views/**/*.vue');
    const routerArr = []
    menu.forEach(element => {
      if (element.children) {
        element.children.forEach(val => {
          let url = `../views/${val.value}.vue`;
          val.component = module[url]
          routerArr.push(...element.children)
        })
      } else {
        let url = `../views/${element.url}.vue`;
        element.component = module[url];
        routerArr.push(element)
      }
    });

    state.value.routerList = [];
    let routers = router.getRoutes();
    routers.forEach(element => {
      if (element.name == "main" || element.name == "login") {
        return;
      } else {
        router.removeRoute(element.name);
      }
    });
    routerArr.forEach(element => {
      state.value.routerList.push(router.addRoute("main", element))
    })
  }

  function clean(){
    state.value.routerList.forEach(item=>{
      if(item){
        item()
      }
    });
    state.value = initState();
    localStorage.removeItem('store');
  }

  return { state, selectMenu, updateTags, updateMenuList, addMenu, clean, persist: true };
});
