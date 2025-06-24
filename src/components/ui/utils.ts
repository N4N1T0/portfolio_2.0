import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-[color,background-color] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-linear-to-b from-zinc-700 to-zinc-800 text-white inset-shadow-[0_1px_2px] inset-shadow-white/50 transition-colors text-shadow-xs hover:to-zinc-700 dark:from-zinc-600 dark:to-zinc-700 dark:inset-shadow-white/30 dark:hover:to-zinc-600',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-foreground underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-8 px-4',
        lg: 'h-10 px-6',
        icon: 'size-8',
        'icon:lg': 'size-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
