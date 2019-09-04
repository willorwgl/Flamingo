# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text
#  author_id  :integer          not null
#  wall_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_tags  :integer          default([]), is an Array
#



class Post < ApplicationRecord 

    validates :author_id, :wall_id, presence: true

    has_many :comments, as: :commentable

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :wall,
        foreign_key: :wall_id,
        class_name: :User
        
    has_many :comments,
        foreign_key: :post_id,
        class_name: :Comment
    
    has_many_attached :photos


    has_many :likes, as: :likeable

end
