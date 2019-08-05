# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  author_id  :integer          not null
#  wall_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#



class Post < ApplicationRecord 

    validates :body, :author_id, :wall_id, presence: true

    has_many :comments, as: :commentable

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :wall,
        foreign_key: :wall_id,
        class_name: :User


end
