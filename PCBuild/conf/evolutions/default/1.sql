# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "ALIMENTATION" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MANUFACTURER" VARCHAR NOT NULL,"MODEL" VARCHAR NOT NULL,"POWER" INTEGER NOT NULL,"IMG_URL" VARCHAR NOT NULL,"PRICE" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL);
create table "COMPUTER_CASE" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"NAME" VARCHAR NOT NULL,"MANUFACTURER" VARCHAR NOT NULL,"WIDTH" REAL NOT NULL,"HEIGHT" REAL NOT NULL,"LENGTHT" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL,"PRICE" REAL NOT NULL,"IMAGE_URL" VARCHAR NOT NULL);
create table "GRAPHIC_CARD" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MODEL" VARCHAR NOT NULL,"MANUFACTURER" VARCHAR NOT NULL,"MEMORY" REAL NOT NULL,"FREQUENCY" REAL NOT NULL,"WIDTH" REAL NOT NULL,"HEIGHT" REAL NOT NULL,"LENGTH" REAL NOT NULL,"CONSUMPTION" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL,"PRICE" REAL NOT NULL,"IMAGE_URL" VARCHAR NOT NULL);
create table "MEMORY" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MODEL" VARCHAR NOT NULL,"MANUFACTURER" VARCHAR NOT NULL,"MEMORY_SIZE" REAL NOT NULL,"MEMORY_TYPE" VARCHAR NOT NULL,"POPULARITY" INTEGER NOT NULL,"PRICE" REAL NOT NULL,"IMAGE_URL" VARCHAR NOT NULL);
create table "MOTHERBOARD" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MANUFACTURER" VARCHAR NOT NULL,"MODEL" VARCHAR NOT NULL,"SOCKET" VARCHAR NOT NULL,"IMG_URL" VARCHAR NOT NULL,"PRICE" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL);
create table "PROCESSOR" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MODEL" VARCHAR NOT NULL,"MANUFACTURER" VARCHAR NOT NULL,"SOCKET" VARCHAR NOT NULL,"NB_CORES" INTEGER NOT NULL,"NB_THREADS" INTEGER NOT NULL,"FREQUENCY" REAL NOT NULL,"CONSUMPTION" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL,"PRICE" REAL NOT NULL,"IMAGE_URL" VARCHAR NOT NULL);
create table "STORAGE" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MANUFACTURER" VARCHAR NOT NULL,"MODEL" VARCHAR NOT NULL,"GIGABYTES" INTEGER NOT NULL,"ROTATION_SPEED" INTEGER NOT NULL,"IMG_URL" VARCHAR NOT NULL,"PRICE" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL);

# --- !Downs

drop table "STORAGE";
drop table "PROCESSOR";
drop table "MOTHERBOARD";
drop table "MEMORY";
drop table "GRAPHIC_CARD";
drop table "COMPUTER_CASE";
drop table "ALIMENTATION";

