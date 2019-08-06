Rails.application.routes.draw do
  
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json} do
    resources :users, only: [:show, :create, :update] do
      resources :posts, only: [:index]
    end

    resources :posts, only: [:create, :destroy, :update] do
    
      resources :comments, only: [:index]
    end

    resources :comments, only: [:update, :destroy, :create]
    resource :session, only: [:create, :destroy]
  end
end
