const Collection = [
	{
		path: 'collection/index',
		name: 'CollectionIndex',
		component: () => import('@/views/business/base/Collection.vue'),
		meta: {
			auth: true
		}
	},
]

export default Collection;