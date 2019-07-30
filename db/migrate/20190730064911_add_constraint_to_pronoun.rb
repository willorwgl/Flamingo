class AddConstraintToPronoun < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :pronoun, :string, :null => true
  end
end
