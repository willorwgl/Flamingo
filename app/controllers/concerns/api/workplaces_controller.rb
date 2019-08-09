



class Api::WorkplacesController < ApplicationController 


     def create
        @workplace = current_user.workplaces.new(workplace_params)
         if @workplace.save 
            render :show
        else
            render ["Invalid workplace"], status: 422
        end
    end

    def index

    end

    def destroy
        current_user.workplaces.find(params[:id]).destroy
    end

    def update 
        @workplace = current_user.workplaces.find(params[:id])
        if @workplace.update(workplace_params) 
            render :show
        else
            render ["Invalid workplace"], status: 422
        end
    end

    private 
    def workplace_params
        params.require(:workplace).permit(:company, :position, :city_town, :description)
    end

end