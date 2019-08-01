# @posts.each do |post|
#     json.set! post.id do
#         render("api/posts/post.json.jbuilder", post: post)
#     end
# end

json.set! @post.id do
    # json.extract! @post, :body, :author_id, :wall_id
    json.partial! partial: 'api/posts/post', post: @post
    # json.extract! post, :body, :author_id, :wall_id
    # author = post.author
    # json.extract! author, :first_name, :last_name
end
