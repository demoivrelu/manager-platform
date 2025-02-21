<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import { da } from "element-plus/es/locales.mjs";

const { proxy } = getCurrentInstance();
const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url);
};

// const tableData = ref([
//     {
//         name: "Java",
//         todayBuy: 100,
//         monthBuy: 200,
//         totalBuy: 300,
//     },
//     {
//         name: "Python",
//         todayBuy: 100,
//         monthBuy: 200,
//         totalBuy: 300,
//     },
// ]);

const tableData = ref([]);
const countData = ref([]);
const chartData = ref([]);
const observer = ref(null);
const tableLabel = ref({
    name: "Class",
    todayBuy: "today buy",
    monthBuy: "month buy",
    totalBuy: "total buy",
});

const xOptions = reactive({
    textStyle: {
        color: "#333",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category",
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
})

const pieOptions = reactive({
    tooltip: {
        trigger: "item",
    },
    legend: {},
    color: [
        "#0f78f4",
        "#a61d61",
        "#24a69a",
        "#5ab1ef",
        "#f4e241",
        "#5ab1ef",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3",
    ],
    series: [],
})

// axios({
//     url: '/api/home/getTableData/',
//     method: 'get'
// }).then(res=>{
//     console.log(res);
//     if (res.data.code == 200) {
//         tableData.value = res.data.data.tableData;
//     }
// })

const getTableData = async () => {
    const data = await proxy.$api.getTableData();
    // console.log(data);
    tableData.value = data.data.tableData;
};
const getCountData = async () => {
    const data = await proxy.$api.getCountData();
    console.log(data);
    countData.value = data.countData;
};
const getChartData = async () => {
    // const { orderData, videoData, userData } = await proxy.$api.getChartData().data;
    await proxy.$api.getChartData().then(res =>{
        console.log("logres @@@@", res)
        const { orderData, videoData, userData } = res.data
        xOptions.xAxis.data = orderData.date;
        xOptions.series = Object.keys(orderData.data[0]).map(val => {
            return {
                name: val,
                data: orderData.data.map(item => item[val]),
                type: 'line',
            }
        })
        const oneEchart = echarts.init(proxy.$refs['echart']);
        oneEchart.setOption(xOptions);
    
        xOptions.xAxis.data = userData.map(item => item.date);
        xOptions.series = [
            {
                name: 'new user',
                data: userData.map(item => item.new),
                type: 'bar',
            },
            {
                name: 'active user',
                data: userData.map(item => item.active),
                type: 'bar',
            },
        ]
        const twoEchart = echarts.init(proxy.$refs['userEchart']);
        twoEchart.setOption(xOptions);
    
        pieOptions.series = [
            {
                data: videoData,
                type: 'pie',
            }
        ];
        const threeEchart = echarts.init(proxy.$refs['videoEchart']);
        threeEchart.setOption(pieOptions);
    
        observer.value  = new ResizeObserver(() => {
            oneEchart.resize();
            twoEchart.resize();
            threeEchart.resize();
        });
    
        if (proxy.$refs['echart']) {
            observer.value.observe(proxy.$refs['echart']);
        }
    });
};
onMounted(() => {
    getTableData();
    getCountData();
    getChartData();
});
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 0px">
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
        <el-col :span="16" style="margin-top: 20px">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">￥{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="top-echart">
                <div ref="echart" style="height: 280px"></div>
            </el-card>
                <div class="graph">
                    <el-card>
                        <div ref="userEchart" style="height: 240px"></div>
                    </el-card>
                    <el-card>
                        <div ref="videoEchart" style="height: 240px"></div>
                    </el-card>
                </div>
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

    .user-table {
        margin-top: 20px;
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
            border-radius: 10px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 28px;
                margin-bottom: 10px;
                ;
            }

            .txt {
                font-size: 15px;
                text-align: center;
                color: #999;
            }
        }
    }
    .graph{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .el-card{
            width: 48%;
            height: 260px;

        }
    }
}
</style>
