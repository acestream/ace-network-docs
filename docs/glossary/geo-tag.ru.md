# Гео-метка

Гео-метка - это механизм опциональной привязки сессии воспроизведения контента к геопозиции без раскрытия персональных данных узла. В Ace Network данный механизм используется для оплаты доступа к контенту в премиум пулах, для которых в настройках биллинга используется привязка стоимости к геопозиции. Гео-метка идентифицирует минимально необходимую точность - страну.

Гео-метка представляет собой блок данных, который содержит код страны (ISO 3166) и подписан валидатором второго уровня сети. В контексте механизма гео-меток валидаторы второго уровня выступают в роли оракулов, которые выдают метки. Валидаторы используют открытую базы данных geoip для определения страны по ip-адресу узла, который запросил метку. В рамках процедуры запроса метки узел не передает валидатору никакие данные, кроме ip-адреса. Валидатор использует полученный ip-адрес одноразово для определения страны. Ip-адрес не сохраняется для дальнейшего использования.

Полученная от валидатора гео-метка привязывается к сессии воспроизведения контента и включается в транзакции, генерируемые клиентскими узлами. Обработка гео-меток выполняется на первом и втором уровнях.

Использование гео-меток является опциональным. На клиентском узле есть возможность отключить гео-метки.
При оплате доступа к контенту с разной ценой в зависимости от страны транзакции без гео-меток тарифицируются по максимальному тарифу.

<!-- TODO

## Пример

==TODO==
-->