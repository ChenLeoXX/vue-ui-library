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
                        children: [
                            '/components/input',
                            '/components/datepicker',
                            '/components/cascader'
                        ],
                    },
                    {
                        title: '布局',
                        children: [
                            '/components/layout',
                            '/components/grid'
                        ]
                    },
                    {
                        title: '视图',
                        children: [
                            '/components/popover',
                            '/components/collapse',
                            '/components/table',
                            '/components/toast',
                            '/components/slide'
                        ]
                    },
                    {
                        title: '导航',
                        children: [
                            '/components/tabs',
                            '/components/pagenation',
                            '/components/sticky',
                            '/components/menu',
                        ]
                    },
                    {
                        title: '其他',
                        children: [
                            '/components/expand',
                            '/components/loading',
                        ]
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