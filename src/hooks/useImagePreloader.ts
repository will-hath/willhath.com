const useImagePreloader = (imageSrc: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
};

export default useImagePreloader;
