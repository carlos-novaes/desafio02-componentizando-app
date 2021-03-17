import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button } from './Button';
import { GenreResponseProps } from '../@types';

interface SideBarProps {
  selectedGenreId: number;
  changeSelectedGenre: (id: number) => void;
}

export function SideBar({ selectedGenreId, changeSelectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => changeSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
