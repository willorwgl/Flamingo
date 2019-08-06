# # @posts.each do |post|
# #     json.set! post.id do
# #         render("api/posts/post.json.jbuilder", post: post)
# #     end
# # end

# json.set! @post.id do
#     # json.extract! @post, :body, :author_id, :wall_id
#     json.partial! partial: 'api/posts/post', post: @post
#     # json.extract! post, :body, :author_id, :wall_id
#     # author = post.author
#     # json.extract! author, :first_name, :last_name
# end

json.post do
    json.set! @post.id do 
        json.partial! 'api/posts/post', post: @post
    end
end


json.author do 
    json.set! @post.author_id do
        json.partial! 'api/users/user', user: @post.author
    end
end

json.comments do 
    @post.comments.each do |comment|
        json.set! comment.id do 
            json.partial! 'api/comments/comment', comment: comment
        end
    end
end
