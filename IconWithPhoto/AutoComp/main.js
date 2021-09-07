

// ページが読み込まれたあとに行う
window.addEventListener("DOMContentLoaded", function(){
    // 郵便番号の入力が完了したら、バリデーションと自動補完を行う
    var zip = document.querySelector("#zip");
    zip.addEventListener("change", function(){
        /* ここでは次の4つの処理を行う
        1. 郵便番号がハイフンなし7桁で入力されている場合、ハイフンを補って郵便番号に出力する
        2. 郵便番号がフォーマット不正であれば、エラーメッセージを出力する
        3. 郵便番号のフォーマットが正しければ、郵便番号を基に住所をテキストボックスに出力する（TODO：dicZipAddrのマッピングを埋める）
        4. 郵便番号がdictZipAddrに存在しなければエラーを出す
        
        TODO：全角数字を半角数字に変換する
        TODO：エラーメッセージ、成功メッセージのCSSを作成する

        なお、特に制約がなければ1, 3を実現する既存の自動更新のライブラリが複数あるため、それらの使用を推奨
        dictZipAddrは郵便番号でソートされているため、二分探索などを用いて高速化可能だが、今回は実装しない
        */
        
        var zipValue = zip.value;

        // 1. 郵便番号がハイフンなし半角7桁で入力されている場合、ハイフンを補って郵便番号に出力する
        // 2. 郵便番号がフォーマット不正であれば、エラーメッセージを出力する   
        if(/[0-9]{7}$/.test(zipValue)){
            // 郵便番号がハイフンなし7桁の場合、ハイフンを補ってテキストボックスに出力する
            zipValue = zipValue.substring(0, 3) + "-" + zipValue.substring(3, 7);
            document.querySelector("#zip").value = zipValue;
        } else if(/[0-9]{3}-[0-9]{4}$/.test(zipValue)){
            // もともと正しいフォーマットの場合は何もしない
            console.log("デバッグ用。もともと正しい");
        } else {
            // それ以外は誤ったフォーマットなのでエラーメッセージを出力する
            zip.style.borderColor = "hotpink";
            zip.style.backgroundColor = "pink";
            document.querySelector("#zip-error").innerHTML = "半角数字7桁にハイフンを付けて入力してください";
            return;
        }

        // 郵便番号を基に住所を取得
        var addr = dictZipAddr[zipValue];

        if(typeof addr === "undefined"){
            // 4. 郵便番号がdictZipAddrに存在しなければエラーを出す
            zip.style.borderColor = "hotpink";
            zip.style.backgroundColor = "pink";
            document.querySelector("#zip-error").innerHTML = "範囲外です";
        } else {
            // 3. 郵便番号がdictZipAddrに存在すれば、住所をテキストボックスに出力する
            document.querySelector("#addr").value = addr;
            document.querySelector("#zip-error").innerHTML = "OK";
        }
    });
});


// 郵便番号と住所の対応は連想配列で管理している
// このデータは日本郵政からダウンロードし（て適当に前処理し）た
var dictZipAddr = {
    '100-0000' : '東京都千代田区',
    '102-0072' : '東京都千代田区飯田橋'
}

