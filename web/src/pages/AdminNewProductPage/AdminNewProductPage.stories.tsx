import type { Meta, StoryObj } from '@storybook/react'

import AdminNewProductPage from './AdminNewProductPage'

const meta: Meta<typeof AdminNewProductPage> = {
  component: AdminNewProductPage,
}

export default meta

type Story = StoryObj<typeof AdminNewProductPage>

export const Primary: Story = {}
