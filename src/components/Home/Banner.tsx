"use client";

const Banner: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row w-full min-h-[500px]">
        <div className="flex-1 flex items-center justify-center bg-[#D4EFFF] p-8 min-h-[200px]">
          <div className="text-center md:text-left">
          </div>
        </div>
        <div className="flex-1 h-full">
          <div className="text-center md:text-left">
            <div className="relative h-[500px] bg-gray-200">
                <div className="absolute inset-0 flex">
                  {/* Before Image */}
                  <div className="w-1/2 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">Before</span>
                  </div>
                  {/* After Image */}
                  <div className="w-1/2 bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">After</span>
                  </div>
                </div>
                {/* Slider Icon */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
