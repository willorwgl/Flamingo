# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  like_type     :string           not null
#  likeable_type :string
#  likeable_id   :bigint
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#


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
