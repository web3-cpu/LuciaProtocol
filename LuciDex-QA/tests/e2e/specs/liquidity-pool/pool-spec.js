const getInputs = require('../../../../utils');

let tokenA, tokenB, value, chain, seedPhrase, network;

describe('Liquidity Pool', () => {
  try {
    ({ tokenA, tokenB, value, chain, seedPhrase, network } = getInputs());

    before(() => {
      cy.setupMetamask(seedPhrase, network);
    });

    it('should create a new pool', () => {
      cy.visit(
        `https://testnet.luciadex.com/add/${tokenA}/${tokenB}/2500?chain=${chain}`,
      );

      // Connect MetaMask
      cy.get('.sc-bcPKhP.iArAUI').click(); // Connect Button
      cy.get('div._1a5xov70._1qhetbf6i')
        .find(
          'img[src="https://assets.pancakeswap.finance/web/wallets/metamask.png"]',
        )
        .click(); // the MetaMask icon

      cy.acceptMetamaskAccess().then(connected => {
        expect(connected).to.be.true;
      });

      // Choose 10%
      cy.get('.sc-bcPKhP.hMxCbr').contains('10%').click().wait(1000);

      // Enter the value for tokenA
      cy.get(
        '#add-liquidity-input-tokena input.token-amount-input.z84kgl0.z84kgl5',
      )
        .type(value)
        .wait(1000);

      // Press ADD
      cy.get('div.sc-eklOhW.iA-dqFj button.sc-bcPKhP.xiIkU').click();

      // Press another add button (to use MetaMask)
      cy.get('.sc-bcPKhP.gDtdxx').click();

      // MetaMask dialog box interaction
      cy.confirmMetamaskTransactionAndWaitForMining();
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
