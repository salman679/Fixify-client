import PopularServices from "../components/popular/Popular";
import Slider from "../components/slider/Slider";
import Testimonials from "../components/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Slider />
      <PopularServices />
      <Testimonials />
    </>
  );
}
