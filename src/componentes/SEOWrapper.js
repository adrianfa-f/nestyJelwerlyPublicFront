// components/SEOWrapper.js
import useSEO from "../hooks/useSEO";

const SEOWrapper = ({
  children,
  title,
  description,
  keywords,
  image,
  type = "website",
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useSEO({
    title,
    description,
    keywords,
    image,
    url: currentUrl,
    type,
  });

  return children;
};

export default SEOWrapper;
