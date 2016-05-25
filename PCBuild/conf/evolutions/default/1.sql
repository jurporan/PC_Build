# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "MOTHERBOARD" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MANUFACTURER" VARCHAR NOT NULL,"MODEL" VARCHAR NOT NULL);
create table "STORAGE" ("ID" INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,"MANUFACTURER" VARCHAR NOT NULL,"MODEL" VARCHAR NOT NULL,"GIGABYTES" INTEGER NOT NULL,"ROTATION_SPEED" INTEGER NOT NULL,"ENERGY_CONSUMPTION" REAL NOT NULL,"POPULARITY" INTEGER NOT NULL);

# --- !Downs

drop table "STORAGE";
drop table "MOTHERBOARD";

