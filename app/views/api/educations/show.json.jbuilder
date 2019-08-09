   json.set! @education.id do 
            json.extract! @education, :id, :school, :description, :user_id
end