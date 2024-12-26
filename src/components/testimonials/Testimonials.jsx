export default function Testimonials() {
  return (
    <section className="py-20 bg-base-200">
      <div className="text-center">
        <h2 className="text-4xl font-bold">What Our Clients Say</h2>
        <p className="text-lg mt-4 mb-10">
          Trusted by thousands of happy clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Testimonial 1 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-lg">
              &quot;Excellent service! The team was very professional and
              efficient.&quot;
            </p>
            <h3 className="font-bold mt-4">- Sarah Johnson</h3>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-lg">
              &quot;Highly recommended. Amazing attention to detail!&quot;
            </p>
            <h3 className="font-bold mt-4">- Michael Smith</h3>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-lg">
              &quot;Great experience. Will definitely use their services
              again.&quot;
            </p>
            <h3 className="font-bold mt-4">- Emma Wilson</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
