class CreateEducations < ActiveRecord::Migration[5.2]
  def change
    create_table :educations do |t|
      t.string :school, null: false
      t.text :description
      t.integer :user_id, null: false, index: true
    end
  end
end
