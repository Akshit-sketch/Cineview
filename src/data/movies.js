const movies = [

/* ---------- TOP MOVIES RIGHT NOW ---------- */

{
id:1,
title:"Interstellar",
rating:5,
createdAt:"2014-11-07",
poster:"https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg",
category:"top",
genre:"drama",
description:
"Interstellar follows a team of astronauts who travel through a mysterious wormhole in search of a new home for humanity. As Earth faces environmental collapse, former pilot Cooper joins a mission that may save mankind. The crew must navigate dangerous planets and the mysteries of time and space. Along the journey, the story explores love, sacrifice, and the bonds between parents and children.",
trailer:"https://www.youtube.com/watch?v=zSWdZVtXT7E"
},

{
id:2,
title:"Inception",
rating:4.5,
createdAt:"2010-07-16",
poster:"https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
category:"top",
genre:"action",
description:
"Inception tells the story of Dom Cobb, a thief who steals secrets from within people's dreams. He is offered a chance at redemption if he can accomplish the impossible task of planting an idea into someone's mind. As the team dives deeper into multiple dream layers, the boundaries between dream and reality begin to blur. The film explores perception, memory, and the power of the subconscious.",
trailer:"https://www.youtube.com/watch?v=YoHD9XEInc0"
},

{
id:3,
title:"Oppenheimer",
rating:4.5,
createdAt:"2023-07-21",
poster:"https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
category:"top",
genre:"drama",
description:
"Oppenheimer is a historical drama about J. Robert Oppenheimer, the physicist who led the Manhattan Project. The film explores the development of the atomic bomb and the moral dilemmas faced by the scientists involved. As the weapon reshapes the future of warfare and politics, Oppenheimer must confront the consequences of his creation.",
trailer:"https://www.youtube.com/watch?v=uYPbbksJxIg"
},

{
id:4,
title:"Dune",
rating:4,
createdAt:"2021-10-22",
poster:"https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
category:"top",
genre:"drama",
description:
"Dune follows Paul Atreides, a young noble destined for greatness. His family is assigned control of the desert planet Arrakis, the only source of a powerful substance called spice. As political intrigue and betrayal threaten their survival, Paul must embrace his destiny and protect the future of his people.",
trailer:"https://www.youtube.com/watch?v=n9xhJrPXop4"
},

{
id:5,
title:"The Batman",
rating:4,
createdAt:"2022-03-04",
poster:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
category:"top",
genre:"action",
description:
"The Batman follows a young Bruce Wayne during his early years as Gotham’s vigilante protector. When a mysterious killer called the Riddler targets the city’s elite, Batman must uncover a web of corruption. The investigation pushes him to confront his own past and redefine what justice means.",
trailer:"https://www.youtube.com/watch?v=mqqft2x_Aa4"
},

{
id:6,
title:"Avatar: The Way of Water",
rating:4,
createdAt:"2022-12-16",
poster:"https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
category:"top",
genre:"action",
description:
"Avatar: The Way of Water continues the story of Jake Sully and Neytiri on the alien world of Pandora. As new threats emerge, the family must seek refuge among the ocean clans of the Na’vi. The film explores breathtaking underwater environments while highlighting themes of family, survival, and harmony with nature.",
trailer:"https://www.youtube.com/watch?v=d9MyW72ELq0"
},

{
id:7,
title:"John Wick 4",
rating:4.5,
createdAt:"2023-03-24",
poster:"https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
category:"top",
genre:"action",
description:
"John Wick: Chapter 4 continues the relentless journey of the legendary assassin. Wick faces the powerful High Table and travels across continents while battling deadly enemies. As the stakes grow higher, he must confront his past and fight for freedom in a world ruled by ruthless crime syndicates.",
trailer:"https://www.youtube.com/watch?v=qEVUtrk8_B4"
},

/* ---------- CLASSIC BLOCKBUSTERS ---------- */

{
id:8,
title:"The Dark Knight",
rating:5,
createdAt:"2008-07-18",
poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
category:"classic",
genre:"action",
description:
"The Dark Knight follows Batman as he faces the chaotic criminal mastermind known as the Joker. Gotham City descends into fear as the Joker manipulates the city's institutions and citizens. Batman must confront difficult choices and sacrifice his reputation to protect the city he loves.",
trailer:"https://www.youtube.com/watch?v=EXeTwQWrcwY"
},

{
id:9,
title:"Titanic",
rating:5,
createdAt:"1997-12-19",
poster:"https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
category:"classic",
genre:"drama",
description:
"Titanic tells the tragic love story of Jack and Rose aboard the ill-fated RMS Titanic. As the ship sails across the Atlantic Ocean, the two passengers from very different worlds fall deeply in love. When disaster strikes, their courage and devotion are tested in the face of overwhelming tragedy.",
trailer:"https://www.youtube.com/watch?v=2e-eXJ6HgkQ"
},

{
id:10,
title:"Jurassic Park",
rating:4.5,
createdAt:"1993-06-11",
poster:"https://image.tmdb.org/t/p/w500/c414cDeQ9b6qLPLeKmiJuLDUREJ.jpg",
category:"classic",
genre:"action",
description:
"Jurassic Park tells the story of a revolutionary theme park filled with genetically recreated dinosaurs. When a system failure allows the dinosaurs to escape, chaos erupts across the island. Scientists and visitors must survive against powerful prehistoric predators while trying to escape the island alive.",
trailer:"https://www.youtube.com/watch?v=lc0UehYemQA"
},

{
id:11,
title:"The Matrix",
rating:5,
createdAt:"1999-03-31",
poster:"https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
category:"classic",
genre:"action",
description:
"The Matrix follows Neo, a computer hacker who discovers that reality is actually a simulation created by machines. Guided by mysterious rebels, he begins to understand his role in humanity’s fight for freedom. The film combines philosophical ideas with groundbreaking action and visual effects.",
trailer:"https://www.youtube.com/watch?v=vKQi3bBA1y8"
},

{
id:12,
title:"Gladiator",
rating:4.5,
createdAt:"2000-05-05",
poster:"https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
category:"classic",
genre:"action",
description:
"Gladiator tells the story of Maximus, a Roman general betrayed by the emperor's son. Forced into slavery and trained as a gladiator, he rises through the ranks seeking justice. His quest for revenge becomes a symbol of hope for the Roman people.",
trailer:"https://www.youtube.com/watch?v=P5ieIbInFpg"
},

{
id:13,
title:"Forrest Gump",
rating:5,
createdAt:"1994-07-06",
poster:"https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
category:"classic",
genre:"drama",
description:
"Forrest Gump follows a kind-hearted man with a simple outlook on life. Despite his challenges, Forrest unknowingly influences several historical events in America. Through love, friendship, and perseverance, his story becomes an inspiring journey of destiny and innocence.",
trailer:"https://www.youtube.com/watch?v=bLvqoHBptjg"
},

{
id:14,
title:"The Lord of the Rings",
rating:5,
createdAt:"2001-12-19",
poster:"https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
category:"classic",
genre:"drama",
description:
"The Lord of the Rings follows Frodo Baggins and his companions on a dangerous quest to destroy a powerful ring. As darkness spreads across Middle-earth, the fellowship must overcome impossible odds. Their journey becomes a legendary battle between good and evil.",
trailer:"https://www.youtube.com/watch?v=V75dMMIW2B4"
},

/* ---------- KIDS MOVIES ---------- */

{
id:15,
title:"Toy Story",
rating:4,
createdAt:"1995-11-22",
poster:"https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
category:"kids",
genre:"animation",
description:
"Toy Story is a heartwarming animated adventure about toys that come to life when humans are not around. Woody the cowboy doll feels threatened when Buzz Lightyear becomes Andy’s favorite toy. The rivalry between them leads to unexpected adventures outside the house. Along the journey they learn the value of friendship, loyalty, and teamwork.",
trailer:"https://www.youtube.com/watch?v=v-PjgYDrg70"
},

{
id:16,
title:"Frozen",
rating:4,
createdAt:"2013-11-27",
poster:"https://image.tmdb.org/t/p/w500/mbkKBeqSFWUpyKjWfP9H3j1G1Yc.jpg",
category:"kids",
genre:"animation",
description:
"Frozen tells the story of two sisters, Elsa and Anna, in the kingdom of Arendelle. Elsa possesses magical powers that create ice and snow. When her abilities accidentally trap the kingdom in eternal winter, Anna sets off on a daring adventure to save her sister and restore summer.",
trailer:"https://www.youtube.com/watch?v=TbQm5doF_Uc"
},

{
id:17,
title:"Finding Nemo",
rating:4.5,
createdAt:"2003-05-30",
poster:"https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
category:"kids",
genre:"animation",
description:
"Finding Nemo follows a timid clownfish named Marlin searching for his lost son Nemo. Along the journey he meets a forgetful fish named Dory who helps him navigate the ocean. The adventure is filled with colorful sea creatures and emotional moments about family and courage.",
trailer:"https://www.youtube.com/watch?v=wZdpNglLbt8"
},

{
id:18,
title:"The Lion King",
rating:5,
createdAt:"1994-06-24",
poster:"https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
category:"kids",
genre:"animation",
description:
"The Lion King follows Simba, a young lion prince destined to become king of the Pride Lands. After tragedy forces him to leave his home, he must rediscover his identity and responsibility. With the help of loyal friends, Simba returns to reclaim his rightful place.",
trailer:"https://www.youtube.com/watch?v=7TavVZMewpY"
},

{
id:19,
title:"Shrek",
rating:4,
createdAt:"2001-05-18",
poster:"https://image.tmdb.org/t/p/w500/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
category:"kids",
genre:"animation",
description:
"Shrek is the story of an ogre whose peaceful swamp is invaded by fairy tale creatures. To get his home back, he must rescue Princess Fiona with the help of a talking donkey. Along the way Shrek discovers friendship, love, and acceptance in unexpected places.",
trailer:"https://www.youtube.com/watch?v=CwXOrWvPBPk"
},

{
id:20,
title:"Kung Fu Panda",
rating:4,
createdAt:"2008-06-06",
poster:"https://image.tmdb.org/t/p/w500/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
category:"kids",
genre:"animation",
description:
"Kung Fu Panda tells the story of Po, a clumsy panda who dreams of becoming a kung fu master. When he is unexpectedly chosen as the Dragon Warrior, Po must train under legendary masters. Through determination and humor, he proves that anyone can become a hero.",
trailer:"https://www.youtube.com/watch?v=PXi3Mv6KMzY"
},

{
id:21,
title:"Minions",
rating:3.5,
createdAt:"2015-07-10",
poster:"https://image.tmdb.org/t/p/w500/vlOgaxUiMOA8sPDG9n3VhQabnEi.jpg",
category:"kids",
genre:"animation",
description:
"Minions follows the mischievous yellow creatures as they search for a new villain to serve. Their journey leads them to Scarlet Overkill, a supervillain with a plan for world domination. The film is filled with chaotic adventures, humor, and lovable characters.",
trailer:"https://www.youtube.com/watch?v=eisKxhjBnZ0"
}

];

export default movies;