select * from page_view order by created_at desc;


/*List of pages*/

select page, count(*) from page_view group by page;


/*Number of views in last day, week and year:
*/

select * from page_view where page = 'home' and created_at BETWEEN '2024-03-16' and '2024-03-18';

select * from page_view where created_at BETWEEN '2024-03-16' and '2024-03-18';

/*  List of buttons */

select * from button_click;

select button, count(*) from button_click group by button;


/*Number of clicks in last day, week, year */
select * from button_click where created_at BETWEEN '2024-03-01' and '2024-03-18';


select * from public.user u left join fingerprints f on u.id = f.user_id;


select * from fingerprints;
select * from public.user u right join fingerprints f on u.id = f.user_id;