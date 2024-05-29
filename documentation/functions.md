delete_chat

```sh
begin
delete from "Chats"
where "Chats".chat_id = chatId;
return ('Chat deleted');
end;
```

<br>
delete_message

```sh
begin
delete from "Messages"
where "Messages".message_id = messageId;
return ('Message deleted');
end;
```

<br>
delete_review

```sh
begin
delete from "Reviews"
where "Reviews".review_id = reviewId;
return ('Review deleted');
end;
```

<br>
delete_skill

```sh
begin
delete from "Skills"
where "Skills".skill_id = skillId;
return ('Skill deleted');
end;
```

<br>
delete_user

```sh
begin
delete from "Users"
where "Users".user_id = userId;
return ('User deleted');
end;
```

<br>
delete_user_interest

```sh
begin
delete from "UserInterests"
where "UserInterests".user_id = delete_user_interest.user_id and "UserInterests".skill_id = delete_user_interest.skill_id;
return ('User interest deleted');
end;
```

<br>
delete_user_skill

```sh
begin
delete from "UserSkills"
where "UserSkills".user_id = delete_user_skill.user_id and "UserSkills".skill_id = delete_user_skill.skill_id;
return ('User skill deleted');
end;
```

<br>
get_chat_by_id

```sh
select * from "Chats" where "Chats".chat_id = chatId;
```

<br>
get_chat_messages

```sh
select * from "Messages" where "Messages".chat_id = chatId order by "Messages".time_created;
```

<br>
get_chats_by_user_id

```sh
select "Chats".chat_id, "Chats".chat_name
from "Chats"
join "UserChats" on "Chats".chat_id = "UserChats".chat_id
where "UserChats".user_id = userId;
```

<br>
get_matched_users

```sh
select "Users".user_id, "Users".time_created, "Users".username, "Users".avatar_url, "Users".description, "Users".showcase
from "Users"
join "UserInterests" on "Users".user_id = "UserInterests".user_id
join "UserSkills" on "Users".user_id = "UserSkills".user_id
where "UserInterests".skill_id = skillId and "UserSkills".skill_id = skillId
```

<br>
get_matched_users

```sh
 select distinct "Users".user_id, "Users".time_created, "Users".username, "Users".avatar_url, "Users".description, "Users".showcase
from "Users"
join "UserInterests" on "Users".user_id = "UserInterests".user_id
join "UserSkills" on "Users".user_id = "UserSkills".user_id
where "UserSkills".skill_id = skillid and "UserInterests".skill_id = interestid
```

<br>
get_reviews

```sh
select * from "Reviews";
```

<br>
get_reviews_by_reviewee

```sh
select * from "Reviews" where "Reviews".reviewee_id = userId
order by time_created desc;
```

<br>
get_reviews_by_reviewer

```sh
select * from "Reviews" where "Reviews".reviewer_id = userId;
```

<br>
get_skill_id_by_name

```sh
select "Skills".skill_id
from "Skills"
where "Skills".skill_name = skillname;
```

<br>
get_skills

```sh
select * from "Skills" order by "skill_name" asc;
```

<br>
get_user_by_id

```sh
select * from "Users" where "Users".user_id = userId;
```

<br>
get_user_interests

```sh
select "Skills".skill_id, "Skills".skill_name, "Skills".description
from "Skills"
join "UserInterests" on "Skills".skill_id = "UserInterests".skill_id
where "UserInterests".user_id = userId
order by "skill_name" asc;
```

<br>
get_user_skills

```sh
select "Skills".skill_id, "Skills".skill_name, "Skills".description
from "Skills"
join "UserSkills" on "Skills".skill_id = "UserSkills".skill_id
where "UserSkills".user_id = userId;
```

<br>
get_users

```sh
select * from "Users";
```

<br>
get_users_by_chat_id

```sh
select "Users".user_id, "Users".time_created, "Users".username, "Users".avatar_url, "Users".description, "Users".showcase
from "Users"
join "UserChats" on "Users".user_id = "UserChats".user_id
where "UserChats".chat_id = chatId;
```

<br>
get_users_by_interest

```sh
select distinct "Users".user_id, "Users".time_created, "Users".username, "Users".avatar_url, "Users".description, "Users".showcase
from "Users"
join "UserInterests" on "Users".user_id = "UserInterests".user_id
where "UserInterests".skill_id = skillId;
```

<br>
get_users_by_skill

```sh
select distinct "Users".user_id, "Users".time_created, "Users".username, "Users".avatar_url, "Users".description, "Users".showcase
from "Users"
join "UserSkills" on "Users".user_id = "UserSkills".user_id
where "UserSkills".skill_id = skillId;
```

<br>
post_chat

```sh
declare
new_row "Chats";
begin
insert into "Chats"(chat_name)
values (post_chat.chatName)
returning * into new_row;
return new_row;
end;
```

<br>
post_message

```sh
declare
new_row "Messages";
begin
insert into "Messages"(author, message, chat_id)
values (post_message.author, post_message.message, post_message.chatId)
returning * into new_row;
return new_row;
end;
```

<br>
post_review

```sh
declare
new_row "Reviews";
begin
insert into "Reviews"(reviewer_id, reviewee_id, message, rate)
values (post_review.reviewerId, post_review.revieweeId, post_review.message, post_review.rate)
returning * into new_row;
return new_row;
end;
```

<br>
post_skill

```sh
declare
new_row "Skills";
begin
insert into "Skills"(skill_name, description)
values (post_skill.skillName, post_skill.description)
returning * into new_row;
return new_row;
end;
```

<br>
post_user

```sh
declare
new_row "Users";
begin
insert into "Users"(user_id, username, avatar_url, description, showcase)
values (post_user.userId, post_user.username, post_user.avatarUrl, post_user.description, post_user.showcase)
returning * into new_row;
return new_row;
end;
```

<br>
post_user_interest

```sh
declare
new_row "UserInterests";
begin
insert into "UserInterests"(user_id, skill_id)
values (post_user_interest.user_id, post_user_interest.skill_id)
returning * into new_row;
return new_row;
end;
```

<br>
post_user_skill

```sh
declare
new_row "UserSkills";
begin
insert into "UserSkills"(user_id, skill_id)
values (post_user_skill.user_id, post_user_skill.skill_id)
returning * into new_row;
return new_row;
end;
```

<br>
update_chat

```sh
declare
new_row "Chats";
begin
update "Chats"
set chat_name = chatName
where "Chats".chat_id = chatId
returning * into new_row;
return new_row;
end;
```

<br>
update_message

```sh
declare
new_row "Messages";
begin
update "Messages"
set message = newMessage
where "Messages".message_id = messageId
returning * into new_row;
return new_row;
end;
```

<br>
update_review

```sh
declare
new_row "Reviews";
begin
update "Reviews"
set message = newMessage,
rate = newRate
where "Reviews".review_id = reviewId
returning * into new_row;
return new_row;
end;
```

<br>
update_skill

```sh
declare
new_row "Skills";
begin
update "Skills"
set skill_name = newName,
description = newDescription
where "Skills".skill_id = skillId
returning * into new_row;
return new_row;
end;
```

<br>
update_user

```sh
declare
new_row "Users";
begin
update "Users"
set username = newUsername,
avatar_url = newAvatarUrl,
description = newDescription,
showcase = newShowcase
where "Users".user_id = userId
returning * into new_row;
return new_row;
end;
```
