(function() {
	var Global = {
			userInfo: {
					account: '',
					loginType: 1,
					nickname: '',
					head: '',
					skey: ''
			}
	};
	var ua = navigator.userAgent;
	var wechat = ua.match(/MicroMessenger/);
	var p = parseUrlQuery(window.location.search);
	if (wechat) {
			/*if (window.localStorage && localStorage.getItem('wxUserInfo')) {
					var wxUserInfo = JSON.parse(localStorage.getItem("wxUserInfo"));
					var time = wxUserInfo.time;
					var difftime = (Date.now() - parseInt(time)) / 1000;
					if (7100-difftime > 0) {
					Global.userInfo = wxUserInfo.value;
					} else {
							localStorage.removeItem("wxUserInfo");
							goOAuth();
					}
			} else {*/
					//参数中有code
					if (p.code) {
							var ajaxData = {};
							ajaxData.code = p.code;
							$.get('https://interactive.html5.qq.com/getWXInfo', ajaxData, function(result) {
									if (result.code == 0) {
											var data = result.data;
											Global.userInfo.nickname = result.data.nickname;
											Global.userInfo.head = result.data.headimgurl;
											Global.userInfo.account = result.data.openid;
											Global.userInfo.unionid = result.data.unionid;
											Global.userInfo.skey = result.data.access_token;
											Global.userInfo.loginType = 2;
											_sdi.share.init(
												{
													img_url : 'http://res.imtt.qq.com/nazhao/wx/resources/image/share-logo.png',
													link : 'http://res.imtt.qq.com/nazhao/wx/index.html',
													desc : '跟着兴趣走下去',    
													title : '探索星空，快来发现命名属于你的星球！'
												},
												function(opt) {},
												function(res) {}
											);									 
									// var data = result.data;
									// var nickname = '昵称=' + result.data.nickname;
									// var headimgurl = result.data.headimgurl;
									// var openid = 'openid=' + result.data.openid;
									// var sex = '性别=' + (result.data.sex == 1 ? '男' : '女');
									// var language = '语言=' + result.data.language;
									// var city = '城市=' + result.data.city;
									// var province = '省份=' + result.data.province;
									// var country = '国家=' + result.data.country;
									// var unionid = 'unionid=' + result.data.unionid;
									// $('#headimgurl').attr('src', headimgurl);
									// $('#nickname').text(nickname);
									// $('#sex').text(sex);
									// $('#openid').text(openid);
									// $('#language').text(language);
									// $('#city').text(city);
									// $('#province').text(province);
									// $('#country').text(country);
									// $('#unionid').text(unionid);
											var wxUserInfo = {
													time: Date.now(),
													value: Global.userInfo
											}
											if (window.localStorage) {
													localStorage.setItem('wxUserInfo', JSON.stringify(wxUserInfo));
											}
									} else {
											goOAuth();
									}
							});
					} else {
							goOAuth();
					}
			//}
	};
	//获取url参数
	function parseUrlQuery(url) {
			var query = {},
					i, params, param;
			if (url.indexOf('?') >= 0) url = url.split('?')[1];
			else return query;
			params = url.split('&');
			for (i = 0; i < params.length; i++) {
					param = params[i].split('=');
					query[param[0]] = param[1];
			}
			return query;
	};
	//去授权页面拿code
	function goOAuth() {
			var ajaxData = {};
			ajaxData.state = p.state || '';
			ajaxData.url = encodeURIComponent(window.location.href);
			//微信相关接口只有正式环境
			$.get('https://interactive.html5.qq.com/OAuth', ajaxData, function(result, status, xhr) {
					if (result.code === 0) {
							window.location.replace(result.data);
					}
			});
	}
	var gifVersion = '?v=03041434';

	// 加载音频
	var loadAudio = function() {

		var audio = $('#music');
		audio.attr('src', 'resources/mp3/Infinite_Space.mp3');

		// 判断是否微信浏览器
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			document.addEventListener("WeixinJSBridgeReady", function () {
				audio[0].play();
			}, false);
		}
		else {
			audio[0].play();
		}
	};

	Image.prototype.load = function(url, onProgress, onComplete){
		var self = this;
		var xmlHTTP = new XMLHttpRequest();
		xmlHTTP.open('GET', url,true);
		xmlHTTP.responseType = 'arraybuffer';
		xmlHTTP.onload = function(e) {
			var blob = new Blob([this.response]);
			self.src = window.URL.createObjectURL(blob);
			onComplete && onComplete();
		};
		xmlHTTP.onprogress = function(e) {
			self.completedPercentage = parseInt((e.loaded / e.total) * 100);
			onProgress && onProgress(self.completedPercentage);
		};
		xmlHTTP.onloadstart = function() {
			self.completedPercentage = 0;
		};
		xmlHTTP.send();
	};

	Image.prototype.completedPercentage = 0;

	// 加载图片
	var loadImg = function(imgPath, callback) {
		setTimeout(function() {
			var url = 'resources/' + imgPath;
			var img = new Image();
			img.src = url;
			if (img.complete) {
				if (callback) {
					callback();
				}
			}
			else {
				img.onload = function() {
					if (callback) {
						callback();
					}
					img.onload = null;
				};
			}
		}, 100);
	};

	// 加载gif图片
	var loadGif = function(gifName, onProgress, onComplete) {
		var img = document.querySelector('.sec-wrap.gif_' + gifName + ' .gif-wrap img');
		img.load('resources/gif/' + gifName + '.gif' + gifVersion, onProgress, onComplete);
	};

	// 显示图块
	var showSec = function(index, callback) {
		var sec = $('.sec-wrap.gif_' + index);
		sec.show();
		instance.hide();
		if (callback) {
			callback(sec);
		}
	};

	// 隐藏图块
	var hideSec = function(index, reloadImg) {

		var sec = $('.sec-wrap.gif_' + index);
		sec.css('z-index', '1').hide();
		if (reloadImg) {
			setTimeout(function() {
				sec.find('img').removeAttr('src').attr('src', 'resources/gif/' + index + '.gif' + gifVersion);
			});
		}
	};

	// 计算屏幕的尺寸以设置gif尺寸
	var setGifSize = function() {
		var winWidth  = $(window).width();
		var winHeight = $(window).height();
		var winScale = winHeight / winWidth;
		var gifScale = 417 / 235;
		var style = $('#gif_style');
		if (gifScale > winScale) {
			var width = winHeight / gifScale;
			style.html('.sec-wrap img {width: 100%;}');
		}
		else {
			var height = winWidth * gifScale;
			var marginTop = (winHeight - height) / 2;
			style.html('.sec-wrap img {width: ' + (winHeight / gifScale) + 'px;}');
		}
	};

	// 初始化
	var init = function() {
		var percentNum = $('.process .process-progress');
		loadGif('1', function(progress) {
			percentNum.text(progress + '%');
		}, function() {
			showSec1();
			document.querySelector('.process').style.display = 'none';
			loadAudio();
			setTimeout(function() {
				loadImg('image/qqliulanqi.png');
				loadImg('image/icon_star.png');
				loadGif('2', null, function() {
					loadGif('3');
					loadGif('4');
					loadImg('image/cd_milu.png');
					loadGif('5', null, function() {
						showGT('2');
						loadGif('4fan');
						loadGif('3fan');
						loadGif('6', null, function() {
							showGT('5');
							loadGif('7');
							loadGif('8');
							loadImg('image/cd_renche.png');
							loadGif('9', null, function() {
								showGT('6');
								loadGif('8fan');
								loadGif('7fan');
								loadGif('10', null, function() {
									showGT('9');
									loadGif('11');
									loadGif('12');
									loadImg('image/cd_chaoren.png');
									loadGif('13', null, function() {
										showGT('10');
										loadGif('12fan');
										loadGif('11fan');
										loadGif('14', null, function() {
											showGT('13');
											loadGif('15');
											loadGif('16');
											loadImg('image/cd_feipan.png');
											loadGif('17', null, function() {
												showGT('14');
												loadGif('16fan');
												loadGif('15fan');
												loadGif('18', null, function() {
													showGT('17');
													loadGif('19');
													loadGif('20');
													loadGif('21', null, function() {
														showGT('18');
														loadGif('20fan');
														loadGif('19fan');
														loadGif('22', null, function() {
															loadGif('23', null, function() {
																showGT('21');
																loadGif('24', null, function() {
																	loadImg('image/bg_blue.png');
																	loadImg('image/bg_white.png');
																	loadImg('image/bg_yellow.png');
																	loadImg('image/img_trai.png');
																	loadImg('image/img_kuang.png');
																	loadImg('image/insert_kuang.png');
																	loadImg('image/text_mingming.png');
																	loadImg('image/btn.png');
																	loadImg('image/botton_shengcheng.png');
																	showGT('23');
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	};

	// 探索流程中的文字及返回按钮显示
	var showJG = function(sec) {
		var text = sec.find('.text');
		text.css('opacity', '0');
		text.animate({opacity: 1}, 4000);
	};
	// 继续探索按钮显示
	var showGT = function(index) {
		$('.sec-wrap.gif_' + index + ' a.btn.fun.loading').hide();
		$('.sec-wrap.gif_' + index + ' a.btn.fun.loaded').show();
	};
	// cd动画
	var showCD = function(sec) {
		sec.find('.cd-wrap').addClass('flash');
	};

	// 距离
	var instance = (function() {

		var pos = -1, tt;

		var currency = function(num) {

			num = '' + num;
			for (var i = num.length - 3; i > 0; i -= 3) {
				num = num.substring(0, i) + ',' + num.substr(i);
			}
			return num;
		};

		var poses = [
			{t: 12, start: 0, end: 110, unit: '千米', width: 74},
			{t: 10, start: 0, end: 58000000, unit: '千米', width: 124},
			{t: 9, start: 0, end: 16000, unit: '光年', width: 96},
			{t: 9, start: 16000, end: 20000, unit: '光年'},
			{t: 15, start: 0, end: 300000000, unit: '光年', width: 138},
			{t: 6, start: 300000000, end: 6000000000, unit: '光年'}
		];

		var increase = function() {
			pos ++;
			clearInterval(tt);
			var i = 0;
			var obj = poses[pos];
			var times = obj.t;
			var instance = obj.start;
			var each = (obj.end - instance) / times;
			var instanceText = $('.instance-text');
			if (obj.width) {
				setTimeout(function() {
					instanceText.css('width', obj.width + 'px');
				}, 333.33);
			}
			tt = setInterval(function() {
				if (i < times) {
					instance = instance + each;
					i ++;
					var info = currency(Math.round(instance)) + obj.unit;
					instanceText.text(info + '左右');
				}
				else {
					clearInterval(tt);
					if (pos >= poses.length - 1) {
						_hide();
					}
				}
			}, 333.33);
			_show();
		};
		var _show = function() {
			$('.instance-wrap').show();
		};
		var _hide = function() {
			$('.instance-wrap').hide();
		};
		return {increase: increase, show: _show, hide: _hide};
	}());

	// 显示sec
	var showSec1 = function() {
		showSec(1, function(sec) {
			var textA = sec.find('.text.a');
			var textB = sec.find('.text.b');
			sec.find('.text').css('opacity', '0');
			textA.animate({opacity: 1}, 4000, function() {
				textA.animate({opacity: 0}, 2000, function() {
					textB.animate({opacity: 1}, 4000, function() {
						textB.animate({opacity: 0}, 2000);
					});
				});
			});
		});
		setTimeout(function() {
			hideSec(1);
			showSec(2, function(sec) {
				instance.increase();
			});
		}, 14040);
	};
	var showSec3 = function() {
		showSec(3);
		setTimeout(function() {
			hideSec(3, true);
			showSec(4);
			setTimeout(function() {
				hideSec(4, true);
				showSec5();
			}, 1040);
		}, 1080);
	};
	var showSec5 = function() {
		showSec(5, function(sec) {
			showJG(sec);
			showCD(sec);
		});
	};
	var showSec7 = function() {
		showSec(7);
		setTimeout(function() {
			hideSec(7, true);
			showSec(8);
			setTimeout(function() {
				hideSec(8, true);
				showSec9();
			}, 1080);
		}, 1080);
	};
	var showSec9 = function() {
		showSec(9, function(sec) {
			showJG(sec);
		});
	};
	var showSec11 = function() {
		showSec(11);
		setTimeout(function() {
			hideSec(11, true);
			showSec(12);
			setTimeout(function() {
				hideSec(12, true);
				showSec13();
			}, 2070);
		}, 1080);
	};
	var showSec13 = function() {
		showSec(13, function(sec) {
			showJG(sec);
			showCD(sec);
		});
	};
	var showSec15 = function() {
		showSec(15);
		setTimeout(function() {
			hideSec(15, true);
			showSec(16);
			setTimeout(function() {
				hideSec(16, true);
				showSec17();
			}, 1000);
		}, 2000);
	};
	var showSec17 = function() {
		showSec(17, function(sec) {
			showJG(sec);
			showCD(sec);
		});
	};
	var showSec19 = function() {
		showSec(19);
		setTimeout(function() {
			hideSec(19, true);
			showSec(20);
			setTimeout(function() {
				hideSec(20, true);
				showSec21();
			}, 90);
		}, 1080);
	};
	var showSec21 = function() {
		showSec(21, function(sec) {
			showJG(sec);
		});
	};
	var showSec22 = function() {
		showSec(22, function() {
			instance.increase();
		});
		setTimeout(function() {
			hideSec(22);
			showSec(23, function(sec) {
				instance.show();
				setTimeout(function() {
					instance.hide();
				}, 500);
				showJG(sec);
			});
		}, 2000);
	};

	// 最终命名流程
	var showNamePage = function(color) {
		$('.name-star-text').addClass(color);
		$('.name-page').show();
		$('.name-page .name-page-bg.' + color).show();
	};
	var showNameForm = function() {
		_hidePopWrap();
		_showPopWrap($('.pop-wrap.form'));
	};
	var checkNameLength = function(val) {
		var len = 0;
		for (var i = 0; i < val.length; i ++) {
			var vChar = val[i];
			if (vChar.charCodeAt() > 128) {
				len += 2;
			}
			else {
				len ++;
			}
		}
		if (len > 8) {
			return false;
		}
		return true;
	};
	var checkName = function(callback) {

		var name = $('.name-form-input input').val().trim();
		if (name.length > 0) {
			if (checkNameLength(name)) {
				callback(name);
			}
			else {
				alert('抱歉，字符长度超限制，请按命名规则输入。');
			}
		}
		else {
			alert('请为星球命名');
		}
	};
	var showNameResult = function() {
		var name = $('.name-form-input input').val().trim();
		if (name.length > 0) {
			if (checkNameLength(name)) {
				_sdi.share.init(
					{
						img_url : 'http://res.imtt.qq.com/nazhao/wx/resources/image/share-logo.png',
						link : 'http://res.imtt.qq.com/nazhao/wx/index.html',
						desc : '快来探索发现你的守护星',    
						title : Global.userInfo.nickname + '正在星际穿越，还发现了' + name + '星！'
					},
					function(opt) {},
					function(res) {}
				);
				var result = $('.name-result-text');
				var now = new Date();
				result.find('.name').text(name);
				result.find('.year').text(now.getFullYear());
				result.find('.month').text(now.getMonth() + 1);
				result.find('.date').text(now.getDate());
				result.find('.hour').text(now.getHours());
				result.find('.minute').text(now.getMinutes());
				result.find('.second').text(now.getSeconds());
				$('.name-result-page').show();
				$('.name-star-text').text(name);
			}
			else {
				alert('抱歉，字符长度超限制，请按命名规则输入。');
			}
		}
		else {
			alert('请为星球命名');
		}
	};
	var showPreview = function() {

		checkName(function(name) {

			$('.name-star-text').text(name);
		});
	};
	var showResult = function() {

		checkName(function(name) {

			var result = $('.name-result-text');
			var now = new Date();
			result.find('.name').text(name);
			result.find('.year').text(now.getFullYear());
			result.find('.month').text(now.getMonth() + 1);
			result.find('.date').text(now.getDate());
			result.find('.hour').text(now.getHours());
			result.find('.minute').text(now.getMinutes());
			result.find('.second').text(now.getSeconds());
			$('.name-form-page').hide();
			$('.name-result-page').show();
			$('.name-star-text').text(name);
			$('.canvas-page').show();
			html2canvas($('#canvas_area')[0]).then(function(canvas) {
				$('#result_image').attr('src', canvas.toDataURL());
			});
		});
	};

	var makeImage = function() {

		var canvas = document.getElementById('imageBoard');
	};

	$(document).ready(function() {

		init();
		setGifSize();
		$(window).resize(function() {
			setGifSize();
		});

		$('.music-wrap .music-btn.on').click(function() {
			$(this).removeClass('show');
			$('.music-wrap .music-btn.off').addClass('show');
			$('#music')[0].pause();
		});

		$('.music-wrap .music-btn.off').click(function() {
			$(this).removeClass('show');
			$('.music-wrap .music-btn.on').addClass('show');
			$('#music')[0].play();
		});

		$('.sec-wrap.gif_2 .btn.fun.a.loaded, .sec-wrap.gif_2 .btn-ball').click(function() {
			hideSec(2);
			showSec3();
		});
		$('.sec-wrap.gif_5 .btn.fun.b.loaded').click(function() {
			hideSec(5);
			showSec('4fan');
			setTimeout(function() {
				hideSec('4fan');
				showSec('3fan');
				setTimeout(function() {
					hideSec('3fan');
					showSec(6, function(sec) {
						instance.increase();
					});
				}, 1080);
			}, 1040);
		});

		$('.sec-wrap.gif_6 .btn.fun.a.loaded, .sec-wrap.gif_6 .btn-ball').click(function() {
			hideSec(6);
			showSec7();
		});
		$('.sec-wrap.gif_9 .btn.fun.b.loaded').click(function() {
			hideSec(9);
			showSec('8fan');
			setTimeout(function() {
				hideSec('8fan');
				showSec('7fan');
				setTimeout(function() {
					hideSec('7fan');
					showSec(10, function(sec) {
						instance.increase();
					});
				}, 1080);
			}, 1080);
		});

		$('.sec-wrap.gif_10 .btn.fun.a.loaded, .sec-wrap.gif_10 .btn-ball').click(function() {
			hideSec(10);
			showSec11();
		});
		$('.sec-wrap.gif_13 .btn.fun.b.loaded').click(function() {
			hideSec(13);
			showSec('12fan');
			setTimeout(function() {
				hideSec('12fan');
				showSec('11fan');
				setTimeout(function() {
					hideSec('11fan');
					showSec(14, function(sec) {
						instance.increase();
					});
				}, 1080);
			}, 2070);
		});

		$('.sec-wrap.gif_14 .btn.fun.a.loaded, .sec-wrap.gif_14 .btn-ball').click(function() {
			hideSec(14);
			showSec15();
		});
		$('.sec-wrap.gif_17 .btn.fun.b.loaded').click(function() {
			hideSec(17);
			showSec('16fan');
			setTimeout(function() {
				hideSec('16fan');
				showSec('15fan');
				setTimeout(function() {
					hideSec('15fan');
					showSec(18, function(sec) {
						instance.increase();
					});
				}, 2000);
			}, 1000);
		});

		$('.sec-wrap.gif_18 .btn.fun.a.loaded, .sec-wrap.gif_18 .btn-ball').click(function() {
			hideSec(18);
			showSec19();
		});
		$('.sec-wrap.gif_21 .btn.fun.b.loaded').click(function() {
			hideSec(21);
			showSec('20fan');
			setTimeout(function() {
				hideSec('20fan');
				showSec('19fan');
				setTimeout(function() {
					hideSec('19fan');
					showSec22();
				}, 1080);
			}, 90);
		});

		$('.sec-wrap.gif_23 .btn.fun.b.loaded, .sec-wrap.gif_23 .btn-ball').click(function() {
			hideSec(23);
			showSec(24, function(sec) {
				var text = sec.find('.text');
				text.css('opacity', '0');
				text.animate({opacity: 1}, 1000);
			});
		});

		$('.sec-wrap.gif_24 .anchor-wrap.a').click(function() {
			hideSec(24);
			showNamePage('blue');
		});
		$('.sec-wrap.gif_24 .anchor-wrap.b').click(function() {
			hideSec(24);
			showNamePage('white');
		});
		$('.sec-wrap.gif_24 .anchor-wrap.c').click(function() {
			hideSec(24);
			showNamePage('yellow');
		});

		$('.name-form-input input').focus(function() {
			$(this).css('background-position', '200px');
		});
		$('.name-form-input input').blur(function() {
			if ($(this).val().trim().length <= 0) {
				$(this).css('background-position', 'center');
			}
		});
		$('.name-page .name-form-preview').click(function() {
			showPreview();
		});
		$('.name-page .name-form-create').click(function() {
			showResult();
		});
	});
}());