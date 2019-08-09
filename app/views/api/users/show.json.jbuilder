
json.set! @user.id do
    json.extract! @user, :id, :first_name, :last_name, :email, :dob, :gender, :pronoun, :bio
    if @user.profile_photo.attached?
        json.profilePhoto url_for(@user.profile_photo)
    end
end


json.workplaces do
    @user.workplaces.each do |workplace|
    
        json.set! workplace.id do 
            json.extract! workplace, :id, :company, :position, :city_town, :description, :user_id
        end
    end
end

json.educations do
    @user.educations.each do |education| 
        json.set! education.id do 
            json.extract! education, :id, :school, :description, :user_id
        end
    end
end


