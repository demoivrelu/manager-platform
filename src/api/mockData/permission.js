import Mock from "mockjs";

export default {
    getMenu: (config) => {
        const { username, password } = JSON.parse(config.body);
        if (username === "admin" && password == "admin") {
            return {
                code: 200,
                data: {
                    menuList: [
                        {
                            path: "/home",
                            name: "home",
                            label: "Home",
                            icon: "house",
                            url: "Home",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "Mall",
                            icon: "video-play",
                            url: "Mall",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "User",
                            icon: "user",
                            url: "User",
                        },
                        {
                            path: "/other",
                            label: "Other",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "Page1",
                                    icon: "setting",
                                    url: "Page1",
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "Page2",
                                    icon: "setting",
                                    url: "Page2",
                                },
                            ],
                        },
                    ],
                    token:Mock.Random.guid(),
                    message: 'success!'
                },
            };
        }else if(username === "xiaoxiao" && password === "xiaoxiao"){
            return {
                code:200,
                data:{
                    menuList:[
                        {
                            path: "/home",
                            name: "home",
                            label: "Home",
                            icon: "house",
                            url: "Home",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "User",
                            icon: "user",
                            url: "User",
                        },
                    ]
                }
            }
        }else {
            return{
                code: -999,
                data:{
                    message: 'error'
                }
            }
        }
    },
};
