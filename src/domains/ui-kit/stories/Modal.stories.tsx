import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'

const meta: Meta<typeof Modal> = {
  title: 'UI Kit/Modal',
  component: Modal,
  args: {
    open: true,
    title: 'Modal title',
  },
  parameters: {
    controls: { exclude: ['open', 'onClose'] },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Basic: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <p className="text-sm text-semantic-text-primary">
            This is a simple modal using portal + ESC/backdrop close.
          </p>
        </Modal>
      </>
    )
  },
}
