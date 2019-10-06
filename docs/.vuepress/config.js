module.exports = {
    title: 'Easy-UI',
    base: '/easy-ui/',
    description: '一个易用的UI组件库',
    themeConfig: {
        nav: [
            {text: 'Github', link: 'https://github.com/ChenLeoXX/vue-ui-library'},
            {text: 'Guide', link: '/get-start/'},
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
                    {
                        title: '基础',
                        children: [
                            '/components/button',
                            '/components/buttongroup'
                        ]
                    },
                    {
                        title: '表单',
                        children: [],
                    },
                    {
                        title: '布局',
                        children: [
                            '/components/layout'
                        ]
                    },
                    {
                        title: '视图',
                        children: [
                            '/components/popover'
                        ]
                    },
                    {
                        title: '导航',
                        children: [
                            '/components/tabs',
                            '/components/pagenation',
                        ]
                    },
                    {
                        title: '其他',
                        children: []
                    }
                ]
            }
        ]
    },
    plugins: [
        ['demo-code', {
            onlineBtns: {
                codepen: false,
                jsfiddle: false,
                codesandbox: false,
            },
            showText: 'code',
            hideText: 'hide',
            styleStr: 'text-decoration: underline;',
            minHeight: 250,
            demoCodeMark: 'demo',
        }
        ]
    ],
}