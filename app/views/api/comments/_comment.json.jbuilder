
json.set! comment.id do 
    json.extract! comment, :id, :body, :post_id, :parent_comment_id
end