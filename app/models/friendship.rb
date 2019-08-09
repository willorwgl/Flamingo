

class Friendship < ApplicationRecord 


    validates :status, presence: true

    belongs_to :user

    belongs_to :friend, 
        class_name: :User
end