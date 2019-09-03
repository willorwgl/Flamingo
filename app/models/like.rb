
ALLOWED_TYPES = [
   'like',
   'haha',
   'love',
   'wow',
   'sad',
   'angry'
]

class Like < ApplicationRecord 

    validates :like_type, :user_id, presence: true

    validates_inclusion_of :like_type, in: ALLOWED_TYPES

    belongs_to :likeable, polymorphic: true

    belongs_to :user

end