json.extract! user, :id, :email, :dob, :gender, :pronoun, :first_name, :last_name, :bio
if user.profile_photo.attached?
    json.profilePhoto url_for(user.profile_photo)
end

if user.cover_image.attached?
    json.coverImage url_for(user.cover_image)
end

if user.other_photos.attached?
    photos = user.other_photos.map  do |photo|
        url_for(photo)
    end
    json.otherPhotos photos
end
