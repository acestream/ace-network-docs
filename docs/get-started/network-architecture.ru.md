# Архитектура сети

В основе сети Ace Network лежит учет трафика, сгенерированного узлами сети во время просмотра контента, и времени просмотра. Трафик и время превращаются в токены, которые формируют экономику сети.

Сеть состоит из трех уровней.


## Первый уровень

Первый уровень - это основной блокчейн, который хранит системные настройки и смарт-контракты, информацию про аккаунты, токены и транзакции по перемещению токенов. Построен на базе Stellar с некоторыми надстройками. Основные изменения:

- возможность прямого взаимодействия с блокчейнами второго уровня
- добавлены новые операции для реализация смарт-контрактов Сети


## Второй уровень

Второй уровень - система блокчейнов, которые получают данные по трафику и времени от клиентских узлов (третьего уровня), выполняют валидацию и агрегацию данных, формируют транзакции для начисления токенов и выполняют эти транзакции в основном блокчейне. Для блокчейнов второго уровня мы используем свой форк Stellar, заточенный под учети трафика и времени. Мы оставили протокол консенсуса и архитектуру распределенной базы данных Stellar, но при этом добавили свои ledger entries и операции.

Второй уровень представляет собой набор блокчейнов, которые не связаны между собой, но каждый из которых связан с основным блокчейном. По сути это вариант шардинга сети с оффчейн конфигурацией. Каждая шарда (отдельный блокчейн второго уровня) отвечает за свое подмножество аккаунтов и занимается валидацией транзакций только по этим аккаунтам. Такая архитектура позволяет горизонтально масштабировать второй уровень для увеличения пропускной способности.

Архитектура сети не требует обмена данными между шардами - это значительно упрощает реализацию, поскольку нет необходимости в разработке протокола для общения между шардами.


## Третий уровень

Третий уровень - это сеть клиентских узлов ([Ace Stream Engine][1]), которая обеспечивает сбор данных по трафику и времени. В основе этого процесса лежит генерация транзакций между каждой парой узлов, обменивающихся данными между собой. Каждая такая транзакция подписывается обеими сторонами и содержит информацию по объему переданного трафика и времени просмотра.

Каждый узел третьего уровня содержит базу данных для хранения транзакций. Все узлы поддерживают между собой связь для обеспечения работы алгоритмов выявления фальсификации данных.

[1]: ../software/index.md#ace-stream-engine