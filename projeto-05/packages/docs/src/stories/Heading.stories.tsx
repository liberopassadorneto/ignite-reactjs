import { Heading, HeadingProps } from '@liberopneto-ui/react';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    size: 'md',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolores velit nulla nam, et vel ratione deserunt fuga itaque ipsa dolore qui. Eius sed deleniti dignissimos, necessitatibus quo voluptate. Soluta!',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<HeadingProps>;

export const Primary: StoryObj<HeadingProps> = {};

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 Heading',
    as: 'h1',
  },
  parameters: {
    docs: {
      description: {
        story:
          'As default, the component renders a `h2` tag. You can change it by passing the `as` prop.',
      },
    },
  },
};
