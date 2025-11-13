# ディレクトリツリー表示ツール

Node.js で実装した CLI ツールです。指定したディレクトリを再帰的に解析し、コンソールにツリー構造を表示します。`node_modules` や `.git` などの一般的に非表示とするディレクトリは名前のみを表示し、それ以下の階層は探索しません。

## 必要環境
- Node.js 18 以降を推奨

## 使い方
1. ルートディレクトリで依存関係のインストールは不要です。
2. 任意のディレクトリを対象に以下のいずれかのコマンドを実行してください。

```bash
# 直接実行
node tree.js <directory>

# 実行権限を付与済みの場合
./tree.js <directory>

# npm scripts 経由で引数を渡す場合
npm start -- <directory>
```

出力例:

```bash
$ node tree.js .
/path/to/project
|-- package.json
`-- tree.js
```

## 備考
- 指定したパスが存在しない場合はエラーを表示して終了します。
- ディレクトリ内のファイルとフォルダは名前順（フォルダが先）で表示されます。
# dir-tree-viewer
