# == Schema Information
#
# Table name: workplaces
#
#  id          :bigint           not null, primary key
#  company     :string           not null
#  position    :string
#  city_town   :string
#  description :text
#  user_id     :integer          not null
#

class Workplace < ApplicationRecord

    validates :company, presence: true

    belongs_to :user

end
