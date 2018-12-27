<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 产品</el-breadcrumb-item>
				<el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">

			<el-steps :active="step" class="step" align-center>
				<el-step title="基本信息" description=""></el-step>
				<el-step title="行程亮点" description=""></el-step>
				<el-step title="体验介绍" description=""></el-step>
				<el-step title="轻松行程" description=""></el-step>
				<el-step title="费用说明" description=""></el-step>
				<el-step title="预定须知" description=""></el-step>
			</el-steps>

			<transition name="fade">
				<router-view class="view"></router-view>
			</transition>

			<el-button style="margin-top: 12px; margin-left: 50px" v-show="preStep" @click.native.prevent="handlePreStep">上一步</el-button>
			<el-button style="margin-top: 12px; margin-left: 50px;" v-show="nextStep" @click.native.prevent="handleNextStep">下一步</el-button>
			<el-button style="margin-top: 12px; margin-left: 50px" v-show="publish" @click.native.prevent="handlePublish">发布</el-button>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'

	export default {
		name: 'productdetail',
		data: function() {
			return {
				isRouter: false,
				step: 1,
				preStep: false,
				nextStep: true,
				publish: false,
				options: [{
						value: 'guangdong',
						label: '广东省',
						children: [{
								value: 'guangzhou',
								label: '广州市',
								children: [{
										value: 'tianhe',
										label: '天河区'
									},
									{
										value: 'haizhu',
										label: '海珠区'
									}
								]
							},
							{
								value: 'dongguan',
								label: '东莞市',
								children: [{
										value: 'changan',
										label: '长安镇'
									},
									{
										value: 'humen',
										label: '虎门镇'
									}
								]
							}
						]
					},
					{
						value: 'hunan',
						label: '湖南省',
						children: [{
							value: 'changsha',
							label: '长沙市',
							children: [{
								value: 'yuelu',
								label: '岳麓区'
							}]
						}]
					}
				],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: true,
					type: ['步步高'],
					resource: '小天才',
					desc: '',
					options: []
				},
			}
		},
		methods: {
			handlePreStep() {
				console.log('handlePreStep');
				this.$router.go(-1);
				this.step--;
				this.goStep(this.step);
				$('html,body').animate({
					scrollTop: 0
				}, 500);
			},
			handleNextStep() {
				console.log('handleNextStep');
				this.$router.push('/detail/step' + (this.step + 1));
				var _this = this;
				setTimeout(function() {
					if (_this.isRouter) {
						_this.step++;
						_this.goStep(_this.step);
					}
				})
				$('html,body').animate({
					scrollTop: 0
				}, 500);
			},
			goStep(n) {
                console.log("step:" + n);
				switch (n) {
					case 1:
						this.preStep = false;
						this.nextStep = true;
						this.publish = false;
						break;
					case 2:
                    case 3:
                    case 4:
						this.preStep = true;
						this.nextStep = true;
						this.publish = false;
						break;
					case 5:
						this.preStep = true;
						this.nextStep = false;
						this.publish = true;
						break;
				}
			},
			handlePublish: function() {
				console.log('发布');
			},
		},
		watch: {
			'$route': function(to, from) {
				this.isRouter = true;
			}
		}
	}
</script>

<style scoped>
	.container {
		margin-left: 50px;
		margin-right: 50px;
	}

	.view {
		margin-top: 50px;
		margin-left: 80px;
	}
</style>
