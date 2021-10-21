# ClinTex

## MODIFIERS:
* <a href="#isFreeze">isFreeze(sender, amount)</a>
* <a href="#onlyOwner">onlyOwner()</a>

## FUNCTIONS:

* <a href="#constructor">constructor(name, symbol, firstDate, secondDate)</a>
* <a href="#allowance">allowance(owner, spender)</a>
* <a href="#approve">approve(spender, amount)</a>
* <a href="#balanceOf">balanceOf(account)</a>
* <a href="#getFreezeTokens">getFreezeTokens(account)</a>
* <a href="#isTransferFreezeTokens">isTransferFreezeTokens(account, amount)</a>
* <a href="#mint">mint(account, amount, flag)</a>
* <a href="#totalSupply">totalSupply()</a>
* <a href="#transfer">transfer(recipient, amount)</a>
* <a href="#transferFrom">transferFrom(sender, recipient, amount)</a>

# MODIFIERS
<div id="isFreeze"></div>

```
isFreeze(address sender, uint256 amount) 
``` 
Throws if sender transfering for amount frozen tokens.
#
<div id="onlyOwner"></div>

```
onlyOwner()
``` 
Throws if called by any account other than the owner.
#
# FUNCTIONS
<div id="constructor"></div>

```
constructor(string memory name, string memory symbol, uint256 firstDate, uint256 secondDate) 
```                                                                 

Initializing contract with first freeze date and second freeze date.

 

#
<div id="allowance"></div>

```
allowance(address owner, address spender) external returns uint256  
```                                                                 

Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom. This is zero by default.

This value changes when approve or transferFrom are called.
#
<div id="approve"></div>

```
approve(address spender, uint256 amount) external returns bool
```

Sets amount as the allowance of spender over the caller’s tokens.

Returns a boolean value indicating whether the operation succeeded.
#
<div id="balanceOf"></div>

```
balanceOf(address account) external returns uint256
```
Returns the amount of tokens owned by account.
#
<div id="getFreezeTokens"></div>

```
getFreezeTokens(address account, uint8 flag) public view returns uint256
```
Returns the number of frozen tokens on the account.

1. Frozen tokens until the first date.
2. Frozen tokens until the second date.

#
<div id="isTransferFreezeTokens"></div>

```
isTransferFreezeTokens(address account, uint256 amount) public view returns bool
```
Returns a boolean value indicating whether the transfering frozen tokens from account.

Returns **TRUE** when transferring frozen tokens from the account.
#
<div id="mint"></div>

```
mint(address account, uint256 amount, uint8 flag) public onlyOwner
```
Minting tokens to account.

### Flags:

0. Without freezing.
1. Freezing until the first date.
2. Freezing until the second date.

#
<div id="totalSupply"></div>

```
totalSupply() external returns uint256
```
Returns the amount of tokens in existence.
#
<div id="transfer"></div>

```
transfer(address recipient, uint256 amount) public isFreeze returns bool
```

Moves amount tokens from the caller’s account to recipient.

Returns a boolean value indicating whether the operation succeeded.
#
<div id="transferFrom"></div>

```
transferFrom(address sender, address recipient, uint256 amount) public isFreeze returns bool
```

Moves amount tokens from sender to recipient using the allowance mechanism. amount is then deducted from the caller’s allowance.

Returns a boolean value indicating whether the operation succeeded.
