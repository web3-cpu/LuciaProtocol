// SPDX-License-Identifier: GPL-2.0-or-later
import '@luciaswap/core/contracts/interfaces/ILuciaPool.sol';

pragma solidity >=0.6.0;

import '../libraries/PoolTicksCounter.sol';

contract PoolTicksCounterTest {
    using PoolTicksCounter for ILuciaPool;

    function countInitializedTicksCrossed(
        ILuciaPool pool,
        int24 tickBefore,
        int24 tickAfter
    ) external view returns (uint32 initializedTicksCrossed) {
        return pool.countInitializedTicksCrossed(tickBefore, tickAfter);
    }
}
