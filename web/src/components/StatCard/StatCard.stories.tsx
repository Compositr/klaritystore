// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import StatCard from './StatCard'

const meta: Meta<typeof StatCard> = {
  component: StatCard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StatCard>

export const Primary: Story = {}
