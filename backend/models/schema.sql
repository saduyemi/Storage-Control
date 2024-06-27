CREATE DATABASE inventorySystemDB;
USE inventorySystemDB;

CREATE TABLE Profiles (
    UserID int NOT NULL AUTO_INCREMENT,
    Email varchar(1000),
    Password varchar(27),
    dt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID)
);
ALTER TABLE Profiles
MODIFY Email varchar(255);
ALTER TABLE Profiles
ADD UNIQUE(Email);
ALTER TABLE Profiles
MODIFY Password varchar(255);
CREATE TABLE Items (
    ItemID int NOT NULL AUTO_INCREMENT,
    UserID int NOT NULL,
    ItemName varchar(255),
    ItemAmount int,
    ItemCategory varchar(27),
    ItemPrice FLOAT,
    ItemPicture BLOB,
    PRIMARY KEY(ItemID),
    FOREIGN KEY(UserID) REFERENCES Profiles(UserID)
);
ALTER TABLE Items
ADD dt DATETIME DEFAULT CURRENT_TIMESTAMP;