@posts.each do |post|
    json.set! post.id do 
        json.partial! partial: 'api/posts/post', post: post
        # author = post.author
        # json.extract! author, :first_name, :last_name
    end
end