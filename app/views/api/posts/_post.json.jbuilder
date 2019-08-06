json.extract! post, :id, :body, :author_id, :wall_id, :updated_at
author = post.author
json.extract! author, :first_name, :last_name
# json.comments do
#     post.comments.each do |comment| 
#         json.partial! 'api/comments/comment', comment: comment
#     end
# end

json.comments do 
        post.comments.each do |comment|
            json.set! comment.id do 
                json.partial! 'api/comments/comment', comment: comment
            end
        end
end