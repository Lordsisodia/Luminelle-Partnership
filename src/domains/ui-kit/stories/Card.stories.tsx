import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

const meta: Meta<typeof Card> = {
  title: 'UI Kit/Card',
  component: Card,
  args: {
    title: 'Card title',
    subtitle: 'Optional subtitle',
    children: 'Card body content',
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: {
    actions: <Button size="sm">Action</Button>,
  },
}

export const NoHeader: Story = {
  args: {
    title: undefined,
    subtitle: undefined,
    actions: undefined,
  },
}
