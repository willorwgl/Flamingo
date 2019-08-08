


@friendships.each do |friendship|
    json.set! friendship.id do
        json.extract! friendship, :id, :user_id, :friend_id, :status
    end
end

json.friends do


    @friendships.each do |friendship| 

        if friendship.status == "accepted" 
            user = friendship.user
            friend = friendship.friend
            if user.id != @user_id.to_i
                    json.set! user.id do
                    json.extract! user, :id, :first_name, :last_name, :email, :dob, :gender, :pronoun, :bio
                    if user.profile_photo.attached?
                    json.profilePhoto url_for(@user.profile_photo)
                    end
                end
            end 

            if friend.id != @user_id.to_i
                json.set! friend.id do
                    json.extract! friend, :id, :first_name, :last_name, :email, :dob, :gender, :pronoun, :bio
                    if friend.profile_photo.attached?
                        json.profilePhoto url_for(friend.profile_photo)
                    end
                end
            end
        end
    end  

end
