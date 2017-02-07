-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.7.14


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema db_table99
--

CREATE DATABASE IF NOT EXISTS db_table99;
USE db_table99;

--
-- Definition of table `table_players`
--

DROP TABLE IF EXISTS `table_players`;
CREATE TABLE `table_players` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `table_id` varchar(100) NOT NULL,
  `table_type` varchar(45) NOT NULL,
  `player_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `table_players`
--

/*!40000 ALTER TABLE `table_players` DISABLE KEYS */;
INSERT INTO `table_players` (`id`,`table_id`,`table_type`,`player_id`) VALUES 
 (123,'e93d710c-6a94-8d99-33b0-8d2b78b4cf90','SYSTEM','c93bdc83-1abe-117a-7caf-cc2e4231e47f'),
 (124,'b737e6b6-180b-697f-38d3-2a5de815cec4','SYSTEM','c93bdc83-1abe-117a-7caf-cc2e4231e47f'),
 (126,'d2ca136e-1974-d65f-9a17-ff7c5cf29cee','CUSTOM','c93bdc83-1abe-117a-7caf-cc2e4231e47f'),
 (127,'d2ca136e-1974-d65f-9a17-ff7c5cf29cee','CUSTOM','6d6de935-2e97-c93d-381a-aff6f5dacea9'),
 (129,'753ffbf1-6e01-3ba0-164c-976c5a23067b','CUSTOM','c93bdc83-1abe-117a-7caf-cc2e4231e47f'),
 (130,'753ffbf1-6e01-3ba0-164c-976c5a23067b','CUSTOM','6d6de935-2e97-c93d-381a-aff6f5dacea9'),
 (152,'19e58047-531f-3b83-f8d0-0767a467de17','CUSTOM','4f9f623e-81b1-5675-597e-f2d94c2c5462'),
 (159,'1a88ffa8-c415-af81-6bf6-92e072a51e11','SYSTEM','4f9f623e-81b1-5675-597e-f2d94c2c5462');
/*!40000 ALTER TABLE `table_players` ENABLE KEYS */;


--
-- Definition of table `tbl_chats`
--

DROP TABLE IF EXISTS `tbl_chats`;
CREATE TABLE `tbl_chats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `table_id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `message` varchar(200) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_chats`
--

/*!40000 ALTER TABLE `tbl_chats` DISABLE KEYS */;
INSERT INTO `tbl_chats` (`id`,`table_id`,`user_id`,`message`,`date`) VALUES 
 (1,'d912654f-8875-4394-cd20-abf7e2c895ba','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-18 00:42:09'),
 (2,'5b4f8561-8a36-7da6-cc6f-6217c4b765b0','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hello','2017-01-18 01:26:19'),
 (3,'07398d46-f389-6d4c-c1b3-284c8ece494a','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hi','2017-01-18 02:20:24'),
 (4,'07398d46-f389-6d4c-c1b3-284c8ece494a','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hello','2017-01-18 02:21:16'),
 (5,'6e64996c-34b3-c79a-660b-eed2d8057f7b','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hello','2017-01-18 02:23:52'),
 (6,'6e64996c-34b3-c79a-660b-eed2d8057f7b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','How Are You','2017-01-18 02:24:22'),
 (7,'6e64996c-34b3-c79a-660b-eed2d8057f7b','4f9f623e-81b1-5675-597e-f2d94c2c5462','I am fine','2017-01-18 02:24:40'),
 (8,'6e64996c-34b3-c79a-660b-eed2d8057f7b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','I am also fine','2017-01-18 02:24:55'),
 (9,'6e64996c-34b3-c79a-660b-eed2d8057f7b','4f9f623e-81b1-5675-597e-f2d94c2c5462','Whats the plan today','2017-01-18 02:25:10'),
 (10,'6e64996c-34b3-c79a-660b-eed2d8057f7b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Nothing just chilling','2017-01-18 02:25:26'),
 (11,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hi','2017-01-18 02:38:19'),
 (12,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','hello','2017-01-18 02:38:28'),
 (13,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','cool','2017-01-18 02:38:33'),
 (14,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-18 02:43:26'),
 (15,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','hey','2017-01-18 02:43:40'),
 (16,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','chatiing','2017-01-18 02:44:02'),
 (17,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','wow','2017-01-18 02:44:27'),
 (18,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hmm','2017-01-18 02:44:40'),
 (19,'538030bc-b284-4d9a-4f20-f0c364f2a0d3','4f9f623e-81b1-5675-597e-f2d94c2c5462','aur','2017-01-18 02:44:47'),
 (20,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hi','2017-01-18 02:58:53'),
 (21,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','hello','2017-01-18 02:59:06'),
 (22,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hw r u','2017-01-18 02:59:21'),
 (23,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','ankit','2017-01-18 02:59:28'),
 (24,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','ankit','2017-01-18 02:59:43'),
 (25,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','ankit','2017-01-18 02:59:54'),
 (26,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hi','2017-01-18 03:00:00'),
 (27,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hi','2017-01-18 03:00:46'),
 (28,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','dsadasda','2017-01-18 04:13:26'),
 (29,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hi Amit','2017-01-18 04:14:34'),
 (30,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hi','2017-01-18 04:16:26'),
 (31,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','I Am find','2017-01-18 04:16:40'),
 (32,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','beta\nfine hota hei','2017-01-18 04:16:56'),
 (33,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','oh sorry','2017-01-18 04:17:07'),
 (34,'06d31da5-006c-2530-674e-d0ecba3998d9','4f9f623e-81b1-5675-597e-f2d94c2c5462','koi nahi apna bhai hei tu','2017-01-18 04:17:19'),
 (35,'06d31da5-006c-2530-674e-d0ecba3998d9','c93bdc83-1abe-117a-7caf-cc2e4231e47f','thanks','2017-01-18 04:17:28'),
 (36,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi How Are Your','2017-01-18 06:01:10'),
 (37,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi','2017-01-18 06:03:29'),
 (38,'8abba592-6100-ef2a-5ff5-9184d9c54f37','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-01-18 06:03:46'),
 (39,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHow Are You','2017-01-18 06:04:10'),
 (40,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHow are You','2017-01-18 06:05:28'),
 (41,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','GHI','2017-01-18 06:05:44'),
 (42,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','hello\ndasd\ndas\ndas\nd\nasd','2017-01-18 06:05:58'),
 (43,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello','2017-01-18 06:06:39'),
 (44,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi How\nAre You\nI am fine here','2017-01-18 06:06:53'),
 (45,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','HI','2017-01-18 06:07:02'),
 (46,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello','2017-01-18 06:09:05'),
 (47,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello','2017-01-18 06:09:53'),
 (48,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHow Are\nYOu','2017-01-18 06:10:04'),
 (49,'8abba592-6100-ef2a-5ff5-9184d9c54f37','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hellow \nHow \nAre','2017-01-18 06:11:26'),
 (50,'d905d9f3-3695-3e3a-b932-1b4b580e46ea','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi','2017-01-18 06:21:01'),
 (51,'dd37269c-22ca-3f4e-a841-d94733d08e65','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','HI','2017-01-18 06:33:49'),
 (52,'dd37269c-22ca-3f4e-a841-d94733d08e65','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','How Are you','2017-01-18 06:33:56'),
 (53,'dd37269c-22ca-3f4e-a841-d94733d08e65','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','I am\nFine','2017-01-18 06:34:07'),
 (54,'1c132a80-a254-d9ad-a2cf-5620af857c68','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi','2017-01-18 08:01:37'),
 (55,'1c132a80-a254-d9ad-a2cf-5620af857c68','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','How Are you all','2017-01-18 08:01:45'),
 (56,'1c132a80-a254-d9ad-a2cf-5620af857c68','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi','2017-01-18 08:11:26'),
 (57,'1c132a80-a254-d9ad-a2cf-5620af857c68','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hi A','2017-01-18 08:11:42'),
 (58,'06ba6942-31e2-b1fb-1b03-42c3686b5028','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hi','2017-01-18 09:18:00'),
 (59,'06ba6942-31e2-b1fb-1b03-42c3686b5028','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello','2017-01-18 09:18:10'),
 (60,'06ba6942-31e2-b1fb-1b03-42c3686b5028','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hello','2017-01-18 09:21:50'),
 (61,'06ba6942-31e2-b1fb-1b03-42c3686b5028','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Wow','2017-01-18 09:24:38'),
 (62,'dd37269c-22ca-3f4e-a841-d94733d08e65','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello Boys\nHow Are You','2017-01-18 19:55:53'),
 (63,'05b7130b-45c3-8932-ed65-1c85f396edc9','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello','2017-01-18 19:57:53'),
 (64,'05b7130b-45c3-8932-ed65-1c85f396edc9','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHow\nAre \nYOu','2017-01-18 20:02:15'),
 (65,'05b7130b-45c3-8932-ed65-1c85f396edc9','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHi\nHow\nAre\nYou','2017-01-18 20:06:42'),
 (66,'05b7130b-45c3-8932-ed65-1c85f396edc9','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi Hello\nHow Are\nYoue','2017-01-18 20:07:38'),
 (67,'05b7130b-45c3-8932-ed65-1c85f396edc9','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHow \nAre\nYou','2017-01-18 20:08:42'),
 (68,'05b7130b-45c3-8932-ed65-1c85f396edc9','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nHow \nAre You','2017-01-18 20:09:30'),
 (69,'8f6f5560-215e-ce6c-3439-d2278056b52e','4f9f623e-81b1-5675-597e-f2d94c2c5462','HI\nHow\nAre\nYou','2017-01-18 20:29:11'),
 (70,'4211f8a1-ee6c-903e-1bf8-893052fc7bbc','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hi','2017-01-19 08:50:59'),
 (71,'4211f8a1-ee6c-903e-1bf8-893052fc7bbc','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello \nHow Are You ??','2017-01-19 08:59:04'),
 (72,'4211f8a1-ee6c-903e-1bf8-893052fc7bbc','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ip','2017-01-19 08:59:18'),
 (73,'1d5f9c7f-8d4f-9f91-d457-c27415285260','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','HI\nHow \nAre \nYou','2017-01-19 09:00:38'),
 (74,'1d5f9c7f-8d4f-9f91-d457-c27415285260','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello\nI am going to Agra\nDo you want to come with me...?','2017-01-19 09:01:03'),
 (75,'1d5f9c7f-8d4f-9f91-d457-c27415285260','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Will be meet at Taj Mahal.\nWill have some fun over there.','2017-01-19 09:01:32'),
 (76,'1d5f9c7f-8d4f-9f91-d457-c27415285260','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Tell \n\nWhats your plan','2017-01-19 09:01:51'),
 (77,'1d5f9c7f-8d4f-9f91-d457-c27415285260','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','How\'s was your weekend. ?','2017-01-19 09:02:08'),
 (78,'1d5f9c7f-8d4f-9f91-d457-c27415285260','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','hi','2017-01-19 09:07:07'),
 (79,'6f258356-bc93-5d51-0745-fe2af5f006cd','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','Hello','2017-01-19 23:57:39'),
 (80,'b340ad25-0fff-f8e6-1d9b-7a2175c28e8f','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','hi','2017-01-20 00:42:35'),
 (81,'b340ad25-0fff-f8e6-1d9b-7a2175c28e8f','e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','wow','2017-01-20 00:42:43'),
 (82,'80a5907e-d59c-5c65-40d4-761731ca0477','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-20 02:28:25'),
 (83,'80a5907e-d59c-5c65-40d4-761731ca0477','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hello','2017-01-20 02:28:40'),
 (84,'80a5907e-d59c-5c65-40d4-761731ca0477','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-20 02:28:51'),
 (85,'80a5907e-d59c-5c65-40d4-761731ca0477','4f9f623e-81b1-5675-597e-f2d94c2c5462','how r u','2017-01-20 02:29:08'),
 (86,'80a5907e-d59c-5c65-40d4-761731ca0477','c93bdc83-1abe-117a-7caf-cc2e4231e47f','i am fine','2017-01-20 02:29:17'),
 (87,'80a5907e-d59c-5c65-40d4-761731ca0477','4f9f623e-81b1-5675-597e-f2d94c2c5462','Wha\'s going on','2017-01-20 02:29:36'),
 (88,'80a5907e-d59c-5c65-40d4-761731ca0477','4f9f623e-81b1-5675-597e-f2d94c2c5462','Nothing as ususal','2017-01-20 02:29:45'),
 (89,'dd2c1983-3d4e-e3ab-c1e2-641ce8abb1b4','4f9f623e-81b1-5675-597e-f2d94c2c5462','HI','2017-01-20 09:10:38'),
 (90,'dd2c1983-3d4e-e3ab-c1e2-641ce8abb1b4','4f9f623e-81b1-5675-597e-f2d94c2c5462','wow','2017-01-20 09:11:18'),
 (91,'dd2c1983-3d4e-e3ab-c1e2-641ce8abb1b4','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-20 09:12:19'),
 (92,'8213bfbf-c4a3-ec39-876c-85c995eb2058','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-20 09:47:20'),
 (93,'d3254d09-ea48-d2c2-ead4-01170c3135df','4f9f623e-81b1-5675-597e-f2d94c2c5462','hello','2017-01-20 09:48:15'),
 (94,'d3254d09-ea48-d2c2-ead4-01170c3135df','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-20 09:48:27'),
 (95,'d3254d09-ea48-d2c2-ead4-01170c3135df','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-20 09:48:56'),
 (96,'588ae935-28c4-0f4a-5c68-dfab468e5c2b','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hi','2017-01-21 08:43:34'),
 (97,'ecf76449-80bb-bfd1-c915-39700b8132e5','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hello','2017-01-21 09:28:56'),
 (98,'543ccb19-faf5-4275-e74e-5915d4737d69','4f9f623e-81b1-5675-597e-f2d94c2c5462','hello','2017-01-23 08:10:26'),
 (99,'52f70277-0739-8c49-68ac-84497bd8f9ba','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-24 02:42:50'),
 (100,'52f70277-0739-8c49-68ac-84497bd8f9ba','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hello','2017-01-24 02:46:35'),
 (101,'52f70277-0739-8c49-68ac-84497bd8f9ba','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hi','2017-01-24 02:47:36'),
 (102,'52f70277-0739-8c49-68ac-84497bd8f9ba','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-24 02:48:58'),
 (103,'52f70277-0739-8c49-68ac-84497bd8f9ba','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-24 02:50:27'),
 (104,'52f70277-0739-8c49-68ac-84497bd8f9ba','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hello','2017-01-24 02:50:39'),
 (105,'52f70277-0739-8c49-68ac-84497bd8f9ba','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hi','2017-01-24 02:50:55'),
 (106,'87ddf8b4-4e15-ae4d-7bf2-454b30faf80c','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-24 09:36:18'),
 (107,'87ddf8b4-4e15-ae4d-7bf2-454b30faf80c','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-01-24 09:39:44'),
 (108,'87ddf8b4-4e15-ae4d-7bf2-454b30faf80c','c93bdc83-1abe-117a-7caf-cc2e4231e47f','How are you','2017-01-24 09:40:06'),
 (109,'af3f18bb-6cb8-409d-24cd-deb18253a48a','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-01-25 03:38:54'),
 (110,'af3f18bb-6cb8-409d-24cd-deb18253a48a','4f9f623e-81b1-5675-597e-f2d94c2c5462','hello','2017-01-25 03:39:06'),
 (111,'c16aafe0-f9cd-b2b6-769c-66f0b2021d75','4f9f623e-81b1-5675-597e-f2d94c2c5462','Hello','2017-01-25 22:24:43'),
 (112,'c16aafe0-f9cd-b2b6-769c-66f0b2021d75','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello how are you','2017-01-25 22:25:03'),
 (113,'21f8dd91-3469-3890-6d2d-e8d29402e3ac','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-01-31 02:17:56'),
 (114,'26da437b-b970-6640-b1f4-35f6ddd4e85f','7ad20725-1a44-d1c2-4fd4-45d03a121249','hi','2017-02-01 23:38:02'),
 (115,'26da437b-b970-6640-b1f4-35f6ddd4e85f','7ad20725-1a44-d1c2-4fd4-45d03a121249','hello','2017-02-01 23:40:31'),
 (116,'26da437b-b970-6640-b1f4-35f6ddd4e85f','7ad20725-1a44-d1c2-4fd4-45d03a121249','hi','2017-02-01 23:41:14'),
 (117,'26da437b-b970-6640-b1f4-35f6ddd4e85f','6d6de935-2e97-c93d-381a-aff6f5dacea9','how r u','2017-02-01 23:41:28'),
 (118,'26da437b-b970-6640-b1f4-35f6ddd4e85f','6d6de935-2e97-c93d-381a-aff6f5dacea9','I am fin e','2017-02-01 23:42:07'),
 (119,'26da437b-b970-6640-b1f4-35f6ddd4e85f','7ad20725-1a44-d1c2-4fd4-45d03a121249','good','2017-02-01 23:42:13'),
 (120,'26da437b-b970-6640-b1f4-35f6ddd4e85f','7ad20725-1a44-d1c2-4fd4-45d03a121249','So how\'s your brother','2017-02-01 23:42:25'),
 (121,'26da437b-b970-6640-b1f4-35f6ddd4e85f','6d6de935-2e97-c93d-381a-aff6f5dacea9','He is also fine','2017-02-01 23:42:42'),
 (122,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-02-03 10:18:00'),
 (123,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-02-03 11:07:58'),
 (124,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hi','2017-02-03 11:08:02'),
 (125,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hi\nHello','2017-02-03 11:08:18'),
 (126,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hi\nHello\nHow are you','2017-02-03 11:08:27'),
 (127,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','How are you','2017-02-03 11:08:35'),
 (128,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','hello','2017-02-03 11:10:49'),
 (129,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-02-03 11:15:56'),
 (130,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-02-03 11:25:01'),
 (131,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','dsa','2017-02-03 11:26:55'),
 (132,'753ffbf1-6e01-3ba0-164c-976c5a23067b','c93bdc83-1abe-117a-7caf-cc2e4231e47f','Hello','2017-02-03 11:27:38'),
 (133,'753ffbf1-6e01-3ba0-164c-976c5a23067b','6d6de935-2e97-c93d-381a-aff6f5dacea9','How are you','2017-02-03 11:27:47'),
 (134,'19e58047-531f-3b83-f8d0-0767a467de17','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-02-07 11:22:00'),
 (135,'19e58047-531f-3b83-f8d0-0767a467de17','4f9f623e-81b1-5675-597e-f2d94c2c5462','hi','2017-02-07 11:24:11');
/*!40000 ALTER TABLE `tbl_chats` ENABLE KEYS */;


--
-- Definition of table `tbl_custom_tables`
--

DROP TABLE IF EXISTS `tbl_custom_tables`;
CREATE TABLE `tbl_custom_tables` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `boot_amount` int(10) unsigned NOT NULL,
  `min_players` int(10) unsigned NOT NULL,
  `max_players` int(10) unsigned NOT NULL,
  `owner` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_custom_tables`
--

/*!40000 ALTER TABLE `tbl_custom_tables` DISABLE KEYS */;
INSERT INTO `tbl_custom_tables` (`id`,`name`,`boot_amount`,`min_players`,`max_players`,`owner`,`date`) VALUES 
 ('13523029-a3ec-9dd9-2bed-8bd0b60f4baa','Adventure',100,2,5,'e20ecd2f-06d6-2a4c-1cb4-d7ff989f2978','2017-01-31 02:48:21'),
 ('19e58047-531f-3b83-f8d0-0767a467de17','ANKIT SPECIAL',1000,2,5,'4f9f623e-81b1-5675-597e-f2d94c2c5462','2017-01-24 08:54:59'),
 ('26da437b-b970-6640-b1f4-35f6ddd4e85f','ANKIT ADVENTRUE',1000,2,5,'7ad20725-1a44-d1c2-4fd4-45d03a121249','2017-02-01 02:37:14'),
 ('753ffbf1-6e01-3ba0-164c-976c5a23067b','WOW',1000,2,5,'c93bdc83-1abe-117a-7caf-cc2e4231e47f','2017-01-31 22:08:53'),
 ('7e3187b9-df48-b81f-9b00-ee5653cdde21','ANKIT',1000,2,5,'7ad20725-1a44-d1c2-4fd4-45d03a121249','2017-02-01 21:37:52'),
 ('d2ca136e-1974-d65f-9a17-ff7c5cf29cee','manoj adventure',1000,2,5,'c93bdc83-1abe-117a-7caf-cc2e4231e47f','2017-01-31 00:36:01');
/*!40000 ALTER TABLE `tbl_custom_tables` ENABLE KEYS */;


--
-- Definition of table `tbl_system_defined_tables`
--

DROP TABLE IF EXISTS `tbl_system_defined_tables`;
CREATE TABLE `tbl_system_defined_tables` (
  `id` varchar(100) NOT NULL,
  `pot_amount` int(10) unsigned NOT NULL,
  `max_players` int(10) unsigned NOT NULL,
  `status` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  `min_players` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_system_defined_tables`
--

/*!40000 ALTER TABLE `tbl_system_defined_tables` DISABLE KEYS */;
INSERT INTO `tbl_system_defined_tables` (`id`,`pot_amount`,`max_players`,`status`,`date`,`min_players`) VALUES 
 ('1a88ffa8-c415-af81-6bf6-92e072a51e11',200,5,'CREATED','2017-02-07 14:31:41',2);
/*!40000 ALTER TABLE `tbl_system_defined_tables` ENABLE KEYS */;


--
-- Definition of table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `id` varchar(100) NOT NULL,
  `displayName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `chips` int(10) unsigned DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` (`id`,`displayName`,`email`,`chips`,`password`,`name`,`avatar`) VALUES 
 ('4f9f623e-81b1-5675-597e-f2d94c2c5462','ANKIT shrma','ankit@gmail.com',2516500,'ankit','Ankit Sharma','background: url(../images/characters.jpg) -475px -837px no-repeat;'),
 ('6d6de935-2e97-c93d-381a-aff6f5dacea9','Abhishek','playtable99@gmail.com',2498600,'','Abhishek Singh','background: url(https://fb-s-c-a.akamaihd.net/h-ak-xfa1/v/t1.0-1/p200x200/16142236_108838726293994_6623388806697716325_n.jpg?oh=72a6ee5a15247a3df8a22fb00941efb2&oe=59427E1B&__gda__=1494120179_67d751862587572244e7dbc00b0ae44d);'),
 ('7ad20725-1a44-d1c2-4fd4-45d03a121249','ANKIT','ankitit14@gmail.com',2501450,'','Ankit Sharma','background: url(https://fb-s-a-a.akamaihd.net/h-ak-xfl1/v/t1.0-1/p200x200/16426294_1254264421296048_944515765520821979_n.jpg?oh=a3d5e3c01281423c45aa12492f890a1a&oe=5916B80F&__gda__=1493741608_81f579604580d56246970ead09423b54);'),
 ('b96f15f8-4eac-894c-2fbb-192348920454','Kamal Gupta','kamal@gmail.com',2500250,'ankit','Kamal Gupta','background: url(../images/characters.jpg) -176px -21px no-repeat;'),
 ('c93bdc83-1abe-117a-7caf-cc2e4231e47f','MANOJ12','manoj@gmail.com',2486350,'ankit','Manoj Kumar','background: url(../images/characters.jpg) -26px -174px no-repeat;');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
