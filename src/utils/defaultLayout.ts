import { ScoreboardUILayout } from '../types';

export const DEFAULT_LAYOUT: ScoreboardUILayout = {
  team1Name: {
    x: 10,
    y: 18,
    width: 380,
    height: 86,
    zIndex: 20,
  },
  team1Score: {
    x: 10,
    y: 33,
    width: 380,
    height: 310,
    zIndex: 10,
  },
  timer: {
    x: 50,
    y: 35,
    width: 330,
    height: 330,
    zIndex: 25,
  },
  team2Name: {
    x: 90,
    y: 18,
    width: 380,
    height: 86,
    zIndex: 20,
  },
  team2Score: {
    x: 90,
    y: 33,
    width: 380,
    height: 310,
    zIndex: 10,
  },
};
