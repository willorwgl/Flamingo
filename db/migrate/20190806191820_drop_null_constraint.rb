class DropNullConstraint < ActiveRecord::Migration[5.2]
  def change

    change_column :posts, :body, :text, :null => true
  end
end
