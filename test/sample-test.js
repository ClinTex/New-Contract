const { BigNumber } = require("@ethersproject/bignumber");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClinTex", function () {
  
  beforeEach( async () => {
    [alice, bob] = await ethers.getSigners();

    members = [alice.address, bob.address];

    const ClinTex = await ethers.getContractFactory("ClinTex");
    clintex = await ClinTex.deploy("ClinTex", "CLI");

    await clintex.approve(alice.address, 99999999);
    await clintex.approve(bob.address, 99999999);
  })
  
  
  describe("Basic transactions without freezing", function () {
    it("Testing transferring Alice's tokens to Bob with transfer()", async() => {
      membersTokens = [[5000, 0, 0], [0, 0, 0]];
      
      await clintex.init(1637884800, 1669420800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's tokens to Bob with transferFrom()", async() => {
      membersTokens = [[5000, 0, 0], [0, 0, 0]];
      
      await clintex.init(1637884800, 1669420800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2021 and Nov 26 2022", function () {
    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      membersTokens = [[5000, 5000, 0], [0, 0, 0]];
      
      await clintex.init(1637884800, 1669420800, members, membersTokens);

      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      membersTokens = [[5000, 5000, 0], [0, 0, 0]];
      
      await clintex.init(1637884800, 1669420800, members, membersTokens);

      await expect(clintex.transferFrom(alice.address, bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      membersTokens = [[7000, 2000, 0], [0, 0, 0]];
      
      await clintex.init(1637884800, 1669420800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      membersTokens = [[7000, 2000, 0], [0, 0, 0]];
      
      await clintex.init(1637884800, 1669420800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2020 and Nov 26 2021", function () {
    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      membersTokens = [[7000, 0, 2000], [0, 0, 0]];
      
      await clintex.init(1606348800, 1669420800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);;
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      membersTokens = [[7000, 0, 2000], [0, 0, 0]];
      
      await clintex.init(1606348800, 1669420800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      membersTokens = [[5000, 0, 5000], [0, 0, 0]];
      
      await clintex.init(1606348800, 1669420800, members, membersTokens);

      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      membersTokens = [[5000, 0, 5000], [0, 0, 0]];
      
      await clintex.init(1606348800, 1669420800, members, membersTokens);

      await expect(clintex.transferFrom(alice.address, bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2019 and Nov 26 2020", function () { 
    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
      
      await clintex.init(1574726400, 1606348800, members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
      
      await clintex.init(1574726400, 1606348800, members, membersTokens);
       
      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Testing getFreezeTokens", function () {
    it("Testing frozen token before second date", async() => {
      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
      
      await clintex.init(1606348800, 1669420800, members, membersTokens);
      expect(BigNumber.from(await clintex.getFreezeTokens(alice.address, 1))).to.equal(BigNumber.from(2500))

    })
    
    it("Putting null address", async() => {
      await expect(clintex.getFreezeTokens(ethers.constants.AddressZero, 0)).to.be.revertedWith('ClinTex: address must not be empty');
    })

    it("With wrong flags", async() => {
      await expect(clintex.getFreezeTokens(alice.address, 10)).to.be.revertedWith('ClinTex: unknown flag');
    })
  })

  describe("Testing init", function () {
    it("Transfer without init", async() => {
      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
      
      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: not initialized');
    })

    it("More frozen tokens than on the balance", async() => {
      membersTokens = [[0, 5000, 0], [0, 0, 0]];
      
      await expect(clintex.init(1637884800, 1669420800, members, membersTokens)).to.be.revertedWith('ClinTex: there are more frozen tokens than on the balance');
    })

    it("With empty address", async() => {
      membersTokens = [[0, 5000, 0], [0, 0, 0]];
      
      await expect(clintex.init(1637884800, 1669420800, [ethers.constants.AddressZero, bob.address], membersTokens)).to.be.revertedWith('ClinTex: address must not be empty');
    })

    it("Arrays of incorrect length", async() => {
      membersTokens = [[0, 5000, 0], [0, 0, 0]];
      
      await expect(clintex.init(1637884800, 1669420800, [bob.address], membersTokens)).to.be.revertedWith('ClinTex: arrays of incorrect length');
    })

    it("With wrong dates", async() => {
      membersTokens = [[0, 5000, 0], [0, 0, 0]];
      
      await expect(clintex.init(1669420800, 1637884800, members, membersTokens)).to.be.revertedWith('ClinTex: first unfreeze date cannot be greater than the second date');
    })

    it("Double init", async() => {
      membersTokens = [[5000, 0, 0], [0, 0, 0]];
      await clintex.init(1606348800, 1669420800, members, membersTokens);
      await expect(clintex.init(1606348800, 1669420800, members, membersTokens)).to.be.revertedWith('ClinTex: the contract has already been initialized');
    })
  })

})
