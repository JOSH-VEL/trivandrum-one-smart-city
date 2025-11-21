import { Card } from './ui/card';

interface CategoryCardProps {
  icon: any;
  label?: string;
  name?: string;
  onClick?: () => void;
  gradient?: string | boolean;
}

export function CategoryCard({ icon: Icon, label, name, onClick, gradient }: CategoryCardProps) {
  const text = label ?? name ?? '';
  return (
    <Card
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer 
        transition-all duration-300 hover:scale-105 hover:shadow-lg
        ${gradient ? 'gradient-primary text-white' : 'bg-card'}
        p-6 flex flex-col items-center justify-center gap-3
        min-h-[120px]
      `}
    >
      <Icon className="w-10 h-10" />
      <span className="font-medium text-center text-sm">{text}</span>
    </Card>
  );
}
