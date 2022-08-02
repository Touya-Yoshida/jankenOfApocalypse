 $(function (){
    let startScreen = $('#start_screen');//スタート画面部のコンテナ
    let startButton = $('#start_button');//スタート画面のボタンの特定
    let jankenField = $('#jankenField');//ジャンケンを行う画面部
    let handAll = $('.hands');//手札の画像クラスの特定
    let userResultHand = $('#userHand');//フィールドに出力するユーザーの手札
    let cpuResultHand = $('#cpuHand');//フィールドに出力するCPUの手札
    let target_message = $('#output_result');//displayをかけているメッセージ部の特定
    let outResultMessage = $('#output_result');//勝敗メッセージ部の特定
    let userCountWin = $('#userCountWin');//ユーザーの勝利数をカウントするメッセージ部の特定
    let cpuCountWin = $('#cpuCountWin');//cpuの勝利数をカウントするメッセージ部の特定
    let cpuHandArray = [];
    let targetResult = $('#target_result');//勝敗決定時の画面部

    //スタート画面
    $(startButton).on('click', function () {
        $(startScreen).css("display", "none")
        $(jankenField).css("display", "flex")
    });
    //画像のsrcを配列に格納
     for (let i = 0; i < handAll.length; i++) {
         cpuHandArray[i] = $(handAll).eq(i).children('img').prop('src')
     }
    //ルール説明
    const ruleButton = $('#ruleButton');
    $(ruleButton).on('click', function () {
        alert(
            'これは、じゃんけんに似たゲームだ！\n下に表示されてる画像をクリックしてCPUと戦おう!\n先に5勝した方が勝ちだぞ!'
        );
    });

    //クリック時の処理
    let receiveCountResult = [];
    for (let i = 0; i < handAll.length; i++) {
        $(handAll).eq(i).on('click', function () {
            $(userResultHand).prop('src',$(handAll).eq(i).children('img').prop('src'))
            if ($(userResultHand).prop('src') !== '') {//空のsrc属性に値が代入された時、displayをblockにさせて表示できるようにする
                $(userResultHand).css('display','block')
                //console.log(userResultHand.src)
            }
            let cpuNum = cpuRandomHand();//cpuの画像出力及びcpuのランダム数値をreturn
            receiveCountResult = checkResult(i, cpuNum);//勝敗判定の関数でカウントした結果を配列で受け取る
            outResult(receiveCountResult);
        });
    }

    //配列に格納したsrcをランダムに出力&画像の表示
    const cpuRandomHand = () => {
        //0~2までのランダムな数値を生成
        let randomNum = Math.floor(Math.random() * 3) + 0;
        //console.log(cpuHandArray)
        //cpuResultHand.src = $(cpuHandArray).eq(randomNum)
        $(cpuResultHand).prop('src',cpuHandArray[randomNum])
        if ($(cpuResultHand).prop('src') !== '') {
            $(cpuResultHand).css('display','block')
            console.log(cpuResultHand.src)
            
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
            $(userCountWin).html(countWin + '勝目')
        }
        if (((cpuNum === 0) && (userNum === 1)) || ((cpuNum === 1) && (userNum === 2)) || ((cpuNum === 2) && (userNum === 0))) {
            countLose++;
            $(cpuCountWin).html(countLose + '勝目')
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
            $(jankenField).css('display','none')
            $(targetResult).css('display','block')
            $(targetResult).css('backgroundImage',`url(https://github.com/Touya-Yoshida/jankenOfApocalypse/blob/main/sources/win_img.png?raw=true)`)
            $(outResultMessage).html('勝利')
            $(outResultMessage).css('color','black')
            $(target_message).css('display','block')
            resetCount();
            moveStartScreen();
        }
        if (countLose === 5) {
            $(jankenField).css('display','none')
            $(targetResult).css('display','block')
            $(targetResult).css('backgroundImage',`url(https://github.com/Touya-Yoshida/jankenOfApocalypse/blob/main/sources/lose_img.png?raw=true)`)
            $(outResultMessage).html('敗北')
            $(outResultMessage).css('color','red')
            $(target_message).css('display','block')
            resetCount();
            moveStartScreen();
        }
    }

    const resetCount = () => {
        countWin = 0;
        countLose = 0;
        countDraw = 0;
        $(userCountWin).html('')
        $(cpuCountWin).html('')
        countResultArray = [0, 0, 0];
        $(userResultHand).prop('src','')
        $(cpuResultHand).prop('src','') 
    }

    //スタート画面に戻る関数
    const moveStartScreen = () => {
        setTimeout(() => { //4秒後下記を実行
            $(targetResult).css('display','none') //フィールド画面を閉じる
            $(startScreen).css('display','block') //タイトル画面へ戻る
        }, 4000);
    }
});