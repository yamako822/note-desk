# 要望フォーム設定手順

NoteDesk の **要望を送る** ボタンは、Googleフォームの共有リンクを開きます。

## 1. Googleフォームを作る

1. https://forms.google.com/ を開く
2. 空白のフォームを作成
3. タイトルを `NoteDesk ご意見フォーム` にする
4. 種類、内容、返信用メールなどの質問を追加

## 2. 回答通知をオンにする

フォームの **回答** タブで、右上のメニューから **新しい回答についてのメール通知を受け取る** をオンにします。

## 3. フォームURLを設定する

フォーム右上の **送信** からリンクをコピーし、`feedback-config.js` の `formUrl` に貼り付けます。

```js
export const feedbackConfig = {
  formUrl: "https://docs.google.com/forms/d/e/xxxxxxxx/viewform",
};
```
