

class Post < ApplicationRecord 

    validates :body, :author_id, :wall_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :wall,
        foreign_key: :wall_id,
        class_name: :User


end