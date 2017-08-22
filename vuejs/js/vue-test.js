var vm = new Vue({
	el:"#app",
	data:{
		a:"bin",
		b:"<span>lv</span>",
		val:5,
		p1:true,
		p2:true,
	},
	filters:{
		fil1:function(val){
				var value = val.toString();
				return value.toUpperCase();
		}
	},
	computed:{
		reduce:function(){
			return this.val-3;
		}
	},
	methods:{
		reduce2:function(){
			return this.val-3;
		}
	}
})