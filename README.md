# Stader Labs audit details
- Total Prize Pool: $100,000 USDC
    - High/Medium awards: $72,625 USDC
    - Bot Race report awards: $6,225 USDC
    - QA report awards: $2,075
    - Gas report awards: $2,075
    - Judge award: $9,960
    - Lookout awards: $6,540
    - Scout award: $500
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2023-06-stader-labs/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts June 2, 2023 20:00 UTC
- Ends June 9, 2023 20:00 UTC

## Automated Findings / Publicly Known Issues

Automated findings output for the audit will be added [here](#) within 24 hours of audit opening.

*Note for C4 wardens: Anything included in the automated findings output is considered a publicly known issue and is ineligible for awards.*

### Additional Known Issues
- SD Token Spot Price Manipulation{StaderOracle.sol, SDCollateral.sol} -- avoided through TWAP of 24 hours
- Submit Functions Are Susceptible To Front Running When Trusted Nodes Are Removed {StaderOracle.sol} 
- upper bound on penalty does not exist {penalty.sol} and is intented
- Partial DOS in requestWithdraw {userWithdrawalManager.sol} when user non redeemed request count crosses 'maxNonRedeemedUserRequestCount' is known and has a work around
- whitelisted operator {permissionedNodeRegistry.sol} retains permission after deactivation is a known issue and there is no impact due to this
- BidIncrement Can Be Changed Using UpdateBidIncrement() Which Affects Ongoing Auctions {Auction.sol} is known and acknowledged
- TrustedNode Cannot Update Incorrectly Submitted Oracle Details {StaderOracle.sol} is known and acknowledged 

Below are known issues of Slither; we encourage reporting any bugs around them and not just the errors:
- sends eth to arbitrary user 
- Reentrancy in StaderStakePoolsManager.depositETHOverTargetWeight()
- State variables written after the call(s) {contracts/StaderStakePoolsManager.sol#241}, {contracts/PermissionlessNodeRegistry.sol#218}
- Reentrancy in PermissionlessNodeRegistry.markValidatorReadyToDeposit(bytes[],bytes[],bytes[])
- Reentrancy in PermissionedPool.stakeUserETHToBeaconChain()

# Overview
ETHx is a multi pool architecture for node operations, designed for decentralization, scalability, and resilience. This design is integral to our ability to democratize node operations and adapt to increasing demand.
Our structure includes a permissionless pool, where anyone can participate and operate nodes, thereby fostering widespread participation. Alongside this, we also feature a permissioned pool. This is a select group of validators known for their consistent high performance.

- ETHx architecture miro board - https://miro.com/app/board/uXjVMDv5XKo=/
- ETHx smart contract functions documentation - https://docs.google.com/spreadsheets/d/1IjJ5z9oi9I-ejdRCitJsTT1on0WwjoKlbvurCtlB1KA/edit#gid=643619608
- Node Operator Onboarding blog - https://blog.staderlabs.com/node-operator-onboarding-ced79d35bd7b
- Deposit blog - https://blog.staderlabs.com/ethx-deposits-bda0f62d8ed8
- Reward Withdrawal blog - https://blog.staderlabs.com/ethx-rewards-withdrawal-530c50d480c9

## Focus areas
vaultProxy, vaultFactory, PoolSelector, staderOracle contracts

# Scope

| Contract | SLOC | Purpose | Libraries used |  
| ----------- | ----------- | ----------- | ----------- |
| [contracts/Auction.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/Auction.sol) | 116 | create auction lot for SD token, manage bid and transfer highest bid ETH to StaderStakePoolManager contract | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/ETHx.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/ETHx.sol) | 50 | The ERC20 contract for the ETHx token | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/NodeELRewardVault.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/NodeELRewardVault.sol) | 32 | Distribution logic for Execution layer reward for operators opted out of socializing pool  | []() |
| [contracts/OperatorRewardsCollector.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/OperatorRewardsCollector.sol) | 39 | stores operator rewards/settled amount for operator to claim | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/Penalty.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/Penalty.sol) | 106 | store validator level penalty data, update penalty based on MEV Theft/missed attestation data | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionedNodeRegistry.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/PermissionedNodeRegistry.sol) | 524 | Handles Permissioned Operator onboarding, adding validator keys,  validator selection within operators to depsoit on beacon chain and maintains validator and operator registry| [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionedPool.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/PermissionedPool.sol) | 252 | Interact with Ethereum Deposit Contract to do PRE_DEPOSIT and Full Deposit | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionlessNodeRegistry.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/PermissionlessNodeRegistry.sol) | 502 | Handle Permissionless Operators onboarding, adding validator keys with a collateral of 4ETH per validator and maintains validator and operator registry  | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionlessPool.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/PermissionlessPool.sol) | 216 | Interact with Ethereum deposit contract to do PRE_DEPOSIT and Full Deposit | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PoolSelector.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/PoolSelector.sol) | 108 | stores pool target weight, computes validator number to register on beacon chain based on pooled ETH and pool target and handle excess ETH allocation to pools if pool does not have capacity in a round robin way | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PoolUtils.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/PoolUtils.sol) | 232 | provides data across all pools like total queued validator count, total active validator count along with performing checks like unique pubkey, uinque operator address across all pools | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/SDCollateral.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/SDCollateral.sol) | 172 | handles SD token deposit for collateral, check for SD collateral based on pool, withdraw of excess SD token | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/SocializingPool.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/SocializingPool.sol) | 180 | Handle Execution Layer reward distribution for permissioned pool and permissionless operator which opted-in for socializing pool, reward data is pushed in form of merkle tree by staderOracle | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderConfig.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/StaderConfig.sol) | 374 | store the address of all other contracts and allow to update them via admin | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderInsuranceFund.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/StaderInsuranceFund.sol) | 52 | Reimburse 1ETH ETH lost in case a permissioned NO submit invalid signature key | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderOracle.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/StaderOracle.sol) | 589 | Submit Exchange Rate, SD Price, Withdrawn validator, Missed attestation penalty, socializing pool reward merkles along with Validator status data via trusted node | [`@openzeppelin/*`](https://openzeppelin.com/contracts/)[`@chainlink/*`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/) |
| [contracts/StaderStakePoolsManager.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/StaderStakePoolsManager.sol) | 213 | handle user staking ETH, minting ETHx, receiving user share of rewards from validators across all pools and validatorBatch Deposit based on the pooled ETH amount | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/UserWithdrawalManager.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/UserWithdrawalManager.sol) | 176 | handle user unstake and claiming for requests along with buring ETHx for withdraw request | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/ValidatorWithdrawalVault.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/ValidatorWithdrawalVault.sol) | 125 | handle consensus layer reward distribution and settlement in case validator is withdrawn  | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/VaultProxy.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/VaultProxy.sol) | 56 | router contract for all ValidatorWithdrawalVault and NodeELRewardVault contracts, delegate calls to specific vault via fallback | []() |
| [contracts/factory/VaultFactory.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/factory/VaultFactory.sol) | 77 | Deploys vaultProxy implementation via clones | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/library/UtilLib.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/library/UtilLib.sol) | 143 | Perform check on msg.sender, check for roles and get operator data given validatorID | []() |
| [contracts/library/ValidatorStatus.sol](https://github.com/code-423n4/2023-06-stader/blob/main/contracts/library/ValidatorStatus.sol) | 9 | List of stader defined validator status | []() |

## Scoping Details 
```
- If you have a public code repo, please share it here:
- How many contracts are in scope?: 23
- Total SLoC for these contracts?: 4348
- How many external imports are there?: 0
- How many separate interfaces and struct definitions are there for the contracts within scope?: 23 interfaces, 13 structs
- Does most of your code generally use composition or inheritance?: Composition
- How many external calls?: 0
- What is the overall line coverage percentage provided by your tests?: 85
- Is this an upgrade of an existing system? No
- Is there a need to understand a separate part of the codebase / get context in order to audit this part of the protocol?: Yes
- Please describe required context: https://miro.com/app/board/uXjVMDv5XKo=/
- Does it use an oracle?: Yes - Custom oracle that is reflected in StaderOracle.sol
- Does the token conform to the ERC20 standard?:  
- Are there any novel or unique curve logic or mathematical models?: Yes - Any validator in permissionless pool can run a node with 4 ETH + 0.4 ETH worth of SD token. Rewards are split proportionately.
- Does it use a timelock function?: No
- Is it an NFT?: No
- Does it have an AMM?: No
- Is it a fork of a popular project?: No 
- Does it use rollups?: No
- Is it multi-chain?: No
- Does it use a side-chain?: No

```

# Tests

Installing foundry:
- install foundry `curl -L https://foundry.paradigm.xyz | bash `
- extra step for macOS `brew install libusb`
- run `foundryup`

Using the test suite:
```bash
# to install hardhat-foundry plugin
npm install 
# to install submodule dependencies
forge install 
# to build all contracts
forge build
forge test
forge test --gas-report
forge coverage
```

*Note: a `slither.config.json` file is present and exclude findings and files that do not align with our areas of interest*
