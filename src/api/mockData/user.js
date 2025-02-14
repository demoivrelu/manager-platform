import Mock from "mockjs";

function param2Obj (url) {
	//提取url字符串的参数
	//比如：https://example.com?keyword=apple&page=1
	//search就是后面的参数
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	//将 URL 编码的查询参数字符串解析为一个 JavaScript 对象，方便进一步处理
	//{keyword:apple,page:1}
	//decodeURIComponent主要用于解码整个URL或URL组件中经过编码的部分
	return JSON.parse(
		'{"' +
		decodeURIComponent(search)
			.replace(/"/g, '\\"')
			.replace(/&/g, '","')
			.replace(/=/g, '":"') +
		'"}'
	)
}

let List = [];
const count = 100;
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock("@county(true)"),
            "age|18-60": 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1),
            state: Mock.Random.integer(0, 1),
            address: Mock.Random.city(true)
        })
    );
}

export default {
    getUserData: (config) => {
        let getBody = JSON.parse(config.body);
        const { name, page = 1, limit = 10 } = param2Obj(config.url);
        const mockList = List.filter((user) => {
            if (typeof(getBody.name) === 'string' && user.name.indexOf(getBody.name) === -1) return false;
            return true;
        });
        const pageList = mockList.filter(
            (item, index) =>
                index < limit * getBody.page && index >= limit * (getBody.page - 1)
        );
        return {
            code: 200,
            data: {
                total: mockList.length,
                items: pageList
            }
        };
    },

    deleteUser: (config) => {
        let getBody = JSON.parse(config.body);
        if (!getBody.id){
            return {
                code:999,
                message: "error params!"
            }
        } else {
            List = List.filter((user) => user.id !== getBody.id);
            return {
                code: 200,
                message: "success"
            }
        }
    },

};