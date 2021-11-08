const { BigNumber } = require("@ethersproject/bignumber");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClinTex", function () {
  
  beforeEach( async () => {
    [alice, bob] = await ethers.getSigners();
    members = [alice.address, bob.address];
  })
  
  
  describe("Basic transactions without freezing", function () {
    it("Testing transferring Alice's tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 0, 0], [0, 0, 0]];
      
      await clintex.addMembers(members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 0, 0], [0, 0, 0]];
      
      await clintex.addMembers(members, membersTokens);
      
      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2021 and Nov 26 2022", function () {
    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 5000, 0], [0, 0, 0]];
      
      await clintex.addMembers(members, membersTokens);

      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 5000, 0], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);

      await expect(clintex.transferFrom(alice.address, bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[7000, 2000, 0], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);
      
      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[7000, 2000, 0], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);
      
      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2020 and Nov 26 2021", function () {
    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");

      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[7000, 0, 2000], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);;
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[7000, 0, 2000], [0, 0, 0]];
      
      await clintex.addMembers(members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 0, 5000], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);

      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 0, 5000], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);

      await expect(clintex.transferFrom(alice.address, bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2019 and Nov 26 2020", function () { 
    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1574726400, 1606348800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1574726400, 1606348800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);
       
      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Testing getFreezeTokens", function () {
    it("Testing frozen token before second date", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[5000, 2500, 2500], [0, 0, 0]];
            
      await clintex.addMembers(members, membersTokens);

      expect(BigNumber.from(await clintex.getFreezeTokens(alice.address, 1))).to.equal(BigNumber.from(2500))

    })
    
    it("Putting null address", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
      await expect(clintex.getFreezeTokens(ethers.constants.AddressZero, 0)).to.be.revertedWith('ClinTex: address must not be empty');
    })

    it("With wrong flags", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1606348800, 1669420800);
      await expect(clintex.getFreezeTokens(alice.address, 10)).to.be.revertedWith('ClinTex: unknown flag');
    })
  })

  describe("Testing addMembers", function () {
      it("More frozen tokens than on the balance", async() => {
        const ClinTex = await ethers.getContractFactory("ClinTex");
        clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
        await clintex.approve(alice.address, 99999999);
        await clintex.approve(bob.address, 99999999);
  
        membersTokens = [[0, 5000, 0], [0, 0, 0]];
      
        await expect(clintex.addMembers(members, membersTokens)).to.be.revertedWith('ClinTex: there are more frozen tokens before the first date than on the balance');

        membersTokens = [[0, 0, 5000], [0, 0, 0]];
      
        await expect(clintex.addMembers(members, membersTokens)).to.be.revertedWith('ClinTex: there are more frozen tokens before the second date than on the balance');
    })
    
    it("Arrays of incorrect length", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
  
      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      membersTokens = [[0, 5000, 0], [0, 0, 0]];
      
      await expect(clintex.addMembers([bob.address], membersTokens)).to.be.revertedWith('ClinTex: arrays of incorrect length');
    })

    it("With wrong dates", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      
      await expect(ClinTex.deploy("ClinTex", "CTI", 1669420800, 1637884800)).to.be.revertedWith('ClinTex: first unfreeze date cannot be greater than the second date');

      //await expect(clintex.init(1669420800, 1637884800, members, membersTokens)).to.be.revertedWith('ClinTex: first unfreeze date cannot be greater than the second date');
    })

    /*it("Double init", async() => {
      membersTokens = [[5000, 0, 0], [0, 0, 0]];
      await clintex.init(1606348800, 1669420800, members, membersTokens);
      await expect(clintex.init(1606348800, 1669420800, members, membersTokens)).to.be.revertedWith('ClinTex: the contract has already been initialized');
    })*/
  })

})
