# Программа «Ace Assets»

Ace Assets - это уникальная привилегированная программа. предоставляющая ее участникам права на получение [криптоактивов DAO Ace Stream][5].

## О правах на криптоактивы DAO Ace Stream

Участие в распределении системных токенов ([XAT][3]) и комиссионных сборов, получаемых DAO Ace Stream за услуги и сервисы, предоставляемые Сетью.


## Активация и деактивация программы Ace Assets

Для участия в программе «Ace Assets» необходимо наличие токена «Ace Asset» ([XAS][4]).

По умолчанию токен «Ace Asset» является служебным/утилитарным (utility) токеном, который дает своим владельцам доступ к услугам и сервисам Сети, а также дает права управления Сетью (см. описание токена [Ace Asset, XAS][4]).

Для получения прав на владение криптоактивами Сети и на участие в их распределении, нужно осуществить депонирование токенов «Ace Asset» на специализированном счете своего персонального кошелька, с одноименным названием Ace Asset, после чего эти токены будут автоматически привязаны к смарт-контакту [Ace Assets][2] и участвовать в данной программе.

Владелец токенов в любой момент времени может вывести их (частично либо полностью) из программы Ace Assets, переведя их на основной счет своего кошелька, и использовать для оплаты услуг и сервисов Сети, как базовые системные токены [XAT][3].

При осуществлении транзакции токены будут автоматически отключаться от программы «Ace Assets». Для ее возобновления получателю токенов нужно будет заново активировать программу Ace Assets в своем кошельке (как указано выше).


## Распределение криптоактивов

30% - на счет под управлением Ace Stream Foundation (некоммерческий фонд поддержки и развития Сети), из которых:

- 5% - на технологическое развитие и разработку программных продуктов
- 5% - маркетинговые программы
- 10% - airdrop, по программе стимулирования (поощрение и финансирование) создания и размещения эксклюзивного премиального контента в сети Ace Network
- 10% - благотворительные и некоммерческие проекты

70% - между участниками программы Ace Assets, пропорционально количеству их токенов, активированных в данной программе в течении 14 полных дней.

Распределение выполняет смарт-контракт [Ace Assets][2], который запускается один раз в сутки и выполняет следующие действия:

- находит все счета «Ace Asset», на которых токены не перемещались как минимум 14 дней на момент запуска смарт-контракта (название этих счетов: `assetTargetAccounts`)
- начисляет токены владельцам этих счетов по формуле:

    ```
    targetAssetAmount = accountAssetTokens * (assetPoolAmount / totalAssetTokens)
    ```

    где:

    - `targetAssetAmount` - количество токенов для зачисления
    - `assetPoolAmount` - суммарное количество токенов в таких системных пулах:
        - пул для аккумуляции комиссионных сборов за услуги, предоставляемые Сетью
        - пул для аккумуляции токенов [XAT][3], разблокированных с момента последнего запуска смарт-контракта Ace Asset
    - `totalAssetTokens` - общее количество токенов [XAS][4] на счетах assetTargetAccounts
    - `accountAssetTokens` - количество токенов [XAS][4] на конкретном счету

Следует отметить, что согласно условиям данного смарт-контракта, каждый счет Ace Asset участвует в распределении каждый день, начиная с 14-го дня депонирования.


[2]: ../list-of-operations/ace-asset.md
[3]: ../system-tokens/ace-token.md
[4]: ../system-tokens/ace-asset.md
[5]: ../library/crypto-assets-and-fees.md