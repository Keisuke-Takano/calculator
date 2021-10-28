

        // 履歴ディスプレイ表示関数

// id "history-value"のテキストのみを取得
function getHistory(){
    return document.getElementById("history-value").innerText;
}

// 仮引数をnumとし、innerTextに代入する(関数呼出時の引数に入る値がディスプレイに表示されるようになる)
function printHistory(num){
    document.getElementById("history-value").innerText = num;
}


        // メインディスプレイ表示関数

// id "output-value"のテキストのみを取得
function getOutput(){
    return document.getElementById("output-value").innerText;
}

// 仮引数をnum　innerTextに代入する(関数呼出時の引数に入る値がディスプレイに表示されるようになる)
function printOutput(num){

    //入力値が空の場合、
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    // 値がある場合　以下の書式設定関数を呼び出す
    else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}

//書式設定関数
function getFormattedNumber(num){

    // 10桁以上は入力できないよう制限
    if(num.length > 10){
        num = num.substr(0, 10);
    }

    // カンマをつける
    let n = Number(num);//Numberオブジェクトで文字列から数値に変換
    let value = n.toLocaleString("ja-JP");//数値.toLocale.String()で日本対応数字書式になり、文字列で返す
    return value;

}


//カンマを取り除き、数値に変換
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}



        // ボタンクリックイベント


        // 数字ボタンクリック

// 要素取得
let number = document.getElementsByClassName("number");

//クラス名"number"を持つ子要素を配列風に返されてる。よってfor文ですべての要素に以下の処理を適応させることが可

for(let i = 0;i < number.length;i ++){

    // クリック時
    number[i].addEventListener('click', function(){

        let output = reverseNumberFormat(getOutput()); //getOutput()関数をreverseNumberFormat関数の引数とする。(取得した要素を数値型に変換させ変数outputに代入)

        // outputが数字型だったら,outputにidを付け足す
        if(output != NaN){
            output = output+this.id; //thisにidプロパティを指定し、id名を取得(id名に数値を入れているため、数字が追加される)
            printOutput(output);//引数をoutputにしたPrintOutput関数を呼び出し(outputの値がディスプレイに表示させる)
        }
    });
}



        // 演算子、クリアボタン

let operator = document.getElementsByClassName("operator"); //ボタン内要素取得し、変数に代入

//クラス名"operator"を持つ子要素を配列風に返されてる。よってfor文ですべての要素に以下の処理を適応させることが可

for(let i = 0;i < operator.length;i ++){

    // ボタンクリック時
    operator[i].addEventListener('click', function(){

        // クリアボタンが押されたら、空文字列を引数としたディスプレイ表示関数を実行する(ディスプレイは空になる)
       if(this.id == "clear"){
           printHistory("");
           printOutput("");           
       }

        //クリア以外のボタンクリック時
       else{

            //要素取得関数呼出→変数代入
           let output = getOutput();
           let history = getHistory();

            //演算子連続入力回避 
            //履歴ディスプレイに値があるとき↓
            if(output == "" && history !=""){
                //履歴ディスプレイの値が数値でない場合(演算子である場合) 
                if(isNaN(history)){
                    history = history.substr(history.length); //historyの長さ分しか表示させない(結果として履歴表示ディスプレイには何も追加できない)           
                }
            }


            if(output != "" || history != ""){

                history = history+output;//計算式
                // alert(history);

               //=が押されたら
               if(this.id =="="){
                   let result = eval(history);//変数history　文字列で表された式をeval()メソッドで実行し、結果を変数resultに代入
                   printOutput(result);//引数にrusultを入れ、ディスプレイ表示関数実行
                   printHistory("");//履歴ディスプレイ関数には空文字列を引数とする(リセットする)
               }

              //演算子が押されたら(演算子をクリックすることで、入力した値がメインディスプレイから履歴ディスプレイに移行する)
               else{
                   history = history+this.id;//thisにidプロパティを指定し、id名を取得(id名に数値を入れているため、数字と演算子が追加される)
                   printHistory(history);//引数historyの履歴ディスプレイ関数を実行(履歴ディスプレイにて値を表示)
                   printOutput("");//メインディスプレイは空にする
               }
           }                
       }
    });
}




