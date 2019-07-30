class EditUsersColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :pronoun, :string, null: true
    change_column :users, :gender, :string, :null => false
  end
end
