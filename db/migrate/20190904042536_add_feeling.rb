class AddFeeling < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :feeling, :string
  end
end
