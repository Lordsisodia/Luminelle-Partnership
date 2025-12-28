import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from '../components/TextField'

const meta: Meta<typeof TextField> = {
  title: 'UI Kit/TextField',
  component: TextField,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helpText: 'We never share your email.',
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Basic: Story = {}
export const Error: Story = { args: { error: 'This field is required', helpText: undefined } }
export const FullWidth: Story = { args: { fullWidth: true } }
