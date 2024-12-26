export default function ContactUs() {
  return (
    <section className="py-20 bg-base-300">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Get In Touch</h2>
        <p className="text-lg mt-4 mb-10">We would love to hear from you!</p>
      </div>

      <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-lg shadow-lg">
        <form>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Message</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="5"
              placeholder="Your Message"
            ></textarea>
          </div>

          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </section>
  );
}
