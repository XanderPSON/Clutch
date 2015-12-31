json.array!(@rsvps) do |rsvp|
  json.extract! rsvp, :id
  json.url rsvp_url(rsvp, format: :json)
end
