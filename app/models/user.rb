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

class User < ApplicationRecord

    validates :first_name, :last_name, :session_token, :password_digest, :pronoun,
    :email, :dob, presence: true
    validates :session_token, :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    after_initialize :ensure_session_token, :ensure_bio

    attr_reader :password

    has_many :authored_posts, 
        foreign_key: :author_id,
        class_name: :Post

    has_many :wall_posts, 
        foreign_key: :wall_id,
        class_name: :Post

    has_many :comments,
        foreign_key: :author_id
    

    has_one_attached :profile_photo

    has_one_attached :cover_image

    

    def friendships
        Friendship.where("user_id = ? OR friend_id = ?", self.id, self.id)
    end

    def friends 
        self.friendships.where(status: "accepted")
    end

    def self.find_by_credentials(user, password)     
        return nil unless user && user.is_password?(password)
        user
    end

    def self.find_by_email(email) 
        User.find_by(email: email)
    end


    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    def is_password?(password)
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

    def ensure_bio 
        self.bio = ""
    end




end
