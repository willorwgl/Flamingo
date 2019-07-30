class AddConstraintToPronoun2 < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :pronoun, false
  end
end
