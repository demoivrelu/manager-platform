/**
 * API management
 */
import request from "./request";

// homepage left table data
export default {
    getTableData() {
        return request({
            url: '/home/getTable',
            method: "get",
            // mock: false,
        })
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: "get",
            // mock: false,
        })
    },
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: "get",
            // mock: false,
        })
    },
    getUserData(data) {
        return request({
            url: '/home/getUserData',
            method: "get",
            data,
            // mock: false,
        })
    },
    deleteUser(data) {
        return request({
            url: '/user/deleteUser',
            method: "delete",
            data,
            // mock: false,
        })
    },
    addUser(data) {
        return request({
            url: '/user/addUser',
            method: "post",
            data,
            // mock: false,
        })
    },
    updateUser(data) {
        return request({
            url: '/user/updateUser',
            method: "post",
            data,
            // mock: false,
        })
    },
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: "post",
            data: params
            // mock: false,
        })
    }
}