pragma solidity ^0.8.9;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract UserRoles is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    enum Role {
        Author,
        Editor,
        Reviewer
    }

    mapping(address => Role) public userRoles;
    EnumerableSet.AddressSet private users;

    event RoleAssigned(address indexed user, Role role);
    event RoleRemoved(address indexed user);

    function storeUserRole(address user, Role role) public onlyOwner {
        userRoles[user] = role;
        users.add(user);
        emit RoleAssigned(user, role);
    }

    function removeUserRole(address user) public onlyOwner {
        userRoles[user] = Role.Undefined;
        users.remove(user);
        emit RoleRemoved(user);
    }

    function getUsers() public view returns (address[] memory) {
        address[] memory userList = new address[](users.length());
        for(uint256 i = 0; i < users.length(); i++) {
            userList[i] = users.at(i);
        }
        return userList;
    }

    function getUserRole(address user) public view returns (Role) {
        return userRoles[user];
    }
}
