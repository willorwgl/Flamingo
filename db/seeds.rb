# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'


ActiveRecord::Base.transaction do

    User.destroy_all
    Comment.destroy_all
    Post.destroy_all
    Workplace.destroy_all
    Education.destroy_all
    Friendship.destroy_all



    william = User.create(first_name: "William", last_name: "Blake", dob: "03-11-2000", password: "Az123456@", gender: "male", pronoun: "he", email: "a123@flamingo.com", bio: "If the doors of perception were cleansed, everything would appear to man as it is, infinite.")
    file = open('https://flamingo-seed.s3.amazonaws.com/photo1.jpg')
    william.profile_photo.attach(io: file, filename: 'photo1.jpg' )


    anna = User.create(first_name: "Anna", last_name: "Malcom", dob: "12-12-1912", password: "Bz123456@", gender: "female", pronoun: "she", email: "b123@flamingo.com", bio: "Friendship with oneself is all important, because without it one cannot be friends with anyone else in the world.")
    file = open("https://flamingo-seed.s3.amazonaws.com/photo2.jpg")
    anna.profile_photo.attach(io: file, filename: 'photo2.jpg' )


    george = User.create(first_name: "George", last_name: "Villafane", dob: "08-15-1901", password: "Cz123456@", gender: "male", pronoun: "he", email: "c123@flamingo.com", bio: "The unfortunate thing about this world is that good habits are so much easier to give up than bad ones.")
    file = open("https://flamingo-seed.s3.amazonaws.com/photo3.jpg")
    george.profile_photo.attach(io: file, filename: 'photo3.jpg' )

    john = User.create(first_name: "John", last_name: "Doe", dob: "02-23-1967", password: "Dz123456@", gender: "male", pronoun: "he", email: "d123@flamingo.com", bio: "If you would lift me up you must be on higher ground.")
    file = open("https://flamingo-seed.s3.amazonaws.com/photo4.jpg")
    john.profile_photo.attach(io: file, filename: 'photo4.jpg' )

    michelle = User.create(first_name: "Michelle", last_name: "Ahn", dob: "11-11-1911", password: "Ez123456@", gender: "female", pronoun: "she", email: "e123@flamingo.com", bio: "A seed grows into a beautiful flower. Thick in beauty and yet has little power.")
    file = open("https://flamingo-seed.s3.amazonaws.com/photo5.jpg")
    michelle.profile_photo.attach(io: file, filename: 'photo5.jpg' )


    post1 = anna.wall_posts.create(body: "Life is not a spectacle or a feast; it is a predicament", author_id: anna.id)
    comment1 = post1.comments.create(body: "Wine makes a man better pleased with himself; I do not say that it makes him more pleasing to others.",  author_id: john.id  )
    comment1.child_comments.create(body: "I do not wish to kill nor to be killed, but I can foresee circumstances in which these things would be by me unavoidable.", author_id: william.id)

    post2 = william.wall_posts.create(body: "A mathematician is a blind man in a dark room looking for a black cat which isn't there.", author_id: william.id)
    post3 = william.wall_posts.create(body: "Enjoy every minute. There's plenty of time to be dead.", author_id: john.id)
    post3.comments.create(body: "Don't waste yourself in rejection, or bark against the bad, but chant the beauty of the good.", author_id: george.id)
    post4 = william.wall_posts.create(body: "Life isn't fair. It's just fairer than death, that's all.", author_id: william.id)
    post4.comments.create(body: "The squirrel that you kill in jest, dies in earnest.", author_id: anna.id )
    post2.comments.create(body: "This country is a one-party country. Half of it is called Republican and half is called Democrat. It doesn't make any difference. All the really good ideas belong to the Libertarians.", author_id: anna.id)
    michelle.workplaces.create(company: "Facebook", description: "All human beings have three lives: public, private, and secret.")
    michelle.workplaces.create(company: "Google", description: "Thinking in its lower grades is comparable to paper money. and in its higher forms it is a kind of poetry.
    .")
    george.educations.create(school: "Hogwarts School of Witchcraft and Wizardry", description: "Hogwarts School of Witchcraft and Wizardry is the British wizarding school, located in the Scottish Highlands. It takes students from Great Britain and Ireland. It is a state-owned school funded by the Ministry of Magic. The precise location of the school can never be uncovered because it was rendered Unplottable." )
    william.educations.create(school: "Royal Academy of Arts", description: "The Royal Academy of Arts, located in the heart of London, is a place where art is made, exhibited and debated." )




    john.educations.create(school: "MIT")
    anna.educations.create(school: "Cornell University", description: "Cornell University is a private research university that provides an exceptional education for undergraduates and graduate and professional students. Cornell's ...
    ")

    Friendship.create(user_id: anna.id, friend_id:  william.id, status: "accepted")
    Friendship.create(user_id: anna.id, friend_id: john.id , status: "accepted")
    Friendship.create(user_id: john.id, friend_id: william.id, status: "accepted")
    Friendship.create(user_id: george.id, friend_id: michelle.id , status: "accepted")
    Friendship.create(user_id: michelle.id, friend_id: william.id , status: "accepted")
    Friendship.create(user_id: george.id , friend_id: william.id , status: "accepted")
end
