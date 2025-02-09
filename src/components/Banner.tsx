interface BannerProps {
  showBanner: boolean;
  onClose: () => void;
}

export default function Banner({ showBanner, onClose }: BannerProps) {
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/50 text-[#D2B48C] py-1.5 md:py-2 px-3 md:px-4 text-center text-xs md:text-sm z-50 flex items-center justify-between backdrop-blur-sm">
      <div className="flex-1 max-w-[40px]" />
      <div className="flex-1 text-center">
        NOW OPEN | EVERYDAY FROM 07:00 AM TO 10:00 PM
      </div>
      <div className="flex-1 flex justify-end max-w-[40px]">
        <button
          onClick={onClose}
          className="text-[#D2B48C] hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
