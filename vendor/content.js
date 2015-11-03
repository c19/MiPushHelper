$(document).ready(function () {
	var switchers = {
		"init": function(){
			// set default values
			set_default();
			$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div')
			.append("<button id='mainland_pushall' class='btn btn-large btn-success'>大陆安卓全部推送</button>");
			$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div')
			.append("<button id='taiwan_pushall' class='btn btn-large btn-primary'>台湾安卓全部推送</button>");
			$('#taiwan_pushall').click(function(event){
				start("com.funapps.tw.cszj/com.funapps.tw.cszjapk");
			});
			$('#mainland_pushall').click(function(event){
				start("com.giu.rekoo.luta.anqu/com.giu.rekoo.luta.mcszj/com.giu.rekoo.luta.xunlei/com.giu.rekoo.luta.ihiyo/com.giu.rekoo.luta.tanzi/com.giu.rekoo.luta.qifan/com.giu.rekoo.bf_2015/com.giu.rekoo.qike/com.giu.rekoo.luta.chongchong/com.giu.rekoo.luta.guchuan/com.giu.rekoo.luta.jrtt/com.giu.rekoo.luta.ad.xy/com.giu.rekoo.luta.kugou/com.giu.rekoo.luta.ad.itools/com.giu.rekoo.luta.pptv/com.giu.rekoo.luta.kaopu/com.giu.rekoo.luta.wyx/com.luta.mi/com.giu.rekoo.luta.ouwan/com.giu.rekoo.luta.m7xz/com.giu.rekoo.luta.7xz/com.giu.rekoo.luta.leshi/com.giu.rekoo.luta.mz/com.giu.rekoo.luta.mgw/com.giu.rekoo.luta.guopan/com.giu.rekoo.luta.youlong/com.giu.rekoo.luta.lewan/com.giu.rekoo.luta.douyu/com.luta.ks.mi/com.giu.rekoo.luta.gfan/com.giu.rekoo.luta.sy37/com.giu.rekoo.luta.ad.haima/com.giu.rekoo.luta.youku/com.giu.rekoo.luta.xcs/com.giu.rekoo.luta.htc/com.giu.rekoo.luta.ewan/com.giu.rekoo.luta.paojiao/com.giu.rekoo.luta.sj49you/com.giu.rekoo.luta.ad.shuyou/com.giu.rekoo.luta.yyw/com.giu.rekoo.luta.dianhun/com.giu.rekoo.luta.yy/com.test.test/com.rekoo.luta/com.giu.rekoo.luta.ppw/com.giu.rekoo.luta.sina/com.giu.rekoo.luta.nduo/com.giu.rekoo.luta.nearme.yyh/com.giu.rekoo.luta.pps/com.giu.rekoo.luta.mumayi/com.giu.rekoo.luta.sogou/com.giu.rekoo.luta.muzhiwan/com.giu.rekoo.luta.anzhi/com.giu.rekoo.luta.wdj/com.giu.rekoo.luta.dl/com.giu.rekoo.luta.4399/com.giu.rekoo.luta.vivo/com.giu.rekoo.luta.coolpad/com.giu.rekoo.luta.am/com.giu.rekoo.luta.lenovo/com.giu.rekoo.luta.huawei/com.giu.rekoo.luta.nearme.gamecenter/com.giu.rekoo.luta.mi/com.giu.rekoo.luta.qh/com.giu.rekoo.luta.bd/com.giu.rekoo.luta.uc/com.giu.lutainhouse/com.xiaomi.mipushdemo/com.giu.rekoo.luta.rk");
			});
			function start(target_ids){
				localStorage['target_ids'] = target_ids;
				// save current settings
				localStorage['settings'] = JSON.stringify(get_settings());
				localStorage['sended'] = "com.luta.ks.mi/com.giu.lutainhouse/com.rekoo.luta";
				// start sending
				localStorage['action'] = 'next';
				window.location.href = "http://dev.xiaomi.com/mipush/xmpush/app/applist";
			}
		},
		"send": function(){
			set_settings(JSON.parse(localStorage['settings']));
			$("#confirm_submit").click();
			function check_finished(){
				if ($("#promptSuccess > div.modal-header > button").is(":visible")){
					$("#promptSuccess > div.modal-header > button").click();
					localStorage['sended'] = localStorage['sended'] + "/" + window.location.pathname.match(/[^/]+/g)[4];
					localStorage['action'] = 'next';
					window.location.href = "http://dev.xiaomi.com/mipush/xmpush/app/applist";
				}else{
					setTimeout(check_finished, 500);
				}
			}
			setTimeout(check_finished, 500);
		},
		"next": function(){
			var remains = $('#min-con > ul > li > a').filter(function(i, elem){
				var packageid = elem.href.match(/[^/]+/g)[6];
				return !localStorage['sended'].includes(packageid) && localStorage['target_ids'].includes(packageid);
			});
			if (remains.length){
				localStorage['action'] = 'send';
				window.location.href = remains[0].href.replace('enablepush?enable_details=1', 'message');
			}else{
				localStorage['action'] = 'init';
				console.log("finished");
			}
		}
	};
	function set_default(){
		set_settings([["#is-always-notify-in-bar",[["0",false]]],[".notifytype_check",[["u",true],["undefined",true],["u",true]]],["#pushtype_select",["notify"]],["#is-always-notify-in-bar",[["0",false]]],["#notifytype_input",["NaN"]],["#pushTitle",[""]],["#pushContent",[""]],["select[name=notifyEffectType]",["1"]],["input[name=push-time-type]",[["u",false],["undefined",false],["u",true],["undefined",false]]],[".expires-datepicker-input",["","2015-09-03 13:41"]],["#flow-control-checkbox",[["u",true]]],["input[name=notifyId]",["100"]],["input[name=apitype_select]",[["u",false],["undefined",false],["u",true],["undefined",false],["u",false],["undefined",false],["u",true],["undefined",false],["u",false],["undefined",false],["u",false],["undefined",false]]]]);
	}
	function get_settings(){
		var elems = [	"#is-always-notify-in-bar",
						".notifytype_check",
						"#pushtype_select",
						"#is-always-notify-in-bar",
						"#notifytype_input",
						"#pushTitle",
						"#pushContent",
						"select[name=notifyEffectType]",
						"input[name=scheduledTime]",
						"input[name=expires]",
						"input[name=push-time-type]",
						".expires-datepicker-input",
						"#flow-control-checkbox",
						"input[name=notifyId]",
						"input[name=apitype_select]"];
		return elems.map(function(name){
			return [name, $(name).map(function(i, item){
				if ("radio/checkbox".indexOf(item.type) > -1) {
					return [[item.value, item.checked]];
				}else{
					return item.value;
				}
			}).get()];
		});
	}
	function set_settings(settings){
		settings.map(function(pair, index){
			$(pair[0]).map(function(i, elem){
				if ("radio/checkbox".indexOf(elem.type) > -1) {
					elem.value = pair[1][i][0];
					elem.checked = pair[1][i][1];
					if (elem.checked && elem.type == 'radio'){
						elem.click();
					}
				}else{
					elem.value = pair[1][i];
				}
			});
		});
	}
	function do_action(actions){
		var action = localStorage['action'] ? localStorage['action'] : "init";
		actions[action]();
	}
	do_action(switchers);
});