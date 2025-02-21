<script setup>
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
const handleClick = (val) => {
    console.log('click');
    action.value = 'edit';
    dialogVisible.value = true;
    
    nextTick(() => {Object.assign(formUser, { ...val, sex: '' + val.sex });});
}

// const tableData = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036',
//     tag: 'Home',
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036',
//     tag: 'Office',
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036',
//     tag: 'Home',
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036',
//     tag: 'Office',
//   },
// ]

const tableData = ref([]);
const { proxy } = getCurrentInstance();

const config = reactive({
    name: "",
    total: 0,
    page: 1
})
const getUserData = async () => {
    // let res = await proxy.$api.getUserData(config);
    // let res =null
    proxy.$api.getUserData(config).then((res)=>{
        tableData.value = res.data.items.map(item => ({
            ...item,
            sex: item.sex === 0 ? 'male' : 'female'
        }));
        config.total = res.data.total;
        console.log("+++get data..", res.data)
    })
}

const tableLabel = reactive([
    {
        prop: "name",
        label: "Name",
    },
    {
        prop: "age",
        label: "Age",
        width: 200,
    },
    {
        prop: "sex",
        label: "Sex",
        width: 200,
    },
    {
        prop: "birth",
        label: "Birth",
        width: 120,
    },
    {
        prop: "state",
        label: "State",
        width: 120,
    },
    {
        prop: "address",
        label: "address",
        width: 300,
    },
])
const formInline = reactive({
    keyword: '',
});
const handleSearch = () => {
    config.name = formInline.keyword;
    getUserData();
}
const handleCurrentChange = (page) => {
    config.page = page;
    getUserData();
}
const handleDelete = (row) => {
    ElMessageBox.confirm("sure to delete?",).then(
        async () => {
            await proxy.$api.deleteUser(row);
            ElMessage({
                showClose: true,
                message: "success",
                type: "success",
            })
            getUserData();
        }
    )
}
const action = ref('add');
const dialogVisible = ref(false);
const formUser = reactive({
    name: '',
    age: '',
    sex: '',
    birth: '',
    address: ''
})
const rules = reactive({
    name: [
        { required: true, message: 'Please input name', trigger: 'blur' },
    ],
    age: [
        { required: true, message: 'Please input age', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: 'Please input sex', trigger: 'change' },
    ],
    birth: [
        { required: true, message: 'Please input birth' },
    ],
    address: [
        { required: true, message: 'Please input address' },
    ],
})
const handleClose = () => {
    dialogVisible.value = false;
    proxy.$refs['userForm'].resetFields();
}
const timeFormat = (time) => {
    let date = new Date(time);
    return date.getFullYear() + '-' +
        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}
const handleCancel = () => {
    dialogVisible.value = false;
    proxy.$refs['userForm'].resetFields();
}
const onSubmit = () => {
    proxy.$refs['userForm'].validate(async(valid) => {
        if (valid) {
            let res = null;
            formUser.birth = timeFormat(formUser.birth);
            console.log("8888",formUser.sex,formUser.name )
            formUser.sex = ((formUser.sex == "0") ? 1 : 0)
            if (action.value == 'add') {
                console.log("1");
                res = await proxy.$api.addUser(formUser);
                console.log(res);
                console.log("2");
                // getUserData();

            }
            else if (action.value == 'edit') {
                console.log("3");
                res = await proxy.$api.updateUser(formUser)
                // getUserData();

            }
            if (res) {
                console.log("9999", res);
                dialogVisible.value = false;
                proxy.$refs['userForm'].resetFields();
                await getUserData();
            }
        } else{
            ElMessage(
                {
                    showClose: true,
                    message: "fail",
                    type: "error",
                }
            );
        }
    })
}
onMounted(() => {
    getUserData();
})
</script>

<template>
    <div class="user-header">
        <el-button type="primary" @click="dialogVisible = true, action = 'add'">add</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="input">
                <el-input placeholder="input user name" v-model="formInline.keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">search</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :width="item.width ? item.width : 125"
                :prop="item.prop" :label="item.label" />
            <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                        Edit
                    </el-button>
                    <el-button link type="primary" size="small" @click="handleDelete(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" :title="action == 'add' ? 'add user' : 'edit user'" width="35%"
            :before-close="handleClose">
            <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="name" prop="name">
                            <el-input v-model="formUser.name" placeholder="please input user name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="age" prop="age">
                            <el-input v-model="formUser.age" placeholder="please input user age"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item class="select-clean" label="sex" prop="sex">
                            <el-select v-model="formUser.sex" placeholder="select user sex">
                                <el-option label="male" value="1"></el-option>
                                <el-option label="female" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="birth" prop="birth">
                            <el-date-picker v-model="formUser.birth" type="date" placeholder="please input user birth"
                                style="width: 100%;" />
                            <!-- <el-input v-model="formUser.birth" placeholder="please input user birth"></el-input> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="address" prop="address">
                            <el-input v-model="formUser.address" placeholder="please input user address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="justify-content: flex-end;">
                    <el-form-item>
                        <el-button type="primary" @click="handleCancel">cancel</el-button>
                        <el-button type="primary" @click="onSubmit">submit</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-dialog>
        <el-pagination class="pager" background layout="prev, pager, next" size="small" :total=config.total
            @current-change="handleCurrentChange" />
    </div>
</template>

<style scoped lang="less">
.user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table {
    position: relative;
    height: 520px;

    .pager {
        position: absolute;
        right: 10px;
        bottom: 30px;
    }

    .el-table {
        width: 100%;
        height: auto;
    }
}

.select-clean {
    display: flex;
}
</style>