module.exports = {
    title: 'Easy-UI',
    description: '一个易用的UI组件库',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Guide', link: '/guide/'},
        ],
        sidebar: [
            {
                title: '入门',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                children: [
                    '/install/',
                    '/get-start/',
                ]
            },
            {
                title: '组件',
                collapsable: true,
                children: [
                    '/components/button',
                    '/components/tabs',
                    '/components/popover'
                ]
            }
        ]
    }
}