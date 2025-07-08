create database if not exists travelDB;

create user if not exists dsw@'%' identified by 'dsw';
grant all on travelDB.* to dsw@'%';