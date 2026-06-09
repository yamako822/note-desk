# NoteDesk

既存のメモアプリを土台に発展させたノートアプリです。ノートブック、タグ、検索、Markdown、チェックリスト、添付、テンプレート、リマインダー、アーカイブ、エクスポート、ブラウザAIに対応しています。

## 公開 URL

GitHub Pages:

```text
https://yamako822.github.io/note-desk/
```

ローカル試用版:

```text
https://yamako822.github.io/note-desk/local.html
```

## 主な機能

- ノート作成、編集、削除
- ノートブック分類、タグ、自動タグ
- ピン留め、お気に入り、検索、タグ絞り込み
- 日付ビュー、リマインダーあり、アーカイブ表示
- Markdown表示、見出し目次、本文内検索
- チェックリスト形式、テンプレート
- 添付画像・ファイル、ノート複製
- Markdown / TXT エクスポート
- Outlook向け `.ics` 予定ファイル出力
- ブラウザAIによるタイトル作成、要約、タグ提案、チェックリスト化、文章整形
- 自動下書き保存、前回開いていたノート復元
- PWAインストール対応

## ブラウザAI

- Chrome/Edgeなどの対応ブラウザで、端末内のAIを使います。
- 通常版Edgeでは、NoteDesk内の軽量ブラウザAIに自動切替して使えます。
- Microsoft公式のPrompt API対応環境では、ブラウザ内の言語モデルへ自動切替します。Edgeの場合はCanary/Dev 138.0.3309.2以降で `edge://flags` の「Prompt API for Phi mini」を有効化すると利用できます。
- ノート内容は外部APIへ送信しません。
- Prompt API利用時の初回は、ブラウザがAIモデルを準備するため、ダウンロードや数分の待ち時間が発生する場合があります。

## ログインと同期

- Google またはメール・パスワードでログインできます。
- ログイン時のノートは Firestore の `users/{uid}/notes` に保存されます。
- ローカルモードでは、このブラウザ内の `localStorage` だけに保存されます。

## ローカルで試す

```powershell
cd "C:\Users\8210627\Documents\note-desk"
node .\start-local-node.mjs
```

表示された `http://127.0.0.1:4173/` をブラウザで開きます。

## デプロイ

変更後はコミットして `main` に push します。GitHub Pages は `main` / `/ (root)` を参照します。
