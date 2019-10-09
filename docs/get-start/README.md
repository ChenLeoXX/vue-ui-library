# 快速上手
### 使用Vue-CLI创建项目
在`main.js`中引入全局使用的组件
```js
import Vue from 'vue';
import {vLoading} from 'ease-ui';
Vue.use(vLoading);
new Vue({
    el: '#app',
    render: h => h(App)
});
```

在Vue单文件组件中使用,引入对应组件即可
````js
import {vDate} from 'ease-ui'
````