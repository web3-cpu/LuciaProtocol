const getInputs = require('../../../../utils');

let tokenA, tokenB, value, chain, seedPhrase, network;

/* eslint-disable ui-testing/no-disabled-tests */
describe('Swap', () => {
  try {
    ({ tokenA, tokenB, value, chain, seedPhrase, network } = getInputs());
    before(() => {
      cy.setupMetamask(seedPhrase, network);
    });

    it(`should swap successfully`, () => {
      cy.visit(
        `https://testnet.luciadex.com/swap?chain=${chain}&inputCurrency=${tokenA}&outputCurrency=${tokenB}`,
      );

      // Select the check button
      cy.get('.sc-eDnVMP.sc-lbNsEr.gkVgsf.hsMBlx')
        .find('input[type="checkbox"]')
        .check();

      cy.get('button[variant="danger"]').click(); // Click the import button

      cy.get('.sc-bcPKhP.iArAUI').click(); // Connect Button
      cy.get('div._1a5xov70._1qhetbf6i')
        .find(
          'img[src="https://assets.pancakeswap.finance/web/wallets/metamask.png"]',
        )
        .click(); // the MetaMask icon

      cy.acceptMetamaskAccess().then(connected => {
        expect(connected).to.be.true;
      });

      cy.get('#swap-currency-input input.token-amount-input.z84kgl0.z84kgl5') // Enter the value in the input box
        .type(value)
        .wait(3000);

      cy.get('.sc-bcPKhP.dAcAHr').click(); // Swap button

      cy.get('#confirm-swap-or-send').click(); // Confirm swap button

      // MetaMask dialog box interaction
      cy.confirmMetamaskTransactionAndWaitForMining();
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
  // });
});
