-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: academia
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercicio`
--

DROP TABLE IF EXISTS `exercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercicio` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `aparelho` varchar(45) DEFAULT NULL,
  `academia` int(11) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicio`
--

LOCK TABLES `exercicio` WRITE;
/*!40000 ALTER TABLE `exercicio` DISABLE KEYS */;
INSERT INTO `exercicio` VALUES (1,'Supino inclinado c/ barra','Supino inclinado: serve para trabalhar a porção superior do peitoral, Deitado no banco reto, segure a barra (ou os halteres) com a palma das mãos voltadas para a frente.','2021-05-03 13:40:49','',0),(2,'Crusifixo reto','O crucifixo são uma boa opção para quem busca hipertrofia ou uma maior definição do peito. Isso porque os movimentos de adusão e abdusão dos ombros .','2021-05-03 13:43:44','',0),(3,'Supino reto c/ barra ','Sente-se em um banco reto e posicione os halteres em cima dos joelhos,\nAo deitar no banco, use o impulso para trazer ambos os halteres para a posisão o inicial, alinhados em frente a porsisão o superior do peitoral com os braços esticados.','2021-05-03 13:47:18','',0),(4,'Voador',' Este exercí­cio consiste em uma maquina especial com suporte para segurar as mãos dos dois lados, de modo que  no movimento de abre e fecha repetidas vezes, ajustando o peso de acordo com a força que o usuario ira fazer.','2021-05-03 13:50:18','',0),(5,'Françês deitado c/ halteres ',' O trí­ceps francês é um movimento uniarticular, com participação estetica dos músculos do ombro e do tronco, deitado no banco reto, e com os halteres nas  mãos, acima da cabeça  subir  e desce.\n\n','2021-05-03 14:00:15','',0),(6,'Corda cross','É um exercício de musculação que trabalha o isolamento da parte de tras do braço, por meio da extensão do cotovelo, e atua em três partes do trí­ceps ou trí­ceps braquial, com a cabeça medial, longa e, principalmente, a lateral.','2021-05-03 14:18:53','',0),(7,'Barra cross','A barra fixa em parede tem como finalidade a execução de exercí­cios básicos utilizando o peso do proprio praticante,são responsaveis pelo aumento de força e ganho de massa muscular nas costas, braços e Abdomen.','2021-05-03 14:28:23','',0),(8,'Trí­ceps testa ','Segure a barra com os cotovelos estendidos e as mãos na mesma linha dos ombros;  Flexione os braços em 90 graus, sem abri-los, na altura da testa, Não altere a posição inicial dos braços e dos ombros durante o movimento.','2021-05-03 14:33:54','',0),(9,'Levantamento terra ','O levantamento terra é um exercí­cio de treinamento com pesos que desenvolve os músculos da região lombar, pernas, trapezio e glúteos.  um dos exercí­cios mais completos para as costas.','2021-05-03 14:38:06','',0),(10,'Pulley frontal','É um exercício para costas muito parecido com a barra-fixa, mas com caracterí­sticas fornicas que poderão ser usadas a seu favor para obter mais hipertrofia. Barra fixa, sem duvidas a puxada vertical mais eficiente para treinar costas.','2021-05-03 14:51:52','',0),(11,'Pulley atras ','É um dos melhores exercí­cios para treinar o dorsal,pois é um exercí­cio que treina toda a região das costas com eficácia.','2021-05-03 14:56:36','',0),(12,'Remada baixa ','É  um dos melhores exercí­cios de academia para trabalhar costas. Envolvendo diversos músculos, mas principalmente o altí­ssimo do dorso e o trapezio, nas portes inferior e superior,  um treino realizado sentado em um banco de equipamento ou chão.','2021-05-03 15:16:21','',0),(13,'Serrote ','É extremamente útil para trabalhar todos os músculos das costas, é uma opção bastante eficaz para quem quer deixar a região mais forte.','2021-05-03 15:32:52','',0),(14,'Rosca alternada c/ banco inclinado ','Exercí­cio com a coluna em um Ãngulo inclinado, nosso ombro fica em uma posição onde a cabeça longa do bí­ceps pode ser mais ativada,Pesos Livres, para malhar Biceps. ','2021-05-03 15:42:56','',0),(15,'Rosca SDTT barra W','Usando o banco scott, se posicione de uma maneira que as axilas encaixem no topo do apoio dos braços,Segure a barra com as duas mãos usando uma pegada supinada (palmas apontadas para o teto.','2021-05-03 15:47:13','',0),(16,'Rosca direta barra reta ','Em pé, mantenha os pés afastados na largura do quadril e os joelhos levemente flexionados, criando uma base que proporcione bastante estabilidade e equilíbrio\nSegure os halteres (ou a barra) com os braÃ§os estendidos ao lado do tronco.','2021-05-03 15:51:23','',0),(17,'Martelo em pé','É um exercí­cio para os bíceps braquiais, com enfoque maior no braquial e no braquiorradial. Com os antebraços em posição neutra, promove a flexão do forbito, e, devido ao posicionamento dos antebraços, atinge o braquiorradial e o braquial.\n\n','2021-05-03 15:56:50','',0),(18,'Rosca punho ',' É um exercí­cio de treinamento com pesos para o desenvolvimento apenas dos músculos flexores do punho do antebraço.','2021-05-03 16:00:21','',0),(19,'Leg press 45','O Leg Press recruta principalmente três músculos da parte inferior do corpo: quadrí­ceps, glúteos e posteriores, independente da sua posição (45o ou 90, vertical ou horizontal). ','2021-05-03 16:03:43','',0),(20,'Extensor de pernas ','Pode ser feito com as duas pernas juntas ou unilateralmente, ou seja, com uma de cada vez , opção interessante para quem apresenta assimetria entre os membros. Nesse caso, comece o exercí­cio com a perna mais fraca.','2021-05-03 16:08:18','',0),(21,'Flexora sentada','É um equipamento que trabalha os três principais músculos posteriores: o bíceps femoral, os semitendíneo e semimembranoso.','2021-05-03 18:09:38','',0),(22,'Adutora e Abdutora ','Os músculos trabalhados em cada exercí­cio são os internos da coxa para o adutor, glúteos e parte madia da coxa para o abdutor.','2021-05-03 19:10:26','',0),(23,'Exercí­cio Stiff','É Uma variação do tradicional levantamento terra, o stiff é um exercício multiarticular que trabalha principalmente os músculos da parte de trás da coxa (isquiotibiais) e dos glúteos.','2021-05-03 19:14:03','',0),(24,'Desenvolvimento nuca c/ barra ','É um dos melhores exercí­cios para ombros, e costumava ser a base do treino de muitos fisiculturistas desde os anos 50 aos 80, o movimento mais efetivo para desenvolvimento geral dos ombros.','2021-05-03 19:19:44','',0),(25,'Desenvolvimento maquina ','Como fazer: ajuste o banco com a pegada na altura do pescoço. ... Trabalha: peito e braços (peitoral, trí­ceps braquial, delteide anterior).','2021-05-03 19:24:44','',0),(26,'Elevação frontal c/ halteres em pé ','Contribui para melhorar a postura Segundo Puggina, a musculatura do core  acionada durante a execução do exercí­cio de elevação frontal para estabilizar o corpo, contribuindo para a manutenção da postura ereta.','2021-05-03 19:30:50','',0),(27,'Elevação lateral c/ halteres sentado ','Com apenas dois halteres, é possível trabalhar a musculatura dos deltoides de forma multifuncional, eficiente e isolada.','2021-05-03 19:35:27','',0),(28,'Ecolhimento c/ halteres ','Sem flexionar os cotovelos (mantenha os braços retos), encolha os ombros movendo-os em direção das orelhas o máximo que você conseguir.','2021-05-03 19:39:23','',0),(29,'Ecolhimento c/ barra ',' Para executalo, a pessoa permanece ereta, segurando pesos e elevando os ombros o mais alto possí­vel, e posteriormente abaixando os ombros, sem dobrar os cotovelos.','2021-05-03 19:43:05','',0),(30,'1','1','2021-05-04 20:19:15','',0);
/*!40000 ALTER TABLE `exercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treinamento`
--

DROP TABLE IF EXISTS `treinamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treinamento` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `academia` int(11) DEFAULT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `ciclo` int(11) DEFAULT NULL,
  `criacao` datetime DEFAULT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treinamento`
--

LOCK TABLES `treinamento` WRITE;
/*!40000 ALTER TABLE `treinamento` DISABLE KEYS */;
INSERT INTO `treinamento` VALUES (1,1,'semanal Superior/Inferior','treinamento para um asemana alternando a região superior e a inferior',12,NULL,NULL),(2,NULL,'rqwe','were',NULL,'2021-05-04 20:36:36',NULL),(3,NULL,'rqwe','were',NULL,'2021-05-04 20:36:48',NULL),(4,1,'a','3',2,'2021-05-04 21:00:34','ativo');
/*!40000 ALTER TABLE `treinamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treinamento_exercicio`
--

DROP TABLE IF EXISTS `treinamento_exercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `treinamento_exercicio` (
  `codigo` int(11) NOT NULL,
  `treinamento` int(11) DEFAULT NULL,
  `exercicio` int(11) DEFAULT NULL,
  `execucao` varchar(45) DEFAULT NULL,
  `modificacao` datetime DEFAULT NULL,
  `ciclo` int(11) DEFAULT NULL,
  `sequencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treinamento_exercicio`
--

LOCK TABLES `treinamento_exercicio` WRITE;
/*!40000 ALTER TABLE `treinamento_exercicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `treinamento_exercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `telefone_a` varchar(45) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `telefone_b` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'daniel','1','a@a.a','instrutor','1','ativo','23452345','masculino','Rua das laranjas','20','ortaliças','(83)94551-45127','Avantasya','HU','2021-04-28 20:45:57'),(2,'chiclete nilson','2','chicletenilson@dannke.com.br','aluno','2','ativo','(83)94551-45127','masculino','Ra das oliveiras','19','Pomar II','(84)94551-45127','Avantasya','HU','2021-04-28 20:45:57'),(3,'ERW','','','aluno','',NULL,'','','','','','','','','2021-04-28 20:45:57'),(4,'ERW','','','aluno','',NULL,'','','','','','','','','2021-04-28 20:45:57'),(5,'ERW','','','aluno','',NULL,'','','','','','','','','2021-04-28 20:45:57'),(6,'ERW','','','aluno','',NULL,'','','','','','','','','2021-04-28 20:45:57'),(7,'dfasdf','','','aluno','',NULL,'','','','','','','','','2021-04-28 21:21:52'),(8,'dfasdf','','','aluno','',NULL,'','','','','','','','','2021-04-28 21:22:35'),(9,'dfasdf','','','aluno','',NULL,'','','','','','','','','2021-04-28 21:22:46'),(10,'','','','aluno','',NULL,'','','','','','','','','2021-04-29 07:03:36');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_sessao`
--

DROP TABLE IF EXISTS `usuario_sessao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_sessao` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `chave` varchar(45) DEFAULT NULL,
  `inicio` datetime DEFAULT NULL,
  `fim` datetime DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_sessao`
--

LOCK TABLES `usuario_sessao` WRITE;
/*!40000 ALTER TABLE `usuario_sessao` DISABLE KEYS */;
INSERT INTO `usuario_sessao` VALUES (1,'1538c8df0aebf10ee724474c211d6125','2021-04-28 07:15:43','2021-04-28 07:15:43',1,'127.0.0.1'),(2,'168ce28c0c98222e82ac8bce2ee8cd4f','2021-04-28 07:16:27','2021-04-28 07:16:27',1,'127.0.0.1'),(3,'84d5711e9bf5547001b765878e7b0157','2021-04-28 07:19:58','2021-04-28 07:19:58',1,'127.0.0.1'),(4,'b303f1f8667ecd2acb460f3bd007b0cd','2021-04-28 07:20:30','2021-04-28 07:20:30',1,'127.0.0.1'),(5,'4544d6a4d7a89b2de7028b45665bfb22','2021-04-28 07:30:56','2021-04-28 07:30:56',1,'127.0.0.1'),(6,'9e4745a6b2bdebae79fa8fbe2c83b7ca','2021-04-28 07:33:57','2021-04-28 07:33:57',1,'127.0.0.1'),(7,'7e9e346dc5fd268b49bf418523af8679','2021-04-28 07:36:34','2021-04-28 07:36:34',1,'127.0.0.1'),(8,'f8f9598f6a0162869a295bfc0e071808','2021-04-28 07:37:36','2021-04-28 07:37:36',1,'127.0.0.1'),(9,'cde25924c81e91e3816e06daa2af64d2','2021-04-28 18:56:28','2021-04-28 18:56:28',1,'127.0.0.1'),(10,'77a850d89cdaa5160fb628511b3df4fe','2021-04-28 19:11:27','2021-04-28 19:11:27',1,'127.0.0.1'),(11,'9b2f00f37307f2c2f372acafe55843f3','2021-04-28 19:12:52','2021-04-28 19:12:52',1,'127.0.0.1'),(12,'edce8275af04346c54d96752b7a6967d','2021-04-28 19:13:19','2021-04-28 19:13:19',1,'127.0.0.1'),(13,'4b602c3f2f6b86b43ad406fd438e09a8','2021-04-28 19:13:46','2021-04-28 19:13:46',1,'127.0.0.1'),(14,'de50d8a65609dfbde44e3a3e4339d4e3','2021-04-28 19:15:01','2021-04-28 19:15:01',1,'127.0.0.1'),(15,'9f101af9ef29de5f699b27fefc3f80c5','2021-04-28 19:15:45','2021-04-28 19:15:45',1,'127.0.0.1'),(16,'2bb0f07c9210a4140f058b7a495cf40b','2021-04-28 19:16:39','2021-04-28 19:16:39',1,'127.0.0.1'),(17,'cb3eb1c03124971d2e00636afd54b927','2021-04-28 19:16:51','2021-04-28 19:16:51',1,'127.0.0.1'),(18,'11dd255345278f3db16390f7012f9a9f','2021-04-28 19:23:04','2021-04-28 19:23:04',1,'127.0.0.1'),(19,'eac0f24827823412697e3f5a2fba42c6','2021-04-28 19:23:47','2021-04-28 19:23:47',1,'127.0.0.1'),(20,'6b4e2b9376139fa09a68b94ec04dbe94','2021-04-28 19:24:55','2021-04-28 19:24:55',1,'127.0.0.1'),(21,'5a252e3478deb69ef6b8bf04d8ea8801','2021-04-28 19:25:41','2021-04-28 19:25:41',1,'127.0.0.1'),(22,'99e0f825cbd831777e23f1abda4fa026','2021-04-28 19:26:50','2021-04-28 19:26:50',1,'127.0.0.1'),(23,'a14b41e17a052ed55577f73ef2600c80','2021-04-28 19:27:21','2021-04-28 19:27:21',1,'127.0.0.1'),(24,'da96aeb0f0ce156212d1d399ede43b91','2021-04-28 19:27:34','2021-04-28 19:27:34',1,'127.0.0.1'),(25,'004663935332a4c69707fcc63359a5d9','2021-04-28 19:27:48','2021-04-28 19:27:48',1,'127.0.0.1'),(26,'c2e1d78eb1b2765ceab9feaf7a1577bc','2021-04-28 19:29:10','2021-04-28 19:29:10',1,'127.0.0.1'),(27,'26cecc494fd86b7c4629b54764919e0e','2021-04-28 19:48:44','2021-04-28 19:48:44',1,'127.0.0.1'),(28,'492c70709b88c627f6fb591f77245caf','2021-04-28 20:05:45','2021-04-28 20:05:45',1,'127.0.0.1'),(29,'4ecf37504dae3f5af806a4f449aa6b95','2021-04-28 20:05:59','2021-04-28 20:05:59',1,'127.0.0.1'),(30,'d578dff3af001e1dbe58b2495ffd27a5','2021-04-28 20:07:11','2021-04-28 20:07:11',1,'127.0.0.1'),(31,'8d43936dac7099f479a0fc5b7b8004bd','2021-04-28 20:21:43','2021-04-28 20:21:43',1,'127.0.0.1'),(32,'2eaa709bdeb09171fe1906ed91b997c9','2021-04-28 20:25:50','2021-04-28 20:25:50',1,'127.0.0.1'),(33,'b0fbbc6c5edcfb70dd7d5a403799545a','2021-04-28 20:26:38','2021-04-28 20:26:38',1,'127.0.0.1'),(34,'13ac4794fba160f98bf694fdf632f3e6','2021-04-29 06:11:26','2021-04-29 06:11:26',1,'127.0.0.1'),(35,'51886698094652b7ca84c0450973a104','2021-04-29 06:34:57','2021-04-29 06:34:57',1,'127.0.0.1'),(36,'2f09f8cd56fb855ccd0ef1da3f701c2a','2021-04-29 06:41:21','2021-04-29 06:41:21',1,'127.0.0.1'),(37,'1e34cb4d4fb53feef4ccd0dcce4053a0','2021-04-29 06:45:55','2021-04-29 06:45:55',1,'127.0.0.1'),(38,'4b5d3a2835660b72d416ca0c4debeb80','2021-04-29 06:47:55','2021-04-29 06:47:55',1,'127.0.0.1'),(39,'0f851295b7439f9357fb4279b4f4877d','2021-04-29 06:49:00','2021-04-29 06:49:00',1,'127.0.0.1'),(40,'583a55af0b6af1f0331a0afba1b89d47','2021-04-29 06:57:15','2021-04-29 06:57:15',1,'127.0.0.1'),(41,'e0809a33a13465d22ee05c351d6804d8','2021-04-29 07:01:17','2021-04-29 07:01:17',1,'127.0.0.1'),(42,'44e869d747d5d28552c406b0a12c8140','2021-04-29 07:02:05','2021-04-29 07:02:05',1,'127.0.0.1'),(43,'93edf7bf7a6fb5b7f752eee3a9e25fda','2021-04-29 07:03:07','2021-04-29 07:03:07',1,'127.0.0.1'),(44,'08d99c2a9c63dcbdca667247a8118946','2021-04-29 07:12:01','2021-04-29 07:12:01',1,'127.0.0.1'),(45,'d1a172da7b0b434e1f686eb0b6c89f22','2021-04-29 07:13:45','2021-04-29 07:13:45',1,'127.0.0.1'),(46,'e97ee2054defb209c35fe4dc94599061','2021-04-29 07:15:19','2021-04-29 07:15:19',1,'127.0.0.1'),(47,'e8a6f9224cc383ba6023c1a20c3fa846','2021-04-29 07:21:58','2021-04-29 07:21:58',1,'127.0.0.1'),(48,'7eb9725952243c29fc7eb9b9e8613533','2021-04-29 07:25:53','2021-04-29 07:25:53',1,'127.0.0.1'),(49,'bbd7eeeb50e0b21a37de09586098487d','2021-04-29 07:39:06','2021-04-29 07:39:06',1,'127.0.0.1'),(50,'6b6601fd55e22c1aaea731f00d9693ea','2021-04-29 07:42:49','2021-04-29 07:42:49',1,'127.0.0.1'),(51,'c8b5c2f0e8a65fcf6717d7ec3ec2a5f3','2021-04-29 07:44:24','2021-04-29 07:44:24',1,'127.0.0.1'),(52,'003f355bdf7b19867e95fd874a8a01c3','2021-04-29 07:45:32','2021-04-29 07:45:32',1,'127.0.0.1'),(53,'96090486e114c347bc4a9b2c68447b13','2021-04-29 07:55:20','2021-04-29 07:55:20',1,'127.0.0.1'),(54,'309ab031d63a7de6ba31b2b9ddd384ca','2021-04-29 18:17:06','2021-04-29 18:17:06',1,'127.0.0.1'),(55,'2dcb1a22b4c43f8bf00a58ae1666da10','2021-04-29 19:05:12','2021-04-29 19:05:12',1,'127.0.0.1'),(56,'f486df29e293716311b758115419d291','2021-04-29 19:50:25','2021-04-29 19:50:25',1,'127.0.0.1'),(57,'c8a9653d1420fdf8683ffe83dd5571fd','2021-04-29 19:50:50','2021-04-29 19:50:50',1,'127.0.0.1'),(58,'0198cb1dbe070fa3dae66a0d252ff110','2021-04-29 19:53:17','2021-04-29 19:53:17',1,'127.0.0.1'),(59,'451b7053cb6d6b49ce21b918c2946122','2021-04-29 19:54:29','2021-04-29 19:54:29',1,'127.0.0.1'),(60,'5a98da640ec400d67adb408d22ce5c9c','2021-04-29 19:54:43','2021-04-29 19:54:43',1,'127.0.0.1'),(61,'9778b12b19f4ec9321e79b27760ccba4','2021-04-29 19:57:01','2021-04-29 19:57:01',1,'127.0.0.1'),(62,'be9e47ef1ac42972d5bee9836c8c7b73','2021-04-29 19:57:37','2021-04-29 19:57:37',1,'127.0.0.1'),(63,'8d0f5d6a93ecadf520e0de4d1327e8cf','2021-04-29 19:58:43','2021-04-29 19:58:43',1,'127.0.0.1'),(64,'1d4e3e81d1c05f78f91f7919bb25e146','2021-04-29 20:00:01','2021-04-29 20:00:01',1,'127.0.0.1'),(65,'31351033f15e55fb4e0a580900a20798','2021-04-29 20:01:18','2021-04-29 20:01:18',1,'127.0.0.1'),(66,'5df07ecf4cea616e3eb384a9be3511bb','2021-04-29 20:05:20','2021-04-29 20:05:20',1,'127.0.0.1'),(67,'eb8b3f500d12feabec90994f03f12225','2021-04-29 20:07:15','2021-04-29 20:07:15',1,'127.0.0.1'),(68,'7edab44433b89ebd27054678e580c4ed','2021-04-29 20:07:55','2021-04-29 20:07:55',1,'127.0.0.1'),(69,'1a31aaaf27f626c9aff336bb73892b0c','2021-04-29 20:12:03','2021-04-29 20:12:03',1,'127.0.0.1'),(70,'672d30ab508237ac28b92c3472c56688','2021-04-29 20:12:55','2021-04-29 20:12:55',1,'127.0.0.1'),(71,'ca641261a6223e325ae2923e47bed0c6','2021-04-29 20:14:02','2021-04-29 20:14:02',1,'127.0.0.1'),(72,'a4111706bdc4b0445173f69f8418889b','2021-04-29 20:15:12','2021-04-29 20:15:12',1,'127.0.0.1'),(73,'d598beb2b1fbafe0816651791eb095bd','2021-04-29 20:15:39','2021-04-29 20:15:39',1,'127.0.0.1'),(74,'981bee7c65dd8ee2594a316f5ec49fdc','2021-04-29 20:16:19','2021-04-29 20:16:19',1,'127.0.0.1'),(75,'02ed6cade70953f64d71903495c72c52','2021-04-29 20:24:09','2021-04-29 20:24:09',1,'127.0.0.1'),(76,'0d8f5f8b93367f1204d54ce42c064282','2021-04-29 20:24:51','2021-04-29 20:24:51',1,'127.0.0.1'),(77,'dec10b88cc06710761eb89aad2ed4a66','2021-04-29 20:26:59','2021-04-29 20:26:59',1,'127.0.0.1'),(78,'c9fef0f5571c58ecd8c845e3b0f4b7f7','2021-04-29 20:28:11','2021-04-29 20:28:11',1,'127.0.0.1'),(79,'ba712297c122d43526171914f56a6d23','2021-04-29 20:29:42','2021-04-29 20:29:42',1,'127.0.0.1'),(80,'615299acbbac3e21302bbc435091ad9f','2021-04-29 20:45:47','2021-04-29 20:45:47',1,'127.0.0.1'),(81,'1a8250dfb843450fe5efeda7989a5152','2021-04-29 20:46:07','2021-04-29 20:46:07',1,'127.0.0.1'),(82,'058fdbe834adefd41a4ec2adbd4dafa2','2021-04-29 20:47:14','2021-04-29 20:47:14',1,'127.0.0.1'),(83,'1a05ca2dc329c649941d27b3453522d1','2021-04-29 20:48:42','2021-04-29 20:48:42',1,'127.0.0.1'),(84,'08a94fbf5cc10b07b48b504b30ddf3a9','2021-04-29 20:49:20','2021-04-29 20:49:20',1,'127.0.0.1'),(85,'fa5cca4a225bbc66d06943e6ece245fb','2021-04-29 20:54:09','2021-04-29 20:54:09',1,'127.0.0.1'),(86,'ea3390688bb747e16ff14da7c55c03c2','2021-04-29 20:54:20','2021-04-29 20:54:20',1,'127.0.0.1'),(87,'a971aa6c548816f079cbd4023ff5847c','2021-04-29 21:06:45','2021-04-29 21:06:45',1,'127.0.0.1'),(88,'e3e0204507e4c3ef23daaea89ede1e98','2021-04-29 21:07:17','2021-04-29 21:07:17',1,'127.0.0.1'),(89,'20f0cadb747cc68b82264b3a2741dc5d','2021-04-29 21:07:33','2021-04-29 21:07:33',1,'127.0.0.1'),(90,'aabd96dab37bb9ef8037fd9ea787413c','2021-04-29 21:08:37','2021-04-29 21:08:37',1,'127.0.0.1'),(91,'d8898a387d0ca24af78043c1a0ac2e2e','2021-04-29 21:12:06','2021-04-29 21:12:06',1,'127.0.0.1'),(92,'b459a0762f4fbcb0ab8e4a442f95f264','2021-04-29 21:18:29','2021-04-29 21:18:29',1,'127.0.0.1'),(93,'5deccbf5a3d92c02dbb5a08d9f296e5e','2021-04-29 21:19:26','2021-04-29 21:19:26',1,'127.0.0.1'),(94,'ce55cbc796fb84762b44425efb023c45','2021-04-29 21:20:21','2021-04-29 21:20:21',1,'127.0.0.1'),(95,'1a690bb90c1bca309ce4a0dce6aaf2af','2021-04-29 21:21:25','2021-04-29 21:21:25',1,'127.0.0.1'),(96,'7b8fac333fe4ec9b044a8a64829a9e4b','2021-04-29 21:22:30','2021-04-29 21:22:30',1,'127.0.0.1'),(97,'6de7c6c7a4ed71264211cc8f1d893034','2021-04-30 07:02:27','2021-04-30 07:02:27',1,'127.0.0.1'),(98,'b14ab0d0ebc833c6c7fa8dbf9b8e4b34','2021-04-30 07:07:01','2021-04-30 07:07:01',1,'127.0.0.1'),(99,'91d90706d85ab8a6b3cc8f6ab14a5449','2021-04-30 07:08:57','2021-04-30 07:08:57',1,'127.0.0.1'),(100,'02fb8db26a38bd5afff01dbc9a821526','2021-04-30 07:11:29','2021-04-30 07:11:29',1,'127.0.0.1'),(101,'c09b1eadea0efc7914f73ac698494b5e','2021-04-30 07:16:42','2021-04-30 07:16:42',1,'127.0.0.1'),(102,'3d44e8d90c2537e430a22aa71b868ba5','2021-04-30 07:17:40','2021-04-30 07:17:40',1,'127.0.0.1'),(103,'1ef7855dca06f8ea61f489e0d7ac3abd','2021-04-30 07:22:14','2021-04-30 07:22:14',1,'127.0.0.1'),(104,'59d9b46aa00c70238bb89056cfeb96c0','2021-04-30 07:23:31','2021-04-30 07:23:31',1,'127.0.0.1'),(105,'8bb6a7dd9b3ed22aa8a32c849522d47c','2021-04-30 07:25:06','2021-04-30 07:25:06',1,'127.0.0.1'),(106,'8f31ac798bc167ebc855966b56adc38a','2021-04-30 07:26:20','2021-04-30 07:26:20',1,'127.0.0.1'),(107,'220d2ffdcebbeed6d73189259ff8b541','2021-04-30 07:27:12','2021-04-30 07:27:12',1,'127.0.0.1'),(108,'16aa890c2372f675dd31f90375e76f3e','2021-04-30 07:27:42','2021-04-30 07:27:42',1,'127.0.0.1'),(109,'04beb026201ce4b3261d8d6f182e1e9a','2021-04-30 07:28:30','2021-04-30 07:28:30',1,'127.0.0.1'),(110,'54391c872fe1c8b4f98095c5d6ec7ec7','2021-04-30 07:39:40','2021-04-30 07:39:40',1,'127.0.0.1'),(111,'cf33956383adaf54f857b5e5c98faa4d','2021-04-30 07:43:03','2021-04-30 07:43:03',1,'127.0.0.1'),(112,'cfbf071cefe41f60b03acddffb50d1d1','2021-04-30 07:48:33','2021-04-30 07:48:33',1,'127.0.0.1'),(113,'08d1f987088a9b149b0c4a8fdeaae373','2021-04-30 12:09:01','2021-04-30 12:09:01',1,'127.0.0.1'),(114,'4dadd1c9700b53cc3022d2c0e204e6fb','2021-04-30 12:11:36','2021-04-30 12:11:36',1,'127.0.0.1'),(115,'46ddea6eb6927763a283e3e2796d1fa3','2021-04-30 12:20:46','2021-04-30 12:20:46',1,'127.0.0.1'),(116,'43839c515549e961f047ee8fe931b87c','2021-04-30 12:22:43','2021-04-30 12:22:43',1,'127.0.0.1'),(117,'91477b8469d4c94712a23e4660b1f0d4','2021-04-30 12:27:50','2021-04-30 12:27:50',1,'127.0.0.1'),(118,'224cb4eb1bee06f30f34b3fef9035af2','2021-04-30 12:33:18','2021-04-30 12:33:18',1,'127.0.0.1'),(119,'2fedf3d2f2a7c73b788df58f35266943','2021-04-30 13:11:44','2021-04-30 13:11:44',1,'127.0.0.1'),(120,'2a7550fa14704e90f8a12992cf7499bb','2021-05-01 16:31:15','2021-05-01 16:31:15',1,'127.0.0.1'),(121,'e4acae0a556f8ca98977ec7a9510f924','2021-05-02 16:45:13','2021-05-02 16:45:13',1,'127.0.0.1'),(122,'56e5c8871c5515b66790ded9040d6d13','2021-05-02 17:01:43','2021-05-02 17:01:43',1,'127.0.0.1'),(123,'df24c5f7d15a659cce7b5b70077c372f','2021-05-02 17:08:17','2021-05-02 17:08:17',1,'127.0.0.1'),(124,'a406cbbb38303187f0a2301f4266a96b','2021-05-02 17:09:07','2021-05-02 17:09:07',1,'127.0.0.1'),(125,'3c639e79a3f85a98c02bbbfe1c6b4426','2021-05-02 17:11:08','2021-05-02 17:11:08',1,'127.0.0.1'),(126,'a2c49962ab5fdf70fd33f1a20bd5462c','2021-05-02 17:12:23','2021-05-02 17:12:23',1,'127.0.0.1'),(127,'22ed9cda50780af98618b8b70557d397','2021-05-02 17:41:12','2021-05-02 17:41:12',1,'127.0.0.1'),(128,'59606776e5597e5e07fc0313abca044e','2021-05-02 17:45:59','2021-05-02 17:45:59',1,'127.0.0.1'),(129,'021aade7f64ef80558dcf82f31aa1ba9','2021-05-03 13:08:07','2021-05-03 13:08:07',1,'127.0.0.1'),(130,'3307b970e12bfaad5891fe14a412fc33','2021-05-03 13:13:18','2021-05-03 13:13:18',1,'127.0.0.1'),(131,'f6cc219be203da6b94b2ac186d991a96','2021-05-03 18:14:09','2021-05-03 18:14:09',1,'127.0.0.1'),(132,'9526fe47fec9a6b3d8d8c2cf529a5352','2021-05-03 19:04:06','2021-05-03 19:04:06',1,'127.0.0.1'),(133,'48bf5b1d0ad653e298fa208c639547de','2021-05-04 07:25:31','2021-05-04 07:25:31',1,'127.0.0.1'),(134,'aa2a9171aa65211d14cd7df752830a70','2021-05-04 19:36:08','2021-05-04 19:36:08',1,'127.0.0.1'),(135,'8f07ccc38d8e65c82454f89dda05b5d1','2021-05-04 19:38:32','2021-05-04 19:38:32',1,'127.0.0.1'),(136,'45ab092a5990dcce61e606f64873a98f','2021-05-04 19:39:07','2021-05-04 19:39:07',1,'127.0.0.1'),(137,'b69eb2fe74a927f6b5397851c6f2abc4','2021-05-04 19:40:34','2021-05-04 19:40:34',1,'127.0.0.1'),(138,'6d0c030f52b11af623a613e5cfbbe703','2021-05-04 19:41:28','2021-05-04 19:41:28',1,'127.0.0.1'),(139,'4caf9194db3ccbfdde140984f5dcd09a','2021-05-04 19:42:03','2021-05-04 19:42:03',1,'127.0.0.1'),(140,'4c42b6064594613070a2e9aa8f5ef4f5','2021-05-04 19:43:31','2021-05-04 19:43:31',1,'127.0.0.1'),(141,'b82deb2eca208f36fa4231ec25c3239c','2021-05-04 19:43:44','2021-05-04 19:43:44',1,'127.0.0.1'),(142,'6afb69ea0a51d08167e4a3edb0f295a9','2021-05-04 19:44:53','2021-05-04 19:44:53',1,'127.0.0.1'),(143,'a77108c8f4ffb274a4d438f2bebf203e','2021-05-04 19:47:54','2021-05-04 19:47:54',1,'127.0.0.1'),(144,'cf739a6fb9b026e331af4d7d5dc1690b','2021-05-04 19:50:15','2021-05-04 19:50:15',1,'127.0.0.1'),(145,'89d47a0b3a3c7f806b6e4a2922f4198b','2021-05-04 19:53:52','2021-05-04 19:53:52',1,'127.0.0.1'),(146,'5e352e75ca40d1a5c6053848a6abfc79','2021-05-04 19:55:51','2021-05-04 19:55:51',1,'127.0.0.1'),(147,'cb3eeccae6c6412bc95cf21515e3b9be','2021-05-04 20:01:38','2021-05-04 20:01:38',1,'127.0.0.1'),(148,'2e02f2c80b6bbef20e6daed1f8717727','2021-05-04 20:03:01','2021-05-04 20:03:01',1,'127.0.0.1'),(149,'e95783bfc83c3e5da327a4cc41ca2b6e','2021-05-04 20:07:17','2021-05-04 20:07:17',1,'127.0.0.1'),(150,'355eb7f0334516be742fe1aa0db5ddf2','2021-05-04 20:11:43','2021-05-04 20:11:43',1,'127.0.0.1'),(151,'cec1dd3cfbf7dc12ba7a0b2018307672','2021-05-04 20:12:16','2021-05-04 20:12:16',1,'127.0.0.1'),(152,'b55c86af1c55672a8792354910cd548d','2021-05-04 20:16:55','2021-05-04 20:16:55',1,'127.0.0.1'),(153,'f63ce7605eafcf21b7418e46b1e6cb1b','2021-05-04 20:18:34','2021-05-04 20:18:34',1,'127.0.0.1'),(154,'9b9b05072dd20d1cc3e54607b84c889b','2021-05-04 20:22:34','2021-05-04 20:22:34',1,'127.0.0.1'),(155,'3ca316aaccc55d2d24eadbacb0e3f7b8','2021-05-04 20:25:34','2021-05-04 20:25:34',1,'127.0.0.1'),(156,'afe94a7477e839592d7b9e1ab74af30d','2021-05-04 20:42:30','2021-05-04 20:42:30',1,'127.0.0.1'),(157,'c7469c4df468eec7bde5bd887d2256f5','2021-05-04 20:50:02','2021-05-04 20:50:02',1,'127.0.0.1'),(158,'4971422f0edad690a871ff4d220367d2','2021-05-04 20:54:26','2021-05-04 20:54:26',1,'127.0.0.1'),(159,'606fb767f497db64d190d0fad78bd92e','2021-05-04 20:55:13','2021-05-04 20:55:13',1,'127.0.0.1'),(160,'037d1b5450c4d1d4d7657ddc96511a8d','2021-05-04 21:00:21','2021-05-04 21:00:21',1,'127.0.0.1'),(161,'4c66a14bd7866ce4e2691c7271314820','2021-05-04 21:03:43','2021-05-04 21:03:43',1,'127.0.0.1'),(162,'083b8170e8bcb3639297229b000b39b6','2021-05-04 21:04:15','2021-05-04 21:04:15',1,'127.0.0.1'),(163,'1e8adfa361924d22ead31805d918876b','2021-05-04 21:04:32','2021-05-04 21:04:32',1,'127.0.0.1'),(164,'e4d389f76e3864155803e570df25c060','2021-05-05 07:44:28','2021-05-05 07:44:28',1,'127.0.0.1'),(165,'f9fb41a0d0f37521a3f8e03543fa30ed','2021-05-05 07:47:05','2021-05-05 07:47:05',1,'127.0.0.1'),(166,'9eb00221d882cdb5f920819f765bae61','2021-05-05 07:49:10','2021-05-05 07:49:10',1,'127.0.0.1'),(167,'9695cf2656221fc6559ab9ed82a1e3c6','2021-05-05 20:25:21','2021-05-05 20:25:21',1,'127.0.0.1'),(168,'9edfffd3afa1ec1757b183186c91fd2e','2021-05-05 21:28:45','2021-05-05 21:28:45',1,'127.0.0.1'),(169,'39357dcaf752cdb27e3ed3b6de0852fb','2021-05-06 00:12:02','2021-05-06 00:12:02',1,'127.0.0.1'),(170,'0336bd1dbe5c5e94786d651ee61fbd88','2021-05-06 00:14:09','2021-05-06 00:14:09',1,'127.0.0.1'),(171,'ab394d02d9f7f2a94129e98f481f52f0','2021-05-06 00:14:58','2021-05-06 00:14:58',1,'127.0.0.1'),(172,'7bfd6267540d750de90a2364bb592d45','2021-05-06 00:46:10','2021-05-06 00:46:10',1,'127.0.0.1'),(173,'d7c269a4e84c62ebe4a62f84ae201699','2021-05-06 01:31:45','2021-05-06 01:31:45',1,'127.0.0.1'),(174,'7b491515a8a18a1932e257f20c9bce6f','2021-05-06 01:35:06','2021-05-06 01:35:06',1,'127.0.0.1'),(175,'035701cb6f67d72e512dd8dac620b893','2021-05-06 01:36:17','2021-05-06 01:36:17',1,'127.0.0.1');
/*!40000 ALTER TABLE `usuario_sessao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-06  6:45:58
