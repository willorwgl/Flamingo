

class Api::SessionsController < ApplicationController

    def create
      emailError = { emailError: "The email you've entered does not match any account"} 

      @user = User.find_by(email: params[:user][:email])
      unless @user 
        render json: emailError, status: 422 
        return
      end
      password_error = { attemptedUser: @user, passwordError: "The password you've entered is incorrect", profilePhoto: url_for(@user.profile_photo)}
      @user = User.find_by_credentials(@user, params[:user][:password])
      if @user 
        login(@user)
        render 'api/users/show'
      else
        render json: password_error, status: 422
      end
    end

    def destroy
      render json: { message: "Account not found" }, status: 404  unless current_user
      logout
    end


    


    


end