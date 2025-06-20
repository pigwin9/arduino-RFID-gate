-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 20, 2025 at 09:25 AM
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
  `password` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `worker`, `login`, `password`, `admin`) VALUES
(5, 4, 'jano', 'asdw', 1);

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
(5, 'kacper', 'topolski', '', 0),
(6, 'siema', 'eniu', '', 0);

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
(16, 4, '13:01:19', '13:01:35', '2025-06-18');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `working_time`
--
ALTER TABLE `working_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
