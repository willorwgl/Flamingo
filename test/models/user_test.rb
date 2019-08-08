# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  gender          :string           not null
#  dob             :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  pronoun         :string           not null
#  bio             :text
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
