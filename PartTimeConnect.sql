-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2026 at 07:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `partconnectdb`
--
CREATE DATABASE IF NOT EXISTS `partconnectdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `partconnectdb`;

-- --------------------------------------------------------

--
-- Table structure for table `applied_job`
--

CREATE TABLE `applied_job` (
  `applied_jobid` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `provider_name` int(11) NOT NULL,
  `company_name` varchar(30) NOT NULL,
  `applied_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applied_job`
--

INSERT INTO `applied_job` (`applied_jobid`, `seeker_id`, `job_id`, `provider_name`, `company_name`, `applied_date`) VALUES
(51, 19, 31, 35, 'Sithafal', '2026-07-27');

-- --------------------------------------------------------

--
-- Table structure for table `hired`
--

CREATE TABLE `hired` (
  `hired_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `hired_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hired`
--

INSERT INTO `hired` (`hired_id`, `job_id`, `provider_id`, `seeker_id`, `hired_at`) VALUES
(30, 31, 35, 19, '2026-08-23');

-- --------------------------------------------------------

--
-- Table structure for table `posted_jobs`
--

CREATE TABLE `posted_jobs` (
  `job_id` int(11) NOT NULL,
  `provider_name` int(11) NOT NULL,
  `job_title` varchar(30) NOT NULL,
  `job_type` varchar(15) NOT NULL,
  `job_location` varchar(30) NOT NULL,
  `job_salary` bigint(11) NOT NULL,
  `job_salary_time` varchar(14) NOT NULL,
  `job_posted` varchar(20) NOT NULL,
  `job_description` varchar(200) NOT NULL,
  `job_status` varchar(15) NOT NULL,
  `company_name` varchar(35) NOT NULL,
  `work_load` int(11) NOT NULL,
  `work_period` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posted_jobs`
--

INSERT INTO `posted_jobs` (`job_id`, `provider_name`, `job_title`, `job_type`, `job_location`, `job_salary`, `job_salary_time`, `job_posted`, `job_description`, `job_status`, `company_name`, `work_load`, `work_period`) VALUES
(31, 35, 'Kfc Maker', 'part-time', 'Tirupati', 1001, 'per-week', '2026-07-27', 'thejkasddjkdhjjfjshh fjhjhsajskjhjkhaskhkhfsjjshagfkgsh', 'open', 'Sithafal', 8, 'per-day'),
(32, 35, 'waffel maker ', 'part-time', 'Renigunta', 100, 'per-day', '2026-07-27', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo magnam necessitatibus velit voluptates facere perspiciatis libero vitae sed. Quasi, distinctio.', 'open', 'Sithafal', 8, 'per-day');

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `provider_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(200) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `company_description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`provider_id`, `company_name`, `email`, `password`, `address`, `location`, `contact_number`, `company_description`, `created_at`) VALUES
(35, 'Sithafal', 'dino225106@gmail.com', '$2y$10$rrdy2Bmyj18D2QN9ZIDJgOVJlTJV8xbYg7UZ3JJ5H8oOk0qCtwCn6', 'ITII park near tirupati international airport', 'Tirupati', '7981629173', 'we bulid rebust website using our rhybus model....', '2026-07-27 16:50:47');

-- --------------------------------------------------------

--
-- Table structure for table `reset_tokens`
--

CREATE TABLE `reset_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` enum('seeker','provider') NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reset_tokens`
--

INSERT INTO `reset_tokens` (`id`, `user_id`, `user_type`, `email`, `otp`, `reset_token`, `expires_at`, `created_at`) VALUES
(1, 2, 'seeker', 'vyshnavinarala25@gmail.com', '259732', NULL, '2025-09-04 00:24:31', '2025-09-03 18:44:31'),
(2, 2, 'seeker', 'vyshnavinarala25@gmail.com', '992112', NULL, '2025-09-04 00:24:38', '2025-09-03 18:44:38'),
(3, 2, 'seeker', 'vyshnavinarala25@gmail.com', '908698', NULL, '2025-09-04 00:24:39', '2025-09-03 18:44:39'),
(4, 2, 'seeker', 'vyshnavinarala25@gmail.com', '832020', NULL, '2025-09-04 00:24:39', '2025-09-03 18:44:39'),
(5, 2, 'seeker', 'vyshnavinarala25@gmail.com', '548114', NULL, '2025-09-04 00:24:39', '2025-09-03 18:44:39'),
(6, 2, 'seeker', 'vyshnavinarala25@gmail.com', '891833', NULL, '2025-09-04 00:24:40', '2025-09-03 18:44:40'),
(7, 2, 'seeker', 'vyshnavinarala25@gmail.com', '617221', NULL, '2025-09-04 00:24:48', '2025-09-03 18:44:48'),
(8, 2, 'seeker', 'vyshnavinarala25@gmail.com', '788585', NULL, '2025-09-04 00:24:50', '2025-09-03 18:44:50'),
(9, 2, 'seeker', 'vyshnavinarala25@gmail.com', '393188', NULL, '2025-09-04 00:24:51', '2025-09-03 18:44:51'),
(10, 2, 'seeker', 'vyshnavinarala25@gmail.com', '435173', NULL, '2025-09-04 00:24:53', '2025-09-03 18:44:53'),
(11, 2, 'seeker', 'vyshnavinarala25@gmail.com', '498231', NULL, '2025-09-04 00:24:54', '2025-09-03 18:44:54'),
(12, 2, 'seeker', 'vyshnavinarala25@gmail.com', '996709', NULL, '2025-09-04 00:24:55', '2025-09-03 18:44:55'),
(13, 2, 'seeker', 'vyshnavinarala25@gmail.com', '636386', NULL, '2025-09-04 00:24:57', '2025-09-03 18:44:57'),
(14, 2, 'seeker', 'vyshnavinarala25@gmail.com', '793828', NULL, '2025-09-04 00:24:58', '2025-09-03 18:44:58'),
(15, 2, 'seeker', 'vyshnavinarala25@gmail.com', '454878', NULL, '2025-09-04 00:25:00', '2025-09-03 18:45:00'),
(16, 2, 'seeker', 'vyshnavinarala25@gmail.com', '452293', NULL, '2025-09-04 00:25:02', '2025-09-03 18:45:02'),
(17, 2, 'seeker', 'vyshnavinarala25@gmail.com', '813468', NULL, '2025-09-04 00:54:19', '2025-09-03 19:14:19'),
(18, 2, 'seeker', 'vyshnavinarala25@gmail.com', '973385', NULL, '2025-09-04 01:37:32', '2025-09-03 19:57:32'),
(19, 2, 'seeker', 'vyshnavinarala25@gmail.com', '743115', NULL, '2025-09-04 01:48:21', '2025-09-03 20:08:21'),
(20, 2, 'seeker', 'vyshnavinarala25@gmail.com', '169824', NULL, '2025-09-04 01:48:21', '2025-09-03 20:08:21'),
(23, 10, 'seeker', 'bhavanaendrathi@gmail.com', '840571', NULL, '2025-09-06 15:19:44', '2025-09-06 09:39:44'),
(24, 10, 'seeker', 'bhavanaendrathi@gmail.com', '492966', NULL, '2025-09-06 15:19:49', '2025-09-06 09:39:49'),
(25, 10, 'seeker', 'bhavanaendrathi@gmail.com', '547462', NULL, '2025-09-06 15:19:49', '2025-09-06 09:39:49'),
(26, 10, 'seeker', 'bhavanaendrathi@gmail.com', '948123', NULL, '2025-09-06 15:19:52', '2025-09-06 09:39:52'),
(27, 5, 'seeker', 'jasu5511246@gmail.com', '793235', NULL, '2025-09-14 01:37:38', '2025-09-13 19:57:38'),
(28, 5, 'seeker', 'jasu5511246@gmail.com', '576663', NULL, '2025-09-14 01:37:39', '2025-09-13 19:57:39'),
(29, 5, 'seeker', 'jasu5511246@gmail.com', '263003', NULL, '2025-09-14 01:37:49', '2025-09-13 19:57:49'),
(30, 5, 'seeker', 'jasu5511246@gmail.com', '502551', NULL, '2025-09-14 01:37:50', '2025-09-13 19:57:50'),
(31, 5, 'seeker', 'jasu5511246@gmail.com', '341524', NULL, '2025-09-14 01:37:51', '2025-09-13 19:57:51'),
(32, 5, 'seeker', 'jasu5511246@gmail.com', '851001', NULL, '2025-09-14 01:37:51', '2025-09-13 19:57:51'),
(33, 5, 'seeker', 'jasu5511246@gmail.com', '401273', NULL, '2025-09-14 01:37:51', '2025-09-13 19:57:51'),
(34, 5, 'seeker', 'jasu5511246@gmail.com', '311259', NULL, '2025-10-22 01:34:50', '2025-10-21 19:54:50'),
(35, 5, 'seeker', 'jasu5511246@gmail.com', '776962', NULL, '2025-10-22 01:34:51', '2025-10-21 19:54:51'),
(36, 5, 'seeker', 'jasu5511246@gmail.com', '424752', NULL, '2025-10-22 01:35:48', '2025-10-21 19:55:48'),
(37, 5, 'seeker', 'jasu5511246@gmail.com', '521422', NULL, '2025-10-22 02:15:39', '2025-10-21 20:35:39');

-- --------------------------------------------------------

--
-- Table structure for table `saved_jobs`
--

CREATE TABLE `saved_jobs` (
  `saved_id` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `job_title` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_jobs`
--

INSERT INTO `saved_jobs` (`saved_id`, `seeker_id`, `job_id`, `job_title`) VALUES
(89, 19, 31, 'Kfc Maker');

-- --------------------------------------------------------

--
-- Table structure for table `seekers`
--

CREATE TABLE `seekers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` bigint(10) NOT NULL,
  `age` int(5) NOT NULL,
  `skills` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `about` varchar(500) NOT NULL,
  `education` varchar(200) NOT NULL,
  `availability` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seekers`
--

INSERT INTO `seekers` (`id`, `name`, `email`, `password`, `phone`, `age`, `skills`, `location`, `about`, `education`, `availability`, `created_at`) VALUES
(19, 'Dinesh', 'dino225106@gmail.com', '$2y$10$s4zs0xrJJwUFdlQsazU1G.rRj3xyKQIekzLBIF3d3k5ZUlwjalBa.', 7981629173, 18, 'Fastfood maker,chines burma maker', 'Tirupati', '', '', 'immediate', '2026-07-27 16:52:49'),
(21, 'Jaswant', 'jasu5511246@gmail.com', '$2y$10$yOiSw1dQooIiaBCPfQ3btenvj5/ejTjEmnQTRIb0F7J7HIukRjlxq', 1234567890, 19, '', 'bhimavarm', '', '', 'immediate', '2026-08-23 17:06:39');

-- --------------------------------------------------------

--
-- Table structure for table `shortlisted`
--

CREATE TABLE `shortlisted` (
  `shortlist_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `shortlisted_time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shortlisted`
--

INSERT INTO `shortlisted` (`shortlist_id`, `job_id`, `provider_id`, `seeker_id`, `shortlisted_time`) VALUES
(25, 31, 35, 19, '2026-08-22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applied_job`
--
ALTER TABLE `applied_job`
  ADD PRIMARY KEY (`applied_jobid`);

--
-- Indexes for table `hired`
--
ALTER TABLE `hired`
  ADD PRIMARY KEY (`hired_id`);

--
-- Indexes for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`provider_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD PRIMARY KEY (`saved_id`);

--
-- Indexes for table `seekers`
--
ALTER TABLE `seekers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shortlisted`
--
ALTER TABLE `shortlisted`
  ADD PRIMARY KEY (`shortlist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applied_job`
--
ALTER TABLE `applied_job`
  MODIFY `applied_jobid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `hired`
--
ALTER TABLE `hired`
  MODIFY `hired_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `provider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  MODIFY `saved_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `seekers`
--
ALTER TABLE `seekers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `shortlisted`
--
ALTER TABLE `shortlisted`
  MODIFY `shortlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
