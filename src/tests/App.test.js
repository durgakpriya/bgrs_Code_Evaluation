import { render, screen } from '@testing-library/react';
import App, { CharacterComponent } from './Components/App';

test('renders Dropdown to select characters', () => {
  render(<App />)
  const linkElement = screen.getByText(/Character Names/i);
  const characterDropdown = screen.getByTestId('character-names')
  expect(linkElement).toBeInTheDocument()
  expect(characterDropdown).toBeVisible()
});

test('Render Movies List when provided', () => {
  render(<CharacterComponent moviesList={['A New Hope', 'The Emperor FightBack']} />)
  const movieCardList = screen.getByTestId('movies-list')
  expect(movieCardList).toBeVisible()
});
