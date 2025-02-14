export default {
    getTableData: () => {
        return {
            code: 200,
            data: {
                tableData: [
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
                ]
            }
        }
    },
    getCountData: () => {
        return {
            code: 200,
            data: {
                countData: [
                    {
                        name: "today count",
                        value: 1234,
                        icon: "SuccessFilled",
                        color: "#2ec7c9",
                    },
                    {
                        name: "today not count",
                        value: 1234,
                        icon: "SuccessFilled",
                        color: "#2ec7c9",
                    },
                    {
                        name: "monthly count",
                        value: 1234,
                        icon: "SuccessFilled",
                        color: "#2ec7c9",
                    },
                    {
                        name: "monthly star count",
                        value: 1234,
                        icon: "SuccessFilled",
                        color: "#2ec7c9",
                    },
                ]
            }
        }
    },
    getChartData: () => {
        return {
            code: 200,
            data: {
                orderData: {
                    date: ["2019-01-01", "2019-02-01", "2019-03-01", "2019-04-01", "2019-05-01", "2019-06-01", "2019-07-01", "2019-08-01", "2019-09-01", "2019-10-01", "2019-11-01", "2019-12-01"],
                    data: [
                        {
                            iphone: 3000,
                            android: 1000,
                            xiaomi: 2000,
                            oppo: 1000,
                            vivo: 1000,
                            huawei: 1000
                        },
                        {
                            iphone: 1000,
                            android: 2000,
                            xiaomi: 1000,
                            oppo: 2000,
                            vivo: 1000,
                            huawei: 1000
                        },
                        {
                            iphone: 1000,
                            android: 2000,
                            xiaomi: 1000,
                            oppo: 2000,
                            vivo: 1000,
                            huawei: 1000
                        },
                        {
                            iphone: 1000,
                            android: 2000,
                            xiaomi: 1000,
                            oppo: 2000,
                            vivo: 1000,
                            huawei: 1000
                        },
                    ],
                },
                videoData: [
                    { name: "xiaomi", value: 1000 },
                    { name: "oppo", value: 1000 },
                    { name: "vivo", value: 1000 },
                    { name: "huawei", value: 1000 },
                    { name: "iphone", value: 1000 },
                    { name: "android", value: 1000 },
                ],
                userData: [
                    {
                        date: "周一",
                        new: 5,
                        active: 200
                    },
                    {
                        date: "周二",
                        new: 10,
                        active: 450
                    },
                    {
                        date: "周三",
                        new: 20,
                        active: 660
                    },
                    {
                        date: "周四",
                        new: 35,
                        active: 800
                    },
                    {
                        date: "周五",
                        new: 60,
                        active: 1500
                    },
                    {
                        date: "周六",
                        new: 80,
                        active: 2500
                    },
                    {
                        date: "周日",
                        new: 100,
                        active: 3000
                    },
                ]
            }
        }
    }
}