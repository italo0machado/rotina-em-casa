declare module '@blossom-carousel/react' {
  import { ComponentPropsWithoutRef, ReactNode } from 'react';

  export interface BlossomCarouselProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    snap?: 'none' | 'mandatory' | 'proximity';
    repeat?: boolean;
    load?: 'conditional' | 'always' | 'never';
  }

  export const BlossomCarousel: React.ForwardRefExoticComponent<
    BlossomCarouselProps & React.RefAttributes<HTMLDivElement>
  >;

  export default BlossomCarousel;
}