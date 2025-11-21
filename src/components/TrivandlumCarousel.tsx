import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Landmark {
  name: string;
  description: string;
  image: string;
}

const landmarks: Landmark[] = [
  {
    name: 'Kovalam Beach',
    description: 'Famous beach destination with golden sand and clear blue waters',
    image: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409204150-0.webp'
  },
  {
    name: 'Ponmudi Hill Station',
    description: 'Misty mountains and lush tea plantations',
    image: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409205179-0.webp'
  },
  {
    name: 'Padmanabhaswamy Temple',
    description: 'Ancient temple with stunning gopuram architecture',
    image: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409208306-0.webp'
  },
  {
    name: 'Veli Tourist Village',
    description: 'Serene lake with boat rides and floating bridge',
    image: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409207405-0.webp'
  },
  {
    name: 'Lulu Mall',
    description: 'Modern shopping destination with entertainment',
    image: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409209503-0.webp'
  }
];

export function TrivandrumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % landmarks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + landmarks.length) % landmarks.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % landmarks.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      {/* Main Carousel */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        {landmarks.map((landmark, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 scale-100'
                : index < currentIndex
                ? 'opacity-0 -translate-x-full scale-95'
                : 'opacity-0 translate-x-full scale-95'
            }`}
          >
            <img
              src={landmark.image}
              alt={landmark.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold mb-2 animate-slide-up">
                {landmark.name}
              </h3>
              <p className="text-lg opacity-90 animate-fade-in">
                {landmark.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {landmarks.map((landmark, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-12 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side Preview (Desktop) */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-2">
        {landmarks.map((landmark, index) => {
          const offset = index - currentIndex;
          if (Math.abs(offset) > 2) return null;
          
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-white scale-110 opacity-100'
                  : 'opacity-50 hover:opacity-80 hover:scale-105'
              }`}
            >
              <img
                src={landmark.image}
                alt={landmark.name}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

