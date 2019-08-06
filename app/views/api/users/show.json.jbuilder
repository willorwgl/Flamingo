
json.set! @user.id do
    json.extract! @user, :id, :first_name, :last_name, :email, :dob, :gender, :pronoun, :bio
    if @user.profile_photo.attached?
        json.profilePhoto url_for(@user.profile_photo)
    end
end


