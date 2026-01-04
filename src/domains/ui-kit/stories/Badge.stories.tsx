import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI Kit/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    tone: 'neutral',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Neutral: Story = {}
export const Success: Story = { args: { tone: 'success', children: 'Success' } }
export const Warning: Story = { args: { tone: 'warning', children: 'Warning' } }
export const Danger: Story = { args: { tone: 'danger', children: 'Danger' } }
