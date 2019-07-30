

class Api::SessionsController < ApplicationController

    def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user 
      login(@user)
      render 'api/users/show'
    else
      render json: ['Invalid credentials'], status: 400
    end
  end

  def destroy
    render json: { message: "User not found" }, status: 404  unless @current_user
    logout
  end
end