

json.posts do
     @posts.each do |post|
        json.set! post.id do
            json.partial! 'api/posts/post', post: post
        end
    end
end

@posts.each do |post|
    json.authors do 
        json.set! post.author_id do
            json.partial! 'api/users/user', user: post.author
        end
        post.comments.each do |comment|
            json.set! comment.author_id do
                json.partial! 'api/users/user', user: comment.author
            end
        end
    end

    json.comments do 
        post.comments.each do |comment|
            json.partial! 'api/comments/comment', comment: comment
        end
    end

    json.likes do
        post.likes.each do |like|
        json.set! like.id do
            json.extract! like, :id, :user_id, :like_type, :likeable_type, :likeable_id
            end     
        end

        post.comments.each do |comment|
            comment.likes.each do |like|
                json.set! like.id do
                    json.extract! like, :id, :user_id, :like_type, :likeable_type, :likeable_id
                end     
            end
        end
    end
end





