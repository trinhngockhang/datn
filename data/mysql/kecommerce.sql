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

 Date: 03/07/2021 08:36:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES (1, 'admin', '$2a$12$T2GdE.Kw4rVzh1lnw7iCjuEED/bIKg6.3C5VSF8MN03eCl3ViOdBy');
COMMIT;

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
  `active` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Điện thoại-Máy tính bảng 1', 'icon-phone', 1, 'https://salt.tikicdn.com/ts/category/93/27/e3/192b0ebe1d4658c51f9931bda62489b2.png', 1);
INSERT INTO `category` VALUES (2, 'Điện tử - Điện lạnh', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/70/52/b1/31587960ac1eb915a86a5a8202da583a.png', 1);
INSERT INTO `category` VALUES (3, 'Phụ Kiện -  Thiết bị số', 'icon-fridge', 2, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1624979191126-1617509309768-521481848.jpeg', 1);
INSERT INTO `category` VALUES (4, 'Laptop - Thiết bị IT', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (5, 'Máy ảnh - Quay phim', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/c3/a4/87/4584c6298920124cb7da51de157ddac9.png', 1);
INSERT INTO `category` VALUES (6, 'Điện gia dụng', 'icon-fridge', 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/07/fd/5c/926d3504582fe14233699b20b30eae52.jpg', 1);
INSERT INTO `category` VALUES (7, 'Nhà cửa đời sống', 'icon-fridge', 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/57/af/35/f3b45e62448dbbd0da40120e48ec9caf.png', 1);
INSERT INTO `category` VALUES (8, 'Hàng tiêu dùng', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/f6/42/49/6cd7598ae44e5794f39acd16acf71ad9.png', 1);
INSERT INTO `category` VALUES (9, 'Đồ chơi, Mẹ & Bé', 'icon-fridge', 1, 'https://salt.tikicdn.com/cache/280x280/ts/product/d9/bb/5c/3a1cddcf76ed698337fedec5f57e4d56.jpg', 1);
INSERT INTO `category` VALUES (10, 'Làm đẹp - Sức khoẻ', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (11, 'Thời trang - Phụ Kiện', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (12, 'Thể thao - Dã ngoại', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (13, 'Xe máy, ô tô, xe đạp', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (14, 'Hàng quốc tế', 'icon-fridge', 1, 'https://salt.tikicdn.com/ts/category/9d/ba/6f/0c85993f0436f73cdfbababda1dc5595.png', 1);
INSERT INTO `category` VALUES (15, 'Sách, VPP & Quà tặng', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (16, 'Voucher - Dịch vụ - Thẻ cào', 'icon-fridge', 2, NULL, 1);
INSERT INTO `category` VALUES (20, 'Thể thao', NULL, 2, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1624977739129-logo.d81f8f6f.png', 2);
COMMIT;

-- ----------------------------
-- Table structure for follow_shop
-- ----------------------------
DROP TABLE IF EXISTS `follow_shop`;
CREATE TABLE `follow_shop` (
  `shop_id` int NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`shop_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of follow_shop
-- ----------------------------
BEGIN;
INSERT INTO `follow_shop` VALUES (1, '61d6d84b-d713-4e3f-a562-50b6d8272387', '2021-07-03 00:18:54.835434');
INSERT INTO `follow_shop` VALUES (3, '61d6d84b-d713-4e3f-a562-50b6d8272387', '2021-07-03 08:22:23.857841');
INSERT INTO `follow_shop` VALUES (3, 'f5296ad9-1f0f-4e55-bbde-4f69801ae634', '2021-06-27 00:41:17.254167');
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
INSERT INTO `image` VALUES (36, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1623999786983-1616072794795-101014738.jpeg', 'edbd40b7-7ce7-4939-a5ab-43b7ce9137de', NULL, 2);
INSERT INTO `image` VALUES (37, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1623999786984-1616072980470-554228461.jpeg', 'edbd40b7-7ce7-4939-a5ab-43b7ce9137de', NULL, 2);
INSERT INTO `image` VALUES (38, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1623999787032-1616421703196-788569954.jpeg', 'edbd40b7-7ce7-4939-a5ab-43b7ce9137de', NULL, 2);
INSERT INTO `image` VALUES (39, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1624763305323-1620874734323-516437295.jpeg', '152a17c0-49a5-44e5-9435-1d0b19650df9', NULL, 2);
INSERT INTO `image` VALUES (40, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625239728749-1617509309768-521481848.jpeg', '0613a8f7-c5e6-4c34-8879-c2da1929a3b2', NULL, 2);
INSERT INTO `image` VALUES (41, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625239734573-1617509309768-521481848.jpeg', '9ac608c6-4828-49fe-a859-0fd52889d469', NULL, 2);
INSERT INTO `image` VALUES (42, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625239925783-1617509309768-521481848.jpeg', '347798b1-8da6-4d39-b49e-ba6dee0ce03e', NULL, 2);
INSERT INTO `image` VALUES (43, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625240007378-1617509309768-521481848.jpeg', '129bcd3c-d273-478b-b997-01575618d478', NULL, 2);
INSERT INTO `image` VALUES (44, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625240459356-1617509309768-521481848.jpeg', '79998599-a089-41de-83d6-c9e0520fe6ab', NULL, 2);
INSERT INTO `image` VALUES (45, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625240540907-1617509309768-521481848.jpeg', '08b6c722-e199-4870-96cc-a1c918c93e41', NULL, 2);
INSERT INTO `image` VALUES (46, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625240544065-1617509309768-521481848.jpeg', '575e3ac1-864b-47de-b808-57d6edb143f2', NULL, 2);
INSERT INTO `image` VALUES (47, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625241263058-1617509309768-521481848.jpeg', '70b85ba1-8f20-4dcb-bad4-cad726b4bda8', NULL, 2);
INSERT INTO `image` VALUES (48, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625241315462-1617509309768-521481848.jpeg', 'faf0f3ca-fd8a-4382-9183-da3d827e4779', NULL, 2);
INSERT INTO `image` VALUES (49, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625241364251-1617509309768-521481848.jpeg', 'fd2eaaff-b3c7-47fc-b44b-d8d10cfc0ee7', NULL, 2);
INSERT INTO `image` VALUES (50, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625241369612-1617509309768-521481848.jpeg', '381079a0-158b-474d-9bbc-90a3a4f86178', NULL, 2);
INSERT INTO `image` VALUES (51, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625241751713-1617509309768-521481848.jpeg', 'b3e4c341-f219-40cd-8934-a6ccde833c98', NULL, 2);
INSERT INTO `image` VALUES (52, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625242465714-1616641367216-103795626.jpeg', 'faaa9650-2f1d-46f7-9182-2517889bfbad', NULL, 2);
INSERT INTO `image` VALUES (53, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625242488233-1616641367216-103795626.jpeg', 'c2b447a4-9a6d-444a-b315-7d55ad016a04', NULL, 2);
INSERT INTO `image` VALUES (54, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625242510351-1616641367216-103795626.jpeg', 'c8732881-13e2-4db7-b9f5-0ca1c7b47870', NULL, 2);
INSERT INTO `image` VALUES (55, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625242813088-1616641367216-103795626.jpeg', '3fd9e8bd-b383-4c29-912a-a4d56dcec412', NULL, 2);
INSERT INTO `image` VALUES (56, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625253547484-1615823040522-137311483.jpeg', 'c25c379a-114f-47ea-8bda-8922cbc6588b', NULL, 2);
INSERT INTO `image` VALUES (57, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625274997491-samsung-galaxy-a32-4g-thumb-tim-600x600-600x600.jpeg', '642c0f6d-e777-4997-861f-ef0c39ed3422', NULL, 2);
INSERT INTO `image` VALUES (58, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275580706-1616072980470-554228461.jpeg', '343c94fb-4493-4e44-a232-9ceceee94c22', NULL, 2);
INSERT INTO `image` VALUES (59, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275580707-1616641626151-645139461.jpeg', '343c94fb-4493-4e44-a232-9ceceee94c22', NULL, 2);
INSERT INTO `image` VALUES (60, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275580715-1617938595428-385248093.jpeg', '343c94fb-4493-4e44-a232-9ceceee94c22', NULL, 2);
INSERT INTO `image` VALUES (61, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275900015-1615823040522-137311483.jpeg', '1a3adbb3-527a-4dd6-b5c6-8ea4be65dd89', NULL, 2);
INSERT INTO `image` VALUES (62, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275900016-1616056390195-293319531.jpeg', '1a3adbb3-527a-4dd6-b5c6-8ea4be65dd89', NULL, 2);
INSERT INTO `image` VALUES (63, 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625276156853-noi-chien-philips-airfryer-hd974590-1.jpeg', 'a526900e-bddd-499d-93df-ec1a5f5a5638', NULL, 2);
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
  `total_rate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of item
-- ----------------------------
BEGIN;
INSERT INTO `item` VALUES ('1a3adbb3-527a-4dd6-b5c6-8ea4be65dd89', 6, 'Áo mùa thu cho nam', NULL, NULL, NULL, 'ao', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275900015-1615823040522-137311483.jpeg', NULL, NULL, NULL, 11, NULL);
INSERT INTO `item` VALUES ('343c94fb-4493-4e44-a232-9ceceee94c22', 3, 'Áo nữ', NULL, NULL, NULL, 'quanao', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625275580706-1616072980470-554228461.jpeg', NULL, NULL, NULL, 11, NULL);
INSERT INTO `item` VALUES ('642c0f6d-e777-4997-861f-ef0c39ed3422', 3, 'Samsung A32', NULL, NULL, NULL, 'samsung', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625274997491-samsung-galaxy-a32-4g-thumb-tim-600x600-600x600.jpeg', NULL, NULL, NULL, 1, NULL);
INSERT INTO `item` VALUES ('a526900e-bddd-499d-93df-ec1a5f5a5638', 3, 'Nồi chiên không dầu', NULL, NULL, NULL, 'noichienkhongdau', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625276156853-noi-chien-philips-airfryer-hd974590-1.jpeg', NULL, NULL, NULL, 6, NULL);
INSERT INTO `item` VALUES ('c25c379a-114f-47ea-8bda-8922cbc6588b', 3, 'Iphone11', NULL, NULL, NULL, 'aaa', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625253547484-1615823040522-137311483.jpeg', NULL, NULL, NULL, 1, '4');
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
INSERT INTO `item_model` VALUES ('34b7dede-fe6b-421d-922e-0a6705d39c23', 'aaa', NULL, 0, '1000000', NULL, 123, '642c0f6d-e777-4997-861f-ef0c39ed3422');
INSERT INTO `item_model` VALUES ('590fad42-b1df-4613-98b9-82f4758a02d7', 'd', NULL, 0, '1400000', NULL, 1, '343c94fb-4493-4e44-a232-9ceceee94c22');
INSERT INTO `item_model` VALUES ('59d90ef4-288d-4265-91c6-efd5983f8ae9', 'a', NULL, 0, '1000000', NULL, 123, '343c94fb-4493-4e44-a232-9ceceee94c22');
INSERT INTO `item_model` VALUES ('78c1ba37-30ad-42ae-81d9-4473ca09646d', 'noichienkhongdau', NULL, 0, '120000000', NULL, 120, 'a526900e-bddd-499d-93df-ec1a5f5a5638');
INSERT INTO `item_model` VALUES ('7dedc5df-7d46-430e-9c9b-97b8accd6bdd', 'aaa', NULL, 0, '1200000', NULL, 123, '642c0f6d-e777-4997-861f-ef0c39ed3422');
INSERT INTO `item_model` VALUES ('9d972086-63c1-4452-b980-edd235907d87', 'ao', NULL, 0, '12000000', NULL, 12000000, '1a3adbb3-527a-4dd6-b5c6-8ea4be65dd89');
INSERT INTO `item_model` VALUES ('ba97579c-4f95-46c1-9b7e-62319f2ec9fc', 'b', NULL, 0, '1300000', NULL, 123, '343c94fb-4493-4e44-a232-9ceceee94c22');
INSERT INTO `item_model` VALUES ('bf9faa1f-79b6-41af-8ef9-41ee0dddec76', 'vvv', NULL, 0, '1300000', NULL, 123, '642c0f6d-e777-4997-861f-ef0c39ed3422');
INSERT INTO `item_model` VALUES ('c950c39c-7ff6-498d-9503-7850297d53a5', 'c', NULL, 0, '1200000', NULL, 143, '343c94fb-4493-4e44-a232-9ceceee94c22');
INSERT INTO `item_model` VALUES ('d1e1289c-1fb7-4b98-96d7-3f8b25af55f1', 'aaa', NULL, 0, '120000', NULL, 31, 'c25c379a-114f-47ea-8bda-8922cbc6588b');
INSERT INTO `item_model` VALUES ('f3dd3a29-ca07-4c57-b3b6-b80a7479e11d', 'xxx', NULL, 0, '1500000', NULL, 32, '642c0f6d-e777-4997-861f-ef0c39ed3422');
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
INSERT INTO `item_model_varian` VALUES ('34b7dede-fe6b-421d-922e-0a6705d39c23', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('34b7dede-fe6b-421d-922e-0a6705d39c23', 8, '16');
INSERT INTO `item_model_varian` VALUES ('590fad42-b1df-4613-98b9-82f4758a02d7', 7, 'Xanh');
INSERT INTO `item_model_varian` VALUES ('590fad42-b1df-4613-98b9-82f4758a02d7', 9, 'Bình thường');
INSERT INTO `item_model_varian` VALUES ('59d90ef4-288d-4265-91c6-efd5983f8ae9', 7, 'Đỏ');
INSERT INTO `item_model_varian` VALUES ('59d90ef4-288d-4265-91c6-efd5983f8ae9', 9, 'Tốt');
INSERT INTO `item_model_varian` VALUES ('7dedc5df-7d46-430e-9c9b-97b8accd6bdd', 2, 'red');
INSERT INTO `item_model_varian` VALUES ('7dedc5df-7d46-430e-9c9b-97b8accd6bdd', 8, '32');
INSERT INTO `item_model_varian` VALUES ('ba97579c-4f95-46c1-9b7e-62319f2ec9fc', 7, 'Đỏ');
INSERT INTO `item_model_varian` VALUES ('ba97579c-4f95-46c1-9b7e-62319f2ec9fc', 9, 'Bình thường');
INSERT INTO `item_model_varian` VALUES ('bf9faa1f-79b6-41af-8ef9-41ee0dddec76', 2, 'black');
INSERT INTO `item_model_varian` VALUES ('bf9faa1f-79b6-41af-8ef9-41ee0dddec76', 8, '16');
INSERT INTO `item_model_varian` VALUES ('c950c39c-7ff6-498d-9503-7850297d53a5', 7, 'Xanh');
INSERT INTO `item_model_varian` VALUES ('c950c39c-7ff6-498d-9503-7850297d53a5', 9, 'Tốt');
INSERT INTO `item_model_varian` VALUES ('f3dd3a29-ca07-4c57-b3b6-b80a7479e11d', 2, 'black');
INSERT INTO `item_model_varian` VALUES ('f3dd3a29-ca07-4c57-b3b6-b80a7479e11d', 8, '32');
COMMIT;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `shop_id` int DEFAULT NULL,
  `total_value` bigint DEFAULT NULL,
  `status` int DEFAULT '1',
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of order
-- ----------------------------
BEGIN;
INSERT INTO `order` VALUES ('5912b4c9-6928-493f-aa2a-e560352eb618', '61d6d84b-d713-4e3f-a562-50b6d8272387', 3, 120000, 2, NULL, '2021-07-03 08:12:49.977942');
INSERT INTO `order` VALUES ('f3b0fa58-917a-442e-8943-af3e174f8e7b', '61d6d84b-d713-4e3f-a562-50b6d8272387', 3, 1400000, 1, NULL, '2021-07-03 08:28:28.111016');
COMMIT;

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `order_id` varchar(36) NOT NULL,
  `item_model_id` varchar(36) NOT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`,`item_model_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of order_item
-- ----------------------------
BEGIN;
INSERT INTO `order_item` VALUES ('5912b4c9-6928-493f-aa2a-e560352eb618', 'd1e1289c-1fb7-4b98-96d7-3f8b25af55f1', 1, 120000);
INSERT INTO `order_item` VALUES ('f3b0fa58-917a-442e-8943-af3e174f8e7b', '590fad42-b1df-4613-98b9-82f4758a02d7', 2, 1400000);
COMMIT;

-- ----------------------------
-- Table structure for review_item
-- ----------------------------
DROP TABLE IF EXISTS `review_item`;
CREATE TABLE `review_item` (
  `item_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `rate` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`item_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of review_item
-- ----------------------------
BEGIN;
INSERT INTO `review_item` VALUES ('c25c379a-114f-47ea-8bda-8922cbc6588b', '61d6d84b-d713-4e3f-a562-50b6d8272387', 4, 'Tuỵet vời', '2021-07-03 08:13:40.710329');
COMMIT;

-- ----------------------------
-- Table structure for review_shop
-- ----------------------------
DROP TABLE IF EXISTS `review_shop`;
CREATE TABLE `review_shop` (
  `shop_id` int NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `rate` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`shop_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of review_shop
-- ----------------------------
BEGIN;
INSERT INTO `review_shop` VALUES (3, '61d6d84b-d713-4e3f-a562-50b6d8272387', 5, 'dấd', '2021-06-27 00:39:15.474099');
INSERT INTO `review_shop` VALUES (3, 'f5296ad9-1f0f-4e55-bbde-4f69801ae634', 1, '12', '2021-06-27 00:41:20.405144');
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
  `total_rate` varchar(255) DEFAULT '0',
  `image_advertise` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'https://photos2.vitaminspy.com/datn/static4.jpg',
  `advertise` int DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of shop
-- ----------------------------
BEGIN;
INSERT INTO `shop` VALUES (1, '123', 'trinhngockhang1503@gmail.com', 'Shop thời tran', 'https://cf.shopee.vn/file/bdade9af41692639e4101b8d5c7a0861_tn', '$2a$12$AsXYbpCEfqqlyhRCL1SmbOTgFe5friP9/.OwWQZntBFB/seh2Phu.', 'Khang Khang', '2021-05-15 14:55:27.381048', '84964419119', '0', 'https://photos2.vitaminspy.com/datn/static4.jpg', 1);
INSERT INTO `shop` VALUES (2, '1233', 'trinhngockhang503@gmail.com', 'Shop thời tranShop thời tran', 'https://cf.shopee.vn/file/bdade9af41692639e4101b8d5c7a0861_tn', '$2a$12$V/pGs0ThFGNgd4DMRrRgv.n4dieh1L8bb/.uCXFzxOEhUfyLf/NzS', 'Khang Khang', '2021-05-15 14:56:27.988489', '84964419111', '0', 'https://photos2.vitaminspy.com/datn/static4.jpg', 2);
INSERT INTO `shop` VALUES (3, 'khangtn', 'trinhngockhang1501@gmail.com', '', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625248171655-1616658646435-764310863.jpeg', '$2a$12$yM/ZciWlGGer9CoGBHk0pOIh6mRuSTxynXXoT/OWG/mdGN1EGP8DG', 'Khang Trinh', '2021-05-15 14:58:03.440349', '84964419113', '3', 'https://vitaminspy2.sgp1.digitaloceanspaces.com/datn/1625251409083-static2.jpeg', 1);
INSERT INTO `shop` VALUES (4, 'eaw', 'trinhngock1hang1503@gmail.com', '', 'https://cf.shopee.vn/file/bdade9af41692639e4101b8d5c7a0861_tn', '$2a$12$S.LpHIRHn7/wZiUzl3WX6u2cwQThQKflEniLMei5s/7Yv1K9832WO', 'Khang Khang', '2021-05-15 14:58:57.058026', '84264419119', '0', 'https://photos2.vitaminspy.com/datn/static4.jpg', 2);
INSERT INTO `shop` VALUES (5, '12', 'trinhngockhang21503@gmail.com', '', 'https://cf.shopee.vn/file/bdade9af41692639e4101b8d5c7a0861_tn', '$2a$12$eVrxmH3IDcvjA4c7MFDQv.2ipUkWrMpW9DinXkdr/D19aXQ2ipeLu', 'Khang Khang', '2021-05-19 22:07:57.938122', '84644191191', '0', 'https://photos2.vitaminspy.com/datn/static4.jpg', 2);
INSERT INTO `shop` VALUES (6, 'khangtn1', 'trinhngockhang15033@gmail.com', '', 'https://cf.shopee.vn/file/bdade9af41692639e4101b8d5c7a0861_tn', '$2a$12$/DAPkuAbZgUPkMPPgiTUO.V66aGYB2GD7yYkWfQcIW55/KGwh1eZu', 'Khang Khang', '2021-05-29 09:53:41.014490', '84964419119', '0', 'https://photos2.vitaminspy.com/datn/static4.jpg', 2);
INSERT INTO `shop` VALUES (7, 'khangtn2', 'trinhngockhang15031@gmail.com', '', 'https://cf.shopee.vn/file/bdade9af41692639e4101b8d5c7a0861_tn', '$2a$12$OSZnQ0b15qOWhAeFJdHBdeTK.e1me/lrgXy0xJECNPDeRd7h/SdLi', NULL, '2021-06-27 10:06:04.764749', '84964419119', '0', 'https://photos2.vitaminspy.com/datn/static4.jpg', 2);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sub_category
-- ----------------------------
BEGIN;
INSERT INTO `sub_category` VALUES (1, 'Iphone', 1);
INSERT INTO `sub_category` VALUES (2, 'Android', 1);
INSERT INTO `sub_category` VALUES (3, 'Áo thun', 10);
INSERT INTO `sub_category` VALUES (4, 'Bóng rổ', 17);
INSERT INTO `sub_category` VALUES (5, 'bóng đá', 17);
INSERT INTO `sub_category` VALUES (6, 'Phòng khách', 18);
INSERT INTO `sub_category` VALUES (7, 'phòng ngủ', 18);
INSERT INTO `sub_category` VALUES (8, 'Bóng đá', 19);
INSERT INTO `sub_category` VALUES (10, 'Bóng đá', 20);
INSERT INTO `sub_category` VALUES (11, 'bóng chuyền', 20);
INSERT INTO `sub_category` VALUES (12, 'Áo nam', 11);
INSERT INTO `sub_category` VALUES (13, 'Áo nữ', 11);
INSERT INTO `sub_category` VALUES (14, 'Bếp', 6);
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
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('61d6d84b-d713-4e3f-a562-50b6d8272387', 'trinhngockhang1503@gmail.com', 'Khang Trịnh Ngọc', 'https://lh3.googleusercontent.com/a/AATXAJx47VhvLFGmjDK5KqytjchOxTh9iINbyGCP6CVc=s96-c', NULL, '2021-06-23 16:32:06.223365', NULL);
INSERT INTO `user` VALUES ('f5296ad9-1f0f-4e55-bbde-4f69801ae634', 'khangtn1503@gmail.com', 'Khang Trinh', 'https://lh3.googleusercontent.com/a/AATXAJx47VhvLFGmjDK5KqytjchOxTh9iINbyGCP6CVc=s96-c', NULL, '2021-06-26 17:48:49.357683', NULL);
COMMIT;

-- ----------------------------
-- Table structure for varian
-- ----------------------------
DROP TABLE IF EXISTS `varian`;
CREATE TABLE `varian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
INSERT INTO `varian` VALUES (7, 'Màu sắc');
INSERT INTO `varian` VALUES (8, 'Ram');
INSERT INTO `varian` VALUES (9, 'Chất liệu');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
