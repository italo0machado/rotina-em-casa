declare namespace JSX {
  interface IntrinsicElements {
    'blossom-carousel': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        orientation?: 'horizontal' | 'vertical';
        snap?: 'none' | 'mandatory' | 'proximity';
        repeat?: boolean;
        load?: 'conditional' | 'always' | 'never';
      },
      HTMLElement
    >;
  }
}

declare module '@blossom-carousel/react' {
  import { ComponentPropsWithoutRef, ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';

  export interface BlossomCarouselProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
    snap?: 'none' | 'mandatory' | 'proximity';
    repeat?: boolean;
    load?: 'conditional' | 'always' | 'never';
  }

  export const BlossomCarousel: ForwardRefExoticComponent<
    BlossomCarouselProps & RefAttributes<HTMLDivElement>
  >;

  export default BlossomCarousel;
}