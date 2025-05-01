const { expect, assert } = require("chai");
const provider = waffle.provider;

describe("Token deposit", () => {
  let luciaToken, bank;
	beforeEach(async () => {
    [owner, addr1, addr2, addr3, addr4, addr5, addr6] = await ethers.getSigners();
    let ownerBalance = await provider.getBalance(owner.address);
    const LuciaToken = await ethers.getContractFactory("LuciaToken");
    luciaToken = await LuciaToken.deploy();
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy(luciaToken.address);

	})

  it("ensures the token can be despoited into the smart contract", async () => {
    expect(await luciaToken.name()).to.equal("LuciaToken");
  })

  it("can have a user send tokens via the deposit call", async () => {
    await luciaToken.transfer(addr1.address,50000000); // user gets tokens
    expect(await luciaToken.balanceOf(addr1.address)).to.equal(50000000); // user has a certain balance of those tokens
    await luciaToken.connect(addr1).approve(bank.address, 25000000); //approve must be here
    await bank.connect(addr1).deposit(25000000); // now user makes the call to deposit
    expect(await luciaToken.balanceOf(bank.address)).to.equal(25000000);
  })

  it("can have a user withdraw tokens via the withdrawFullAmount call", async () => {
    await luciaToken.transfer(addr2.address,50000000);
    await luciaToken.transfer(addr3.address,50000000);
    await luciaToken.transfer(addr4.address,50000000);
    expect(await luciaToken.balanceOf(addr2.address)).to.equal(50000000);
    expect(await luciaToken.balanceOf(addr3.address)).to.equal(50000000);
    expect(await luciaToken.balanceOf(addr4.address)).to.equal(50000000);

    await luciaToken.connect(addr2).approve(bank.address, 50000000);
    await luciaToken.connect(addr3).approve(bank.address, 50000000);
    await luciaToken.connect(addr4).approve(bank.address, 50000000);

    await bank.connect(addr2).deposit(25000000);
    await bank.connect(addr3).deposit(25000000);
    await bank.connect(addr4).deposit(25000000);

    await bank.connect(addr2).withdrawFullAmount();
    expect(await luciaToken.balanceOf(bank.address)).to.equal(50000000);
    await bank.connect(addr3).withdrawFullAmount();
    expect(await luciaToken.balanceOf(bank.address)).to.equal(25000000);
    await bank.connect(addr4).withdrawFullAmount();
    expect(await luciaToken.balanceOf(bank.address)).to.equal(0);
  })

  it("can have users withdraw some amounts", async () => {
    await luciaToken.transfer(addr5.address,50000000);
    await luciaToken.transfer(addr6.address,50000000);
    expect(await luciaToken.balanceOf(addr5.address)).to.equal(50000000);
    expect(await luciaToken.balanceOf(addr6.address)).to.equal(50000000);

    await luciaToken.connect(addr5).approve(bank.address, 50000000);
    await luciaToken.connect(addr6).approve(bank.address, 50000000);
    
    await bank.connect(addr5).deposit(50000000);
    await bank.connect(addr6).deposit(50000000);

    await bank.connect(addr5).withdrawAmount(10000000);
    expect(await luciaToken.balanceOf(bank.address)).to.equal(90000000);
    await expect(bank.connect(addr5).withdrawAmount(40000001)).to.be.reverted;
    await bank.connect(addr5).withdrawAmount(40000000);
    expect(await luciaToken.balanceOf(bank.address)).to.equal(50000000);
    await expect(bank.connect(addr5).withdrawAmount(1)).to.be.reverted;
  })

})
