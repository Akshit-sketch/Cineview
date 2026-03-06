const movies = [

/* ---------- TOP MOVIES RIGHT NOW ---------- */

{
id:1,
title:"Interstellar",
description:"A team travels through a wormhole in space.",
rating:5,
createdAt:"2024-03-01",
poster:"https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg",
category:"top"
},

{
id:2,
title:"Inception",
description:"A thief enters dreams to steal secrets.",
rating:4.5,
createdAt:"2024-02-20",
poster:"https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
category:"top"
},

{
id:3,
title:"Oppenheimer",
description:"The story of the father of the atomic bomb.",
rating:4.5,
createdAt:"2024-02-10",
poster:"https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
category:"top"
},

{
id:4,
title:"Dune",
description:"A noble family fights for control of a desert planet.",
rating:4,
createdAt:"2024-01-15",
poster:"https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
category:"top"
},

{
id:5,
title:"The Batman",
description:"Batman uncovers corruption in Gotham City.",
rating:4,
createdAt:"2024-01-10",
poster:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
category:"top"
},

{
id:6,
title:"Avatar: The Way of Water",
description:"Jake Sully protects his family on Pandora.",
rating:4,
createdAt:"2024-01-05",
poster:"https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
category:"top"
},

{
id:7,
title:"John Wick 4",
description:"John Wick faces the High Table.",
rating:4.5,
createdAt:"2024-01-02",
poster:"https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
category:"top"
},

/* ---------- CLASSIC BLOCKBUSTERS ---------- */

{
id:8,
title:"The Dark Knight",
description:"Batman faces the Joker.",
rating:5,
createdAt:"2010-05-01",
poster:"https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
category:"classic"
},

{
id:9,
title:"Titanic",
description:"A love story aboard the doomed ship.",
rating:5,
createdAt:"2005-03-01",
poster:"https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
category:"classic"
},

{
id:10,
title:"Jurassic Park",
description:"Dinosaurs escape in a theme park.",
rating:4.5,
createdAt:"2003-03-01",
poster:"https://image.tmdb.org/t/p/w500/c414cDeQ9b6qLPLeKmiJuLDUREJ.jpg",
category:"classic"
},

{
id:11,
title:"The Matrix",
description:"A hacker learns reality is a simulation.",
rating:5,
createdAt:"2000-03-01",
poster:"https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
category:"classic"
},

{
id:12,
title:"Gladiator",
description:"A Roman general seeks revenge.",
rating:4.5,
createdAt:"2001-03-01",
poster:"https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
category:"classic"
},

{
id:13,
title:"Forrest Gump",
description:"The story of a simple man with a big heart.",
rating:5,
createdAt:"1999-03-01",
poster:"https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
category:"classic"
},

{
id:14,
title:"The Lord of the Rings",
description:"A journey to destroy the One Ring.",
rating:5,
createdAt:"2002-03-01",
poster:"https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
category:"classic"
},

/* ---------- KIDS MOVIES ---------- */

{
id:15,
title:"Toy Story",
description:"Toys come to life when humans leave.",
rating:4,
createdAt:"2015-03-01",
poster:"https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
category:"kids"
},

{
id:16,
title:"Frozen",
description:"A princess with magical ice powers.",
rating:4,
createdAt:"2016-03-01",
poster:"https://image.tmdb.org/t/p/w500/mbkKBeqSFWUpyKjWfP9H3j1G1Yc.jpg",
category:"kids"
},

{
id:17,
title:"Finding Nemo",
description:"A father fish searches for his lost son.",
rating:4.5,
createdAt:"2014-03-01",
poster:"https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
category:"kids"
},

{
id:18,
title:"The Lion King",
description:"A young lion prince learns responsibility.",
rating:5,
createdAt:"2012-03-01",
poster:"https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
category:"kids"
},

{
id:19,
title:"Shrek",
description:"An ogre rescues a princess.",
rating:4,
createdAt:"2010-03-01",
poster:"https://image.tmdb.org/t/p/w500/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
category:"kids"
},

{
id:20,
title:"Kung Fu Panda",
description:"A panda becomes a kung fu warrior.",
rating:4,
createdAt:"2013-03-01",
poster:"https://image.tmdb.org/t/p/w500/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
category:"kids"
},

{
id:21,
title:"Minions",
description:"The mischievous yellow helpers.",
rating:3.5,
createdAt:"2018-03-01",
poster:"https://image.tmdb.org/t/p/w500/vlOgaxUiMOA8sPDG9n3VhQabnEi.jpg",
category:"kids"
}

];

export default movies;