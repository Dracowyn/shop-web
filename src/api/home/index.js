// 引入每个目录下的index.js文件
const ModuleFiles = import.meta.glob('./*.js', {eager: true})

// Api对象
const ApiList = {}

Object.values(ModuleFiles).map(async (mod) => {
	if (mod.default) {
		Object.assign(ApiList, mod.default);
	}
});

export default ApiList;