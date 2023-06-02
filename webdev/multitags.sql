-- with tag_ids as (select tag_id from tags where tag_name = any( array ['Academia', 'Horror'])),
-- post_tag_ids as (select post_id, tags from posts where array_length(tags, 1) > 0),
-- post_tag_counts as (select post_id, count(distinct tag_id) as tag_count from post_tag_ids join unnest(tags) as tag_id on true group by post_id)
-- select p.* from post_tag_counts ptc
-- join post_tag_ids p on ptc.post_id = p.post_id
-- where not exists(select 1 from unnest(array['Academia', 'Horror']) as tn left join tag_ids on tn = tag_name where tag_id not in (select tag_id from post_tag_ids where post_id = ptc.post_id))
-- and ptc.tag_count = array_length(array ['Academia', 'Horror'], 1);


WITH tag_ids AS (SELECT tag_id, tag_name FROM tags WHERE tag_name = ANY(array['Academia', 'Computer Science']) ), post_tag_counts AS ( SELECT post_id, COUNT(DISTINCT post_tags.tag_id) AS tag_count FROM (SELECT post_id, UNNEST(tags) AS tag_id FROM posts WHERE ARRAY_LENGTH(tags, 1) > 0) post_tags JOIN tag_ids ON tag_ids.tag_id = post_tags.tag_id GROUP BY post_id ) SELECT p.* FROM post_tag_counts ptc JOIN posts p ON ptc.post_id = p.post_id WHERE ptc.tag_count = ARRAY_LENGTH(array['Academia', 'Computer Science'], 1) AND NOT EXISTS ( SELECT 1 FROM UNNEST(array['Academia', 'Computer Science']) AS tn WHERE tn NOT IN (SELECT tag_name FROM tags WHERE tag_id = ANY(p.tags)));
