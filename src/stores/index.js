// import { defineStore } from "pinia";
// // import { ref } from "vue";
// function initState() {
//     isCollapse: false
// }

// export const userAllDataStore = defineStore('allData', () => {
//     const state = ref(initState());
//     return {
//         state,
//     };
//     // state: () => {
//     //     return { count: 0 }
//     //   }
// });


import { defineStore } from 'pinia'

export const userAllDataStore = defineStore('allData', {
  state: () => {
    return { isCollapse: true }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
})