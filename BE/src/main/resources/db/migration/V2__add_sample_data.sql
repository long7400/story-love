-- Add couple_image_url, song, song_url columns to relationships table if not exist
ALTER TABLE relationships 
ADD COLUMN IF NOT EXISTS couple_image_url VARCHAR(255),
ADD COLUMN IF NOT EXISTS song VARCHAR(255),
ADD COLUMN IF NOT EXISTS song_url VARCHAR(255);

-- Insert sample relationship data with image and song details
INSERT INTO relationships (id, start_date, title, description, song, song_url, couple_image_url)
VALUES (1, '2023-11-25', 'Mối tình đẹp', 'Một hành trình tình yêu tràn đầy kỷ niệm đẹp, niềm vui và sự tôn trọng lẫn nhau.', 'Em Của Ngày Hôm Qua - Sơn Tùng MTP', '/sounds/love-song.mp3', '/images/couple.jpg')
ON CONFLICT (id) DO UPDATE 
SET start_date = EXCLUDED.start_date,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    song = EXCLUDED.song,
    song_url = EXCLUDED.song_url,
    couple_image_url = EXCLUDED.couple_image_url;

-- Insert sample profiles
INSERT INTO profiles (id, name, birthday, avatar_url, bio, favorite_quote, relationship_id)
VALUES (1, 'Long', '2000-04-07', '/images/profile1.jpg', 'Yêu thích âm nhạc, nghệ thuật và khám phá những địa điểm mới.', 'Yêu là cho đi mà không mong nhận lại', 1)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name,
    birthday = EXCLUDED.birthday,
    avatar_url = EXCLUDED.avatar_url,
    bio = EXCLUDED.bio,
    favorite_quote = EXCLUDED.favorite_quote,
    relationship_id = EXCLUDED.relationship_id;

INSERT INTO profiles (id, name, birthday, avatar_url, bio, favorite_quote, relationship_id)
VALUES (2, 'Linh', '2000-03-10', '/images/profile2.jpg', 'Đam mê đọc sách, nấu ăn và đi du lịch cùng người yêu.', 'Tình yêu là sự tôn trọng và thấu hiểu', 1)
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name,
    birthday = EXCLUDED.birthday,
    avatar_url = EXCLUDED.avatar_url,
    bio = EXCLUDED.bio,
    favorite_quote = EXCLUDED.favorite_quote,
    relationship_id = EXCLUDED.relationship_id;

-- Insert sample events
INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (1, 'Ngày đầu tiên gặp nhau', '2020-11-02', 'Chúng mình gặp nhau lần đầu tại quán cà phê ở phố cổ.', 
'Hôm đó là một ngày thu đẹp trời, tình cờ chúng mình gặp nhau tại quán cà phê yên tĩnh ở phố cổ. Cuộc trò chuyện đầu tiên đã kéo dài hơn 3 tiếng đồng hồ mà không ai muốn kết thúc. Từ âm nhạc, sách, đến những ước mơ trong tương lai - chúng mình đã chia sẻ mọi thứ như đã quen nhau từ rất lâu.', 
'/images/first-meet.jpg', 1)
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    date = EXCLUDED.date,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image_url = EXCLUDED.image_url,
    relationship_id = EXCLUDED.relationship_id;

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (2, 'Bắt đầu hẹn hò', '2020-11-09', 'Chính thức trở thành một cặp sau buổi hẹn dưới trời sao.',
'Sau một tuần nói chuyện liên tục qua điện thoại, chúng mình quyết định gặp nhau lần nữa tại công viên. Dưới bầu trời đầy sao, chúng mình đã chia sẻ những cảm xúc chân thành và quyết định bắt đầu một hành trình mới cùng nhau. Đó là khoảnh khắc mà cả hai đều biết rằng điều gì đó rất đặc biệt đang bắt đầu.',
'/images/start-dating.jpg', 1)
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    date = EXCLUDED.date,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image_url = EXCLUDED.image_url,
    relationship_id = EXCLUDED.relationship_id;

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (3, 'Kỷ niệm 100 ngày yêu', '2021-02-17', 'Cùng nhau đón kỷ niệm 100 ngày yêu tại Đà Lạt.',
'Để kỷ niệm 100 ngày bên nhau, chúng mình đã quyết định đi Đà Lạt - nơi mà cả hai đều mơ ước được đến cùng nhau. Những ngày tại thành phố mộng mơ đã để lại nhiều kỷ niệm khó quên: cùng nhau đạp xe quanh hồ Xuân Hương, thưởng thức cà phê trong sáng sớm se lạnh và nắm tay nhau dạo bước dưới những hàng thông. Đây là chuyến đi đầu tiên của chúng mình và cũng là lúc chúng mình biết rằng chúng mình có thể cùng nhau đi đến bất cứ đâu.',
'/images/100-days.jpg', 1)
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    date = EXCLUDED.date,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    image_url = EXCLUDED.image_url,
    relationship_id = EXCLUDED.relationship_id;

-- Insert more events (truncated for brevity)

-- Insert sample photos
INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (1, 'Lần đầu đi xem phim cùng nhau', '2020-11-20', 'Buổi tối đi xem ''Tenet'' tại rạp sau ngày làm việc mệt mỏi.', '/images/movie-date.jpg', 1)
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    date = EXCLUDED.date,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    relationship_id = EXCLUDED.relationship_id;

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (2, 'Picnic cuối tuần', '2021-03-27', 'Buổi picnic đầu tiên tại công viên thành phố vào một ngày xuân đẹp trời.', '/images/picnic.jpg', 1)
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    date = EXCLUDED.date,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    relationship_id = EXCLUDED.relationship_id;

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (3, 'Sinh nhật của Linh', '2021-08-15', 'Bữa tiệc sinh nhật bất ngờ cho Linh tại nhà với bạn bè thân thiết.', '/images/birthday-linh.jpg', 1)
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title,
    date = EXCLUDED.date,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    relationship_id = EXCLUDED.relationship_id;

-- Create a default countdown if none exists
INSERT INTO countdowns (id, title, target_date, description, relationship_id)
SELECT 1, 'Kỷ niệm 5 năm yêu nhau', '2025-11-09 00:00:00', 'Đếm ngược đến kỷ niệm 5 năm ngày chúng mình bên nhau.', 1
WHERE NOT EXISTS (SELECT 1 FROM countdowns LIMIT 1);

-- Add some location markers
INSERT INTO location_markers (id, name, description, date, latitude, longitude, is_special, relationship_id)
VALUES 
(1, 'Nơi gặp nhau lần đầu', 'Quán cà phê nơi chúng mình gặp nhau lần đầu tiên.', '2020-11-02', 21.0285, 105.8542, true, 1),
(2, 'Đà Lạt - Kỷ niệm 100 ngày yêu', 'Chuyến đi đầu tiên của chúng mình cùng nhau', '2021-02-17', 11.9404, 108.4583, false, 1),
(3, 'Phú Quốc - Kỳ nghỉ hè 2022', 'Kỳ nghỉ đáng nhớ trên đảo ngọc', '2022-07-15', 10.2298, 103.9931, false, 1),
(4, 'Hội An - Du lịch mùa xuân', 'Thành phố cổ với những đèn lồng', '2023-04-22', 15.8801, 108.3380, false, 1),
(5, 'Tokyo, Nhật Bản - Kỷ niệm 3 năm', 'Chuyến đi quốc tế đầu tiên cùng nhau', '2023-11-09', 35.6804, 139.7690, true, 1)
ON CONFLICT (id) DO NOTHING;