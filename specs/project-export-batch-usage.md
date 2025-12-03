# プロジェクト管理システム/期間内プロジェクト一覧出力バッチ - 使用方法

## 概要

Spaces内にアップロードされているExcel「プロジェクト管理システム/期間内プロジェクト一覧出力バッチ」について、そのプログラムの使用方法をまとめたドキュメントです。

このバッチプログラムは、プロジェクト管理システムにおける指定した期間内のプロジェクト一覧をExcel形式で出力します。

## 使用方法

### 1. Excelファイルのダウンロード

Spacesから対象となるExcelファイル「プロジェクト管理システム/期間内プロジェクト一覧出力バッチ」をダウンロードします。

### 2. パラメータの設定

必要に応じて、出力期間などのパラメータを設定します。

- パラメータ設定方法は、ファイル内のコメントや[パラメータシート]を参照してください。
- 出力ファイルパスやその他のプロパティも設定可能です。

### 3. バッチプログラムの実行

1. Excelマクロを有効化します
2. バッチプログラムを実行します

### 4. 出力結果の確認

実行後、指定期間内のプロジェクト一覧がExcelシートとして作成されます。

## バッチプログラム(Java)の主な実装ファイル

本バッチプログラムのJava実装は、以下のファイルで構成されています：

### 設定ファイル

- [ExportProjectsInPeriodConfig.java](https://github.com/Fintan-contents/spring-sample-project/blob/main/sourcecode/batch/src/main/java/com/example/batch/project/configuration/ExportProjectsInPeriodConfig.java)  
  バッチの設定を行うファイル

- [ExportProjectsInPeriodProperties.java](https://github.com/Fintan-contents/spring-sample-project/blob/main/sourcecode/batch/src/main/java/com/example/batch/project/configuration/ExportProjectsInPeriodProperties.java)  
  出力ファイルパスやプロパティを管理するファイル

### データアクセスとマッピング

- [ExportProjectsInPeriodMapper.java](https://github.com/Fintan-contents/spring-sample-project/blob/main/sourcecode/batch/src/main/java/com/example/batch/project/mapper/ExportProjectsInPeriodMapper.java)  
  データベースアクセス（プロジェクト抽出）を行うMapperファイル

- [ExportProjectsInPeriodItem.java](https://github.com/Fintan-contents/spring-sample-project/blob/main/sourcecode/batch/src/main/java/com/example/batch/project/item/ExportProjectsInPeriodItem.java)  
  CSV/Excelとのマッピングを定義するアイテムファイル

### テスト

- [ExportProjectsInPeriodTest.java](https://github.com/Fintan-contents/spring-sample-project/blob/main/sourcecode/batch/src/test/java/com/example/batch/project/ExportProjectsInPeriodTest.java)  
  バッチの自動テストファイル

## プロパティファイル

プロパティファイルの例は以下のパスにあります：

```
/sourcecode/batch/src/main/resources/properties/project/ExportProjectsInPeriod.properties
```

このファイルで、バッチの動作に必要な各種設定を行います。

## SpacesのExcel管理場所について

Excelテンプレートや出力サンプルは、各プロジェクトスペースに格納されている「プロジェクト管理システム/期間内プロジェクト一覧出力バッチ」ファイルを参照してください。

## 備考

### 事前確認事項

- バッチプログラムを実行する前に、必要な権限があるかを確認してください
- データベースへのアクセス権限が必要です
- 出力先ディレクトリへの書き込み権限が必要です

### 詳細情報

詳細な項目や仕様については、以下を確認してください：

- ファイル内のREADMEシート
- 各種コメント
- プロパティファイルの設定項目

### トラブルシューティング

問題が発生した場合は、以下を確認してください：

1. パラメータ設定が正しいか
2. データベース接続が正常か
3. 出力先ディレクトリが存在し、書き込み権限があるか
4. Excelマクロが有効化されているか

## 関連リソース

- [Fintan Spring Sample Project](https://github.com/Fintan-contents/spring-sample-project)
- プロジェクト管理システムドキュメント（Spaces内）
