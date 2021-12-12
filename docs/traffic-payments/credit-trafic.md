# Credit traffic 

==TODO: english version==

Each Ace Stream user has a "credit limit" of traffic in amount of 10 GB. This means that during settlements for traffic a user can consume traffic on credit if he does not have enough funds to pay for traffic. The creditors are the peers which provide traffic. The maximum total amount of credits for one user is 10 GB. If a user has exceeded his credit limit, then network peers stop sending traffic to him until the loan is paid back (in whole or in part).

The credit limit for each user is stored in the blockchain and is expressed as an integer from 0 to 10240 as this is the number of megabytes of traffic that a user can loan.

### Credit repayment 

Credit repayment is performed automatically by system smart contracts from the [account for paying for services][1] according to the [traffic payment][2] algorithm. The traffic price is calculated at the moment of  credit repayment.

### Technical implementation

The credit limit for an individual account is formed on the basis of two numbers stored in the main blockchain:

- system setting `traffic_credit_limit` - the maximum number of [traffic units][3] that can be loaned
- field `traffic_credit_used` of account it is an integer and the number of [traffic units][3] that the account took on credit. This field can only be changed by system smart contracts.

Credit limit formula:

```python
credit_limit = SystemSettings.traffic_credit_limit - account.traffic_credit_used
```

Information about the loans itself (who owes whom and how much) is stored in the second-level blockchains.

### Example

We introduce the following marks:

- `UserA` - is a new member of the Network: credit limit 10240, on account there is 0 tokens.
- `UserB`, `UserC`, `UserD` - are Network peers who provide traffic to UserA

Now let's look at an example of how these peers interact:

1. `UserA` receives 3 Gb (3072 Mb) of traffic from `UserB`. As `UserA` has no tokens, then he receives traffic on credit. This means that `UserA` has owed `UserB` 3072 Мb. `UserA` credit limit has decreased to  7168 (10240 - 3072).
2. `UserA` receives 7 Gb (7168 Мb) of traffic from UserС. As `UserA` has no tokens, then he receives traffic on credit. This means that `UserA` has owed `UserC` 7168 Мb. `UserA` credit limit has decreased to 0. `UserC` stops providing data to `UserA`, as he exceeded credit limit and cannot pay for traffic. 
3. `UserA` refills his paying for services account for 0.2 XAT.

    Current currency rate XAT/XAC: 1 XAT = 1 XAC.

    Current cost of 1 Gb traffic: 0.01 XAC.

    System smart contract covers `UserA` credits:

    - `UserB` receives 0.03 XAC (minus system commission) - payment for 3 Gb traffic which was given on credit
    - `UserC` receives 0.07 XAC (minus system commission) - payment for 7 Gb traffic which was given on credit
    - from `UserA` account writes off 0.1 XAT
    - UserA` credit limit `increased to 10240
4. `UserA` receives 15 GB (15360 MB) of traffic from `UserD`. The XAT/XAC rate and the traffic cost are the same as in point 3. `UserA` has 0.1 XAT on the account and this is enough to pay for 10 GB traffic. The remaining 5 GB of traffic `UserA` takes from` UserD` on credit:
    - `UserD` receives 0.1 XAC (minus system commission)
    - from `UserA` account writes off 0.1 XAT
    - `UserA` credit limit decreased to 5120
    - `UserA` has owed `UserD` 5 Gb traffic

[1]: ../glossary/special-accounts.md#_2
[2]: payments.md
[3]: ../glossary/traffic-unit.md
