# Ace Time (XAT)

**Ace Time (XAT)** - алгоритмический внутрисистемный токен, обеспеченный объемами потребляемого трафика, в соотношении к одному часу воспроизведения контента. Токенами Ace Time можно оплатить трафик для доставки 1 часа контента в Ace Stream P2P CDN, независимо от количества используемых ГБ.

Токены AceTime не находятся в свободном обороте, а выполняют исключительно техническую роль и служат для оптимизации взаиморасчетов, при создании токенизированных тарифных пакетов с привязкой ко времени.

## Эмиссия

Первоначальная эмиссия XAT отсутствует.

Эмиссия Ace Time выполняется автоматически во время инкапсуляции в другие токены, привязанные ко времени.
Например, при инкапсуляции в токены правообладателей в рамках протокола [Ace Maker][3].

Токены Ace Time создаются смарт-контрактом [AceTimeManager][2] в момент инкапсуляции.
Для создания одного токена Ace Time необходимо сжечь токены Ace Byte в объеме, который соответствует
текущему среднему уровню потребления трафика в сети Ace Stream, при воспроизведении 1 часа контента. Подробности алгоритма и примеры [здесь][1]


## Типы токенов Ace Time

Технически токен Ace Time представлен набором из нескольких токенов, каждый из которых привязан к определенному типу контента. На данный момент используется два типа токенов:

- **Ace Time Multimedia** - токен, которым можно оплатить трафик для доставки одного часа мультимедийного контента (аудио+видео)

- **Ace Time Audio** - токен, которым можно оплатить трафик для доставки одного часа аудио контента


[1]: ../traffic-payments/payments.md
[2]: ../list-of-operations/ace-time-manager.md
[3]: https://acemakerdao.com/
