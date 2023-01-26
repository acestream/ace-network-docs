# Список операций

Здесь описаны [операции][1], специфические для Ace Network.
Эти операции дополняют список [стандартных операций][2] Stellar.

Операции разделены на три логические группы: системные смарт-контракты, стандартные операции и операции оракулов.

Стандартные операции могут быть выполнены любым аккаунтом.

Операции оракулов могут быть выполнены только оракулами (это специальный тип аккаунта).

Особенности системных смарт-контрактов:

- могут быть запущены в сеть любым аккаунтом, но не чаще установленного интервала времени
- влияют на некое подмножество аккаунтов, не требуя при этом подписи каждого из затронутых аккаунтов


## Системные смарт-контракты

- [Ace Asset](ace-asset.md)
- [Ace Deposit](ace-deposit.md)
- [Distribute Subscriptions](distribute-subscriptions.md)
- [Inflation](inflation.md)
- [Purge Devices](purge-devices.md)
- [Purge Subscriptions](purge-subscriptions.md)
- [Reward Uploaders](reward-uploaders.md)
- [System Service Payment](system-service-payment.md)
- [User Service Payment](user-service-payment.md)
- [Traffic Price Manager](traffic-price-manager.md)

## Стандартные Операции

- [Add Device](add-device.md)
- [Buy Single Access](buy-single-access.md)
- [Buy Subscription](buy-subscription.md)
- [Remove Device](remove-device.md)

## Операции Оракулов

- [Add Rights Holder](add-rights-holder.md)

[1]: ../glossary/operations.md
[2]: https://developers.stellar.org/docs/start/list-of-operations/

