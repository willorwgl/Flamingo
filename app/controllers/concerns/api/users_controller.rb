class Api::UsersController < ApplicationController
  

    def show
      @user = User.find(params[:id])
    end

    def update
      
    end

    def create
      @user = User.new(user_params)
      if @user.save
        login(@user)
        render :show
      else
        render json: ["Invalid user"], status: 401
      end
    end

    private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :email, :gender, :pronoun, :dob)
    end

end
