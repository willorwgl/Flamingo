# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  body              :text             not null
#  author_id         :integer          not null
#  post_id           :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ApplicationRecord

    validates :body, :author_id, null: false

    belongs_to :post, inverse_of: :comments

    belongs_to :author,
        class_name: :User,
        foreign_key: :author_id,
        inverse_of: :comments

    has_many :child_comments,
        class_name: :Comment,
        foreign_key: :parent_comment_id

    belongs_to :parent_comment,
        class_name: :Comment,
        foreign_key: :parent_comment_id,
        optional: true

    has_many :likes, as: :likeable

end
