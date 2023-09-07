// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CubiToken is ERC20Capped, Ownable {

    using EnumerableSet for EnumerableSet.AddressSet;
    EnumerableSet.AddressSet private _minters;

    uint256 public publishAt;
    mapping(address => bool) public whiteList;

    constructor() public ERC20("CubiSwap Finance Token", "CUBI") ERC20Capped(100_000_000 ether) {

    }

    // mint with max supply
    function mint(address _to, uint256 _amount) public onlyMinter returns (bool) {
        _mint(_to, _amount);
        return true;
    }

    function addMinter(address _addMinter) public onlyOwner returns (bool) {
        require(_addMinter != address(0), "CubiSwap: _addMinter is the zero address");
        return EnumerableSet.add(_minters, _addMinter);
    }

    function delMinter(address _delMinter) public onlyOwner returns (bool) {
        require(_delMinter != address(0), "CubiSwap: _delMinter is the zero address");
        return EnumerableSet.remove(_minters, _delMinter);
    }

    function getMinterLength() public view returns (uint256) {
        return EnumerableSet.length(_minters);
    }

    function isMinter(address account) public view returns (bool) {
        return EnumerableSet.contains(_minters, account);
    }

    function getMinter(uint256 _index) public view onlyOwner returns (address){
        require(_index <= getMinterLength() - 1, "CubiSwap: index out of bounds");
        return EnumerableSet.at(_minters, _index);
    }

    // modifier for mint function
    modifier onlyMinter() {
        require(isMinter(msg.sender), "caller is not the minter");
        _;
    }

    function addWhiteList(address _user) external onlyOwner {
        whiteList[_user] = true;
    }

    function updatePublishAt(uint256 _value) external onlyOwner {
        require(publishAt == 0, "Publish: had setting");
        publishAt = _value;
    }

    function _transfer(address sender, address recipient, uint256 amount) 
        internal 
        override
        virtual 
    {
        require(block.timestamp >= publishAt || 
           whiteList[sender],
           "Cubi: not publish"
        );

        super._transfer(sender, recipient, amount);
    }

}

