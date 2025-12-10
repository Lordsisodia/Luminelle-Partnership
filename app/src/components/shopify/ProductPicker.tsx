import { useState } from 'react'
import { Button } from '@shopify/polaris'

export function ProductPicker({ onSelect }: { onSelect: (products: any[]) => void }) {
    const [loading, setLoading] = useState(false)

    const handleOpenPicker = async () => {
        setLoading(true)
        try {
            // @ts-ignore - shopify global is injected
            const picker = await window.shopify.resourcePicker({
                type: 'product',
                multiple: true,
            })

            const result = await picker.dispatch(window.shopify.ResourcePicker.Action.SELECT)

            if (result) {
                onSelect(result)
            }
        } catch (err) {
            console.error('Error opening picker:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button onClick={handleOpenPicker} loading={loading} variant="primary">
            Select Products
        </Button>
    )
}
