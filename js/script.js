'use strict';

const topText = document.getElementById('topText'),// 上句ID取得
      bottomText = document.getElementById('bottomText'),// 下句ID取得
      author = document.getElementById('author'),// authorID取得
      btn = document.getElementsByClassName('btn'),// btnクラス(選択肢)取得
      hyakuText = document.getElementById('text'),// 句全体用ID取得(フェードインアニメ用)
      btnLength = btn.length;// 選択肢の数
      
function textAnime() {　// 句を表示の5秒後にフェードインアニメのクラスを外す
    hyakuText.classList.add('textAnime');
    function textDel() {
        hyakuText.classList.remove('textAnime');
    }
    setTimeout(textDel,3000);
};

// 句の配列順を乱数で設定
let randoms01 = [],// 乱数配列用の空の配列
    min01 = 0;// 繰り返し処理の初期値0

function intRandom01() {
    return Math.floor(Math.random() * 10);
};

while (min01 <= 9) {
    while(true) {
        let tmp = intRandom01();
        if(!randoms01.includes(tmp)) {
            randoms01.push(tmp);
            break;
        }
    }
    min01++;
};

// 解答選択肢の配列順を乱数で設定
let randoms02 = [],// 乱数配列用の空の配列
    min02 = 0;// 繰り返し処理の初期値0

function intRandom02() {
    return Math.floor(Math.random() * 10);
};

while (min02 <= 9) {
    while(true) {
        let tmp = intRandom02();
        if (!randoms02.includes(tmp)) {
            randoms02.push(tmp);
            break;
        }
    }
    min02++
};

// 問題・解答選択肢設定
let btnNum = 0,// 選択肢設定用　初期値0
    hyakuLength = hyaku.length,// 句の数
    i01 = 0,// 問題設定用乱数配列の番号　初期値0
    i02 = 0;// 選択肢設定用乱数配列の番号　初期値0

function quizSet() {
    textAnime();
    topText.textContent = hyaku[randoms01[i01]].kuTop;
    author.textContent = hyaku[randoms01[i01]].author;

    while (btnNum < btnLength) {
    btn[btnNum].textContent = answer[randoms02[i02]];
    i02++;
    btnNum++;
    };
}
quizSet();

// 各選択肢に正解・不正解メッセージを表示
let choiceIndex = 0;// 選択肢設定繰り返し処理用　初期値0
const sign = document.getElementById('sign');// 正解・不正解・終了メッセージ用ID取得

while (choiceIndex < btnLength) {
    btn[choiceIndex].addEventListener('click', function(e) {
    if (e.target.textContent === hyaku[randoms01[i01]].kuBottom) {
        bottomText.textContent = hyaku[randoms01[i01]].kuBottom;
        e.target.textContent = null;
        sign.classList.add('correct');
        sign.classList.remove('incorrect');
        bottomText.classList.add('borderDel');
    } else {
        sign.classList.remove('correct');
        sign.classList.add('incorrect');
    };
});
choiceIndex++;
};

// スタートボタン押下で次の問題へ・問題総数に達したら終了表示
const startButton = document.getElementById('startButton');// 次の一首へボタンID取得
let questionCount = 0;// 問題数(次の一首へ用)　初期値0

startButton.onsubmit = function() {
    sign.classList.remove('correct');
    sign.classList.remove('incorrect');
    bottomText.classList.remove('borderDel');
    questionCount++;
    i01++;
    if (bottomText.textContent !== null) {
        if (questionCount < hyakuLength) {
            bottomText.textContent = null;
            quizSet();
        } else {
            sign.classList.add('end');
            bottomText.classList.add('borderDel');
        }
    }
};
        
 