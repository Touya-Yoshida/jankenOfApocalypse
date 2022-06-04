let startScreen = document.getElementById('start_screen');//スタート画面部のコンテナ
let startButton = document.getElementById('start_button');//スタート画面のボタンの特定
let jankenField = document.getElementById('jankenField');//ジャンケンを行う画面部
let handAll = document.querySelectorAll('.hands');//手札の画像クラスの特定
let hGod = document.getElementById('god');//手札：神の特定
let hDevil = document.getElementById('devil');//手札：悪魔の特定
let hHUman = document.getElementById('human');//手札：人間の特定
let userResultHand = document.getElementById('userHand');//フィールドに出力するユーザーの手札
let cpuResultHand = document.getElementById('cpuHand');//フィールドに出力するCPUの手札
let target_message = document.getElementById('output_result');//displayをかけているメッセージ部の特定
let outResultMessage = document.getElementById('output_result');//勝敗メッセージ部の特定
let userCountWin = document.getElementById('userCountWin');//ユーザーの勝利数をカウントするメッセージ部の特定
let cpuCountWin = document.getElementById('cpuCountWin');//cpuの勝利数をカウントするメッセージ部の特定
let cpuHandArray = [];
let targetResult = document.getElementById('target_result');//勝敗決定時の画面部

//スタート画面
startButton.addEventListener('click', function () {
    startScreen.style.display = 'none';
    jankenField.style.display = 'flex';
}, false);

//画像のsrcを配列に格納
for (let i = 0; i < handAll.length; i++) {
    cpuHandArray[i] = handAll[i].children[0].src;
}
//ルール説明
const ruleButton = document.getElementById('ruleButton');
ruleButton.addEventListener('click', function () {
    alert(
        'これは、じゃんけんに似たゲームだ！\n下に表示されてる画像をクリックしてCPUと戦おう!\n先に5勝した方が勝ちだぞ!'
    );
}, false);

//クリック時の処理
let receiveCountResult = [];
for (let i = 0; i < handAll.length; i++) {
    handAll[i].addEventListener('click', function () {
        userResultHand.src = handAll[i].children[0].src;
        if (userResultHand.src !== '') {//空のsrc属性に値が代入された時、displayをblockにさせて表示できるようにする
            userResultHand.style.display = 'block';
        }
        let cpuNum = cpuRandomHand();//cpuの画像出力及びcpuのランダム数値をreturn
        receiveCountResult = checkResult(i, cpuNum);//勝敗判定の関数でカウントした結果を配列で受け取る
        outResult(receiveCountResult);
    }, false);
}

//配列に格納したsrcをランダムに出力&画像の表示
const cpuRandomHand = () => {
    //0~2までのランダムな数値を生成
    let randomNum = Math.floor(Math.random() * 3) + 0;
    cpuResultHand.src = cpuHandArray[randomNum];
    if (cpuResultHand.src !== '') {
        cpuResultHand.style.display = 'block';
    }
    return randomNum;
}

let countWin = 0;
let countLose = 0;
let countDraw = 0;
let countResultArray = [0, 0, 0];//勝敗のカウントをまとめた配列
const checkResult = (userNum, cpuNum) => {//←ここの引数の名前は何でもよい
    //勝ち判定
    if (((userNum === 0) && (cpuNum === 1)) || ((userNum === 1) && (cpuNum === 2)) || ((userNum === 2) && (cpuNum === 0))) {
        countWin++;
        userCountWin.innerHTML = countWin + '勝目';
    }
    if (((cpuNum === 0) && (userNum === 1)) || ((cpuNum === 1) && (userNum === 2)) || ((cpuNum === 2) && (userNum === 0))) {
        countLose++;
        cpuCountWin.innerHTML = countLose + '勝目';
    }
    if (userNum === cpuNum) {
        countDraw++;
    }
    countResultArray = [countWin, countLose, countDraw];
    return countResultArray;
}

//勝敗を判定する(先に5勝)関数
const outResult = (receiveCountResult) => {
    if (countWin === 5) {
        jankenField.style.display = 'none';
        targetResult.style.display = 'block';
        targetResult.style.backgroundImage = `url(/sources/win_img.png)`;
        outResultMessage.innerHTML = '勝利';
        outResultMessage.style.color = 'black';
        target_message.style.display = 'block';
        resetCount();
        moveStartScreen();
    }
    if (countLose === 5) {
        jankenField.style.display = 'none';
        targetResult.style.display = 'block';
        targetResult.style.backgroundImage = `url(/sources/lose_img.png)`;
        outResultMessage.innerHTML = '敗北';
        outResultMessage.style.color = 'red';
        target_message.style.display = 'block';
        resetCount();
        moveStartScreen();
    }
}

const resetCount = () => {
    countWin = 0;
    countLose = 0;
    countDraw = 0;
    userCountWin.innerHTML = '';
    cpuCountWin.innerHTML = '';
    countResultArray = [0, 0, 0];
    userResultHand.src = '';
    cpuResultHand.src = '';
}

//スタート画面に戻る関数
const moveStartScreen = () => {
    setTimeout(() => { //4秒後下記を実行
        targetResult.style.display = 'none'; //フィールド画面を閉じる
        startScreen.style.display = ''; //タイトル画面へ戻る
    }, 4000);
}