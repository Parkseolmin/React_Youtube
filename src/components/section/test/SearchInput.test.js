import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SearchInput from '../SearchInput';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchInput Test', () => {
  it('renders SearchInput', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('updates input value on change', () => {
    render(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('navigates to search page on submit with valid input', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    fireEvent.submit(screen.getByLabelText(/검색/i));

    // 네비게이션이 올바른 URL로 이루어졌는지 확인
    expect(mockNavigate).toHaveBeenCalledWith('/search/test');
  });

  it('입력 필드가 비어있을 때 navigate가 호출되지 않는지 테스트', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <SearchInput />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');

    // 빈 값으로 제출
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(screen.getByLabelText(/검색/i));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
