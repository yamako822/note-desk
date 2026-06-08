# NoteDesk

既存のメモアプリを土台に発展させたノートアプリです。ノートブック、タグ、検索、Markdown、チェックリスト、添付、テンプレート、リマインダー、アーカイブ、エクスポートに対応しています。

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
- 自動下書き保存、前回開いていたノート復元
- PWAインストール対応

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
