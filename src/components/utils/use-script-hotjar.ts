import { useState, useEffect } from 'react'

export function useScriptHotjar(src: string): string {
  const [status, setStatus] = useState<string>(src ? 'loading' : 'idle')
  useEffect(() => {
    if (!src) {
      setStatus('idle')
      return
    }

    let script: any = document.querySelector(`script[data-type="hotjar"]`)
    if (!script) {
      script = document.createElement('script')
      script.text = `(function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2864857,hjsv:jat};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`

      script.async = true
      script.setAttribute('data-type', 'hotjar')
      script.setAttribute('data-status', 'loading')
      document.head.appendChild(script)
      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error')
      }
      script.addEventListener('load', setAttributeFromEvent)
      script.addEventListener('error', setAttributeFromEvent)
    } else {
      setStatus(script.getAttribute('data-status'))
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error')
    }
    script.addEventListener('load', setStateFromEvent)
    script.addEventListener('error', setStateFromEvent)
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent)
        script.removeEventListener('error', setStateFromEvent)
      }
    }
  }, [src])
  return status
}
