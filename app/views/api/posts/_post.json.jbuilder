json.extract! post, :body, :author_id, :wall_id
author = post.author
json.extract! author, :first_name, :last_name