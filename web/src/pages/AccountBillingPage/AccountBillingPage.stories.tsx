import type { Meta, StoryObj } from '@storybook/react'

import AccountBillingPage from './AccountBillingPage'

const meta: Meta<typeof AccountBillingPage> = {
  component: AccountBillingPage,
}

export default meta

type Story = StoryObj<typeof AccountBillingPage>

export const Primary: Story = {}
