class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :session_token, null: false, index: true
      t.string :password_digest, null: false
      t.string :email, null: false, index: true
      t.string :gender, null: false
      t.string :dob, null: false
      t.timestamps
    end

    add_index :users, [:last_name, :first_name]
  end
end
