import { Component, OnInit } from '@angular/core';
import { Author } from '../../../interfaces/author';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-authors-profile',
  templateUrl: './authors-profile.component.html',
  styleUrls: ['./authors-profile.component.css']
})
export class AuthorsProfileComponent implements OnInit{
  authorId!: number;
  author!: Author;
  authorData!: { author: Author; articles: Article[]; };// | undefined;
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  firstShown = 0;
  secondShown = 1;
  
  max = 5;
  rate = 0;
  isReadonly = true;

  numbers: number[] = [0,0,0,0,0];

  authors: Author[] = [
    {
      name: 'Klara Weaver',
      role: 'Author/Editor',
      location: 'New York',
      time: '9:30 AM',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.',
      rating: 4.8,
      reviews: 1042,
      courses: 12,
      edits: 987,
      responseTime: 'very responsive',
      certificates: 'Adobe Photoshop, Adobe Illustrator, Adobe InDesign',
      profileLink: 'https://www.linkedin.com/in/klara-weaver-1a2b3c4d/',
      id: 1
    },
    {
      name: 'John Smith',
      role: 'Author',
      location: 'London',
      time: '2:00 PM',
      overview: 'I am a physicist specializing in quantum mechanics and theoretical physics. My research focuses on understanding the fundamental principles of the universe and exploring the possibilities of quantum computing.',
      rating: 4.5,
      reviews: 7896,
      courses: 8,
      edits: 215,
      responseTime: 'responsive',
      certificates: 'Ph.D. in Physics',
      profileLink: 'https://www.linkedin.com/in/john-smith-5e6f7g8h/',
      id: 2
    },
    {
      name: 'Emily Johnson',
      role: 'Editor',
      location: 'Los Angeles',
      time: '6:30 PM',
      overview: 'As an editor, I have a keen eye for detail and a passion for helping authors refine their work. I specialize in editing fiction novels, ensuring that the story flows smoothly and the characters come to life.',
      rating: 4.2,
      reviews: 2563,
      courses: 0,
      edits: 5632,
      responseTime: 'responsive',
      certificates: 'Editing Certificate',
      profileLink: 'https://www.linkedin.com/in/emily-johnson-9a8b7c6d/',
      id: 3
    },
    {
      name: 'Michael Davis',
      role: 'Author/Editor',
      location: 'Paris',
      time: '10:00 AM',
      overview: 'My expertise lies in environmental science and sustainability. I am dedicated to finding innovative solutions to address climate change and promote a more sustainable future through my research and writing.',
      rating: 4.7,
      reviews: 4210,
      courses: 6,
      edits: 2154,
      responseTime: 'badly responsive',
      certificates: 'M.Sc. in Environmental Science',
      profileLink: 'https://www.linkedin.com/in/michael-davis-3b2a1c9d/',
      id: 4
    },
    {
      name: 'Sophia Wilson',
      role: 'Author',
      location: 'Tokyo',
      time: '4:30 PM',
      overview: 'I am a computer scientist specializing in artificial intelligence and machine learning. My research focuses on developing intelligent algorithms and systems to tackle complex real-world problems.',
      rating: 4.9,
      reviews: 9562,
      courses: 15,
      edits: 311,
      responseTime: 'very responsive',
      certificates: 'B.Sc. in Computer Science',
      profileLink: 'https://www.linkedin.com/in/sophia-wilson-7d6e5f4e/',
      id: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Author',
      location: 'Sydney',
      time: '8:00 AM',
      overview: 'I am a marine biologist with a focus on coral reef conservation. My research aims to understand the impacts of climate change on coral ecosystems and develop strategies for their protection.',
      rating: 4.6,
      reviews: 3207,
      courses: 9,
      edits: 215,
      responseTime: 'responsive',
      certificates: 'M.Sc. in Marine Biology',
      profileLink: 'https://www.linkedin.com/in/emma-thompson-5a6b7c8d/',
      id: 6
    },
    {
      name: 'Robert Anderson',
      role: 'Editor',
      location: 'Chicago',
      time: '3:30 PM',
      overview: 'With years of experience in the publishing industry, I provide meticulous editing services to ensure clarity, coherence, and grammatical correctness in written works. I specialize in academic and technical editing.',
      rating: 4.3,
      reviews: 1478,
      courses: 0,
      edits: 6254,
      responseTime: 'responsive',
      certificates: 'Editing Certificate',
      profileLink: 'https://www.linkedin.com/in/robert-anderson-1b2c3d4e/',
      id: 7
    },
    {
      name: 'Isabella Garcia',
      role: 'Author/Editor',
      location: 'Barcelona',
      time: '11:30 AM',
      overview: 'As a social psychologist, I explore the complexities of human behavior and the influences of social interactions. My work focuses on understanding the factors that shape individual and group dynamics.',
      rating: 4.9,
      reviews: 5126,
      courses: 10,
      edits: 3269,
      responseTime: 'very responsive',
      certificates: 'Ph.D. in Social Psychology',
      profileLink: 'https://www.linkedin.com/in/isabella-garcia-2c3d4e5f/',
      id: 8
    },
    {
      name: 'Oliver Martinez',
      role: 'Author',
      location: 'Berlin',
      time: '6:00 PM',
      overview: 'I am a historian specializing in ancient civilizations. My research delves into the mysteries of ancient Egypt, unravelling the secrets of pharaohs, pyramids, and the rich cultural heritage of the Nile Valley.',
      rating: 4.7,
      reviews: 2984,
      courses: 5,
      edits: 74,
      responseTime: 'responsive',
      certificates: 'B.A. in History',
      profileLink: 'https://www.linkedin.com/in/oliver-martinez-3d4e5f6g/',
      id: 9
    },
    {
      name: 'Sophie Thompson',
      role: 'Editor',
      location: 'Toronto',
      time: '10:30 AM',
      overview: 'With a passion for storytelling, I specialize in developmental editing, helping authors shape their narratives and craft compelling characters. My goal is to empower writers to create impactful stories.',
      rating: 4.4,
      reviews: 2176,
      courses: 0,
      edits: 4591,
      responseTime: 'responsive',
      certificates: 'Editing Certificate',
      profileLink: 'https://www.linkedin.com/in/sophie-thompson-5f6g7h8i/',
      id: 10
    }
  ];

  articles: Article[] = [
    {
      title: 'The Thrill of Victory: The Best Moments in Sports History',
      category: 'Sports',
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1495467033333-15a8100e9da9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHNwb3J0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      summary: "From Jesse Owens' four gold medals at the 1936 Olympics to Michael Phelps' eight gold medals in Beijing, sports history is filled with incredible moments that have inspired us all. Here, we take a look at some of the greatest moments in sports history and the athletes who made them happen.",
      date: new Date('2022-09-24'),
      id: 0,
    },
    {
      title: 'The Psychology of Winning: How Champions Think and Behave',
      category: 'Sports',
      rating: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzJTIwY2hhaW5lcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      summary: "What makes a champion? Is it natural talent, hard work, or something else entirely? In this article, we explore the psychology of winning and what it takes to be a true champion.",
      date: new Date('2002-09-20'),
      id: 1,
    },
    {
      title: 'Sports and Technology: The Future of Athletics',
      category: 'Sports',
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1525056358054-b4d3c3fe3f8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzJTIwY2hhaW5lcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      summary: "From high-tech training equipment to virtual reality simulations, technology is changing the way athletes train and compete. In this article, we take a look at some of the latest advancements in sports technology and what they mean for the future of athletics.",
      date: new Date('2021-03-05'),
      id: 2,
    },
    {
      title: 'The Benefits of Playing Sports: Why Everyone Should Get in the Game',
      category: 'Sports',
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1532375810705-75d3847f46e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3BvcnRzJTIwY2hhaW5lcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      summary: "Playing sports isn't just about winning or losing. It's also about improving your health, building relationships, and developing important life skills. In this article, we explore the many benefits of playing sports and why everyone should get in the game.",
      date: new Date('2001-12-07'),
      id: 3,
    },
    {
      title: "The Rise of Esports",
      category: "Sports",
      rating: 4.3,
      imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd2e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXNwb3J0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      summary: "Esports have been on the rise in recent years, with millions of people tuning in to watch tournaments and competitions. Professional gamers are now being treated like traditional athletes, with sponsorships and lucrative contracts. As technology continues to advance, it's likely that esports will only become more popular and mainstream.",
      date: new Date('2017-11-17'),
      id: 4,
    },
    {
      title: 'The Future of Quantum Computing',
      category: 'Technology',
      rating: 4.5,
      imageUrl: 'https://cdn.pixabay.com/photo/2016/11/19/18/10/computer-1845752_960_720.jpg',
      summary: 'Quantum computing is one of the most exciting areas of research in technology today. With the potential to solve problems that classical computers simply can\'t handle, it could revolutionize the way we approach everything from drug discovery to weather forecasting.',
      date: new Date('2005-09-21'),
      id: 5,
    },
    {
      title: 'Artificial Intelligence and Ethics',
      category: 'Technology',
      rating: 4,
      imageUrl: 'https://cdn.pixabay.com/photo/2018/03/10/14/25/brain-3219798_960_720.jpg',
      summary: 'As artificial intelligence becomes more powerful, questions are being raised about its impact on society. From biased algorithms to autonomous weapons, it\'s essential that we consider the ethical implications of these technologies.',
      date: new Date('2019-01-01'),
      id: 6,
    },
    {
      title: 'The Rise of 5G Networks',
      category: 'Technology',
      rating: 4.5,
      imageUrl: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/artificial-intelligence-1839549_960_720.jpg',
      summary: '5G networks promise to revolutionize the way we use mobile devices. With faster speeds and lower latency, they could enable everything from remote surgery to autonomous vehicles.',
      date: new Date('2018-12-12'),
      id: 7,
    },
    {
      title: 'The Role of Blockchain in Cybersecurity',
      category: 'Technology',
      rating: 4,
      imageUrl: 'https://cdn.pixabay.com/photo/2018/03/06/22/22/blockchain-3205849_960_720.jpg',
      summary: 'Blockchain technology is known primarily for its role in cryptocurrency, but it has the potential to revolutionize cybersecurity as well. By providing a secure and decentralized way to store and share information, it could help protect against data breaches and cyber attacks.',
      date: new Date('2019-05-05'),
      id: 8,
    },
    {
      title: 'The Internet of Things and the Smart Home',
      category: 'Technology',
      rating: 3.5,
      imageUrl: 'https://cdn.pixabay.com/photo/2017/08/06/09/53/people-2592385_960_720.jpg',
      summary: 'The internet of things (IoT) is connecting everything from appliances to cars to the internet, and the smart home is one of the most exciting areas of development. With devices like smart thermostats and voice assistants, we\'re on the cusp of a new era of home automation.',
      date: new Date('2019-10-10'),
      id: 9,
    },
    {
      title: 'Tyrannosaurus Rex: The King of the Dinosaurs',
      category: 'Dinosaurs',
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1547036967-f280d5932a8a',
      summary: 'Tyrannosaurus Rex, or T. Rex for short, is one of the most famous dinosaurs of all time. With its massive size, sharp teeth, and powerful jaws, it was the king of the dinosaurs. T. Rex lived during the late Cretaceous period, about 68 to 66 million years ago, and was one of the last dinosaurs to go extinct.',
      date: new Date('2011-12-08'),
      id: 10,
    },
    {
      title: 'Stegosaurus: The Spiked Dinosaur',
      category: 'Dinosaurs',
      rating: 3.2,
      imageUrl: 'https://images.unsplash.com/photo-1603172105176-38e8d03dc6b3',
      summary: 'Stegosaurus was a large, plant-eating dinosaur that lived during the late Jurassic period, about 155 to 150 million years ago. It was known for its distinctive rows of bony plates along its back, and for the spikes on its tail. Stegosaurus was also one of the first dinosaurs to be discovered and studied by scientists.',
      date: new Date('2012-12-12'),
      id: 11,
    },
    {
      title: 'Velociraptor: The Speedy Predator',
      category: 'Dinosaurs',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1518535256092-52e1b19055a2',
      summary: 'Velociraptor was a small, fast, and agile predator that lived during the late Cretaceous period, about 75 to 71 million years ago. It had sharp claws on its feet and hands, and was known for hunting in packs. Velociraptor was also one of the dinosaurs featured in the Jurassic Park movies.',
      date: new Date('2013-03-03'),
      id: 12,
    },
    {
      title: 'Triceratops: The Three-Horned Dinosaur',
      category: 'Dinosaurs',
      rating: 3.9,
      imageUrl: 'https://images.unsplash.com/photo-1527470516329-a6ca1f8ed1b7',
      summary: 'Triceratops was a large, herbivorous dinosaur that lived during the late Cretaceous period, about 68 to 66 million years ago. It was known for its distinctive three-horned skull and bony frill. Triceratops was also one of the last dinosaurs to go extinct.',
      date: new Date('2014-04-04'),
      id: 13,
    },
    {
      title: 'Brachiosaurus: The Giant Herbivore',
      category: 'Dinosaurs',
      rating: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1529568220523-9c3a3f3206e1',
      summary: 'Brachiosaurus was a massive, long-necked dinosaur that lived during the late Jurassic period, about 154 to 153 million years ago. It was one of the largest dinosaurs of all time, reaching lengths of up to 85 feet and heights of up to 40 feet. Brachiosaurus was also one of the dinosaurs featured in the movie Jurassic Park.',
      date: new Date('2018-11-05'),
      id: 14,
    },
    {
      title: 'The Evolution of Pikachu: From Pichu to Raichu',
      category: 'Pokemon',
      rating: 4.5,
      imageUrl: 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png',
      summary: "Pikachu is one of the most iconic Pokemon in the franchise. In this article, we'll take a look at its evolution, from its cute pre-evolution Pichu to its powerful evolved form, Raichu.",
      date: new Date('2019-01-15'),
      id: 15,
    },
    {
      title: '10 Most Powerful Legendary Pokemon',
      category: 'Pokemon',
      rating: 4.2,
      imageUrl: 'https://cdn.bulbagarden.net/upload/thumb/4/4a/151Mew.png/250px-151Mew.png',
      summary: "Legendary Pokemon are some of the most powerful creatures in the Pokemon universe. In this article, we'll count down the top 10 most powerful legendary Pokemon, from Mewtwo to Arceus.",
      date: new Date('2019-02-20'),
      id: 16,
    },
    {
      title: 'The History of Pokemon Trading Cards',
      category: 'Pokemon',
      rating: 4.7,
      imageUrl: 'https://cdn.bulbagarden.net/upload/thumb/9/95/Pokemon_TCG_logo.png/200px-Pokemon_TCG_logo.png',
      summary: "The Pokemon Trading Card Game has been a beloved pastime for fans of the franchise since its introduction in the 90s. In this article, we'll take a look at the history of the game, from its early beginnings to its modern-day popularity.",
      date: new Date('2013-03-25'),
      id: 17,
    },
    {
      title: 'How to Build a Competitive Pokemon Team',
      category: 'Pokemon',
      rating: 4.0,
      imageUrl: 'https://cdn.bulbagarden.net/upload/thumb/3/36/Pok%C3%A9mon_Battle_Logo.png/200px-Pok%C3%A9mon_Battle_Logo.png',
      summary: "Building a competitive Pokemon team can be a daunting task, but with the right strategies and Pokemon, anyone can do it. In this article, we'll give you tips and tricks for building a winning team in battles.",
      date: new Date('2011-04-30'),
      id: 18,
    },
    {
      title: 'The Top 5 Cutest Pokemon of All Time',
      category: 'Pokemon',
      rating: 4.8,
      imageUrl: 'https://cdn.bulbagarden.net/upload/thumb/3/3f/025Pikachu_OS_anime_2.png/220px-025Pikachu_OS_anime_2.png',
      summary: "Pokemon come in all shapes and sizes, but some are just too cute to resist. In this article, we'll take a look at the top 5 cutest Pokemon of all time, from Pikachu to Eevee.",
      date: new Date('2009-12-19'),
      id: 19,
    },
    {
      title: 'The Majestic Redwood Trees',
      category: 'Nature',
      rating: 4.5,
      imageUrl: 'https://www.nps.gov/articles/images/Redwoods-101-Trees-Size-and-Shape-in-the-Redwood-Forest-Photo-1024px.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
      summary: 'The redwood trees are some of the most impressive and awe-inspiring sights in nature. These trees can grow up to 350 feet tall and have a lifespan of over 2,000 years. In addition to their impressive size and longevity, redwoods are also home to a wide variety of wildlife and provide important ecosystem services.',
      date: new Date('2014-11-08'),
      id: 20,
    },
    {
      title: 'The Stunning Northern Lights',
      category: 'Nature',
      rating: 4.8,
      imageUrl: 'https://www.northernlightsiceland.com/wp-content/uploads/2019/10/The-Northern-Lights-Iceland.jpg',
      summary: 'The Northern Lights, or Aurora Borealis, are one of the most incredible natural phenomena in the world. These lights are caused by particles from the sun colliding with the Earth’s atmosphere and are only visible in certain parts of the world. Watching the Northern Lights dance across the sky is a truly breathtaking experience.',
      date: new Date('2016-02-14'),
      id: 21,
    },
    {
      title: 'The Incredible Migration of Monarch Butterflies',
      category: 'Nature',
      rating: 4.2,
      imageUrl: 'https://www.nps.gov/articles/images/Monarch-Migration-Cover-Image-1024px.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
      summary: 'Every year, millions of Monarch butterflies migrate from Canada and the United States to Mexico, covering thousands of miles. This incredible migration is one of the most impressive feats in the animal kingdom and is essential to the survival of the species. Monarch butterflies are also an important part of many ecosystems and serve as pollinators for a wide variety of plants.',
      date: new Date('2017-05-20'),
      id: 22,
    },
    {
      title: 'The Beauty of Coral Reefs',
      category: 'Nature',
      rating: 4.6,
      imageUrl: 'https://www.nps.gov/common/uploads/grid_builder/pwr/crop16_9/B5E9A5FE-1DD8-B71B-0B842D7FA4CC4FE2.jpg?width=3072&height=1728&mode=crop&quality=90',
      summary: 'Coral reefs are some of the most diverse and beautiful ecosystems in the world. These underwater structures are home to a wide variety of marine life, including fish, sharks, and sea turtles. Unfortunately, coral reefs are also under threat from climate change and other human activities, making it more important than ever to protect these fragile ecosystems.',
      date: new Date('2018-08-10'),
      id: 23,
    },
    {
      title: 'The Serenity of Waterfalls',
      category: 'Nature',
      rating: 4.3,
      imageUrl: 'https://www.nps.gov/articles/images/Serenity-of-Waterfalls-Cover-Image-1024px.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
      summary: 'Waterfalls are some of the most peaceful and serene places in nature. The sound of the water cascading down the rocks and the mist rising from the pool below create a calming atmosphere that can be difficult to find in our fast-paced world. Waterfalls are also important sources of freshwater and can provide important habitat for a wide variety of wildlife.',
      date: new Date('2019-11-11'),
      id: 24,
    },
    {
      title: 'The Wonders of the Universe',
      category: 'Universe',
      rating: 4.5,
      imageUrl: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/38624091354_7a81f8bb87_k.jpg',
      summary: 'The universe is full of wonders that have fascinated humans for centuries. From the mysteries of black holes to the breathtaking beauty of distant galaxies, there is always something new and exciting to discover in the cosmos.',
      date: new Date('2010-10-10'),
      id: 25,  
    },
    {
      title: 'The Origins of the Universe',
      category: 'Universe',
      rating: 4.0,
      imageUrl: 'https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/ca-0713-nasa-01.jpg?itok=6UWV7Eli',
      summary: 'The question of how the universe began is one of the biggest mysteries of science. From the Big Bang to the formation of galaxies and stars, scientists are piecing together the history of the cosmos and our place in it.',
      date: new Date('2011-03-04'),
      id: 26,
    },
    {
      title: 'Life Beyond Earth',
      category: 'Universe',
      rating: 4.2,
      imageUrl: 'https://www.jpl.nasa.gov/images/solarsystem/PIA23623-16.jpg',
      summary: 'The search for life beyond Earth has captivated the public imagination for decades. With the discovery of thousands of exoplanets, scientists are getting closer to finding evidence of life in the universe.',
      date: new Date('2012-05-05') ,
      id: 27,
    },
    {
      title: 'Exploring the Cosmos',
      category: 'Universe',
      rating: 4.5,
      imageUrl: 'https://www.jpl.nasa.gov/images/galaxy/20181017/pia22892-16.jpg',
      summary: 'From telescopes to space probes, humans have developed an impressive array of tools to explore the universe. With each new discovery, we learn more about the mysteries of the cosmos and our place in it.',
      date: new Date('2013-07-07'),
      id: 28,
    },
    {
      title: 'The Future of Space Exploration',
      category: 'Universe',
      rating: 4.3,
      imageUrl: 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/hubble_friday_090321.png',
      summary: 'The exploration of space is entering a new era, with plans for missions to the Moon, Mars, and beyond. As we push the boundaries of what is possible, we are opening up new frontiers of knowledge and expanding the horizons of human experience.',
      date: new Date('2002-11-12'),
      id: 29,
    },
    {
      title: 'Fascinating Facts About Anglerfish',
      category: 'Fish',
      rating: 4.5,
      imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/group/anglerfish/anglerfish-group.jpg',
      summary: 'Anglerfish are some of the most fascinating fish in the ocean. With their large mouths, bioluminescent lures, and ability to swallow prey much larger than themselves, these fish have captured the imaginations of scientists and the public alike.',
      date: new Date('2003-12-13'),
      id: 30,
    }, 
    {
      title: 'The Colorful World of Coral Reef Fish',
      category: 'Fish',
      rating: 4.2,
      imageUrl: 'https://cdn.britannica.com/21/118821-050-028C95EE/underwater-photography-Coral-reef-fishes-Sulawesi-Indonesia.jpg',
      summary: 'Coral reef fish are known for their bright colors and unique patterns. These fish not only add to the beauty of coral reefs but also play important roles in maintaining the health of these fragile ecosystems.',
      date: new Date('2004-01-14') ,
      id: 31, 
    },
    {
      title: 'The Mysterious Lives of Deep-Sea Fish',
      category: 'Fish',
      rating: 4.7,
      imageUrl: 'https://www.oceanographicmagazine.com/wp-content/uploads/2020/04/Deep-Sea-Fish.jpg',
      summary: 'The deep sea is one of the most mysterious places on Earth, and the fish that live there are equally fascinating. From the bioluminescent lanternfish to the giant squid, these creatures have adapted to survive in a world without light and under extreme pressure.',
        date: new Date('2005-02-15'),
        id: 32,
    },
    {
      title: 'The Importance of Salmon in the Ecosystem',
      category: 'Fish',
      rating: 4.4,
      imageUrl: 'https://www.nationalgeographic.com/content/dam/animals/pictures/fish/s/salmon/salmon.jpg',
      summary: 'Salmon are a keystone species in many ecosystems around the world. Their annual migrations from freshwater to the ocean and back again bring important nutrients to both terrestrial and aquatic ecosystems, and they provide a critical food source for many animals.',
      date: new Date('2006-03-16'),
      id: 33,
    },
    {
      title: 'The Amazing Adaptations of Electric Fish',
      category: 'Fish',
      rating: 4.9,
      imageUrl: 'https://www.sciencenewsforstudents.org/wp-content/uploads/2021/05/1030_ElectricFish.jpg',
      summary: 'Electric fish are some of the most unique creatures on the planet. With the ability to generate and sense electric fields, these fish have adapted to life in low-light or murky environments and use their electric sense to navigate, communicate, and hunt for prey.',
      date: new Date('2012-01-17'),
      id: 34,
    },
    {
      title: "The Fascinating World of Ants",
      category: "Insects",
      rating: 4.7,
      imageUrl: "https://www.example.com/ants.jpg",
      summary: "Ants are highly organized social insects that live in colonies. They exhibit remarkable behaviors such as division of labor, complex communication systems, and impressive nest-building abilities.",
      date: new Date('2013-02-18'),
      id: 35,
    },
    {
      title: "Butterflies: Nature's Colorful Wonders",
      category: "Insects",
      rating: 4.8,
      imageUrl: "https://www.example.com/butterflies.jpg",
      summary: "Butterflies are known for their vibrant colors and delicate wings. They undergo a fascinating transformation from caterpillars to butterflies through the process of metamorphosis.",
      date: new Date('2014-12-24'),
      id: 36,
    },
    {
      title: "The Mighty Beetles: Nature's Tiny Titans",
      category: "Insects",
      rating: 4.6,
      imageUrl: "https://www.example.com/beetles.jpg",
      summary: "Beetles are the largest group of insects, with incredible diversity in terms of species and adaptations. They can be found in various habitats worldwide and play essential roles in ecosystems.",
      date: new Date('2015-11-23'),
      id: 37,
    },
    {
      title: "The Secret Life of Termites",
      category: "Insects",
      rating: 4.5,
      imageUrl: "https://www.example.com/termites.jpg",
      summary: "Termites are social insects known for their ability to build complex and towering mounds. They play crucial roles in breaking down dead plant material and are often considered pests in human settlements.",
      date: new Date('2016-10-22'),
      id: 38,
    },
    {
      title: "The Extraordinary World of Dragonflies",
      category: "Insects",
      rating: 4.9,
      imageUrl: "https://www.example.com/dragonflies.jpg",
      summary: "Dragonflies are agile and colorful insects that are excellent flyers. They inhabit various aquatic and terrestrial environments and are important predators, feeding on mosquitoes and other small insects.",
      date: new Date('2017-09-21'),
      id: 39,
    }      
];

  associatedData: { author: Author, articles: Article[] }[] = [];


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorId = +params['id'];
      this.loadAuthorData();
    });
    console.log(this.articles.length)

    this.assignArticles();

    this.countRatings();
  }

  loadAuthorData() {
    const foundAuthor = this.authors.find(author => author.id === this.authorId);
    if (foundAuthor) {
      this.author = foundAuthor;
    } else {
      // Handle the case when author is not found
      // For example, you can display an error message or redirect to a different page
      console.log('Author not found');
    }
  }

  assignArticles() {
    for (let i = 0; i < this.authors.length; i++) {
      const author = this.authors[i];
      const authorArticles: Article[] = [];

      for (let j = i * 4; j < (i * 4) + 4; j++) {
        if (j >= this.articles.length) {
          break;
        }

        const article = this.articles[j];
        authorArticles.push(article);
      }

      this.associatedData.push({ author, articles: authorArticles });
    }

    //iz tle nekako potem dobim članke ki jih prikažem
    this.authorData = this.associatedData.find(data => data.author.id === this.authorId) as { author: Author; articles: Article[]; };

    if (this.authorData) {
      console.log("Author:", this.authorData.author);
      console.log("Articles:", this.authorData.articles);
    } else {
      console.log("Author not found in associatedData.");
    }
    
  }

  countRatings() {
    this.numbers = [0, 0, 0, 0, 0]; // Initialize the numbers array before counting ratings
  
    for (let i = 0; i < this.authorData.articles.length; i++) {
      if (this.authorData.articles[i].rating > 4.5) {
        this.numbers[4]++;
      } else if (this.authorData.articles[i].rating > 3.5) {
        this.numbers[3]++;
      } else if (this.authorData.articles[i].rating > 2.5) {
        this.numbers[2]++;
      } else if (this.authorData.articles[i].rating > 1.5) {
        this.numbers[1]++;
      } else {
        this.numbers[0]++;
      }
    }
  
    this.numbers = this.numbers.map((num) => (num / this.authorData.articles.length) * 100);
  }

  copyLink(linkButton: HTMLButtonElement) {
    const linkText = linkButton.textContent;
  
    if (linkText) {
      // Create a temporary input element
      const input = document.createElement('input');
      input.setAttribute('value', linkText);
      document.body.appendChild(input);
  
      // Copy the text from the input element
      input.select();
      document.execCommand('copy');
  
      // Remove the temporary input element
      document.body.removeChild(input);
  
      // Optional: Show a success message or perform other actions
      alert('Link copied to clipboard!');
    }
  }

  isFollowed(authorId: number): boolean {
    // Check if the author is marked as followed in local storage
    const followedAuthors = JSON.parse(localStorage.getItem('followedAuthors') || '{}');
    return followedAuthors[authorId] === true;
  }
  
  followAuthor(authorId: number) {
    
    // Mark the author as followed in local storage
    const followedAuthors = JSON.parse(localStorage.getItem('followedAuthors') || '{}');
    followedAuthors[authorId] = true;
    localStorage.setItem('followedAuthors', JSON.stringify(followedAuthors));
  
    // Disable the button after it's clicked
    this.disableButton(authorId);
  }
  
  disableButton(authorId: number) {
    // Disable the button by adding the 'disabled' attribute dynamically
    const button = document.querySelector(`.button1[data-author-id="${authorId}"]`);
    if (button) {
      button.setAttribute('disabled', 'true');
    }
  }
  
  goToArticles(id: number) {

    this.router.navigate(['authors-profile', 'articles', id]);
  }

  openTextField() {
    alert("You can't send messages to this author!");
  }

}
