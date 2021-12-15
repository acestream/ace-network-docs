# Ace Deposit

## Description

Ace Deposit is a savings (deposit) account for the Ace Token System Tokens (XAT) with a floating rate.

The minimum guaranteed interest rate until January 1, 2023 is 12% per annum. This guarantee will be confirmed by a separate smart contract.

After that date, the “Ace Deposit” program will provide only a floating interest rate, depending on the emission volumes of inflation tokens and the total amount of deposits in the System.

## Interest rate calculation

Interest is accrued due to the emission of inflationary system tokens (XAT), by their proportional distribution among the holders of deposit accounts "Ace Deposit".

Algorithms inflation details are described [here][1]

The settlement period for deposits is 28 days.

The interest on the deposit for the previous billing period is updated once a week and is calculated using the following formula:

```python
targetDepositPercent = inflationPool.amount / totalDepositTokens * 100
```

where

- `targetDepositPercent` - interest on the deposit for the previous billing period (28 days)
- `inflationPool.amount` - the number of tokens in the inflation pool at the time the smart contract is launched (this is the volume of inflation tokens that go into distribution for the previous billing period)
- `totalDepositTokens` - the total number of tokens on accounts participating in the "Ace Deposit" program


## Terms and conditions of Ace Deposit

To participate in the "Ace Deposit" program, you need to deposit Ace Token (XAT) to a specialised account of your personal wallet called "Ace Deposit".

Tokens generated as a result of inflation are proportionally distributed among the participants of the "Ace Deposit" program under the conditions described below.

Inflation tokens are distributed between accounts on which tokens have been deposited for at least 28 full days. This means that during the specified period, there was no movement of tokens on the account. The deposit condition is checked at the moment of launching the smart contract [Ace Deposit][2].

Generated as a result of inflation XAT fall into the system pool [`inflationPool`][3] and are distributed by the smart contract [Ace Deposit][2] at the time of its next launch.

Smart contract [Ace Deposit][2] is launched automatically once every 7 days and performs the following operations:

- finds all deposit accounts on which tokens have not moved for at least 28 days at the time the smart contract was launched (let's call these accounts `targetDepositAccounts`)
- credits tokens to these accounts according to the formula:

    ```python
    targetDepositAmount = accountDepositTokens *
        (inflationPool.amount / totalDepositTokens)
    ```

    where

    - `targetDepositAmount` - the number of tokens to be credited to a specific account
    - `inflationPool.amount` - number of tokens in the inflation pool
    - `totalDepositTokens` - total number of tokens on accounts `targetDepositAccounts`
    - `accountDepositTokens` - the number of tokens on a specific account

Each account on which interest has been accrued can receive the next accrual no earlier than 28 days later.

The deposited tokens are not transferred to other people's accounts and are at the full disposal of their owners. Tokens can be withdrawn from the "Ace Deposit" account at any time, however, the deposit condition will be violated and interest will not be credited to this account within the framework of the program at the next launch of the [Ace Deposit] smart contract[2]. For example, if the owner of the tokens withdrew them from the deposit account after 35 days, then only the full 28 days will be taken into account, and 7 days will not be taken into account.

[1]: ../system-tokens/ace-token.md
[2]: ../list-of-operations/ace-deposit.md
[3]: ../glossary/system-pools.md#inflationpool
