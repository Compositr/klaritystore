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

import ProductForm from './ProductForm'

const meta: Meta<typeof ProductForm> = {
  component: ProductForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProductForm>

export const Primary: Story = {}
