import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] flex flex-col justify-center space-y-4 rounded-lg border border-dashed p-2">
        <ThreeDPhotoCarousel />
      </div>
    </div>
  )
}
