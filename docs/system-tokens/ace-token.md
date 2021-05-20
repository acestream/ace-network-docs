# Ace Token (XAT)

Нативный токен сети, аналог XLM ([Lumen](https://developers.stellar.org/docs/issuing-assets/anatomy-of-an-asset/#lumens-xlm)) в сети Stellar.


## Эмиссия

В момент запуска сети выпускается 100,000,000,000 XAT. Из них:

- 90% блокируется (переводится в [`lockedPool`][1])
- 3% зачисляется на аккаунт, принадлежащий Ace Stream Foundation
- 7% переводится в [`unlockedPool`][2] (для распределения между держателями XAS)


## Инфляция
Новые XAT генерируются раз в неделю механизмом [инфляции][3].


## Разблокирование токенов

Токены из [`lockedPool`][1] разблокируются в момент сжигания аналогичного количества токенов в рамках механизма расчетов за системные услуги.

Разблокированные токены равномерно распределяются между держателями XAS. Это выполняется в два этапа:

- разблокирование выполняется переводом токенов из [`lockedPool`][1] в [`unlockedPool`][2]
- ближайший запуск операции [Ace Asset][4] распределяет содержимое [`unlockedPool`][2] между держателями XAS

[1]: ../glossary/system-pools.md#lockedpool
[2]: ../glossary/system-pools.md#unlockedpool
[3]: ../system-tokens/inflation.md
[4]: ../list-of-operations/ace-asset.md