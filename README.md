# ✨ So you want to run an audit

This `README.md` contains a set of checklists for our audit collaboration.

Your audit will use two repos: 
- **an _audit_ repo** (this one), which is used for scoping your audit and for providing information to wardens
- **a _findings_ repo**, where issues are submitted (shared with you after the audit) 

Ultimately, when we launch the audit, this repo will be made public and will contain the smart contracts to be reviewed and all the information needed for audit participants. The findings repo will be made public after the audit report is published and your team has mitigated the identified issues.

Some of the checklists in this doc are for **C4 (🐺)** and some of them are for **you as the audit sponsor (⭐️)**.

---

# Repo setup

## ⭐️ Sponsor: Add code to this repo

- [ ] Create a PR to this repo with the below changes:
- [ ] Provide a self-contained repository with working commands that will build (at least) all in-scope contracts, and commands that will run tests producing gas reports for the relevant contracts.
- [ ] Make sure your code is thoroughly commented using the [NatSpec format](https://docs.soliditylang.org/en/v0.5.10/natspec-format.html#natspec-format).
- [ ] Please have final versions of contracts and documentation added/updated in this repo **no less than 24 hours prior to audit start time.**
- [ ] Be prepared for a 🚨code freeze🚨 for the duration of the audit — important because it establishes a level playing field. We want to ensure everyone's looking at the same code, no matter when they look during the audit. (Note: this includes your own repo, since a PR can leak alpha to our wardens!)


---

## ⭐️ Sponsor: Edit this README

Under "SPONSORS ADD INFO HERE" heading below, include the following:

- [ ] Modify the bottom of this `README.md` file to describe how your code is supposed to work with links to any relevent documentation and any other criteria/details that the C4 Wardens should keep in mind when reviewing. ([Here's a well-constructed example.](https://github.com/code-423n4/2022-08-foundation#readme))
  - [ ] When linking, please provide all links as full absolute links versus relative links
  - [ ] All information should be provided in markdown format (HTML does not render on Code4rena.com)
- [ ] Under the "Scope" heading, provide the name of each contract and:
  - [ ] source lines of code (excluding blank lines and comments) in each
  - [ ] external contracts called in each
  - [ ] libraries used in each
- [ ] Describe any novel or unique curve logic or mathematical models implemented in the contracts
- [ ] Does the token conform to the ERC-20 standard? In what specific ways does it differ?
- [ ] Describe anything else that adds any special logic that makes your approach unique
- [ ] Identify any areas of specific concern in reviewing the code
- [ ] Review the Gas award pool amount. This can be adjusted up or down, based on your preference - just flag it for Code4rena staff so we can update the pool totals across all comms channels. 
- [ ] Optional / nice to have: pre-record a high-level overview of your protocol (not just specific smart contract functions). This saves wardens a lot of time wading through documentation.
- [ ] See also: [this checklist in Notion](https://code4rena.notion.site/Key-info-for-Code4rena-sponsors-f60764c4c4574bbf8e7a6dbd72cc49b4#0cafa01e6201462e9f78677a39e09746)
- [ ] Delete this checklist and all text above the line below when you're ready.

---

# Stader Labs audit details
- Total Prize Pool: $93,000 USDC
[ 🐺 C4 staff to add detailed pool breakdown ]
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2023-06-stader-contest/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts June 2, 2023 20:00 UTC
- Ends June 9, 2023 20:00 UTC

## Automated Findings / Publicly Known Issues

Automated findings output for the audit will be posted [here](#) within 24 hours of audit opening.

*Note for C4 wardens: Anything included in the automated findings output is considered a publicly known issue and is ineligible for awards.*

[ ⭐️ SPONSORS ADD INFO HERE ]

# Overview

*Please provide some context about the code being audited, and identify any areas of specific concern in reviewing the code. (This is a good place to link to your docs, if you have them.)*

Please focus on vaultProxy, vaultFactory, and PoolSelector.

# Scope

*List all files in scope in the table below (along with hyperlinks) -- and feel free to add notes here to emphasize areas of focus.*

*For line of code counts, we recommend using [cloc](https://github.com/AlDanial/cloc).* 

| Contract | SLOC | Purpose | Libraries used |  
| ----------- | ----------- | ----------- | ----------- |
| [contracts/Auction.sol](contracts/Auction.sol) | 116 | create auction lot for SD token, manage bid and transfer highest bid ETH to StaderStakePoolManager contract | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/ETHx.sol](contracts/ETHx.sol) | 50 | The ERC20 contract for the ETHx token | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/NodeELRewardVault.sol](contracts/NodeELRewardVault.sol) | 32 | Distribution logic for Execution layer reward for operators opted out of socializing pool  | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/OperatorRewardsCollector.sol](contracts/OperatorRewardsCollector.sol) | 44 | stores operator rewards/settled amount for operator to claim | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/Penalty.sol](contracts/Penalty.sol) | 106 | store validator level penalty data, update penalty based on MEV Theft/missed attestation data | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionedNodeRegistry.sol](contracts/PermissionedNodeRegistry.sol) | 524 | Handles Permissioned Operator onboarding, adding validator keys,  validator selection within operators to depsoit on beacon chain and maintains validator and operator registry| [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionedPool.sol](contracts/PermissionedPool.sol) | 252 | Interact with Ethereum Deposit Contract to do PRE_DEPOSIT and Full Deposit | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionlessNodeRegistry.sol](contracts/PermissionlessNodeRegistry.sol) | 502 | Handle Permissionless Operators onboarding, adding validator keys with a collateral of 4ETH per validator and maintains validator and operator registry  | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PermissionlessPool.sol](contracts/PermissionlessPool.sol) | 216 | Interact with Ethereum deposit contract to do PRE_DEPOSIT and Full Deposit | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PoolSelector.sol](contracts/PoolSelector.sol) | 108 | stores pool target weight, computes validator number to register on beacon chain based on pooled ETH and pool target and handle excess ETH allocation to pools if pool does not have capacity in a round robin way | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/PoolUtils.sol](contracts/PoolUtils.sol) | 232 | provides data across all pools like total queued validator count, total active validator count along with performing checks like unique pubkey, uinque operator address across all pools | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/SDCollateral.sol](contracts/SDCollateral.sol) | 172 | handles SD token deposit for collateral, check for SD collateral based on pool, withdraw of excess SD token | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/SocializingPool.sol](contracts/SocializingPool.sol) | 180 | Handle Execution Layer reward distribution for permissioned pool and permissionless operator which opted-in for socializing pool, reward data is pushed in form of merkle tree by staderOracle | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderConfig.sol](contracts/StaderConfig.sol) | 374 | store the address of all other contracts and allow to update them via admin | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderInsuranceFund.sol](contracts/StaderInsuranceFund.sol) | 52 | Reimburse 1ETH ETH lost in case a permissioned NO submit invalid signature key | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderOracle.sol](contracts/StaderOracle.sol) | 589 | Submit Exchange Rate, SD Price, Withdrawn validator, Missed attestation penalty, socializing pool reward merkles along with Validator status data via trusted node | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/StaderStakePoolsManager.sol](contracts/StaderStakePoolsManager.sol) | 213 | handle user staking ETH, minting ETHx, receiving user share of rewards from validators across all pools and validatorBatch Deposit based on the pooled ETH amount | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/UserWithdrawalManager.sol](contracts/UserWithdrawalManager.sol) | 176 | handle user unstake and claiming for requests along with buring ETHx for withdraw request | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/ValidatorWithdrawalVault.sol](contracts/ValidatorWithdrawalVault.sol) | 125 | handle consensus layer reward distribution and settlement in case validator is withdrawn  | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/VaultProxy.sol](contracts/VaultProxy.sol) | 56 | router contract for all ValidatorWithdrawalVault and NodeELRewardVault contracts, delegate calls to specific vault via fallback | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/factory/VaultFactory.sol](contracts/factory/VaultFactory.sol) | 77 | Deploys vaultProxy implementation via clones | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/library/UtilLib.sol](contracts/library/UtilLib.sol) | 143 | Perform check on msg.sender, check for roles and get operator data given validatorID | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |
| [contracts/library/ValidatorStatus.sol](contracts/library/ValidatorStatus.sol) | 9 | List of stader defined validator status | [`@openzeppelin/*`](https://openzeppelin.com/contracts/) |

## Out of scope

*List any files/contracts that are out of scope for this audit.*

# Additional Context

*Describe any novel or unique curve logic or mathematical models implemented in the contracts*

*Sponsor, please confirm/edit the information below.*

## Scoping Details 
```
- If you have a public code repo, please share it here: https://github.com/stader-labs/ethx/tree/phase2/contracts
- How many contracts are in scope?: 23
- Total SLoC for these contracts?: 4348
- How many external imports are there?: 0
- How many separate interfaces and struct definitions are there for the contracts within scope?: 23 interfaces, 7 structs
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

*Provide every step required to build the project from a fresh git clone, as well as steps to run the tests with a gas report.* 

*Note: Many wardens run Slither as a first pass for testing.  Please document any known errors with no workaround.* 
