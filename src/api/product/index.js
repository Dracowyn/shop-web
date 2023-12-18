const ModuleFiles = import.meta.glob('./*.js', {eager: true});

// Api集合
const ApiList = [];

// 提取每个对象下的值 同步获取
Object.values(ModuleFiles).map(async (mod) => {
	if (mod.default) {
		Object.assign(ApiList, mod.default);
	}
});

export default ApiList;
