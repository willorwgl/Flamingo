# == Schema Information
#
# Table name: educations
#
#  id          :bigint           not null, primary key
#  school      :string           not null
#  description :text
#  user_id     :integer          not null
#

class Education < ApplicationRecord


    validates :school, presence: true
    belongs_to :user


end
