json.extract! post, :id, :body, :author_id, :wall_id, :post_tags, :feeling, :updated_at
author = post.author
json.extract! author, :first_name, :last_name

if post.photos.attached? 
    photos = post.photos.map  do |photo|
        url_for(photo)
    end
    json.postPhotos photos
end


