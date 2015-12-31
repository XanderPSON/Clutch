class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :event, index: true, foreign_key: true
      t.integer :rater_id
      t.integer :ratee_id
      t.float :rating
      t.text :rating_feedback

      t.timestamps null: false
    end
  end
end
