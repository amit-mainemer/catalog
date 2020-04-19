-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2020 at 10:00 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catalog`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`) VALUES
(1, 'amit@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `first_name`, `last_name`, `email`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Joanne', 'Rowling', 'jkrowlling@gmail.com', '0508763362', 1, '2020-03-26 22:42:25', '2020-03-28 22:30:35'),
(2, 'Jerome', 'Salinger', 'jerome@gmail.com', '0528765858', 1, '2020-03-26 22:43:39', '2020-03-26 22:43:39'),
(3, 'Herman', 'Melville', 'herman@gmail.com', '0548763392', 1, '2020-03-26 22:44:38', '2020-03-26 22:44:38'),
(13, 'Charles ', 'Lutwidge', 'charles@gmail.com', '0504983242', 1, '2020-03-28 22:56:18', '2020-03-28 22:56:18'),
(14, 'Leo ', 'Tolstoy', 'leo@gmail.com', '0529847234', 1, '2020-03-28 23:00:27', '2020-03-28 23:00:27'),
(15, 'F. Scott', 'Fitzgerald', 'scott@gmail.com', '0539823453', 1, '2020-03-28 23:06:20', '2020-03-28 23:06:20'),
(20, ' William', 'Shakespeare', 'william@gmail.com', '0529384321', 1, '2020-03-29 09:56:36', '2020-03-29 09:56:36'),
(21, 'George', 'Martin', 'george@gmail.com', '0502342352', 1, '2020-03-29 10:01:29', '2020-03-29 10:01:29'),
(22, 'Gillian', 'Flynn', 'gillian@gmail.com', '0502342831', 1, '2020-03-29 10:06:33', '2020-03-29 10:06:33');

-- --------------------------------------------------------

--
-- Table structure for table `author_books`
--

CREATE TABLE `author_books` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `author_books`
--

INSERT INTO `author_books` (`id`, `user_id`, `book_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(19, 13, 45),
(20, 14, 46),
(21, 15, 47),
(29, 20, 53),
(30, 21, 54),
(31, 22, 55);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `book_image` varchar(1024) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/06/02/12/59/narrative-794978__340.jpg',
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `book_image`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Harry potter and the philosopher\'s stone', 'https://cdn.pixabay.com/photo/2017/08/08/21/03/book-2612702__340.jpg', 'The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry', 1, '2020-03-26 22:37:26', '2020-03-28 23:39:38'),
(2, 'The Catcher in the Rye', 'https://cdn.pixabay.com/photo/2016/04/30/13/12/texture-1362879__340.jpg', ' It was originally intended for adults but is often read by adolescents for its themes of angst and alienation, and as a critique on superficiality in society.', 1, '2020-03-26 22:39:24', '2020-03-26 22:39:24'),
(3, 'Moby Dick', 'https://cdn.pixabay.com/photo/2017/09/08/09/26/moon-2728183__340.jpg', 'The book is sailor Ishmael\'s narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge on Moby Dick, the giant white sperm whale that on the ship\'s previous voyage bit off Ahab\'s leg at the knee.', 1, '2020-03-26 22:40:56', '2020-03-26 22:40:56'),
(45, 'Alice\'s Adventures in Wonderland', 'https://images.unsplash.com/photo-1514467159223-eae20502f859?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', ' It tells of a young girl named Alice falling through a rabbit hole into a subterranean fantasy world populated by peculiar, anthropomorphic creatures.', 1, '2020-03-28 22:57:56', '2020-03-28 22:57:56'),
(46, 'War and Peace', 'https://images.unsplash.com/photo-1563166796-befbbd534d1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'The novel chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.', 1, '2020-03-28 23:02:07', '2020-03-28 23:02:07'),
(47, 'The Great Gatsby', 'https://images.unsplash.com/photo-1582140161300-efc6f159c131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.', 1, '2020-03-28 23:07:28', '2020-03-28 23:07:28'),
(53, 'Hamlet', 'https://images.unsplash.com/photo-1510513260777-51d462dbaec9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'It is Shakespeare\'s longest play with 30,557 words. Set in Denmark, the play depicts Prince Hamlet and his revenge against his uncle, Claudius, who has murdered Hamlet\'s father in order to seize his throne and marry Hamlet\'s mother.', 1, '2020-03-29 09:57:37', '2020-03-29 09:57:37'),
(54, 'A Song of Ice and Fire', 'https://images.unsplash.com/photo-1515255384510-23e8b6a6ca3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'A Song of Ice and Fire takes place on the fictional continents Westeros and Essos. The point of view of each chapter in the story is a limited perspective of a range of characters growing from nine in the first novel, to 31 characters by the fifth novel.', 1, '2020-03-29 10:03:30', '2020-03-29 10:03:30'),
(55, 'Gone Girl', 'https://images.unsplash.com/photo-1566498016720-e1e61a7fc31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 'The deliciously dark US crime thriller that launched a thousand imitators and took the concept of the unreliable narrator to new heights. A woman disappears: we think we know whodunit, but we’re wrong.', 1, '2020-03-29 10:07:40', '2020-03-29 10:07:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `last_name` (`last_name`);

--
-- Indexes for table `author_books`
--
ALTER TABLE `author_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `author_books_ibfk_1` (`user_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `author_books`
--
ALTER TABLE `author_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_books`
--
ALTER TABLE `author_books`
  ADD CONSTRAINT `author_books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `author_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
