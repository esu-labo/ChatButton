var twitch = window.Twitch.ext;

//var buttonarray = 'お見事です,ミッション終了,おまえはもう、死んでいる,このクソボケカス,なんですって,駆逐してやる,何をやっている？,何の成果も得られませんでした,この死に急ぎ野郎が！,赤の扉を選ぶぞ,上からくるぞ,バトルドーム,ゴールにシュート,ちゅうもーーーく,何を寝言言ってる,もうダメだ,怠惰ですね１,怠惰ですね２,脳が震える,バカヤロオオオ,フザケルナアアア,１００倍返し,やられたらやり返す,倍返し,土下座して,何これ,うわーん,こらえにこらえて,指パッチン,デデーン,ニュータイプ,レベルアップ';
function getButtonArray(){ return buttonarray;};

/*************************************************************
イベント群
*************************************************************/

// ページが読み込み完了し、DOMの構築が完了した時点で実行される。
// $(document).ready(function() と同じ動作。
$(function() {
  twitch.rig.log('Function Start');
  setEvent();
  twitch.rig.log('Function End');
});

twitch.onContext((context) => {
  twitch.rig.log('onContext Start: ' +context);
  twitch.rig.log('onContext End: ' +context);
});

twitch.onAuthorized((auth) => {
  twitch.rig.log('onAuthorized Start');

  // Configuration 確認用
  twitch.configuration.set('broadcaster', '1.0', 'hello1,hello2');
  twitch.rig.log('Configuration '+twitch.configuration.broadcaster);
  target = document.getElementById("textConfig");
  target.innerHTML = this.twitch.configuration.broadcaster;
  
  twitch.rig.log('onAuthorized End');
});

twitch.configuration.OnChanged(()=>{
  let config = this.twitch.configuration.broadcaster ?
      this.twitch.configuration.broadcaster.content :
      [];
  try{
    config = JSON.parse(config);
    twitch.rig.log('twitch.configuration: ' + config);
  }catch(e){
    twitch.rig.log('twitch.configuration: ' + e);
  }
  // Configuration 確認用
  //twitch.rig.log('This is the config: ' + twitch.configuration.broadcaster);
  //target = document.getElementById("testPanel");
  //target.innerHTML = this.twitch.configuration.broadcaster;   

});

/*************************************************************
ヘルパー関数
*************************************************************/

/*************************************************************
ユーザー関数
*************************************************************/

function setEvent(){
  $('#btnConfigSave').on('click', function() {
    var state = { buttonAry : 'test1'};
    twitch.configuration.set('broadcaster', '1.0', JSON.stringify(state));

    twitch.rig.log('click save');
    twitch.rig.log('broedcaster: ' + twitch.configuration.broadcaster);
  });
}