json.set! @workplace.id do 
            json.extract! @workplace, :id, :company, :position, :city_town, :description, :user_id
        
end