import { Avatar, AvatarProps } from '@liberopneto-ui/react';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  args: {
    src: 'https://github.com/liberopassadorneto.png',
    alt: 'Libero Passador Neto',
  },
} as Meta<AvatarProps>;

export const Primary: StoryObj<AvatarProps> = {};

export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
  },
};
