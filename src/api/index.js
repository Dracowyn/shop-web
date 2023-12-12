const ModuleFiles = import.meta.glob('./*/index.js', {eager: true});

// Api集合
const ApiList = [];

// 提取每个对象下的值 同步获取
Object.values(ModuleFiles).map(async (mod) => {
	if (mod.default) {
		Object.assign(ApiList, mod.default);
	}
});

// 让Vue应用继承接口服务 当使用use挂载时会自动调用install方法
ApiList.install = (app) => {
	// 把接口服务挂载到Vue原型上
	app.config.globalProperties.$api = ApiList;
}

export default ApiList;