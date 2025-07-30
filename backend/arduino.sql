-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lip 06, 2025 at 04:38 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arduino`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `worker` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `worker`, `login`, `password`, `admin`) VALUES
(5, 4, 'jano', 'asdw', 1),
(8, 7, 'janoa', '$2b$13$uuv2zrYSh8K/kdFtJkFfBe0M51GAt.n.1.EAysetwMFP8C70KkgXG', 1),
(9, 6, 'kacper', 'aaaaa', 0),
(10, 6, 'ziomek', '$2b$13$VkZow59U6PX3A3GMoTtIn.J7AhkZtucC0QgARtLtPIGjEl2dTzZya', 0),
(11, 4, 'test', '$2b$13$kry/sHLSGGdJSbRmz0uPP.H/ZKNzyGOS/z6wgVhSgWEOE2CjevTLe', 0),
(12, 6, 'test2', '$2b$13$Ph1d0WKqMszLIroEPC.QlOtAihbQxSEVfS1lddkLxineItym6/bMS', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `card` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `name`, `surname`, `card`, `status`) VALUES
(4, 'janek', 'piskwa', ' 29 A4 D7 C2', 0),
(5, 'kacper', 'topolski', ' 7A 07 71 C1', 1),
(6, 'siema', 'eniu', ' 4A 4E 0C C1', 1),
(7, 'ivan', 'malutki', ' 6A 88 4F C1', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `working_time`
--

CREATE TABLE `working_time` (
  `id` int(11) NOT NULL,
  `worker` int(11) NOT NULL,
  `time_in` time NOT NULL,
  `time_out` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `working_time`
--

INSERT INTO `working_time` (`id`, `worker`, `time_in`, `time_out`, `date`) VALUES
(1, 4, '06:00:00', '06:00:00', '2025-04-24'),
(2, 5, '06:00:00', '04:00:00', '2025-04-24'),
(3, 6, '06:00:00', '16:27:05', '2025-04-05'),
(7, 4, '08:57:12', '09:31:49', '2025-04-26'),
(13, 4, '20:19:04', '20:19:05', '2025-06-16'),
(14, 4, '09:33:22', '13:01:35', '2025-06-18'),
(15, 4, '09:39:51', '13:01:35', '2025-06-18'),
(16, 4, '13:01:19', '13:01:35', '2025-06-18'),
(17, 4, '15:45:41', '17:28:24', '2025-06-20'),
(18, 4, '17:10:20', '17:28:24', '2025-06-20'),
(19, 4, '17:10:22', '17:28:24', '2025-06-20'),
(20, 4, '17:10:30', '17:28:24', '2025-06-20'),
(21, 4, '17:10:36', '17:28:24', '2025-06-20'),
(22, 4, '17:15:51', '17:28:24', '2025-06-20'),
(23, 4, '17:17:23', '17:28:24', '2025-06-20'),
(24, 4, '17:17:25', '17:28:24', '2025-06-20'),
(25, 4, '17:18:36', '17:28:24', '2025-06-20'),
(26, 4, '17:19:23', '17:28:24', '2025-06-20'),
(27, 4, '17:21:15', '17:28:24', '2025-06-20'),
(28, 4, '17:22:51', '17:28:24', '2025-06-20'),
(29, 4, '17:28:14', '17:28:24', '2025-06-20'),
(30, 4, '17:28:23', '17:28:24', '2025-06-20'),
(31, 4, '17:28:25', '00:00:00', '2025-06-20'),
(32, 4, '18:46:04', '23:11:35', '2025-06-23'),
(33, 4, '18:46:36', '23:11:35', '2025-06-23'),
(34, 4, '18:47:35', '23:11:35', '2025-06-23'),
(35, 4, '18:47:40', '23:11:35', '2025-06-23'),
(36, 4, '18:48:38', '23:11:35', '2025-06-23'),
(37, 4, '18:49:15', '23:11:35', '2025-06-23'),
(38, 4, '18:49:16', '23:11:35', '2025-06-23'),
(39, 4, '18:51:11', '23:11:35', '2025-06-23'),
(40, 4, '18:53:27', '23:11:35', '2025-06-23'),
(41, 4, '18:53:49', '23:11:35', '2025-06-23'),
(42, 4, '18:53:49', '23:11:35', '2025-06-23'),
(43, 4, '18:54:36', '23:11:35', '2025-06-23'),
(44, 4, '18:54:37', '23:11:35', '2025-06-23'),
(45, 4, '18:54:54', '23:11:35', '2025-06-23'),
(46, 4, '18:55:11', '23:11:35', '2025-06-23'),
(47, 4, '18:56:39', '23:11:35', '2025-06-23'),
(48, 4, '18:56:49', '23:11:35', '2025-06-23'),
(49, 4, '18:57:11', '23:11:35', '2025-06-23'),
(50, 5, '20:50:07', '23:11:35', '2025-06-23'),
(51, 5, '20:50:52', '23:11:35', '2025-06-23'),
(52, 5, '20:55:03', '23:11:35', '2025-06-23'),
(53, 5, '20:57:56', '23:11:35', '2025-06-23'),
(54, 5, '21:01:25', '23:11:35', '2025-06-23'),
(55, 5, '21:02:12', '23:11:35', '2025-06-23'),
(56, 5, '21:02:16', '23:11:35', '2025-06-23'),
(57, 5, '21:03:15', '23:11:35', '2025-06-23'),
(58, 5, '21:03:20', '23:11:35', '2025-06-23'),
(59, 5, '21:06:03', '23:11:35', '2025-06-23'),
(60, 5, '21:06:04', '23:11:35', '2025-06-23'),
(61, 5, '21:06:05', '23:11:35', '2025-06-23'),
(62, 5, '21:06:07', '23:11:35', '2025-06-23'),
(63, 5, '21:25:36', '23:11:35', '2025-06-23'),
(64, 5, '21:25:38', '23:11:35', '2025-06-23'),
(65, 5, '21:25:39', '23:11:35', '2025-06-23'),
(66, 5, '21:50:36', '23:11:35', '2025-06-23'),
(67, 5, '21:50:37', '23:11:35', '2025-06-23'),
(68, 5, '21:50:39', '23:11:35', '2025-06-23'),
(69, 5, '21:50:40', '23:11:35', '2025-06-23'),
(70, 5, '21:50:41', '23:11:35', '2025-06-23'),
(71, 5, '21:50:41', '23:11:35', '2025-06-23'),
(72, 5, '21:50:44', '23:11:35', '2025-06-23'),
(73, 5, '21:53:19', '23:11:35', '2025-06-23'),
(74, 5, '21:53:23', '23:11:35', '2025-06-23'),
(75, 5, '21:53:26', '23:11:35', '2025-06-23'),
(76, 5, '21:53:28', '23:11:35', '2025-06-23'),
(77, 4, '23:11:22', '23:11:35', '2025-06-23'),
(78, 4, '23:11:24', '23:11:35', '2025-06-23'),
(79, 4, '23:11:26', '23:11:35', '2025-06-23'),
(80, 4, '23:11:30', '23:15:35', '2025-06-23'),
(81, 4, '23:11:34', '23:11:35', '2025-06-23'),
(82, 7, '11:44:34', '11:45:52', '2025-06-24'),
(83, 6, '11:44:38', '11:45:52', '2025-06-24'),
(84, 4, '11:45:07', '11:45:52', '2025-06-24'),
(85, 5, '11:45:53', '00:00:00', '2025-06-24'),
(86, 6, '19:28:52', '19:28:55', '2025-06-26'),
(87, 6, '19:28:53', '19:28:55', '2025-06-26'),
(88, 6, '19:28:55', '19:28:55', '2025-06-26'),
(89, 6, '21:25:30', '00:00:00', '2025-06-26');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker` (`worker`);

--
-- Indeksy dla tabeli `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `working_time`
--
ALTER TABLE `working_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker` (`worker`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `working_time`
--
ALTER TABLE `working_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`worker`) REFERENCES `workers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `working_time`
--
ALTER TABLE `working_time`
  ADD CONSTRAINT `working_time_ibfk_1` FOREIGN KEY (`worker`) REFERENCES `workers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
