create database doc_management

create table users (
id varchar primary key not null,
username varchar not null,
name varchar not null,
password varchar not null,
phone varchar not null,
role varchar not null);

create table pertandingan (
id varchar primary key not null,
lawan_pertandingan varchar,
tanggal_pertandingan date,
is_approved varchar); note: formatnya YYYY-MM-DD

create table administrasi (
id varchar primary key not null,
jenis_surat varchar,
tanggal_upload date,
dokumen varchar,
pic varchar,
comment varchar,
status varchar,
pertandingan_id varchar
);






