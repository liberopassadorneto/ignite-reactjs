import { ComponentProps, ElementType } from 'react';
import { styled } from '../styles';

export const Button = styled('button', {
  all: 'unset',

  borderRadius: '$sm',
  boxSizing: 'border-box',

  fontSize: '$sm',
  fontWeight: '$medium',
  fontFamily: '$default',

  textAlign: 'center',

  minWidth: 120,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  gap: '$2',

  cursor: 'pointer',

  svg: {
    width: '$4',
    height: '$4',
  },

  variants: {
    variant: {
      primary: {
        color: '$white',
        backgroundColor: '$something',
      },
    },
  },
});

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType;
}
