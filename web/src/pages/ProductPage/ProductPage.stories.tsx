import type { Meta, StoryObj } from '@storybook/react'

import ProductPage from './ProductPage'

const meta: Meta<typeof ProductPage> = {
  component: ProductPage,
}

export default meta

type Story = StoryObj<typeof ProductPage>

export const Primary: Story = {}
