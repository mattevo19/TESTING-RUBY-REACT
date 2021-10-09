Rails.application.routes.draw do
  root to: 'pages#home'
  get "cars/:id", to: 'pages#home'
  get "cars/new", to: 'pages#home'
end
