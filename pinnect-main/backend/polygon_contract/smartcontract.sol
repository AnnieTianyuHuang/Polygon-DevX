// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagipopMap {
    address public owner;

    struct Location {
        string name;
        uint256 x;
        uint256 y;
        string tags;
        string image;
    }

    mapping(uint256 => Location) public locations;
    uint256 public locationCount;

    constructor() {
        owner = msg.sender;
    }

    function post(
        string memory name,
        uint256 x,
        uint256 y,
        string memory tags,
        string memory image
    ) public {
        require(msg.sender == owner, "Only the owner can post locations");
        locations[locationCount] = Location(name, x, y, tags, image);
        locationCount++;
    }

    function detailOf(uint256 locationId) public view returns (Location memory) {
        require(locationId < locationCount, "Location does not exist");
        return locations[locationId];
    }
}
