-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: top_shop
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exterior_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interior_number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` char(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `references` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'El mirador','112','','52090','por mi casa'),(2,'El mirador','112','B2','52090','por mi casa');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart_items`
--

DROP TABLE IF EXISTS `shopping_cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_cart` int NOT NULL,
  `fk_tshirt` int NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart` (`fk_cart`),
  KEY `fk_tshirt` (`fk_tshirt`),
  CONSTRAINT `shopping_cart_items_ibfk_1` FOREIGN KEY (`fk_cart`) REFERENCES `shopping_cart` (`id`),
  CONSTRAINT `shopping_cart_items_ibfk_2` FOREIGN KEY (`fk_tshirt`) REFERENCES `tshirts` (`id`),
  CONSTRAINT `shopping_cart_items_chk_1` CHECK ((`amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart_items`
--

LOCK TABLES `shopping_cart_items` WRITE;
/*!40000 ALTER TABLE `shopping_cart_items` DISABLE KEYS */;
INSERT INTO `shopping_cart_items` VALUES (1,1,6,2),(4,1,11,2);
/*!40000 ALTER TABLE `shopping_cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_items`
--

DROP TABLE IF EXISTS `ticket_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_ticket` int NOT NULL,
  `fk_tshirt` int DEFAULT NULL,
  `title` varchar(31) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int NOT NULL,
  `price` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ticket` (`fk_ticket`),
  CONSTRAINT `ticket_items_ibfk_1` FOREIGN KEY (`fk_ticket`) REFERENCES `tickets` (`id`),
  CONSTRAINT `ticket_items_chk_1` CHECK ((`amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_items`
--

LOCK TABLES `ticket_items` WRITE;
/*!40000 ALTER TABLE `ticket_items` DISABLE KEYS */;
INSERT INTO `ticket_items` VALUES (1,2,3,'Frase en Blanco',1,320.00),(2,2,18,'adfdc',1,323.00),(3,3,3,'Frase en Blanco',3,320.00),(4,4,1,'Frase en Blanco',3,249.00),(5,5,3,'Frase en Blanco',1,320.00),(6,6,16,'asdffsdaf',2,324.00),(7,6,17,'esto es algo',1,342.00),(8,6,15,'Tempo 2',2,323.00),(9,7,2,'Playera Frase Inspiradora',3,278.00);
/*!40000 ALTER TABLE `ticket_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fk_user` int NOT NULL,
  `cart_name` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cart_number` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDIENTE','ENVIADO','ENTREGADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDIENTE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,2,'dsaf','sdfsdf','2025-05-11 20:14:16','PENDIENTE'),(2,2,'alfredo dom','1234567891234','2025-05-11 21:01:16','PENDIENTE'),(3,2,'miguel','12345554345','2025-05-11 21:03:27','PENDIENTE'),(4,2,'priueva','234324234324234','2025-05-11 21:06:54','PENDIENTE'),(5,2,'sdfgfsd','3456435345','2025-05-11 21:08:39','PENDIENTE'),(6,2,'sdffsdf','45345435','2025-05-11 22:16:55','PENDIENTE'),(7,2,'Jose Alfredo Dominguez','32343423434443','2025-05-12 00:27:13','PENDIENTE');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tshirts`
--

DROP TABLE IF EXISTS `tshirts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tshirts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(31) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resource` varchar(63) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('FRASES_Y_CITAS','DISENOS_ARTISTICOS','CULTURA_POP','TEMPORADAS','DISENOS_GEEK_Y_NERD') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('HOMBRE','MUJER','NINO','NINA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `talla` enum('XS','S','M','L','XL','XXL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `existence` int DEFAULT NULL,
  `description` varchar(127) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tshirts`
--

LOCK TABLES `tshirts` WRITE;
/*!40000 ALTER TABLE `tshirts` DISABLE KEYS */;
INSERT INTO `tshirts` VALUES (1,'Frase en Blanco','35788227-6c6c-4205-8a1b-355c3486b6aa.jpg','FRASES_Y_CITAS','MUJER','M',249.00,7,'Mensaje positivo en un diseño limpio.'),(2,'Playera Frase Inspiradora','dc8e3f73-4d29-4138-a281-6827df2e3512.jpg','FRASES_Y_CITAS','MUJER','L',278.00,4,'Algodón 100%, cómoda para el día.'),(3,'Frase en Blanco','b1acecc1-427f-4a47-9e47-29ed5bcb98e8.jpg','FRASES_Y_CITAS','HOMBRE','XL',320.00,2,'Frase en Blanco'),(4,'Playera Arte Urbano','5a7c9a29-453e-4a05-b78b-08a2b85e7e31.jpg','DISENOS_ARTISTICOS','MUJER','M',269.00,8,'Estilo retro para destacar.'),(5,'Diseño de Galaxia','7ba5049c-96e7-4158-ab36-f8e594588415.jpg','DISENOS_ARTISTICOS','MUJER','XL',279.00,14,'Explora el arte del universo.'),(6,'Trazos Abstractos','f57cf8d5-67f9-4ad3-89d1-ac5c41bd5232.jpg','DISENOS_ARTISTICOS','HOMBRE','XXL',219.00,21,'Arte moderno en tu outfit diario.'),(7,'Playera Anime','9beae688-f1c3-4426-a236-98e513d3654a.jpg','CULTURA_POP','HOMBRE','S',345.00,3,'Inspirada en tu cantante favorito.'),(8,'Cómics Retro','c2a7330b-04b2-412f-90a7-359933d68685.jpg','CULTURA_POP','HOMBRE','L',234.00,11,'Pretty boy dirty boy.'),(9,'Cómics Retro','64c904e6-f542-41a6-8e9f-cfec4b318743.jpg','CULTURA_POP','MUJER','XL',259.00,7,'Reviviendo el rock.'),(10,'Playera Verano','10e087eb-2b19-4c3b-b405-9aba1f1d6668.jpg','TEMPORADAS','MUJER','L',199.00,11,'Ligera y colorida para días soleados.'),(11,'Diseño Navideño','9b846e2a-5020-4b05-91fc-c178ffc28177.jpg','TEMPORADAS','MUJER','M',255.00,2,'Celebra la temporada con estilo.'),(12,'Playera Código Binario','3cf393f8-9872-4c17-b479-fe6c9dbd0d10.jpg','DISENOS_GEEK_Y_NERD','MUJER','L',259.00,4,'Solo para verdaderos geeks.'),(13,'Diseño Matemático','496eeb21-2376-4ffc-b052-b0b6c178da6d.jpg','DISENOS_GEEK_Y_NERD','MUJER','XS',269.00,5,'Estilo de poder.'),(14,'Temporal','d9f099fe-9a43-4ee1-8cf4-396bddf0b07f.jpg','CULTURA_POP','HOMBRE','M',233.00,12,'Camiseta blanca'),(15,'Tempo 2','791e1e4b-7e16-40ff-9cd5-706f829e55c2.jpg','CULTURA_POP','MUJER','M',323.00,3421,'algo nuevo x2'),(16,'asdffsdaf','7650e8e9-f7c1-4f3e-878f-ac2de3402edb.jpg','DISENOS_ARTISTICOS','MUJER','M',324.00,2341,'algo bn'),(17,'esto es algo','5adaf974-0513-438f-80a3-52c3f7636d6f.jpg','CULTURA_POP','HOMBRE','S',342.00,553,'nose que paso'),(18,'adfdc','a0c0fcdc-b969-4f5f-bdf2-ded686903454.jpg','DISENOS_ARTISTICOS','HOMBRE','S',323.00,323,'sdafasf'),(19,'haber si funciona','0eb80911-980d-4572-b4e4-c1754786bd88.jpg','DISENOS_ARTISTICOS','NINA','XS',2222.00,2222,'nose ya me aburri'),(20,'asdfsadfsdds','42244e6d-f234-4b66-9f59-993e694b7465.jpg','DISENOS_GEEK_Y_NERD','HOMBRE','S',666.00,6666,'fgdhyu');
/*!40000 ALTER TABLE `tshirts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(63) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fk_address` int DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','CUSTOMER') COLLATE utf8mb4_unicode_ci DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_address` (`fk_address`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`fk_address`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alfred','Arista','alfredo@gmail.com','$2a$10$u69qrmNW3BpcQ2P66.qOGeRQKbP1NkCaRm6rDtoEXBXYJMODAO1..',1,'7345828123','CUSTOMER'),(2,'root','as root','root@root.com','$2a$10$bhHi0pGy4jOikQj37fKc7O.7gdDdN42NWlyvRgvBlyCVJ2eouiNWW',2,'56454224','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12  0:35:00
