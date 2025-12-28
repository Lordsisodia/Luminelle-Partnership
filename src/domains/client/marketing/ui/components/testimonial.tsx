export default function Testimonial() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="max-w-80 rounded-2xl bg-black text-white">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"
              alt=""
              className="h-[270px] w-full rounded-2xl object-cover object-top transition-all duration-300 hover:scale-105"
            />
            <div className="pointer-events-none absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="px-4 pb-4">
            <p className="border-b border-gray-600 pb-5 font-medium">
              “Radiant made undercutting all of our competitors an absolute breeze.”
            </p>
            <p className="mt-4">— John Doe</p>
            <p className="bg-gradient-to-r from-brand-peach via-brand-cocoa to-brand-peach bg-clip-text text-sm font-medium text-transparent">
              Content Marketing
            </p>
          </div>
        </div>
        <div className="max-w-80 rounded-2xl bg-black text-white">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
              alt=""
              className="h-[270px] w-full rounded-2xl object-cover object-top transition-all duration-300 hover:scale-105"
            />
            <div className="pointer-events-none absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="px-4 pb-4">
            <p className="border-b border-gray-600 pb-5 font-medium">
              “Radiant made undercutting all of our competitors an absolute breeze.”
            </p>
            <p className="mt-4">— John Doe</p>
            <p className="bg-gradient-to-r from-brand-peach via-brand-cocoa to-brand-peach bg-clip-text text-sm font-medium text-transparent">
              Content Marketing
            </p>
          </div>
        </div>
        <div className="max-w-80 rounded-2xl bg-black text-white">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop"
              alt=""
              className="h-[270px] w-full rounded-2xl object-cover object-top transition-all duration-300 hover:scale-105"
            />
            <div className="pointer-events-none absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="px-4 pb-4">
            <p className="border-b border-gray-600 pb-5 font-medium">
              “Radiant made undercutting all of our competitors an absolute breeze.”
            </p>
            <p className="mt-4">— John Doe</p>
            <p className="bg-gradient-to-r from-brand-peach via-brand-cocoa to-brand-peach bg-clip-text text-sm font-medium text-transparent">
              Content Marketing
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
