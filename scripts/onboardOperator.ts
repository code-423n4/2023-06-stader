import { ethers } from 'hardhat'

async function main() {
  const permissionlessNodeRegistry = process.env.PERMISSIONLESS_NODE_REGISTRY ?? ''
  const permissionlessNodeRegistryFactory = await ethers.getContractFactory('PermissionlessNodeRegistry')
  const permissionlessNodeRegistryInstance = await permissionlessNodeRegistryFactory.attach(permissionlessNodeRegistry)
  const onboardOperatorTx = await permissionlessNodeRegistryInstance.onboardNodeOperator(false, '', '')

  console.log('onboarded operator')
}
main()
