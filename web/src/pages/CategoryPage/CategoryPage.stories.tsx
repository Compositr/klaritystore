import type { Meta, StoryObj } from '@storybook/react'

import CategoryPage from './CategoryPage'

const meta: Meta<typeof CategoryPage> = {
  component: CategoryPage,
}

export default meta

type Story = StoryObj<typeof CategoryPage>

export const Primary: Story = {}
