import { createRouter, createWebHistory } from "vue-router";

// 定义存放路由集合的一个数组
const RouterList = [];

// 引入每个目录下的index.js文件
const ModuleFiles = import.meta.glob("./*/index.js", { eager: true });

console.log(ModuleFiles);

// 提取每个对象下的值 同步获取
Object.values(ModuleFiles).map(async (mod) => {
  if (mod.default) {
    RouterList.push(...mod.default);
  }
});

// 引入首页组件
import Home from "@/components/Home.vue";

// 把首页组件追加集合里
RouterList.push({
  path: "/",
  name: "Home",
  component: Home,
});

export default createRouter({
  history: createWebHistory(),
  routes: RouterList,
});
