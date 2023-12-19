const Collection = [
	{
		path: 'collection/index',
		name: 'CollectionIndex',
		component: () => import('@/views/business/collection/index.vue'),
		meta: {
			auth: true
		}
	},
]

export default Collection;