$(document).ready(function () {
	var switchers = {
		"init": function(){
			if(get_os()=='ios'){ // ios
				// do not get push settings from ios page
			}else{
				// set default values
				set_default();
				$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div')
				.append("<button id='mainland_pushall' class='btn btn-large btn-success'>大陆全部推送</button>");
				$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div')
				.append("<button id='taiwan_pushall' class='btn btn-large btn-primary'>台湾全部推送</button>");
				$('#taiwan_pushall').click(function(event){
					start("2882303761517406955com.funapps.tw.cszj/2882303761517406953com.funapps.tw.cszjapk/\
2882303761517405280com.funapps.tw.cszj");
				});
				$('#mainland_pushall').click(function(event){
					start("2882303761517400838com.giu.rekoo.luta.anqu/2882303761517399818com.giu.rekoo.luta.mcszj/\
2882303761517385603com.giu.rekoo.luta.xunlei/2882303761517384281com.giu.rekoo.luta.ihiyo/\
2882303761517382149com.giu.rekoo.luta.tanzi/2882303761517377976com.giu.rekoo.luta.qifan/\
2882303761517377975com.giu.rekoo.bf_2015/2882303761517377974com.giu.rekoo.qike/\
2882303761517372446com.giu.rekoo.luta.chongchong/2882303761517370967com.giu.rekoo.luta.guchuan/\
2882303761517370966com.giu.rekoo.luta.jrtt/2882303761517370964com.giu.rekoo.luta.ad.xy/\
2882303761517370963com.giu.rekoo.luta.kugou/2882303761517370962com.giu.rekoo.luta.ad.itools/\
2882303761517370961com.giu.rekoo.luta.pptv/2882303761517370960com.giu.rekoo.luta.kaopu/\
2882303761517370748com.giu.rekoo.luta.wyx/2882303761517370253com.luta.mi/\
2882303761517370145com.giu.rekoo.luta.ouwan/2882303761517370142com.giu.rekoo.luta.m7xz/\
2882303761517370141com.giu.rekoo.luta.7xz/2882303761517369620com.giu.rekoo.luta.leshi/\
2882303761517369612com.giu.rekoo.luta.mz/2882303761517369609com.giu.rekoo.luta.mgw/\
2882303761517369321com.giu.rekoo.luta.guopan/2882303761517368791com.giu.rekoo.luta.youlong/\
2882303761517368790com.giu.rekoo.luta.lewan/2882303761517368788com.giu.rekoo.luta.douyu/\
2882303761517368455com.luta.ks.mi/2882303761517368344com.giu.rekoo.luta.gfan/\
2882303761517367447com.giu.rekoo.luta.sy37/2882303761517367057com.giu.rekoo.luta.ad.haima/\
2882303761517367056com.giu.rekoo.luta.youku/2882303761517367055com.giu.rekoo.luta.xcs/\
2882303761517367053com.giu.rekoo.luta.htc/2882303761517367046com.giu.rekoo.luta.ewan/\
2882303761517366852com.giu.rekoo.luta.paojiao/2882303761517366850com.giu.rekoo.luta.sj49you/\
2882303761517366843com.giu.rekoo.luta.ad.shuyou/2882303761517366835com.giu.rekoo.luta.yyw/\
2882303761517366812com.giu.rekoo.luta.dianhun/2882303761517366808com.giu.rekoo.luta.yy/\
2882303761517338363com.rekoo.luta/2882303761517328441com.giu.rekoo.luta.ppw/\
2882303761517328440com.giu.rekoo.luta.sina/2882303761517328439com.giu.rekoo.luta.nduo/\
2882303761517328437com.giu.rekoo.luta.nearme.yyh/2882303761517328436com.giu.rekoo.luta.pps/\
2882303761517328435com.giu.rekoo.luta.mumayi/2882303761517328433com.giu.rekoo.luta.sogou/\
2882303761517328432com.giu.rekoo.luta.muzhiwan/2882303761517328431com.giu.rekoo.luta.anzhi/\
2882303761517328429com.giu.rekoo.luta.wdj/2882303761517328428com.giu.rekoo.luta.dl/\
2882303761517328427com.giu.rekoo.luta.4399/2882303761517328426com.giu.rekoo.luta.vivo/\
2882303761517328425com.giu.rekoo.luta.coolpad/2882303761517328423com.giu.rekoo.luta.am/\
2882303761517328419com.giu.rekoo.luta.lenovo/2882303761517328391com.giu.rekoo.luta.huawei/\
2882303761517327340com.giu.rekoo.luta.nearme.gamecenter/2882303761517326475com.giu.rekoo.luta.mi/\
2882303761517326474com.giu.rekoo.luta.qh/2882303761517326473com.giu.rekoo.luta.bd/\
2882303761517326227com.giu.rekoo.luta.uc/2882303761517325888com.giu.lutainhouse/\
2882303761517325599com.giu.rekoo.luta.rk");
				});
				function start(target_ids){
					localStorage['target_ids'] = target_ids;
					// save current settings
					localStorage['settings_android'] = JSON.stringify(get_settings('android'));
					localStorage['settings_ios'] = JSON.stringify(gen_ios_settings($('#pushContent').val(), $("input[name='scheduledTime']").val()));
					localStorage['sended'] = "";
					// start sending
					localStorage['action'] = 'next';
					window.location.href = "http://dev.xiaomi.com/mipush/xmpush/app/applist";
				}
			}
		},
		"send": function(){
			set_settings(JSON.parse(localStorage['settings_'+get_os()]));
			$("#confirm_submit").click();
			function check_finished(){
				if ($("#promptSuccess > div.modal-header > button").is(":visible")){
					$("#promptSuccess > div.modal-header > button").click();
					var match = window.location.pathname.match(/[^/]+/g);
					localStorage['sended'] = localStorage['sended'] + "/" + match[3]+match[4];
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
				var match = elem.href.match(/[^/]+/g);
				var packageid = match[5]+match[6];
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
	function get_os(){
		if ($('.ios-container').is(':visible')){
			return 'ios';
		}else{
			return 'android';
		}
	}
	function set_default(){
		settings = [["#is-always-notify-in-bar",[["0",false]]],[".notifytype_check",[["u",true],["undefined",true],["u",true]]],["#pushtype_select",["notify"]],["#is-always-notify-in-bar",[["0",false]]],["#notifytype_input",["NaN"]],["#pushTitle",[""]],["#pushContent",[""]],["select[name=notifyEffectType]",["1"]],["input[name=push-time-type]",[["u",false],["undefined",false],["u",true],["undefined",false]]],[".expires-datepicker-input",["","2015-09-03 13:41"]],["#flow-control-checkbox",[["u",true]]],["input[name=notifyId]",["100"]],["input[name=apitype_select]",[["u",false],["undefined",false],["u",true],["undefined",false],["u",false],["undefined",false],["u",true],["undefined",false],["u",false],["undefined",false],["u",false],["undefined",false]]]];
		set_settings(settings);
	}
	function get_settings(type){
		var elems = {ios: [	"input[type=radio]",
							"textarea[name=description]",
							"input[name=badge]",
							"input[name=push-time-type]",
							"input[name=push-time-type-delay]",
							"input[name=scheduledTime]"],
					android: [	"#is-always-notify-in-bar",
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
								"input[name=apitype_select]"]};
		return elems[type].map(function(name){
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
	function gen_ios_settings(content, scheduledTime){
		return [["input[type=radio]",[["production",true],["sandbox",false],["broadcast",true],["topic",false],["regId",false],["alias",false],["userAccount",false],["select",false],["-1",true],["-2",false],["0",false],["0",false],["1",true],["2",false],["0",false],["1",true],["immediately",false],["delay",true],["broadcast",false],["topic",false],["regId",true],["alias",false],["userAccount",false],["select",false],["-1",true],["-2",false],["0",false],["immediately",true],["delay",false]]],["textarea[name=description]",[content,""]],["input[name=badge]",["1"]],["input[name=push-time-type]",[["immediately",false],["delay",true],["immediately",true],["delay",false]]],["input[name=push-time-type-delay]",[]],["input[name=scheduledTime]",[scheduledTime,"0"]]];
	}
	function do_action(actions){
		var action = localStorage['action'] ? localStorage['action'] : "init";
		actions[action]();
	}
	do_action(switchers);
});