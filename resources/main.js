!function(){var n={userInfo:{account:"",loginType:1,nickname:"",head:"",skey:""}},t=navigator.userAgent.match(/MicroMessenger/),e=function(n){var t,e,i,o={};{if(!(n.indexOf("?")>=0))return o;n=n.split("?")[1]}for(e=n.split("&"),t=0;t<e.length;t++)i=e[t].split("="),o[i[0]]=i[1];return o}(window.location.search);if(t)if(e.code){var i={};i.code=e.code,$.get("https://interactive.html5.qq.com/getWXInfo",i,function(t){if(0==t.code){t.data;n.userInfo.nickname=t.data.nickname,n.userInfo.head=t.data.headimgurl,n.userInfo.account=t.data.openid,n.userInfo.unionid=t.data.unionid,n.userInfo.skey=t.data.access_token,n.userInfo.loginType=2,_sdi.share.init({img_url:"http://res.imtt.qq.com/nazhao/wx/resources/image/share-logo.png",link:"http://res.imtt.qq.com/nazhao/wx/index.html",desc:"跟着兴趣走下去",title:"探索星空，快来发现命名属于你的星球！"},function(n){},function(n){});var e={time:Date.now(),value:n.userInfo};window.localStorage&&localStorage.setItem("wxUserInfo",JSON.stringify(e))}else o()})}else o();function o(){var n={};n.state=e.state||"",n.url=encodeURIComponent(window.location.href),$.get("https://interactive.html5.qq.com/OAuth",n,function(n,t,e){0===n.code&&window.location.replace(n.data)})}var c="?v=01131730";Image.prototype.load=function(n,t,e){var i=this,o=new XMLHttpRequest;o.open("GET",n,!0),o.responseType="arraybuffer",o.onload=function(n){var t=new Blob([this.response]);i.src=window.URL.createObjectURL(t),e&&e()},o.onprogress=function(n){i.completedPercentage=parseInt(n.loaded/n.total*100),t&&t(i.completedPercentage)},o.onloadstart=function(){i.completedPercentage=0},o.send()},Image.prototype.completedPercentage=0;var a,u,s,r,f,l=function(n,t){setTimeout(function(){var e="resources/"+n,i=new Image;i.src=e,i.complete?t&&t():i.onload=function(){t&&t(),i.onload=null}},100)},d=function(n,t,e){document.querySelector(".sec-wrap.gif_"+n+" .gif-wrap img").load("resources/gif/"+n+".gif"+c,t,e)},p=function(n,t){var e=$(".sec-wrap.gif_"+n);e.show(),b.hide(),t&&t(e)},m=function(n,t){var e=$(".sec-wrap.gif_"+n);e.css("z-index","1").hide(),t&&setTimeout(function(){e.find("img").removeAttr("src").attr("src","resources/gif/"+n+".gif"+c)})},w=function(){var n=$(window).width(),t=$(window).height(),e=t/n,i=417/235,o=$("#gif_style");if(i>e){o.html(".sec-wrap img {width: 100%;}")}else{o.html(".sec-wrap img {width: "+t/i+"px;}")}},g=function(){var n=$(".process .percent-num");d("1",function(t){n.text(t)},function(){var n;y(),document.querySelector(".process").style.display="none",(n=$("#music")).attr("src","resources/mp3/Infinite_Space.mp3"),"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?document.addEventListener("WeixinJSBridgeReady",function(){n[0].play()},!1):n[0].play(),setTimeout(function(){l("image/qqliulanqi.png"),l("image/icon_dot.png"),l("image/icon_star.png"),d("2",null,function(){d("3"),d("4"),d("5",null,function(){v("2"),d("6",null,function(){v("5"),d("7"),d("8"),d("9",null,function(){v("6"),d("10",null,function(){v("9"),d("11"),d("12"),d("13",null,function(){v("10"),d("14",null,function(){v("13"),d("15"),d("16"),d("17",null,function(){v("14"),d("18",null,function(){v("17"),d("19"),d("20"),d("21",null,function(){v("18"),d("22",null,function(){d("23",null,function(){v("21"),d("24",null,function(){d("25",null,function(){v("23")})})})})})})})})})})})})})})})})},h=function(n){var t=n.find(".text");t.css("opacity","0"),t.animate({opacity:1},4e3)},v=function(n){$(".sec-wrap.gif_"+n+" a.btn.fun.loading").hide(),$(".sec-wrap.gif_"+n+" a.btn.fun.loaded").show()},b=(u=-1,s=[{t:12,start:0,end:110,unit:"千米",width:74},{t:10,start:0,end:58e6,unit:"千米",width:124},{t:9,start:0,end:16e3,unit:"光年",width:96},{t:9,start:16e3,end:2e4,unit:"光年"},{t:15,start:0,end:3e8,unit:"光年",width:138},{t:6,start:3e8,end:6e9,unit:"光年"}],{increase:function(){u++,clearInterval(a);var n=0,t=s[u],e=t.t,i=t.start,o=(t.end-i)/e,c=$(".instance-text");t.width&&setTimeout(function(){c.css("width",t.width+"px")},333.33),a=setInterval(function(){if(n<e){i+=o,n++;var r=function(n){for(var t=(n=""+n).length-3;t>0;t-=3)n=n.substring(0,t)+","+n.substr(t);return n}(Math.round(i))+t.unit;c.text(r+"左右")}else clearInterval(a),u>=s.length-1&&f()},333.33),r()},show:r=function(){$(".instance-wrap").show()},hide:f=function(){$(".instance-wrap").hide()}}),y=function(){p(1,function(n){var t=n.find(".text.a"),e=n.find(".text.b");n.find(".text").css("opacity","0"),t.animate({opacity:1},4e3,function(){t.animate({opacity:0},2e3,function(){e.animate({opacity:1},4e3,function(){e.animate({opacity:0},2e3)})})})}),setTimeout(function(){m(1),p(2,function(n){b.increase()})},14040)},_=function(){p(5,function(n){h(n)})},k=function(){p(9,function(n){h(n)})},x=function(){p(13,function(n){h(n)})},I=function(){p(17,function(n){h(n)})},T=function(){p(21,function(n){h(n)})},q=function(n){n.css({zIndex:3,opacity:1})},z=function(){$(".pop-wrap").css({zIndex:1,opacity:0})};$(document).ready(function(){g(),w(),$(window).resize(function(){w()}),$(".music-wrap .music-btn.on").click(function(){$(this).removeClass("show"),$(".music-wrap .music-btn.off").addClass("show"),$("#music")[0].pause()}),$(".music-wrap .music-btn.off").click(function(){$(this).removeClass("show"),$(".music-wrap .music-btn.on").addClass("show"),$("#music")[0].play()}),$(".sec-wrap.gif_2 .btn.fun.a.loaded").click(function(){m(2),p(3),setTimeout(function(){m(3,!0),p(4),setTimeout(function(){m(4,!0),_()},1040)},1080)}),$(".sec-wrap.gif_5 .btn.fun.b.loaded").click(function(){m(5),p(6,function(n){b.increase()})}),$(".sec-wrap.gif_6 .btn.fun.a.loaded").click(function(){m(6),p(7),setTimeout(function(){m(7,!0),p(8),setTimeout(function(){m(8,!0),k()},1080)},1080)}),$(".sec-wrap.gif_9 .btn.fun.b.loaded").click(function(){m(9),p(10,function(n){b.increase()})}),$(".sec-wrap.gif_10 .btn.fun.a.loaded").click(function(){m(10),p(11),setTimeout(function(){m(11,!0),p(12),setTimeout(function(){m(12,!0),x()},2070)},1080)}),$(".sec-wrap.gif_13 .btn.fun.b.loaded").click(function(){m(13),p(14,function(n){b.increase()})}),$(".sec-wrap.gif_14 .btn.fun.a.loaded").click(function(){m(14),p(15),setTimeout(function(){m(15,!0),p(16),setTimeout(function(){m(16,!0),I()},1e3)},2e3)}),$(".sec-wrap.gif_17 .btn.fun.b.loaded").click(function(){m(17),p(18,function(n){b.increase()})}),$(".sec-wrap.gif_18 .btn.fun.a.loaded").click(function(){m(18),p(19),setTimeout(function(){m(19,!0),p(20),setTimeout(function(){m(20,!0),T()},90)},1080)}),$(".sec-wrap.gif_21 .btn.fun.b.loaded").click(function(){m(21),p(22,function(){b.increase()}),setTimeout(function(){m(22),p(23,function(n){b.show(),setTimeout(function(){b.hide()},500),h(n)})},2e3)}),$(".sec-wrap.gif_23 .btn.fun.b.loaded").click(function(){m(23),p(24,function(n){var t=n.find(".text");t.css("opacity","0"),t.animate({opacity:1},1e3)})}),$(".sec-wrap.gif_24 .gif-wrap").click(function(){m(24),p(25,function(){setTimeout(function(){z(),q($(".pop-wrap.name"))},4030)})}),$(".sec-wrap.gif_25 .pop-wrap.name .pop-btn-name").click(function(){z(),q($(".pop-wrap.form"))}),$(".sec-wrap.gif_25 .pop-wrap.form .form-submit").click(function(){!function(){var t=$(".pop-wrap.form .form-input").val().trim();if(t.length>0)if(function(n){for(var t=0,e=0;e<n.length;e++)n[e].charCodeAt()>128?t+=2:t++;return!(t>20)}(t)){_sdi.share.init({img_url:"http://res.imtt.qq.com/nazhao/wx/resources/image/share-logo.png",link:"http://res.imtt.qq.com/nazhao/wx/index.html",desc:"快来探索发现你的守护星",title:n.userInfo.nickname+"正在星际穿越，还发现了"+t+"星！"},function(n){},function(n){});var e=$(".pop-wrap.result"),i=[3,5,8,10,15,18][Math.floor(6*Math.random())];e.find(".star-name").text(t),e.find(".star-instance").text(i),z(),q(e),$(".music-wrap").hide()}else alert("抱歉，字符长度超限制，请按命名规则输入。");else alert("请为星球命名")}()})})}();