import { createApp } from 'vue'
import App from './App.vue'

// 引入总路由
import Router from './router/index';
// 引入VantUI
import Vant from 'vant';

// 引入组件样式
import 'vant/lib/index.css';

createApp(App)
.use(Router)
.use(Vant)
.mount('#app')