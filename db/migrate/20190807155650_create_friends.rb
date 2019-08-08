class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.belongs_to :user
      t.belongs_to :friend, class: 'User'
      t.string :status, null: false
      t.timestamps
    end
  end
end
