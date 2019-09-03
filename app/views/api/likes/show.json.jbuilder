json.set! @like.id do
    json.extract! @like, :id, :user_id, :like_type, :likeable_type, :likeable_id
end