// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@luciaswap/core/contracts/interfaces/ILuciaFactory.sol';
import '@luciaswap/periphery/contracts/interfaces/INonfungiblePositionManager.sol';

import './LuciaLmPool.sol';

/// @dev This contract is for Master Chef to create a corresponding LmPool when
/// adding a new farming pool. As for why not just create LmPool inside the
/// Master Chef contract is merely due to the imcompatibility of the solidity
/// versions.
contract LuciaLmPoolDeployer {
    address public immutable masterChef;

    modifier onlyMasterChef() {
        require(msg.sender == masterChef, 'Not MC');
        _;
    }

    constructor(address _masterChef) {
        masterChef = _masterChef;
    }

    /// @dev Deploys a LmPool
    /// @param pool The contract address of the LuciaSwap V3 pool
    function deploy(ILuciaPool pool) external onlyMasterChef returns (ILuciaLmPool lmPool) {
        lmPool = new LuciaLmPool(address(pool), masterChef, uint32(block.timestamp));
        ILuciaFactory(INonfungiblePositionManager(IMasterChef(masterChef).nonfungiblePositionManager()).factory())
            .setLmPool(address(pool), address(lmPool));
    }
}
