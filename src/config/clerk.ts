export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined

// Keep this in sync with the placeholder used in `.env.example`.
export const isClerkConfigured = Boolean(clerkPublishableKey) && clerkPublishableKey !== 'pk_test_placeholder'

