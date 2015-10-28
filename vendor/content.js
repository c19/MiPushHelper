$(document).ready(function () {
	var switchers = {
		"init": function(){
			// set default values
			set_default();
			$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div')
			.append("<button class='btn btn-large btn-success'>全部推送</button>");
			$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div > button.btn.btn-large.btn-success')
			.click(function(event){
				// save current settings
				localStorage['settings'] = JSON.stringify(get_settings());
				localStorage['sended'] = "com.luta.ks.mi/com.giu.lutainhouse/com.rekoo.luta";
				// start sending
				switchers['send']();

			});
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
				return localStorage['sended'].indexOf(packageid) == -1 && elem.text.includes('Android 已启用') ;
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