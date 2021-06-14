/*
 Navicat Premium Data Transfer

 Source Server         : DATN
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : kecommerce

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 14/06/2021 14:06:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for campaign
-- ----------------------------
DROP TABLE IF EXISTS `campaign`;
CREATE TABLE `campaign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL COMMENT '1: slide',
  `status` int DEFAULT '1' COMMENT '1: active, 2: inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of campaign
-- ----------------------------
BEGIN;
INSERT INTO `campaign` VALUES (1, 'https://photos2.vitaminspy.com/datn/slide1.jpg', NULL, 1, 1);
INSERT INTO `campaign` VALUES (2, 'https://photos2.vitaminspy.com/datn/slide3.jpg', NULL, 1, 1);
INSERT INTO `campaign` VALUES (3, 'https://photos2.vitaminspy.com/datn/slide2.jpg', NULL, 1, 1);
INSERT INTO `campaign` VALUES (4, 'https://photos2.vitaminspy.com/datn/slide4.jpeg', NULL, 1, 1);
INSERT INTO `campaign` VALUES (5, 'https://salt.tikicdn.com/cache/w295/ts/banner/eb/e1/92/956c3440d32e66a3832c0c1cfc0ba018.png.jpg', NULL, 2, 1);
INSERT INTO `campaign` VALUES (6, 'https://photos2.vitaminspy.com/datn/static2.jpg', NULL, 2, 1);
INSERT INTO `campaign` VALUES (7, 'https://photos2.vitaminspy.com/datn/static3.jpg', NULL, 2, 1);
INSERT INTO `campaign` VALUES (8, 'https://photos2.vitaminspy.com/datn/static4.jpg', NULL, 2, 1);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `popular` int DEFAULT '2',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Điện thoại-Máy tính bảng', 'icon-phone', 1, 'https://salt.tikicdn.com/ts/category/93/27/e3/192b0ebe1d4658c51f9931bda62489b2.png');
INSERT INTO `category` VALUES (2, 'Điện tử - Điện lạnh', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/70/52/b1/31587960ac1eb915a86a5a8202da583a.png');
INSERT INTO `category` VALUES (3, 'Phụ Kiện -  Thiết bị số', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (4, 'Laptop - Thiết bị IT', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (5, 'Máy ảnh - Quay phim', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/c3/a4/87/4584c6298920124cb7da51de157ddac9.png');
INSERT INTO `category` VALUES (6, 'Điện gia dụng', 'icon-fridge', 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/07/fd/5c/926d3504582fe14233699b20b30eae52.jpg');
INSERT INTO `category` VALUES (7, 'Nhà cửa đời sống', 'icon-fridge', 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/57/af/35/f3b45e62448dbbd0da40120e48ec9caf.png');
INSERT INTO `category` VALUES (8, 'Hàng tiêu dùng', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/f6/42/49/6cd7598ae44e5794f39acd16acf71ad9.png');
INSERT INTO `category` VALUES (9, 'Đồ chơi, Mẹ & Bé', 'icon-fridge', 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/d9/bb/5c/3a1cddcf76ed698337fedec5f57e4d56.jpg');
INSERT INTO `category` VALUES (10, 'Làm đẹp - Sức khoẻ', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (11, 'Thời trang - Phụ Kiện', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (12, 'Thể thao - Dã ngoại', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (13, 'Xe máy, ô tô, xe đạp', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (14, 'Hàng quốc tế', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/9d/ba/6f/0c85993f0436f73cdfbababda1dc5595.png');
INSERT INTO `category` VALUES (15, 'Sách, VPP & Quà tặng', 'icon-fridge', 2, NULL);
INSERT INTO `category` VALUES (16, 'Voucher - Dịch vụ - Thẻ cào', 'icon-fridge', 2, NULL);
COMMIT;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `item_id` varchar(36) DEFAULT NULL,
  `item_model_id` varchar(36) DEFAULT NULL,
  `is_deleted` int DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of image
-- ----------------------------
BEGIN;
INSERT INTO `image` VALUES (1, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621156575859-1616421703196-788569954.jpeg', 'ee80208f-df54-434c-8b3f-30221a5ac982', NULL, 2);
INSERT INTO `image` VALUES (2, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621156575865-1617388515055-602177132.jpeg', 'ee80208f-df54-434c-8b3f-30221a5ac982', NULL, 2);
INSERT INTO `image` VALUES (3, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621156575891-logo.d81f8f6f.png', 'ee80208f-df54-434c-8b3f-30221a5ac982', NULL, 2);
INSERT INTO `image` VALUES (4, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621159262518-1616421703196-788569954.jpeg', 'd348c02a-61ac-4eac-920f-53dcc1cbb90a', NULL, 2);
INSERT INTO `image` VALUES (5, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621159262523-1617388515055-602177132.jpeg', 'd348c02a-61ac-4eac-920f-53dcc1cbb90a', NULL, 2);
INSERT INTO `image` VALUES (6, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621159262551-logo.d81f8f6f.png', 'd348c02a-61ac-4eac-920f-53dcc1cbb90a', NULL, 2);
INSERT INTO `image` VALUES (7, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621159474958-1616421703196-788569954.jpeg', '409af33e-85f8-4d04-9a49-facde2c54e54', NULL, 2);
INSERT INTO `image` VALUES (8, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621159474964-1617388515055-602177132.jpeg', '409af33e-85f8-4d04-9a49-facde2c54e54', NULL, 2);
INSERT INTO `image` VALUES (9, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621159474994-logo.d81f8f6f.png', '409af33e-85f8-4d04-9a49-facde2c54e54', NULL, 2);
INSERT INTO `image` VALUES (10, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163106146-1616421703196-788569954.jpeg', '83f669ea-31c0-4eb1-865c-16d735747fcb', NULL, 2);
INSERT INTO `image` VALUES (11, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163106151-1616641367216-103795626.jpeg', '83f669ea-31c0-4eb1-865c-16d735747fcb', NULL, 2);
INSERT INTO `image` VALUES (12, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163106151-1617388515055-602177132.jpeg', '83f669ea-31c0-4eb1-865c-16d735747fcb', NULL, 2);
INSERT INTO `image` VALUES (13, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163106184-logo.d81f8f6f.png', '83f669ea-31c0-4eb1-865c-16d735747fcb', NULL, 2);
INSERT INTO `image` VALUES (14, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163746317-1615823040522-137311483.jpeg', '4adf8d96-4ca3-45d6-91b3-0e37e50a004f', NULL, 2);
INSERT INTO `image` VALUES (15, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163746318-1616056390195-293319531.jpeg', '4adf8d96-4ca3-45d6-91b3-0e37e50a004f', NULL, 2);
INSERT INTO `image` VALUES (16, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163746319-1616056431520-988185982.jpeg', '4adf8d96-4ca3-45d6-91b3-0e37e50a004f', NULL, 2);
INSERT INTO `image` VALUES (17, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163746354-1616072794795-101014738.jpeg', '4adf8d96-4ca3-45d6-91b3-0e37e50a004f', NULL, 2);
INSERT INTO `image` VALUES (18, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163746354-1616072980470-554228461.jpeg', '4adf8d96-4ca3-45d6-91b3-0e37e50a004f', NULL, 2);
INSERT INTO `image` VALUES (19, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411309-1616421703196-788569954.jpeg', '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', NULL, 2);
INSERT INTO `image` VALUES (20, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411314-1616641626151-645139461.jpeg', '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', NULL, 2);
INSERT INTO `image` VALUES (21, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411314-1616658646435-764310863.jpeg', '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', NULL, 2);
INSERT INTO `image` VALUES (22, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411354-1617388515055-602177132.jpeg', '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', NULL, 2);
INSERT INTO `image` VALUES (23, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411358-1617509309768-521481848.jpeg', '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', NULL, 2);
INSERT INTO `image` VALUES (24, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411363-1617938595428-385248093.jpeg', '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', NULL, 2);
INSERT INTO `image` VALUES (25, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435585609-1615823040522-137311483.jpeg', '4d013339-21d0-4000-902f-dc7c65e0778d', NULL, 2);
INSERT INTO `image` VALUES (26, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435585610-1617938595428-385248093.jpeg', '4d013339-21d0-4000-902f-dc7c65e0778d', NULL, 2);
INSERT INTO `image` VALUES (27, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435585614-logo.d81f8f6f.png', '4d013339-21d0-4000-902f-dc7c65e0778d', NULL, 2);
INSERT INTO `image` VALUES (28, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621436994263-1620398507874-411599284.jpeg', '038deaa0-13da-4a8c-a6c2-a50336f9728c', NULL, 2);
INSERT INTO `image` VALUES (29, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622275075713-aaaa.jpeg', 'e5c7fea2-1f1f-4131-a102-971ef86bfacf', NULL, 2);
INSERT INTO `image` VALUES (30, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622275075719-bbbbbb.jpeg', 'e5c7fea2-1f1f-4131-a102-971ef86bfacf', NULL, 2);
INSERT INTO `image` VALUES (31, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622275528264-aaaa.jpeg', '273f988f-1fc4-427b-a32d-e0566f854605', NULL, 2);
INSERT INTO `image` VALUES (32, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622275528269-bbbbbb.jpeg', '273f988f-1fc4-427b-a32d-e0566f854605', NULL, 2);
INSERT INTO `image` VALUES (33, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622275605304-aaaa.jpeg', '1f6ac17d-4e47-4ae2-9a4c-644afba3cd3e', NULL, 2);
INSERT INTO `image` VALUES (34, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622365608497-Bo%CC%A3%CC%82%20Bo%CC%81ng%20Ro%CC%82%CC%80ng%2020%20Bi%20%28%20Gia%CC%81%204%20500%20000%20%20vn%C4%91%20%29%20-%20Gia%CC%89m%20Co%CC%80n%203%20800%20000%20vn%C4%91%20.jpeg', '62dccba9-7589-4712-b834-e2bbba653e3c', NULL, 2);
INSERT INTO `image` VALUES (35, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622365608501-Bo%CC%A3%CC%82%20Lo%CC%9B%20%20%28%20Gia%CC%81%20_%20Lie%CC%82n%20He%CC%A3%CC%82%20%29%20.jpeg', '62dccba9-7589-4712-b834-e2bbba653e3c', NULL, 2);
COMMIT;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shop_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `total_number` int DEFAULT NULL,
  `sub_category_id` int DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `default_image` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `short_description` text,
  `description` text,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of item
-- ----------------------------
BEGIN;
INSERT INTO `item` VALUES ('038deaa0-13da-4a8c-a6c2-a50336f9728c', 5, 'Mug', NULL, 1, NULL, 'Coc', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621436994263-1620398507874-411599284.jpeg', 36000, NULL, NULL, 1);
INSERT INTO `item` VALUES ('1f6ac17d-4e47-4ae2-9a4c-644afba3cd3e', 3, 'Iphone 11', NULL, 1, NULL, 'asd', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622275605304-aaaa.jpeg', NULL, NULL, NULL, 1);
INSERT INTO `item` VALUES ('2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f', 1, 'Áo thun Adidas', NULL, 1, NULL, 'Aothun2', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435411309-1616421703196-788569954.jpeg', 36000, 'Áo thun mang cá tính năng động trẻ trung, thần thái riêng biệt.\n\nĐịnh hình phong cách tươi mới, năng động hiện đại trẻ trung.\n\nSản phẩm dành cho nhiều lứa tuổi, có thể mặc đi bất cứ nơi đâu và lúc nào.\n\nChất liệu cao cấp mang lại cảm giác dễ chịu vô cùng, tự tin xuống phố đi làm.', 'Áo thun mang cá tính năng động trẻ trung, thần thái riêng biệt.\n\nĐịnh hình phong cách tươi mới, năng động hiện đại trẻ trung.\n\nSản phẩm dành cho nhiều lứa tuổi, có thể mặc đi bất cứ nơi đâu và lúc nào.\n\nChất liệu cao cấp mang lại cảm giác dễ chịu vô cùng, tự tin xuống phố đi làm.', 11);
INSERT INTO `item` VALUES ('4adf8d96-4ca3-45d6-91b3-0e37e50a004f', 1, 'Áo thun Unisex N7 Basic Tee phông trơn ', NULL, 1, NULL, 'Sanpham1', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621163746317-1615823040522-137311483.jpeg', 3432000, NULL, NULL, 11);
INSERT INTO `item` VALUES ('4d013339-21d0-4000-902f-dc7c65e0778d', 1, 'Áo rét thu đông', NULL, 1, NULL, '2323', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1621435585609-1615823040522-137311483.jpeg', 30000, NULL, NULL, 11);
INSERT INTO `item` VALUES ('62dccba9-7589-4712-b834-e2bbba653e3c', 3, 'Bộ bóng bàn', NULL, NULL, NULL, 'Iphone11', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1622365608497-Bo%CC%A3%CC%82%20Bo%CC%81ng%20Ro%CC%82%CC%80ng%2020%20Bi%20%28%20Gia%CC%81%204%20500%20000%20%20vn%C4%91%20%29%20-%20Gia%CC%89m%20Co%CC%80n%203%20800%20000%20vn%C4%91%20.jpeg', NULL, NULL, NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for item_model
-- ----------------------------
DROP TABLE IF EXISTS `item_model`;
CREATE TABLE `item_model` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `image_url` text,
  `number` int DEFAULT '0',
  `price` varchar(16) DEFAULT NULL,
  `compare_at_price` varchar(10) DEFAULT NULL,
  `inventory` int DEFAULT NULL,
  `item_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of item_model
-- ----------------------------
BEGIN;
INSERT INTO `item_model` VALUES ('02813d1a-31d8-4fd3-949b-bbcf772f40a2', '2342', NULL, 0, '32', NULL, 234, '4d013339-21d0-4000-902f-dc7c65e0778d');
INSERT INTO `item_model` VALUES ('06117b5a-5bce-4c65-93fb-9c4f811837db', 'RedX7', NULL, 0, '10000000', NULL, 132, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('145bdf1b-a9dd-4d05-8ac3-b1cf87108552', 'red-XL', NULL, 0, '12', NULL, 12, '4adf8d96-4ca3-45d6-91b3-0e37e50a004f');
INSERT INTO `item_model` VALUES ('206b7817-9e8c-4b1b-b814-3e393d2d494b', 'RedX6', NULL, 0, '13', NULL, 132, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('22fc802c-88ee-4220-a765-65c9128ebcb2', '543', NULL, 0, '15', NULL, 4234, '038deaa0-13da-4a8c-a6c2-a50336f9728c');
INSERT INTO `item_model` VALUES ('289fb150-b1f7-4942-8dee-22fccfb2fe9a', 'RedX', NULL, 0, '10000000', NULL, 312, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('3720a831-c3d2-436a-bf51-48d61ccf11c6', 'black-XL', NULL, 0, '32', NULL, 232, '4adf8d96-4ca3-45d6-91b3-0e37e50a004f');
INSERT INTO `item_model` VALUES ('3f8684b7-e33a-4483-8165-0b33fa5197e5', 'asd', NULL, 0, '10000000', NULL, 2, '1f6ac17d-4e47-4ae2-9a4c-644afba3cd3e');
INSERT INTO `item_model` VALUES ('4c1b9537-449b-45dc-bbc1-746bfa3bde26', '34', NULL, 0, '10000000', NULL, 34, '83f669ea-31c0-4eb1-865c-16d735747fcb');
INSERT INTO `item_model` VALUES ('5563ded3-3634-41b9-82ad-b7ae9b82bf53', 'RedX5', NULL, 0, '10000000', NULL, 13, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('709d962c-78be-4d63-b43d-0a7ba2392200', NULL, NULL, 0, '10000000', NULL, NULL, '273f988f-1fc4-427b-a32d-e0566f854605');
INSERT INTO `item_model` VALUES ('77bc717f-f99c-4e84-bd08-5b8e166978dd', 'RedX2', NULL, 0, '10000000', NULL, 1234, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('7a79a0ea-07ba-4fa1-85d7-c99d080a6ad7', 'RedX7', NULL, 0, '10000000', NULL, 13, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('7f40e289-4cd1-48f9-b7ab-9838730f3064', NULL, NULL, 0, '1323232323', NULL, NULL, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('87cb3e1d-48d5-4d69-a97b-8ebb3f211d80', 'black-XXL', NULL, 0, '12', NULL, 3232, '4adf8d96-4ca3-45d6-91b3-0e37e50a004f');
INSERT INTO `item_model` VALUES ('8a6fbd6d-fcfb-4967-9cdb-7bb34f06f0c6', '24234', NULL, 0, '23', NULL, 234, '4d013339-21d0-4000-902f-dc7c65e0778d');
INSERT INTO `item_model` VALUES ('99b38dee-1a59-41f3-899d-2ce45b088105', 'RedX', NULL, 0, '10000000', NULL, 123, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('9a4ae6dd-c1bf-4e92-b455-96329400b59e', '452', NULL, 0, '12', NULL, 133, '038deaa0-13da-4a8c-a6c2-a50336f9728c');
INSERT INTO `item_model` VALUES ('a7828c35-56b0-4397-8dd2-a3b1500097b0', 'red-XXL', NULL, 0, '12', NULL, 23, '4adf8d96-4ca3-45d6-91b3-0e37e50a004f');
INSERT INTO `item_model` VALUES ('af930639-9997-4386-83e6-e7704f8a74f7', 'RedX', NULL, 0, '12', NULL, 123, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('b83e77ec-d4e7-4f4b-b453-5e982d5058d6', 'Iphone11', NULL, 0, '12000000', NULL, 1232332, '62dccba9-7589-4712-b834-e2bbba653e3c');
INSERT INTO `item_model` VALUES ('c2d3f97c-9d71-4a30-8cfe-0b7c158a3a7c', 'black-M', NULL, 0, '34', NULL, 232, '4adf8d96-4ca3-45d6-91b3-0e37e50a004f');
INSERT INTO `item_model` VALUES ('c35bd239-3b07-490d-b41d-06c1a500d9ac', '123', NULL, 0, '12', NULL, 34, '409af33e-85f8-4d04-9a49-facde2c54e54');
INSERT INTO `item_model` VALUES ('c7f049f4-d111-4ef5-b121-0cbf34eeab51', '4234', NULL, 0, '32', NULL, 423, '4d013339-21d0-4000-902f-dc7c65e0778d');
INSERT INTO `item_model` VALUES ('ce0f4624-2d5d-4a48-ae62-399662a9c95f', 'RedX7', NULL, 0, '13', NULL, 132, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('d515b7c4-5341-4bee-984e-0258f7420343', 'red-M', NULL, 0, '13', NULL, 34, '4adf8d96-4ca3-45d6-91b3-0e37e50a004f');
INSERT INTO `item_model` VALUES ('da252b21-5912-4872-8492-472d8618d708', 'RedX3', NULL, 0, '13', NULL, 23, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('e083a80e-4fdb-44d8-ad71-ceb319fef854', NULL, NULL, 0, '1323232323', NULL, NULL, 'e5c7fea2-1f1f-4131-a102-971ef86bfacf');
INSERT INTO `item_model` VALUES ('e75ec072-8fb0-4f96-8ec9-5feb0f103568', NULL, NULL, 0, '1323232323', NULL, NULL, '2d566b9f-c0bd-47dd-9e21-7bbaf8ae509f');
INSERT INTO `item_model` VALUES ('ff9fe768-345b-4279-8ada-6df2b1c72190', '23424', NULL, 0, '14', NULL, 1234, '4d013339-21d0-4000-902f-dc7c65e0778d');
COMMIT;

-- ----------------------------
-- Table structure for item_model_varian
-- ----------------------------
DROP TABLE IF EXISTS `item_model_varian`;
CREATE TABLE `item_model_varian` (
  `item_model_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `varian_id` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`item_model_id`,`varian_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of item_model_varian
-- ----------------------------
BEGIN;
INSERT INTO `item_model_varian` VALUES ('02813d1a-31d8-4fd3-949b-bbcf772f40a2', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('02813d1a-31d8-4fd3-949b-bbcf772f40a2', 6, 'vải');
INSERT INTO `item_model_varian` VALUES ('06117b5a-5bce-4c65-93fb-9c4f811837db', 2, 'Yellow');
INSERT INTO `item_model_varian` VALUES ('06117b5a-5bce-4c65-93fb-9c4f811837db', 5, 'L');
INSERT INTO `item_model_varian` VALUES ('145bdf1b-a9dd-4d05-8ac3-b1cf87108552', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('145bdf1b-a9dd-4d05-8ac3-b1cf87108552', 5, 'XL');
INSERT INTO `item_model_varian` VALUES ('206b7817-9e8c-4b1b-b814-3e393d2d494b', 2, 'Yellow');
INSERT INTO `item_model_varian` VALUES ('206b7817-9e8c-4b1b-b814-3e393d2d494b', 5, 'X');
INSERT INTO `item_model_varian` VALUES ('22fc802c-88ee-4220-a765-65c9128ebcb2', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('289fb150-b1f7-4942-8dee-22fccfb2fe9a', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('289fb150-b1f7-4942-8dee-22fccfb2fe9a', 5, 'X');
INSERT INTO `item_model_varian` VALUES ('3720a831-c3d2-436a-bf51-48d61ccf11c6', 2, 'black');
INSERT INTO `item_model_varian` VALUES ('3720a831-c3d2-436a-bf51-48d61ccf11c6', 5, 'XL');
INSERT INTO `item_model_varian` VALUES ('4c1b9537-449b-45dc-bbc1-746bfa3bde26', 4, 'a');
INSERT INTO `item_model_varian` VALUES ('5563ded3-3634-41b9-82ad-b7ae9b82bf53', 2, 'Red');
INSERT INTO `item_model_varian` VALUES ('5563ded3-3634-41b9-82ad-b7ae9b82bf53', 5, 'XL');
INSERT INTO `item_model_varian` VALUES ('77bc717f-f99c-4e84-bd08-5b8e166978dd', 2, 'Red');
INSERT INTO `item_model_varian` VALUES ('77bc717f-f99c-4e84-bd08-5b8e166978dd', 5, 'L');
INSERT INTO `item_model_varian` VALUES ('7a79a0ea-07ba-4fa1-85d7-c99d080a6ad7', 2, 'Yellow');
INSERT INTO `item_model_varian` VALUES ('7a79a0ea-07ba-4fa1-85d7-c99d080a6ad7', 5, 'XL');
INSERT INTO `item_model_varian` VALUES ('7f40e289-4cd1-48f9-b7ab-9838730f3064', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('7f40e289-4cd1-48f9-b7ab-9838730f3064', 5, 'XL');
INSERT INTO `item_model_varian` VALUES ('87cb3e1d-48d5-4d69-a97b-8ebb3f211d80', 2, 'black');
INSERT INTO `item_model_varian` VALUES ('87cb3e1d-48d5-4d69-a97b-8ebb3f211d80', 5, 'XXL');
INSERT INTO `item_model_varian` VALUES ('8a6fbd6d-fcfb-4967-9cdb-7bb34f06f0c6', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('8a6fbd6d-fcfb-4967-9cdb-7bb34f06f0c6', 6, 'jean');
INSERT INTO `item_model_varian` VALUES ('99b38dee-1a59-41f3-899d-2ce45b088105', 2, 'Red');
INSERT INTO `item_model_varian` VALUES ('99b38dee-1a59-41f3-899d-2ce45b088105', 5, 'X');
INSERT INTO `item_model_varian` VALUES ('9a4ae6dd-c1bf-4e92-b455-96329400b59e', 2, 'white');
INSERT INTO `item_model_varian` VALUES ('a7828c35-56b0-4397-8dd2-a3b1500097b0', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('a7828c35-56b0-4397-8dd2-a3b1500097b0', 5, 'XXL');
INSERT INTO `item_model_varian` VALUES ('af930639-9997-4386-83e6-e7704f8a74f7', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('af930639-9997-4386-83e6-e7704f8a74f7', 5, 'L');
INSERT INTO `item_model_varian` VALUES ('c2d3f97c-9d71-4a30-8cfe-0b7c158a3a7c', 2, 'black');
INSERT INTO `item_model_varian` VALUES ('c2d3f97c-9d71-4a30-8cfe-0b7c158a3a7c', 5, 'M');
INSERT INTO `item_model_varian` VALUES ('c35bd239-3b07-490d-b41d-06c1a500d9ac', 3, '23');
INSERT INTO `item_model_varian` VALUES ('c7f049f4-d111-4ef5-b121-0cbf34eeab51', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('c7f049f4-d111-4ef5-b121-0cbf34eeab51', 6, 'vải');
INSERT INTO `item_model_varian` VALUES ('ce0f4624-2d5d-4a48-ae62-399662a9c95f', 2, 'Yellow');
INSERT INTO `item_model_varian` VALUES ('ce0f4624-2d5d-4a48-ae62-399662a9c95f', 5, 'M');
INSERT INTO `item_model_varian` VALUES ('d515b7c4-5341-4bee-984e-0258f7420343', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('d515b7c4-5341-4bee-984e-0258f7420343', 5, 'M');
INSERT INTO `item_model_varian` VALUES ('da252b21-5912-4872-8492-472d8618d708', 2, 'Red');
INSERT INTO `item_model_varian` VALUES ('da252b21-5912-4872-8492-472d8618d708', 5, 'M');
INSERT INTO `item_model_varian` VALUES ('e75ec072-8fb0-4f96-8ec9-5feb0f103568', 2, 'blue');
INSERT INTO `item_model_varian` VALUES ('e75ec072-8fb0-4f96-8ec9-5feb0f103568', 5, 'M');
INSERT INTO `item_model_varian` VALUES ('ff9fe768-345b-4279-8ada-6df2b1c72190', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('ff9fe768-345b-4279-8ada-6df2b1c72190', 6, 'jean');
COMMIT;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of shop
-- ----------------------------
BEGIN;
INSERT INTO `shop` VALUES (1, '123', 'trinhngockhang1503@gmail.com', '', '', '$2a$12$AsXYbpCEfqqlyhRCL1SmbOTgFe5friP9/.OwWQZntBFB/seh2Phu.', NULL, '2021-05-15 14:55:27.381048', '84964419119');
INSERT INTO `shop` VALUES (2, '1233', 'trinhngockhang503@gmail.com', '', '', '$2a$12$V/pGs0ThFGNgd4DMRrRgv.n4dieh1L8bb/.uCXFzxOEhUfyLf/NzS', NULL, '2021-05-15 14:56:27.988489', '84964419111');
INSERT INTO `shop` VALUES (3, 'khangtn', 'trinhngockhang1501@gmail.com', '', '', '$2a$12$yM/ZciWlGGer9CoGBHk0pOIh6mRuSTxynXXoT/OWG/mdGN1EGP8DG', NULL, '2021-05-15 14:58:03.440349', '84964419113');
INSERT INTO `shop` VALUES (4, 'eaw', 'trinhngock1hang1503@gmail.com', '', '', '$2a$12$S.LpHIRHn7/wZiUzl3WX6u2cwQThQKflEniLMei5s/7Yv1K9832WO', NULL, '2021-05-15 14:58:57.058026', '84264419119');
INSERT INTO `shop` VALUES (5, '12', 'trinhngockhang21503@gmail.com', '', '', '$2a$12$eVrxmH3IDcvjA4c7MFDQv.2ipUkWrMpW9DinXkdr/D19aXQ2ipeLu', NULL, '2021-05-19 22:07:57.938122', '84644191191');
INSERT INTO `shop` VALUES (6, 'khangtn1', 'trinhngockhang15033@gmail.com', '', '', '$2a$12$/DAPkuAbZgUPkMPPgiTUO.V66aGYB2GD7yYkWfQcIW55/KGwh1eZu', NULL, '2021-05-29 09:53:41.014490', '84964419119');
COMMIT;

-- ----------------------------
-- Table structure for sub_category
-- ----------------------------
DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE `sub_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sub_category
-- ----------------------------
BEGIN;
INSERT INTO `sub_category` VALUES (1, 'Iphone', 1);
INSERT INTO `sub_category` VALUES (2, 'Android', 1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for varian
-- ----------------------------
DROP TABLE IF EXISTS `varian`;
CREATE TABLE `varian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of varian
-- ----------------------------
BEGIN;
INSERT INTO `varian` VALUES (1, 'Vcvsfd');
INSERT INTO `varian` VALUES (2, 'Color');
INSERT INTO `varian` VALUES (3, '123');
INSERT INTO `varian` VALUES (4, 'Red');
INSERT INTO `varian` VALUES (5, 'Size');
INSERT INTO `varian` VALUES (6, 'Material');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
