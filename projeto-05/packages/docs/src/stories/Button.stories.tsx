import { Button, ButtonProps } from '@liberopneto-ui/react';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Button',
  },
} as Meta<ButtonProps>;

export const Primary: StoryObj<ButtonProps> = {};

export const Big: StoryObj<ButtonProps> = {
  args: {
    size: 'big',
  },
};
