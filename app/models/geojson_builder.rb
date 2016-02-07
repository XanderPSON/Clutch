class GeojsonBuilder < ActiveRecord::Base

	  def self.build_event(event)
     {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [event.longitude, event.latitude]
      },
      properties: {
        id: event.id,
        host: User.find(event.host_id).first_name + " " + User.find(event.host_id).last_name,
        name: event.name,
        description:event.description,
        public_location: event.public_location,
        address_line_1: event.address_line_1,
        address_line_2: event.address_line_2,
        city: event.city,
        state: event.state,
        zip: event.zip,
        currently_attending: event.rsvps.where(confirmed: true).length,
        max_size: event.max_size,
        date_start: event.time_start.strftime('%b %-e, %Y'),
        time_start: event.time_start.strftime('%-l:%M %p') ,
        date_end: event.time_end.strftime('%b %-e, %Y'),
        time_end: event.time_end.strftime('%-l:%M %p'),
        category: event.category.downcase,
        "marker-color": set_color(event),
        "marker-symbol": set_symbol(event),
        "marker-size": "medium"
      }
    }
  end

  def self.set_color(event)
    case event.category.downcase
    when "videogames"
      "#00CCFF"
    when "boardgames"
      "#a52a2a"
    when "basketball"
      "#FFCC33"
    when "soccer"
      "#000000"
    when "tennis"
      "#C6ED2C"
    when "cycling"
      "#FF3399"
    when "hiking"
      "#00CC66"
    when "restaurant exploring"
      "#cc00cc"
    else
      "#FFFF66"
    end
  end

  def self.set_symbol(event)
    case event.category.downcase
    when "videogames"
      "beer"
    when "boardgames"
      "library"
    when "basketball"
      "basketball"
    when "soccer"
      "soccer"
    when "tennis"
      "tennis"
    when "cycling"
      "bicycle"
    when "hiking"
      "pitch"
    when "restaurant exploring"
      "restaurant"
    else
      "triangle-stroked"
    end
  end

end

# [ "circle-stroked", "circle", "square-stroked", "square", "triangle-stroked", "triangle", "star-stroked", "star", "cross", "marker-stroked", "marker", "religious-jewish", "religious-christian", "religious-muslim", "cemetery", "rocket", "airport", "heliport", "rail", "rail-metro", "rail-light", "bus", "fuel", "parking", "parking-garage", "airfield", "roadblock", "ferry", "harbor", "bicycle", "park", "park2", "museum", "lodging", "monument", "zoo", "garden", "campsite", "theatre", "art-gallery", "pitch", "soccer", "america-football", "tennis", "basketball", "baseball", "golf", "swimming", "cricket", "skiing", "school", "college", "library", "post", "fire-station", "town-hall", "police", "prison", "embassy", "beer", "restaurant", "cafe", "shop", "fast-food", "bar", "bank", "grocery", "cinema", "pharmacy", "hospital", "danger", "industrial", "warehouse", "commercial", "building", "place-of-worship", "alcohol-shop", "logging", "oil-well", "slaughterhouse", "dam", "water", "wetland", "disability", "telephone", "emergency-telephone", "toilets", "waste-basket", "music", "land-use", "city", "town", "village", "farm", "bakery", "dog-park", "lighthouse", "clothing-store", "polling-place", "playground", "entrance", "heart", "london-underground", "minefield", "rail-underground", "rail-above", "camera", "laundry", "car", "suitcase", "hairdresser", "chemist", "mobilephone", "scooter", "gift", "ice-cream", "dentist", “aerialway"]