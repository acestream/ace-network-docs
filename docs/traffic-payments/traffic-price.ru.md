# Цена трафика

Цена трафика в системе выражается в XAC и регулируется автоматически на основе уровня потребления трафика.

Уровень потребления трафика (`trafficRate`) - это отношение количества потребленного видеотрафика ко времени, затраченного на просмотр видеоконтента, в рамках всей Сети за все время ее работы.


## Алгоритм расчет цены

Изначально в код системы заложены такие константы:

```python
# Initial traffic price: 0.01 XAC per 1 Gb
initialTrafficPrice = 0.01

# Initial rate: 1 Gb per 1 hour expressed in bytes per second
initialTrafficRate = 298261 # bytes/s
```

Цена трафика расчитывается на основе этих констант и текущего уровня потребления трафика:

```python
trafficPrice = initialTrafficPrice * initialTrafficRate / currentTrafficRate
```

Текущий уровень потребления трафика (`currentTrafficRate`) является публично доступной информацией, которая хранится в блокчейне второго уровня.
Его значение обновляют валидаторы второго уровня в процессе обработки транзакций по обмену трафиком.
В расчетах учитывается только трафик, используемый для просмотра видео-контента по протоколу Ace Stream.

Первоначальная цена устанавливается компанией Ace Stream, исходя из собственного понимания и оценки рынка и определения конкурентоспособной цены интернет-трафика. После запуска Сети на дальнейшее формирование цены уже не сможет повлиять никто, и цена будет зависеть только от заложенных в систему алгоритмов автоматического расчета стоимости и реального рынка.


## Пример

Если текущий уровень потребления трафика будет составлять 600000 байт/с, то 1 Гб трафика будет стоить примерно 0.005 XAC. Формула рассчета:

```python
# approx. 0.005 XAC per 1 Gb
trafficPrice = 0.01 * 298261 / 600000 ~= 0.005
```