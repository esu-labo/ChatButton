const tmi = require('tmi.js')

// 有効なコマンドは、以下で始まります。
let commandPrefix = '♪'
// 設定オプションを定義する：
let opts = {
  identity: {
    username: "SendMessage",
    password: 'oauth:' + "3pe3ywhrutautoxc6lc8jr0z33mmnx"
  },
  channels: ["#echejp"]
}

// Create a client with our options:
let client = new tmi.client(opts)

// botクライアントにイベントハンドラーを付与
//client.on('message', onMessageHandler) //SendMessageではパネルからメッセージを送るのでこれは使わない。
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

// twitchに接続する
client.connect()

// チャット欄にメッセージが来た時に呼ばれる
function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  // 先頭に識別子がなかったら無視
  if (msg.substr(0, 1) !== commandPrefix) {
    console.log(`[${target} (${context['message-type']})] ${context.username}: ${msg}`)
    return
  }

}

// botがtwitch chatに接続した際呼び出される
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

// botがtwitch chatから接続解除した際呼び出される
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`)
  process.exit(1)
}