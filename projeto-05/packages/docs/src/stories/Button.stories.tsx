import { Button, ButtonProps } from '@liberopneto-ui/react';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Send',
  },
} as Meta<ButtonProps>;

export const Primary: StoryObj<ButtonProps> = {};
