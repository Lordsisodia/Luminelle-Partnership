import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '../components/Select'

const meta: Meta<typeof Select> = {
  title: 'UI Kit/Select',
  component: Select,
  args: {
    label: 'Status',
    children: (
      <>
        <option value="">Select status</option>
        <option value="draft">Draft</option>
        <option value="scheduled">Scheduled</option>
        <option value="published">Published</option>
      </>
    ),
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Basic: Story = {}
export const Error: Story = { args: { error: 'Please choose a status' } }
export const FullWidth: Story = { args: { fullWidth: true } }
