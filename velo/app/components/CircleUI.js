export default function CircleUI() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-900">
        <div className="relative w-64 h-64">
          {/* Main circle */}
          <div className="absolute inset-0 bg-purple-700 rounded-full" />
          
          {/* Inner circle (black background) */}
          <div className="absolute inset-4 bg-purple-900 rounded-full" />
          
          {/* Blue ball */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-400 rounded-full" />
          
          {/* Purple pill */}
          <div className="absolute bottom-4 right-4 w-12 h-8 bg-purple-400 rounded-full transform rotate-45" />
          
          {/* Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-6xl font-bold">0</span>
          </div>
        </div>
      </div>
    );
  }
  