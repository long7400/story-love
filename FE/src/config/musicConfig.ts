/**
 * Configuration for the music player
 */

export interface Song {
  title: string;
  src: string;
}

/**
 * List of songs available in the music player
 */
export const songs: Song[] = [
  {
    title: 'Romantic Melody',
    src: '/music/background-music.mp3',
  },
  // Add more songs here when available
];

/**
 * Default volume level for the music player
 */
export const DEFAULT_VOLUME = 0.3;