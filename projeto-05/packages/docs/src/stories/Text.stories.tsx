import { Text, TextProps } from '@liberopneto-ui/react';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolores velit nulla nam, et vel ratione deserunt fuga itaque ipsa dolore qui. Eius sed deleniti dignissimos, necessitatibus quo voluptate. Soluta!',
  },
} as Meta<TextProps>;

export const Primary: StoryObj<TextProps> = {};

export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong Text',
    as: 'strong',
  },
};
