json.extract! user, :id, :email, :dob, :gender, :pronoun, :first_name, :last_name, :bio
if user.profile_photo.attached?
    json.profilePhoto url_for(user.profile_photo)
end
