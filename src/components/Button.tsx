import styled from 'styled-components';

export const Button = styled.button`
  background: var(--color-primary);
  color: white;
  font-family: var(--font-body);
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;

  &:hover {
    background: var(--color-secondary);
  }
`;
