class CreateRsvps < ActiveRecord::Migration
  def change
    create_table :rsvps do |t|
      t.integer :guest_id
      t.references :event, index: true, foreign_key: true
      t.boolean :pending
      t.boolean :confirmed
      t.text :message

      t.timestamps null: false
    end
  end
end
