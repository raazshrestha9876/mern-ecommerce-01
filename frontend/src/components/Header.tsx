const Header = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] my-4 sm:my-6 md:my-8 mx-auto overflow-hidden rounded-xl md:rounded-2xl">
      {/* Background image with overlay gradient */}
      <div
        className="absolute inset-0 bg-[url('/header_img.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" aria-hidden="true" />

      {/* Content container */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="animate-fadeIn max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <h2 className="text-white font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-md">
            Order your favourite food here
          </h2>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-prose">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo modi fugiat perspiciatis. Aliquid nobis
            amet rem illo itaque harum quisquam et debitis. Provident itaque, iure dolores aliquam minima quia.
          </p>

          <button className="mt-2 sm:mt-3 md:mt-4 bg-white hover:bg-gray-100 text-[#747474] font-medium text-sm w-[max(1.5vw,160px)] sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 rounded-full cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            View Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
