class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_action :authenticate_user!, :except => [:index, :show]
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    ## To permit attributes while registration i.e. sign up (app/views/devise/registrations/new.html.erb)
    devise_parameter_sanitizer.for(:sign_up) << :first_name << :last_name << :address_line_1 << :address_line_2 << :city << :state << :zip << :longitude << :latitude << :avatar << :phone_number << :provider << :uid

    ## To permit attributes while editing a registration (app/views/devise/registrations/edit.html.erb)
    devise_parameter_sanitizer.for(:account_update) << :first_name << :last_name << :address_line_1 << :address_line_2 << :city << :state << :zip << :longitude << :latitude << :avatar << :phone_number << :provider << :uid
  end
end