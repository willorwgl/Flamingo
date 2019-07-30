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
#

class User < ApplicationRecord

    validates :first_name, :last_name, :session_token, :password_digest, :gender,
    :email, :dob, presence: true
    validates :session_token, :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    after_initialize :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(email, password) 
        user = User.find_by_email(email)
        return nil unless user && user.is_password?(password)
        user
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    def is_password?(passord)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    private
    def ensure_session_token 
        self.session_token ||= User.generate_session_token
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end


end
