# Обмен токенов

Модуль обмена токенов используется системными смарт-контрактами при необходимости
выполнить обмен между токенами в сети.

Задача модуля - предоставить курс для заданной пары токенов.

Модуль получает данные из системной децентрализованной биржи (DEX).
Также есть возможность подключения сторонних децентрализованных бирж.
Биржа может быть подключена только в результате голосования держателей [AST][1].

[1]: ../system-tokens/ace-stream-token.md