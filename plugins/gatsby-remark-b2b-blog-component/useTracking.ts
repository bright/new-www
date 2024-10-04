import { MutableRefObject, useEffect } from 'react'
import { trackCustomEvent } from '../../src/analytics/track-custom-event'

export const useTracking = (ref:  MutableRefObject<HTMLAnchorElement | null>) => {
  useEffect(() => {
    const links = Array.from(ref.current?.querySelectorAll<HTMLAnchorElement>('.bbc-wrapper') ?? []);

    const callback = (event: MouseEvent) => {
      const placement = links[0] === event.currentTarget ? 'top' : 'bottom';

      trackCustomEvent({
        category: 'Blog B2B component',
        eventName: `Blog B2B component ${placement} click`,
        label: window.location.href,
      })
    }

    links?.forEach((link) => {
      link.addEventListener('click', callback);
    });

    return () => {
      links?.forEach((link) => {
        link.removeEventListener('click', callback);
      });
    }
  }, [ref.current])
}
