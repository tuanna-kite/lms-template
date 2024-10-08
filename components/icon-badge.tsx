import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const backgroundVariants = cva('rounded-full flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-sky-100',
      success: 'bg-emerald-100',
    },
    iconVariant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
    },
    size: {
      default: 'p-2',
      sm: 'p-1',
    },
    defaultVariant: {
      variant: 'default',
      size: 'default',
    },
  },
});

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
    },
    size: {
      default: 'w-8 h-8',
      sm: 'w-4 h-4',
    },
    defaultVariant: {
      variant: 'default',
      size: 'default',
    },
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

const IconBadge = ({ icon: Icon, variant = 'default', size = 'default' }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};

export default IconBadge;
