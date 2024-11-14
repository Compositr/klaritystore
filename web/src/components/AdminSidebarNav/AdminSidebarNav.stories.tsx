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

import AdminSidebarNav from './AdminSidebarNav'

const meta: Meta<typeof AdminSidebarNav> = {
  component: AdminSidebarNav,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AdminSidebarNav>

export const Primary: Story = {}
