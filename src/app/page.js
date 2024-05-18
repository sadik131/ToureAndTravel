import Testimonial from "./components/Testimonial";
import Home from "./components/home/Home";
import PackSection from "./components/home/packages/PackSection";


export default function page() {

  return (
    <div>
      <Home></Home>
      <PackSection></PackSection>
      <Testimonial></Testimonial>
    </div>
  );
}
