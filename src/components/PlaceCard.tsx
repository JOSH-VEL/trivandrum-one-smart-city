import { MapPin, Clock, Phone } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Place } from '../types';
import { formatDistance } from '../lib/location';

interface PlaceCardProps {
  place: Place & { distance?: number };
  onClick?: () => void;
}

// Category-specific placeholder images
const categoryImages: Record<string, string> = {
  medicine: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409226485-0.webp',
  food: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409226939-0.webp',
  shopping: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409226403-0.webp',
  hotel: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409227457-0.webp',
  tourist: 'https://storage.googleapis.com/blink-core-storage/projects/trivandrum-one-smart-city-platform-mfrrlq54/images/generated-image-1763409204150-0.webp',
};

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  const imageUrl = categoryImages[place.category] || categoryImages.tourist;

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Distance Badge */}
        {place.distance !== undefined && (
          <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
            {formatDistance(place.distance)}
          </Badge>
        )}
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 capitalize">
          {place.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{place.name}</h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {place.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{place.area}</span>
          </div>
          
          {place.timing && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{place.timing}</span>
            </div>
          )}
          
          {place.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{place.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
