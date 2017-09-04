const a = { template: '<div>aaaaaaaaaaaaaa</div>' }
const b = { template: '<div>bbbbbbbbbbbbbb</div>' }
const c = { template: '<div>cccccccccccccc</div>' }
const d = { template: '<div>dddddddddddddd</div>' }
const routes = [
	{ path: '/a', component: a },
	{
		path: '/b', components: {
			default: a,
			aa: c,
			bb: d,
			cc: b
		}
	},
]
const router = new VueRouter({
	routes
})
const app = new Vue({
	el: "#app",
	router
})
