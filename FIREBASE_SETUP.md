# Firebase 設定手順（認証 + ノートのクラウド保存）

NoteDesk は Firebase Authentication でログインし、Cloud Firestore にノートを保存します。同じアカウントで別PCからログインすると、同じノートが表示されます。

## 必要な設定

1. Firebase プロジェクトを作成
2. Authentication で Google とメール/パスワードを有効化
3. Firestore Database を作成
4. このリポジトリの `firestore.rules` を Firestore ルールへ公開
5. `firebase-config.js` に Firebase Console の設定値を入れる
6. GitHub Pages のドメイン `yamako822.github.io` を承認済みドメインに追加

## Firestore 保存先

```text
users
  └── （ユーザーID）
        └── notes
              └── （ノートID）
                    ├── title
                    ├── body
                    ├── tags
                    ├── notebook
                    ├── type
                    ├── archived
                    ├── attachments
                    ├── favorite
                    ├── pinned
                    ├── reminderAt
                    └── updatedAt
```

## ルール反映

Firebase CLI が使える場合:

```powershell
firebase deploy --only firestore:rules
```

Firestore Consoleから設定する場合は、`firestore.rules` の内容をコピーして **公開** してください。

## 動作確認

1. NoteDeskでログイン
2. ノートを1件保存
3. 別ブラウザまたは別PCで同じアカウントにログイン
4. 保存したノートが表示されれば成功

## よくあるエラー

| 症状 | 対処 |
|------|------|
| ノートの読み込みに失敗 | Firestoreを作成したか、ルールを公開したか確認 |
| `permission-denied` | ルールが最新か、ログイン中か確認 |
| メール登録できない | Authenticationでメール/パスワードを有効化 |
| Googleログインだけ動く | Firestoreとルール設定を確認 |

## 注意

添付はFirestoreドキュメントに保存するため、1件あたり軽量ファイルのみ対応しています。大きなファイル管理が必要になった場合は、Firebase Storage連携へ拡張してください。
