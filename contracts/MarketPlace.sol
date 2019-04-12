pragma solidity ^0.5.0;

contract MarketPlace {
    // The keyword "public" makes those variables
    // easily readable from outside.
    address public administrator;

    struct User{
        uint balance;
        bool isActive;
    }
    mapping (address => User) public users;
    mapping (address => bytes32) public transactions;
    // Events allow light clients to react to
    // changes efficiently.
    event Sent(address from, address to, uint amount);
    event RegisterUser(address newUser, int initialDeposit);
    event UnRegisterUser(address user);
    event BuySuccessfull(address user, bytes32 hash);

    // This is the constructor whose code is
    // run only when the contract is created.
    constructor() public {
        administrator = msg.sender;
    }
    function registerUser(address newUser) public{
        require(msg.sender == administrator,"Only Admin can register user");
        require(administrator!= newUser, "administrator cannot register himself");
        users[newUser].balance = 500;
        users[newUser].isActive=true;
        emit RegisterUser(newUser, 500);
    }
    function unRegisterUser(address payable user)public{
        require(msg.sender == administrator,"Only Admin can unregister user");
        require(users[user].isActive, "Only registered users can be unregistered");
        //user.transfer(address(this).balance);
        delete users[user];
        emit UnRegisterUser(user);
    }

    function buy(uint amount, bytes32 hash) public{
        require(users[msg.sender].balance>=amount, "Insufficient balance");
        transactions[msg.sender] = hash;
        emit BuySuccessfull(msg.sender,hash);
    }

    function addDeposit(uint amount) public {
        require(amount < 1e60);
        users[msg.sender].balance += amount;
    }

    function settlePayment(address receiver, uint amount) public {
        require(amount <= users[msg.sender].balance, "Insufficient balance.");
        require(msg.sender!=receiver, "Sender cannot be same as receiver");
        users[msg.sender].balance -= amount;
        users[receiver].balance += amount;
        emit Sent(msg.sender, receiver, amount);
    }
    function getBalance(address user) public view returns (uint){
        require(users[user].isActive==true, "Invalid user");
        return users[user].balance;
    }
}
