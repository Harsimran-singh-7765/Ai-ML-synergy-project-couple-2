export const games = [
  {
    id: '1',
    title: 'Love Memory Match',
    author: 'CupidGames',
    category: 'Memory',
    description: 'Test your memory skills together with your loved one in this romantic card matching game.',
    instructions: 'Take turns matching pairs of cards. Work together to achieve the highest score!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200',
    projectId: '326163967',
    featured: true
  },
  {
    id: '2',
    title: 'Couple\'s Puzzle',
    author: 'LoveLogic',
    category: 'Puzzle',
    description: 'Solve romantic puzzles together in this engaging couple\'s game that strengthens your bond.',
    instructions: 'Work as a team to solve each puzzle. Communication is key!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1200',
    projectId: '57765552',
    featured: true
  }
];

export type Category = 'Memory' | 'Puzzle';