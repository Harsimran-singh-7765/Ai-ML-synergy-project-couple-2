export const games = [
  {
    id: '1',
    title: 'Fireboy and Watergirl',
    author: 'Oslo Albet',
    category: 'Adventure',
    description: 'Work together as Fireboy and Watergirl to solve puzzles and overcome obstacles. A perfect game for couples to test their teamwork!',
    instructions: 'Player 1 controls Fireboy (Arrow keys), Player 2 controls Watergirl (WASD). Collect gems and reach the exit together while avoiding hazards.',
    thumbnailUrl: 'https://td.doubleclick.net/td/ga/rul?tid=G-PLRTBHGSEL&gacid=927461466.1740497420&gtm=45je52o0v9165161826za200&dma=0&gcd=13l3l3l3l1l1&npa=0&pscdl=noapi&aip=1&fledge=1&frm=2&tag_exp=101732282~101732284~102015666~102067808~102482433~102539968~102558064~102587591~102605417~102640600~102658453&z=1284491734',
    projectId: 'fireboy-and-watergirl-forest-temple',
    featured: true,
    type: 'gameflare'
  },
  {
    id: '2',
    title: 'Love Calculator',
    author: 'ScratchMaster',
    category: 'Romance',
    description: 'Calculate your love compatibility with this fun and engaging love calculator!',
    instructions: 'Enter your names and discover your love percentage. Remember, it\'s all in good fun!',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_1280.png',
    projectId: '98878966',
    featured: true,
    type: 'scratch'
  }
];

export type Category = 'Adventure' | 'Romance';