class CreateWorkplaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workplaces do |t|
      t.string :company, null: false
      t.string :position
      t.string :city_town
      t.text :description
      t.integer :user_id, null: false, index: true
    end
  end
end
