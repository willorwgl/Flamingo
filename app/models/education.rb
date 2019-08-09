class Education < ApplicationRecord


    validates :school, presence: true
    belongs_to :user


end