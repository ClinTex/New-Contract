//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ClinTex is ERC20, Ownable {
    using SafeMath for uint256;
    
    uint256 private _firstUnfreezeDate;
    uint256 private _secondUnfreezeDate;

    struct frozenTokens {
        uint256 frozenTokensBeforeTheFirstDate;
        uint256 frozenTokensBeforeTheSecondDate;
    }
    
    mapping(address => frozenTokens) private _freezeTokens;

    constructor(string memory name, string memory symbol, uint256 firstDate, uint256 secondDate) ERC20 (name, symbol){
        require (firstDate < secondDate, "ClinTex: first unfreeze date cannot be greater than the second date");
        _firstUnfreezeDate = firstDate;
        _secondUnfreezeDate = secondDate;
    }

    //isFreeze check sender transfer for amount frozen tokens
    modifier isFreeze(address sender, uint256 amount) {
        require(isTransferFreezeTokens(sender, amount) == false, "ClinTex: could not transfer frozen tokens");
        _;
    } 

    //mint with flag = 0: minting of unfreeze tokens
    //mint with flag = 1: minting of frozen tokens before the first date 
    //mint with flag = 2: minting of frozen tokens before the second date 
    function mint(address account, uint256 amount, uint8 flag) public onlyOwner {
        require (flag < 3, "ClinTex: unknown flag");
        
        _mint(account, amount);
        
        if (flag == 1) {
            _freezeTokens[account].frozenTokensBeforeTheFirstDate += amount;
        }

        if (flag == 2) {
            _freezeTokens[account].frozenTokensBeforeTheSecondDate += amount;
        }
    }

    //transfer is basic transfer with isFreeze modifer
    function transfer(address recipient, uint256 amount) public virtual override isFreeze(_msgSender(), amount) returns (bool) {
        return super.transfer(recipient, amount);
    }

    //transferFrom is basic transferFrom with isFreeze modifer
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override isFreeze(sender, amount) returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }

    //getFreezeTokens returns the number of frozen tokens on the account
    function getFreezeTokens(address account, uint8 flag) public view returns (uint256) {
        require(account != address(0), "ClinTex: address must not be empty");
        require (flag < 2, "ClinTex: unknown flag");
        
        if (flag == 0) {
            return _freezeTokens[account].frozenTokensBeforeTheFirstDate;
        }
        return _freezeTokens[account].frozenTokensBeforeTheSecondDate;
    }

    //isTransferFreezeTokens returns true when transferring frozen tokens
    function isTransferFreezeTokens(address account, uint256 amount) public view returns (bool) {
        if (block.timestamp > _secondUnfreezeDate){
            return false;
        }

        if (_firstUnfreezeDate < block.timestamp && block.timestamp < _secondUnfreezeDate) {
            if (balanceOf(account) - getFreezeTokens(account, 1) < amount) {
                return true;
            }
        }

        if (block.timestamp < _firstUnfreezeDate) {
            if (balanceOf(account) - getFreezeTokens(account, 0) < amount) {
                return true;
            }
        }
        return false;
    }
}
