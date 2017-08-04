var vm = new Vue({
	el:"#app",
	data:{
		a:"bin",
		b:"<span>lv</span>"
	},
	filters:{
		fil1:function(val){
				var value = val.toString();
				return value.toUpperCase();
		}
	}
})