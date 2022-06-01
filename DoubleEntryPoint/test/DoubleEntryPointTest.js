const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut DoubleEntryPoint", function () {		  
	let anyToken, legacyToken, det, cryptoVault, forta, detectionBot;	//contracts
	let owner, player;													//accounts
	const initialBalance = '100000000000000000000';
	
	beforeEach(async function () {
		[owner, player, ...addrs] = await ethers.getSigners();
        
        //contracts
		anyToken = await utils.deployContractSilent("AnyToken"); 
		cryptoVault = await utils.deployContractSilent("CryptoVault", player.address);
		legacyToken = await utils.deployContractSilent("LegacyToken");
		forta = await utils.deployContractSilent("Forta");
		det = await utils.deployContractSilent("DoubleEntryPoint",  [
			legacyToken.address, 
			cryptoVault.address, 
			forta.address, 
			player.address
		]); 
		
		//set up the relationships between contracts 
		await legacyToken.mint(cryptoVault.address, initialBalance);
		await legacyToken.delegateToNewContract(det.address);
		await cryptoVault.setUnderlying(det.address);
		await anyToken.mint(cryptoVault.address, initialBalance);
		await anyToken.connect(player).setForta(forta.address);
	});
	
	describe("Initial State", function () {
		it("DoubleEntryPoint", async function () {
			expect(await det.delegatedFrom()).to.equal(legacyToken.address); 
			expect(await det.player()).to.equal(player.address); 
			expect(await det.forta()).to.equal(forta.address); 
			expect(await det.cryptoVault()).to.equal(cryptoVault.address); 
		});
		
		it("CryptoVault", async function () {
			expect(await cryptoVault.underlying()).to.equal(det.address); 
			expect(await cryptoVault.sweptTokensRecipient()).to.equal(player.address); 
		});
		
		it("AnyToken", async function() {
			expect(await anyToken.forta()).to.equal(forta.address); 
			expect(await anyToken.player()).to.equal(player.address); 
		});
		
		it("Token balances: DET", async function () {
			expect(await det.totalSupply()).to.equal(initialBalance); 
			expect(await det.balanceOf(cryptoVault.address)).to.equal(initialBalance); 
			expect(await det.balanceOf(player.address)).to.equal(0); 
			expect(await det.balanceOf(owner.address)).to.equal(0); 
		});
		
		it("Token balances: LGT", async function () {
			expect(await legacyToken.totalSupply()).to.equal(initialBalance); 
			expect(await legacyToken.balanceOf(cryptoVault.address)).to.equal(initialBalance); 
			expect(await legacyToken.balanceOf(player.address)).to.equal(0); 
			expect(await legacyToken.balanceOf(owner.address)).to.equal(0); 
		});
		
		it("Token balances: ANY", async function () {
			expect(await anyToken.totalSupply()).to.equal(initialBalance); 
			expect(await anyToken.balanceOf(cryptoVault.address)).to.equal(initialBalance); 
			expect(await anyToken.balanceOf(player.address)).to.equal(0); 
			expect(await anyToken.balanceOf(owner.address)).to.equal(0); 
		});
	});

	describe("Sweep Tokens", function () {
		
		it("authorized recipient cannot sweep underlying DET token", async function () {
			//attempt to sweep DET is reverted (because it's CryptoVault's underlying token)
			await expect(cryptoVault.connect(player).sweepToken(det.address)).to.be.revertedWith(
				"Can't transfer underlying token"
			);
		});
		
		it("authorized recipient cannot sweep underlying LGT token", async function () {
			
			//THIS IS THE VULNERABILITY - it's allowed/possible to sweep legacyToken 
			await cryptoVault.connect(player).sweepToken(legacyToken.address); 
			
			//should have been reverted, but it's been swept
			expect(await legacyToken.balanceOf(player.address)).to.equal(0); 
			expect(await det.balanceOf(player.address)).to.equal(initialBalance); 
		});
		
		it("authorized recipient can sweep non-underlying token", async function () {
			//sweep AnyToken 
			await cryptoVault.connect(player).sweepToken(anyToken.address); 
			
			//verify that it's been swept 
			expect(await anyToken.balanceOf(player.address)).to.equal(initialBalance); 
			expect(await anyToken.balanceOf(cryptoVault.address)).to.equal(0); 
		});
		
		it("unauthorized recipient can sweep non-underlying token", async function () {
			
			//ANOTHER PROBLEM: ANYONE CAN SWEEP
			//is it strange that any public user can call sweepToken? 
			await cryptoVault.connect(owner).sweepToken(anyToken.address); 
			
			//verify that token's been swept 
			expect(await anyToken.balanceOf(owner.address)).to.equal(0); 
			expect(await anyToken.balanceOf(cryptoVault.address)).to.equal(0); 
			expect(await anyToken.balanceOf(player.address)).to.equal(initialBalance); 
		});
    });    

	//this is after installation of bespoke Forta detection bot 
	describe("Sweep Tokens Fixed", function () {
		
		//install detection bot
		beforeEach(async function () {
			detectionBot = await utils.deployContractSilent("DetectionBot");
			await forta.connect(player).setDetectionBot(detectionBot.address);
		}); 
		
		//sweeping DET is still not allowed
		it("authorized recipient cannot sweep underlying DET token", async function () {
			await expect(cryptoVault.connect(player).sweepToken(det.address)).to.be.revertedWith(
				"Can't transfer underlying token"
			);
		});
		
		//sweeping LGT is also not allowed now 
		it("authorized recipient cannot sweep underlying LGT token", async function () {
			//transaction gets reverted by Forta 
			await expect(cryptoVault.connect(player).sweepToken(legacyToken.address)).to.be.revertedWith(
				"Alert has been triggered, reverting"
			);
		});
		
		it("authorized recipient can sweep non-underlying token", async function () {
			//sweep AnyToken 
			await cryptoVault.connect(player).sweepToken(anyToken.address); 
			
			//verify it's been swept
			expect(await anyToken.balanceOf(player.address)).to.equal(initialBalance); 
			expect(await anyToken.balanceOf(cryptoVault.address)).to.equal(0); 
		});
    });    
});