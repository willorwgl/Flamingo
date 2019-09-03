class CreatePostTags < ActiveRecord::Migration[5.2]
  def change
    create_table :post_tags do |t|
      t.integer :user_id, null: false, index: true
       t.integer :post_id, null: false, index: true
      t.timestamps
    end
  end
end
