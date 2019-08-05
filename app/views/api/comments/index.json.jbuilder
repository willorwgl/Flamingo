@comments.each do |comment|
    json.partial! partial: "api/comments/comment", comment: comment
end 