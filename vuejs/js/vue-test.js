var vm = new Vue({
	el:"#app",
	data:{
		a:"bin",
		b:"<span>lv</span>",
		val:5,
		p1:true,
		p2:true,
		showForm:true,
		obj1:{
			a:'i am a',
			b:'i am b',
			c:function(){
				return "i am c"
			},
		},
		ch1:[],
		rad:'',
		sel:[],
		lazy:"",
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
		},
		toggleS:function(){
			if(this.showForm){
				this.showForm = false;
			}
			else{
				this.showForm = true;
			}
		}
	}
})