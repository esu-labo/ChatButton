var channelName = 'echejp';
var token = '', tuid = '';
var twitch = window.Twitch.ext;
var buttonarray = 'お見事です,ミッション終了,おまえはもう、死んでいる,このクソボケカス,なんですって,駆逐してやる,何をやっている？,何の成果も得られませんでした,この死に急ぎ野郎が！,赤の扉を選ぶぞ,上からくるぞ,バトルドーム,ゴールにシュート,ちゅうもーーーく,何を寝言言ってる,もうダメだ,怠惰ですね,あなた、怠惰ですね,脳が震える,バカヤロオオオ,フザケルナアアア,やられたらやり返す,倍返し,百倍返し,土下座して,何これ,うわーん,こらえにこらえて,指パッチン,デデーン,ニュータイプ,レベルアップ';

var options = {
  //options: { debug: true },
  //connection: { reconnect: true, },
  identity: {
      username: "ChatButton",
      password: "oauth:sswsvus5v04dofay3mdeka8t60cqb0"
  },
  channels: ["#echejp"]
};

var client = new tmi.client(options);
client.on('connected', onConnectedHandler);
client.on('disconnected', onDisconnectedHandler);
client.connect();

/*************************************************************
イベント群
*************************************************************/

// ページが読み込み完了し、DOMの構築が完了した時点で実行される。
// $(document).ready(function() と同じ動作。
$(function() {
  exLog('Function Start');
  //var tmp = twitch.configuration.broadcaster;
  makeButton(buttonarray,'♪','');

  //twitch.rig.log('This is the config: ' + this.twitch.configuration.broadcaster);
  exLog('Function End');
});

// このコールバックは、拡張機能のコンテキストが起動されたときに発生します。
twitch.onContext(function(context) {
  exLog('onContext Start: '+ context);
  exLog('onContext End: '+ context);
});

// このコールバックは、JWTがリフレッシュされるたびに発生します
twitch.onAuthorized(function(auth) {
  exLog('onAuthorized Start');
  // save our credentials
  exLog('auth.channelId:' + auth.channelId);
  exLog('auth.clientId:' + auth.clientId);
  exLog('auth.token:' + auth.token);
  exLog('auth.userId:' + auth.userId);

  //setAuth(auth.token);

  try{
    getChannelName('236293500').done(function(result){
      exLog('api result:' + result);
    });
  }catch(e){
    exLog('Error: '+ e);
  }

  exLog('onAuthorized End');
});

twitch.configuration.OnChanged(()=>{
  let config = twitch.configuration.broadcaster ?
      twitch.configuration.broadcaster.content :
      [];
  try{
    config = JSON.parse(config);
    exLog('twitch.configuration: ' + config);
    target = document.getElementById("testPanel");
    target.innerHTML = config;
    client.say(channelName, 'configurationテスト');
  }catch(e){
    exLog('twitch.configuration: ' + e);
  }
  // Configuration 確認用
  //exLog('This is the config: ' + twitch.configuration.broadcaster);
  //target = document.getElementById("testPanel");
  //target.innerHTML = this.twitch.configuration.broadcaster;   

});

// botがtwitch chatに接続した際呼び出される
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// botがtwitch chatから接続解除した際呼び出される
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`);
  process.exit(1);
}


/*************************************************************
ヘルパー関数
*************************************************************/
function setAuth(token) {
  Object.keys(requests).forEach((req) => {
      exLog('Setting auth headers');
      requests[req].headers = { 'Authorization': 'OAuth ' + token }
  });
}

function getChannelName(channelId){
  /*
  curl -H 'Accept: application/vnd.twitchtv.v5+json' \
  -H 'Client-ID: uo6dggojyb8d6soh92zknwmi5ej1q2' \
  -X GET 'https://api.twitch.tv/kraken/channels/44322889'
  */
  return $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/channels/' + channelId,
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'huyfORahSRDruanJgRcHNO3sPphSCC',
      },
  });
}

function exLog(text){
  twitch.rig.log(text);
  console.log(text);
}

/*************************************************************
ユーザー関数
*************************************************************/

// クリップボードにtext文字列をコピーする。
function copyText(text){
	var ta = document.createElement("textarea")
	ta.value = text
	document.body.appendChild(ta)
	ta.select()
	document.execCommand("copy")
	ta.parentElement.removeChild(ta)
}

// カンマ区切りの文字列からボタン生成
function makeButton(text,frontText,backText){
  ary = text.split(',');

  // ボタン連続生成
  var $result = $('div#divbutton'),add = "";
  for (let i in ary){
    add += '<button id="id_' +i+ '" class="class_' +i+ '" value="' +frontText+ary[i]+backText+ '">' +ary[i]+ '</button> ';
  }
  $result[0].innerHTML = add;

  // 生成したボタンにイベント割り当て
  for (let i in ary) {
    var $button = $('#id_' + i);
    $button.on('click', function() {
      //copyText(this.getAttribute('value'));
      client.say(channelName, this.getAttribute('value'));
      toastr.info(this.getAttribute('value') + '<br>をチャットに送信しました');
    });
  }
}