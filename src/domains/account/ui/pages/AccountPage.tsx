import { useEffect } from 'react'
import { useAuth } from '@auth/ui/providers/AuthContext'
import { Link as RouterLink } from 'react-router-dom'
import { setNoIndexNoFollow } from '@/lib/seo'
import { AccountLayout } from '@account/ui/layouts'
import { AccountNav } from '@account/ui/components'

export const AccountPage = () => {
    const { signedIn, user, signIn, signOut } = useAuth()
    useEffect(() => { setNoIndexNoFollow() }, [])

    return (
        <AccountLayout sidebar={<AccountNav />} subtitle="Manage your orders, addresses, and saved cards.">
            {!signedIn ? (
                <div className="rounded-2xl border border-brand-blush/60 bg-white p-6">
                    <p className="text-brand-cocoa/80">Sign in to view orders and manage addresses.</p>
                    <button className="mt-3 rounded-full bg-brand-peach px-5 py-2 font-semibold text-brand-cocoa" onClick={() => signIn('Jane')}>Sign in</button>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="rounded-2xl border border-brand-blush/60 bg-white p-6">
                        <p className="text-brand-cocoa">Hi, {user?.firstName}</p>
                        <p className="text-sm text-brand-cocoa/70">Manage your orders, addresses, and saved cards.</p>
                        <button className="mt-3 rounded-full border border-brand-blush/60 px-5 py-2 font-semibold" onClick={signOut}>Sign out</button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                        <RouterLink to="/account/orders" className="rounded-2xl border border-brand-blush/60 bg-white p-6 hover:shadow-soft">
                            <p className="font-semibold text-brand-cocoa">Orders</p>
                            <p className="text-sm text-brand-cocoa/70">Track status & history</p>
                        </RouterLink>
                        <RouterLink to="/order/track" className="rounded-2xl border border-brand-blush/60 bg-white p-6 hover:shadow-soft">
                            <p className="font-semibold text-brand-cocoa">Track an order</p>
                            <p className="text-sm text-brand-cocoa/70">Use your confirmation ID</p>
                        </RouterLink>
                        <RouterLink to="/account/addresses" className="rounded-2xl border border-brand-blush/60 bg-white p-6 hover:shadow-soft">
                            <p className="font-semibold text-brand-cocoa">Addresses</p>
                            <p className="text-sm text-brand-cocoa/70">Save shipping locations</p>
                        </RouterLink>
                        <RouterLink to="/account/payments" className="rounded-2xl border border-brand-blush/60 bg-white p-6 hover:shadow-soft">
                            <p className="font-semibold text-brand-cocoa">Payment methods</p>
                            <p className="text-sm text-brand-cocoa/70">Store cards for faster checkout</p>
                        </RouterLink>
                    </div>
                </div>
            )}
        </AccountLayout>
    )
}

export default AccountPage
