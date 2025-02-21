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
        console.log(getBody)
        console.log("0000user:", List);
        const { name, page = 1, limit = 10 } = param2Obj(config.url);
        const mockList = List.filter((user) => {
            if (typeof(getBody.name) === 'string' && user.name.indexOf(getBody.name) === -1) return false;
            return true;
        });
        console.log("---------------")
        const pageList = mockList.filter(
            (item, index) =>
                index < limit * getBody.page && index >= limit * (getBody.page - 1)
        );
        return {
            code: 200,
            data: {
                total: mockList.length,
                items: pageList
            },
            msg:"OK"
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

    addUser: (config) => {
        let getBody = JSON.parse(config.body);
        console.log(getBody);
        if (!getBody.name){
            console.log('error');
            return {
                code:999,
                message: "error params!"
            }
        } else {
            List.unshift({
                id: Mock.Random.guid(),
                name: getBody.name,
                age: parseInt(getBody.age),
                birth: getBody.birth,
                sex: parseInt(getBody.sex),
                address: getBody.address,
            })
            console.log(List, "success");
            return {
                code: 200,
                data:List,
                message: "success"
            }
        }
    },
    updateUser: (config) => {
        let getBody = JSON.parse(config.body);
        console.log("getadit..", getBody)
        if (!getBody.id){
            return {
                code:999,
                msg: "error params!"
            }
        } else {
            List.some((user) => {
                if (user.id === getBody.id) {
                    user.name = getBody.name;
                    user.address = getBody.address;
                    user.age = parseInt(getBody.age);
                    user.sex = parseInt(getBody.sex);
                    user.birth = getBody.birth;
                    console.log(user, getBody)
                }
            })
            console.log("after ... list", List)
            return {
                code: 200,
                data: List,
                msg: "success"
            }

            // return "OK"
        }
    }

};