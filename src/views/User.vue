<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue';
import {ElMessageBox, ElMessage} from 'element-plus';
const handleClick = () => {
    console.log('click')
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
    let data = await proxy.$api.getUserData(config);

    tableData.value = data.items.map(item => ({
        ...item,
        sex: item.sex === 0 ? 'male' : 'female'
    }));
    config.total = data.total;
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
        async() => {
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
onMounted(() => {
    getUserData();
})
</script>

<template>
    <div class="user-header">
        <el-button type="primary">new</el-button>
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
                    <el-button link type="primary" size="small" @click="handleClick">
                        Edit
                    </el-button>
                    <el-button link type="primary" size="small" @click="handleDelete(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
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
.table{
    position: relative;
    height: 520px;
    .pager{
        position: absolute;
        right: 10px;
        bottom: 30px;
    }
    .el-table{
        width:100%;
        height: auto;
    }
}
</style>