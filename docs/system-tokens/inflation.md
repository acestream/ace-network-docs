# Инфляция

==TODO: english version==

Эмиссия инфляционных токенов XAT осуществляется еженедельно, в автоматическом режиме, согласно условиям смарт-контракта [Inflation][1] по следующей формуле:

```python
inflationAmount = (totalTokens - lockedTokens) * 0.000190721
```

где

- `inflationAmount` - объем еженедельной эмиссии
- `totalTokens` - общее количество XAT в системе на момент запуска операции инфляции (100 млрд. + общий объём инфляционных токенов от всех предыдущих эмиссий)
- `lockedTokens` - количество XAT, которые еще не выпущены в оборот (заблокированы в системном пуле [`lockedPool`][2])

Объем инфляции составляет 1% в год (либо 0.0190721% в неделю) от выпущенных в оборот XAT.

Сгенерированные в результате инфляции XAT переводятся в системный пул [`inflationpool`][3]
для дальнейшего распределения смарт-контрактом [Ace Deposit][3]

[1]: ../list-of-operations/inflation.md
[2]: ../glossary/system-pools.md#lockedpool
[3]: ../glossary/system-pools.md#inflationpool
[4]: ../list-of-operations/ace-deposit.md