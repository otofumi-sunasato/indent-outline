# Plain Text Outline Navigator

プレーンテキストのインデントを、VS Code のアウトラインビューで開閉・移動できる階層として表示します。元のファイルは変更しません。

## 2つの表示モード

用途に合わせて表示を切り替えられます。

- **全行表示**（`indentOutline.displayMode: allLines`、既定値）: 全行を表示し、文書全体を開閉できるコンパクトなビューにします。
- **見出し中心表示**（`indentOutline.displayMode: headingFocused`）: 内容にあたると思われる、子を持たないインデント行を隠して見出しを捉えやすくします。ルート行は常に表示されます。

どちらのモードでも空行はアウトラインに表示されません。

## 機能

- プレーンテキストのインデントから階層を作成します。
- タブとスペースに対応し、ドキュメントに対するエディターの `tabSize` 設定を使ってインデントを解釈します。
- 全行表示と見出し中心表示を切り替えられます。
- 元のテキストを変更しません。

## 使い方

1. 言語モードが `plaintext` のドキュメントを開きます。
2. 行頭にインデントを付けて、行を階層化します。
3. エクスプローラーの **アウトライン** を開き、階層の確認や移動をします。
4. `indentOutline.displayMode` で表示モードを選びます。

例:

```text
プロジェクト
    計画
        要件
            プランターが十分おける広さ、水はけが良い
        スケジュール
            1日目は掃除
            2日目は組み立て
    作業
        準備
        機能
```

### 全行表示

`indentOutline.displayMode` を `allLines` にした場合:

```text
プロジェクト
    計画
        要件
            プランターが十分おける広さ、水はけが良い
        スケジュール
            1日目は掃除
            2日目は組み立て
    作業
        準備
        機能
```

### 見出し中心表示

`indentOutline.displayMode` を `headingFocused` にした場合:

```text
プロジェクト
    計画
        要件
        スケジュール
    作業
```

## 拡張機能の設定

| 設定 | 既定値 | 説明 |
| --- | --- | --- |
| `indentOutline.displayMode` | `allLines` | `allLines` は全行を開閉できるコンパクトなビューで表示し、`headingFocused` は内容と思われる行を隠して見出しを捉えやすくします。 |
| `indentOutline.symbolKind` | `String` | アウトライン項目のアイコンを選択します。`String`、`Constant`、`Method`、`Number`、`Array`、`TypeParameter` から選べます。 |

インデントは、ドキュメントに対するエディターの `editor.tabSize` 設定に基づいて判定されます。`editor.tabSize` が `auto` の場合は 4 として扱います。

## 対応するドキュメント

言語モードが `plaintext` のドキュメントにアウトラインを表示します。
