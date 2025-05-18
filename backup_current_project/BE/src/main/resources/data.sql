-- Truncate existing data
TRUNCATE TABLE profiles CASCADE;
TRUNCATE TABLE relationships CASCADE;
TRUNCATE TABLE events CASCADE; 
TRUNCATE TABLE photos CASCADE;

-- Insert relationship
INSERT INTO relationships (id, start_date, title, description, song, song_url, couple_image_url)
VALUES (1, '2020-11-09', 'Mối tình đẹp', 'Một hành trình tình yêu tràn đầy kỷ niệm đẹp, niềm vui và sự tôn trọng lẫn nhau.', 'Em Của Ngày Hôm Qua - Sơn Tùng MTP', '/sounds/love-song.mp3', '/images/couple.jpg');

-- Insert profiles
INSERT INTO profiles (id, name, birthday, avatar_url, bio, favorite_quote, relationship_id)
VALUES (1, 'Minh', '1995-05-10', '/images/profile1.jpg', 'Yêu thích âm nhạc, nghệ thuật và khám phá những địa điểm mới.', 'Yêu là cho đi mà không mong nhận lại', 1);

INSERT INTO profiles (id, name, birthday, avatar_url, bio, favorite_quote, relationship_id)
VALUES (2, 'Linh', '1996-08-15', '/images/profile2.jpg', 'Đam mê đọc sách, nấu ăn và đi du lịch cùng người yêu.', 'Tình yêu là sự tôn trọng và thấu hiểu', 1);

-- Insert events
INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (1, 'Ngày đầu tiên gặp nhau', '2020-11-02', 'Chúng mình gặp nhau lần đầu tại quán cà phê ở phố cổ.', 
'Hôm đó là một ngày thu đẹp trời, tình cờ chúng mình gặp nhau tại quán cà phê yên tĩnh ở phố cổ. Cuộc trò chuyện đầu tiên đã kéo dài hơn 3 tiếng đồng hồ mà không ai muốn kết thúc. Từ âm nhạc, sách, đến những ước mơ trong tương lai - chúng mình đã chia sẻ mọi thứ như đã quen nhau từ rất lâu.', 
'/images/first-meet.jpg', 1);

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (2, 'Bắt đầu hẹn hò', '2020-11-09', 'Chính thức trở thành một cặp sau buổi hẹn dưới trời sao.',
'Sau một tuần nói chuyện liên tục qua điện thoại, chúng mình quyết định gặp nhau lần nữa tại công viên. Dưới bầu trời đầy sao, chúng mình đã chia sẻ những cảm xúc chân thành và quyết định bắt đầu một hành trình mới cùng nhau. Đó là khoảnh khắc mà cả hai đều biết rằng điều gì đó rất đặc biệt đang bắt đầu.',
'/images/start-dating.jpg', 1);

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (3, 'Kỷ niệm 100 ngày yêu', '2021-02-17', 'Cùng nhau đón kỷ niệm 100 ngày yêu tại Đà Lạt.',
'Để kỷ niệm 100 ngày bên nhau, chúng mình đã quyết định đi Đà Lạt - nơi mà cả hai đều mơ ước được đến cùng nhau. Những ngày tại thành phố mộng mơ đã để lại nhiều kỷ niệm khó quên: cùng nhau đạp xe quanh hồ Xuân Hương, thưởng thức cà phê trong sáng sớm se lạnh và nắm tay nhau dạo bước dưới những hàng thông. Đây là chuyến đi đầu tiên của chúng mình và cũng là lúc chúng mình biết rằng chúng mình có thể cùng nhau đi đến bất cứ đâu.',
'/images/100-days.jpg', 1);

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (4, 'Kỷ niệm 1 năm', '2021-11-09', 'Tổ chức bữa tối lãng mạn nhân dịp tròn 1 năm bên nhau.',
'Một năm trôi qua thật nhanh nhưng đầy ắp những kỷ niệm tuyệt vời. Để kỷ niệm cột mốc quan trọng này, anh đã bí mật chuẩn bị một bữa tối lãng mạn tại nhà hàng yêu thích của em, nơi chúng mình đã có buổi hẹn hò đầu tiên. Những món ăn ngon, rượu vang đỏ, và chiếc bánh kem nhỏ xinh với một chiếc nhẫn bạc - món quà kỷ niệm một năm mà anh tặng em. Chúng mình đã chia sẻ những khoảnh khắc đẹp nhất trong năm qua và lên kế hoạch cho tương lai.',
'/images/anniversary-1year.jpg', 1);

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (5, 'Chuyến du lịch Phú Quốc', '2022-07-15', 'Kỳ nghỉ hè tuyệt vời tại bãi biển Phú Quốc.',
'Mùa hè năm 2022, chúng mình đã thực hiện chuyến du lịch đáng nhớ đến Phú Quốc. Những ngày trên đảo ngọc là khoảng thời gian thư giãn và gắn kết tuyệt vời: cùng nhau ngắm bình minh trên biển, lặn ngắm san hô, thưởng thức hải sản tươi ngon và cùng nhau ngồi trên bãi cát trắng ngắm hoàng hôn. Đây cũng là lần đầu tiên chúng mình ở chung phòng trong một kỳ nghỉ dài, và chúng mình đã học được nhiều điều về nhau hơn - từ những thói quen nhỏ đến cách chúng mình cùng nhau giải quyết những vấn đề phát sinh trong chuyến đi.',
'/images/phu-quoc-trip.jpg', 1);

-- Insert more events
INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (6, 'Kỷ niệm 2 năm', '2022-11-09', 'Kỷ niệm 2 năm bên nhau với một chuyến dã ngoại đặc biệt.',
'Hai năm bên nhau, chúng mình quyết định kỷ niệm khác biệt một chút với chuyến dã ngoại ở vùng ngoại ô. Thay vì những không gian sang trọng, chúng mình đã chọn sự bình yên của thiên nhiên: cùng nhau dựng lều, nấu ăn outdoors và ngồi bên đống lửa trại dưới bầu trời đầy sao. Đêm đó, chúng mình đã nói về ngôi nhà tương lai, về những đứa trẻ có thể sẽ chào đời, và về việc chúng mình sẽ cùng nhau già đi như thế nào. Đó là lúc chúng mình biết rằng tình yêu này không chỉ là hiện tại mà còn là tương lai.',
'/images/anniversary-2year.jpg', 1);

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (7, 'Chuyến du lịch Hội An', '2023-04-22', 'Khám phá vẻ đẹp cổ kính của Hội An cùng nhau.',
'Tháng 4 năm 2023, chúng mình đã thực hiện chuyến du lịch đến Hội An, thành phố cổ xinh đẹp mà cả hai đều ao ước được đến. Dưới ánh đèn lồng rực rỡ, chúng mình đã cùng nhau thả đèn hoa đăng trên sông Hoài, khám phá những con phố cổ, thử may những bộ áo dài truyền thống và thưởng thức ẩm thực địa phương. Đặc biệt, tại một quán cà phê nhỏ nhìn ra sông, chúng mình đã bất ngờ gặp được một cặp đôi già đang kỷ niệm 50 năm ngày cưới. Họ đã chia sẻ với chúng mình bí quyết của một tình yêu bền vững: sự kiên nhẫn, thấu hiểu và không bao giờ đi ngủ khi còn giận nhau. Đó là bài học quý giá mà chúng mình luôn ghi nhớ.',
'/images/hoi-an-trip.jpg', 1);

INSERT INTO events (id, title, date, short_description, full_description, image_url, relationship_id)
VALUES (8, 'Kỷ niệm 3 năm', '2023-11-09', 'Ba năm hạnh phúc bên nhau được đánh dấu bằng chuyến du lịch Nhật Bản.',
'Để kỷ niệm 3 năm bên nhau, chúng mình đã thực hiện ước mơ chung: chuyến du lịch đến Nhật Bản vào mùa lá đỏ. Từ những ngôi đền cổ kính ở Kyoto, đến sự nhộn nhịp của Tokyo, mỗi khoảnh khắc đều trở nên đặc biệt khi được chia sẻ cùng nhau. Đứng dưới những tán phong lá đỏ ở công viên Arashiyama, chúng mình đã viết ra những mong ước cho tương lai và hứa sẽ quay lại đây sau 10 năm nữa, khi đó có thể đã là một gia đình nhỏ với những đứa trẻ. Chuyến đi này không chỉ là một kỷ niệm đẹp mà còn là lời hứa cho một hành trình dài phía trước.',
'/images/anniversary-3year.jpg', 1);

-- Insert photos
INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (1, 'Lần đầu đi xem phim cùng nhau', '2020-11-20', 'Buổi tối đi xem ''Tenet'' tại rạp sau ngày làm việc mệt mỏi.', '/images/movie-date.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (2, 'Picnic cuối tuần', '2021-03-27', 'Buổi picnic đầu tiên tại công viên thành phố vào một ngày xuân đẹp trời.', '/images/picnic.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (3, 'Sinh nhật của Linh', '2021-08-15', 'Bữa tiệc sinh nhật bất ngờ cho Linh tại nhà với bạn bè thân thiết.', '/images/birthday-linh.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (4, 'Noel 2021', '2021-12-24', 'Đón Giáng sinh đầu tiên cùng nhau tại khu phố đèn lồng.', '/images/christmas-2021.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (5, 'Chuyến đi Sapa', '2022-01-15', 'Cùng nhau ngắm tuyết rơi tại Sapa, trải nghiệm hiếm có ở Việt Nam.', '/images/sapa-trip.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (6, 'Sinh nhật của Minh', '2022-05-10', 'Kỷ niệm sinh nhật Minh với chuyến đi chơi thuyền kayak.', '/images/birthday-minh.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (7, 'Lễ hội ánh sáng', '2022-09-18', 'Tham gia lễ hội ánh sáng tại bảo tàng nghệ thuật thành phố.', '/images/light-festival.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (8, 'Tết Nguyên Đán 2023', '2023-01-22', 'Cùng nhau đón giao thừa và tham quan chợ hoa Tết.', '/images/tet-2023.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (9, 'Kỷ niệm 1000 ngày yêu', '2023-08-05', 'Kỷ niệm đặc biệt 1000 ngày bên nhau tại nhà hàng trên tầng thượng.', '/images/1000-days.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (10, 'Halloween 2023', '2023-10-31', 'Cùng nhau hóa trang thành cặp đôi trong phim ''La La Land'' trong bữa tiệc Halloween.', '/images/halloween-2023.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (11, 'Kỷ niệm 3 năm tại Nhật Bản', '2023-11-09', 'Khoảnh khắc đặc biệt dưới tán lá đỏ tại Arashiyama, Kyoto.', '/images/japan-anniversary.jpg', 1);

INSERT INTO photos (id, title, date, description, image_url, relationship_id)
VALUES (12, 'Năm mới 2024', '2024-01-01', 'Chào đón năm mới 2024 cùng nhau tại bữa tiệc countdown.', '/images/new-year-2024.jpg', 1);