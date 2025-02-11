<script setup>
import { ref } from "vue";
const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url);
};

const tableData = ref([
    {
        name: "Java",
        todayBuy: 100,
        monthBuy: 200,
        totalBuy: 300,
    },
    {
        name: "Python",
        todayBuy: 100,
        monthBuy: 200,
        totalBuy: 300,
    },
]);

const tableLabel = ref({
    name: "Class",
    todayBuy: "today buy",
    monthBuy: "month buy",
    totalBuy: "total buy",
});
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover" class="user-table">
                <div class="user">
                    <img :src="getImageUrl('user')" />
                    <div class="user-info">
                        <p class="user-info-admin">admin</p>
                        <p class="user-info-p">super admin</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>last login time:<span>2025-02-11</span></p>
                    <p>last login addr:<span>Hangzhou</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.el-card {
    border-radius: 18px;
}

.home {
    height: 100%;
    overflow: hidden;

    .user {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;

        img {
            width: 150px;
            height: 150px;
            border: solid;
            border-radius: 50%;
            margin-right: 40px;
            margin-bottom: 20px;
        }

        .user-info {
            p {
                line-height: 40px;
            }

            .user-info-p {
                color: #999;
            }

            .user-info-admin {
                font-size: 38px;
            }
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }
    .user-table{
        margin-top: 20px;
    }
}
</style>
