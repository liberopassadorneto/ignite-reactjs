import { Box, BoxProps, Text } from '@liberopneto-ui/react';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Surfaces/Box',
  component: Box,
  args: {
    children: (
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, adipisci!
        Unde, praesentium omnis laborum corporis adipisci, cupiditate temporibus
        tempora voluptate voluptates blanditiis impedit velit aspernatur qui
        possimus ea perspiciatis officia!
      </Text>
    ),
  },
} as Meta<BoxProps>;

export const Primary: StoryObj<BoxProps> = {};
