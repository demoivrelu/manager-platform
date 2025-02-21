
<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue'
import {reactive, getCurrentInstance } from 'vue'
import {userAllDataStore} from '@/stores'
import { useRouter } from 'vue-router'
const loginForm = reactive({
    username:'',
    password:''
})
const {proxy} = getCurrentInstance()
const store = userAllDataStore()
const router = useRouter()

const handleLogin = async()=>{
    const res = await proxy.$api.getMenu(loginForm)
    console.log(res, ">>>")
    store.updateMenuList(res.data.menuList)
    store.state.token = res.data.token
    store.addMenu(router)
    router.push('/home')
}
</script>
<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container">
            <h1>welcome</h1>
            <el-form-item>
                <el-input tupe="input" placeholder="account" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input tupe="password" placeholder="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang="less">
.body-login{
    width:100%;
    height:100%;
    background-image: url();
    background-size: 100%;
    overflow: hidden;
}
.login-container{
    width:420px;
    background-color: #fff;
    border:1px solid #eaeaea;
    border-radius: 15px;
    padding:50px 50px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin:260px auto;
    h1{
        text-align: center;
        margin-bottom: 20px;
        color: '#50450';
    }
    :deep(.el-form-item__content){
        justify-content: center;
    }
}
</style>