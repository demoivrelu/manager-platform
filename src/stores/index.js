import { defineStore } from "pinia";
import {ref} from "vue";
function initState() {
    
}

export const userAllDataStore = defineStore('allData', () => {
    const state = ref(initState());
    return{
        state,
    };
})