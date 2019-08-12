module.exports = {
    title: 'Easy-UI',
    description: '一个易用的UI组件库',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Guide', link: '/guide/'},
            {text: 'External', link: 'https://google.com'},
        ],
        sidebar: [
            {
                title: '入门',   // 必要的
                path: '/get-start/',      // 可选的, 应该是一个绝对路径
                collapsable: false, // 可选的, 默认值是 true,
                children: []
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/button',
                    '/components/tabs',
                    '/components/popover'
                ]
            }
        ]
    }
}