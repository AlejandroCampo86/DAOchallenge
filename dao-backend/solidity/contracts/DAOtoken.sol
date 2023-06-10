// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAOtoken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    address public daoContract;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply,
        address _daoContract
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply * (10 ** uint256(_decimals));
        balanceOf[_daoContract] = totalSupply;
        daoContract = _daoContract;
    }

    function transfer(
        address _to,
        uint256 _value
    ) external returns (bool success) {
        require(
            msg.sender == daoContract,
            "Only DAO contract can transfer tokens"
        );
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success) {
        require(
            msg.sender == daoContract,
            "Only DAO contract can transfer tokens"
        );
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(
            allowance[_from][msg.sender] >= _value,
            "Not allowed to spend this amount"
        );

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function transferFromDAO(
        address _to,
        uint256 _value
    ) external returns (bool success) {
        require(balanceOf[daoContract] >= _value, "Insufficient DAO balance");

        balanceOf[daoContract] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(daoContract, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) external returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
