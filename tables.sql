CREATE TABLE IF NOT EXISTS "Mammals" (
  "id" serial,
  "firstName" varchar(255),
  "lastName" varchar(255),
  "createdAt" timestamp with time zone not null default now(),
  "updatedAt" timestamp with time zone not null  default now()
);


CREATE TABLE students(
  id serial primary key,
  first_name varchar(255)
);

CREATE TABLE papers(
  id serial primary key,
  title varchar(255),
  grade int not null,
  student_id int,
  foreign key(student_id) references students(id)
);

insert into students (first_name) values
('Caleb'),
('Samantha'),
('Raj'),
('Carlos'),
('Lisa');

insert into papers (student_id,title,grade) values
(1,'My First Book Report',60),
(1,'My Second Book Report',75),
(2,'Russian Lit Through Ages',94),
(2,'De Montaigne and The Art of The Essay',98),
(4,'Borges and Magical Realism',89);

select first_name, title, grade from students
inner join papers
on students.id=student_id
order by grade desc;


select first_name, title, grade from students
left outer join papers
on students.id=student_id;

update papers set title = 'My First Book Report'
where grade=60;

select first_name, ifnull(title,'MISSING'), grade from students
left outer join papers
on students.id=student_id;

create or replace view  show_functions as 
select routine_name from information_schema.routines
where routine_type='FUNCTION' and specific_schema ='public';


create or replace function ins_row(sname text)
returns TABLE (id int, first_name text)
language plpgsql
as
$$
  -- declare name:='baba';
  begin
    insert into students(first_name) values(sname) returning *;
  end;
$$;

create or replace function count_copies(copy_size int)
returns int as
$$
  declare
    res int;
  begin
  select count(*) into res from tb where coname>copy_size;

  end;
$$ language plpgsql;