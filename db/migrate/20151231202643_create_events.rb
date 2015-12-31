class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :host_id
    	t.float :longitude
      t.float :latitude
      t.string :public_location
      t.string :address_line_1
      t.string :address_line_2
      t.string :city
      t.string :state
      t.string :zip
      t.integer :max_size
      t.datetime :time_start
      t.datetime :time_end
      t.string :name
      t.text :description
      t.string :category
      t.boolean :status, default: true
      t.boolean :approval_required

      t.timestamps null: false
    end
  end
end
