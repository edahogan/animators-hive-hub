-- community messages: i id, c community, u author, x text, t created ms
create table msg (
 i text primary key,
 c text not null references c(i) on delete cascade,
 u text not null references u(i) on delete cascade,
 x text not null,
 t integer not null
);
create index msg_c on msg(c, t);
