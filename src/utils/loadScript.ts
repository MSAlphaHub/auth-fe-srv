export const loadScript = async (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const scriptTag = document.querySelector(`script[src="${src}"]`);

    if (scriptTag) {
      resolve();
    }

    const script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve();
    script.onerror = () => reject('load script failed');

    document.head.appendChild(script);
  });
};
