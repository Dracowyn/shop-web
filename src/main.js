import { createApp } from 'vue'
import App from './App.vue'

// 引入总路由
import Router from './router/index';

createApp(App)
.use(Router)
.mount('#app')