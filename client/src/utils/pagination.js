export const pagination = (element, observer, isNextPage, setPage) => {
  if (!element) return;
  if (observer.current) observer.current.disconnect();
  if (!isNextPage) return;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) setPage((prev) => prev + 1);
  }, options);

  observer.current.observe(element);
};
