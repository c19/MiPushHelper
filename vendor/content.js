$(document).ready(function () {
	var switchers = {
		"init": function(){
			$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div')
			.append("<button class='btn btn-large btn-success'>全部推送</button>");
			$('body > div.main.myitems > div > div.android-container.push-container.ng-scope > form > div.control-group.mt26 > div > button.btn.btn-large.btn-success')
			.click(function(event){
				// save current settings
				localStorage['settings'] = JSON.stringify(get_settings());
				localStorage['sended'] = "com.luta.ks.mi/";
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
				return localStorage['sended'].indexOf(packageid) == -1;
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
	function get_settings(){
		var elems = [	"#pushtype_select",
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
						"input[name=notifyId]"];
		return elems.map(function(name){
			return [name, $(name).map(function(i, item){
				if (item.type == "radio") {
					return item.checked;
				}else{
					return item.value;
				}
			}).get()];
		});
	}
	function set_settings(settings){
		console.log(settings);
		settings.map(function(pair, index){
			$(pair[0]).map(function(i, elem){
				if (elem.type == 'radio') {
					elem.checked = pair[1][i];
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