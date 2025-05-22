export default function AboutPage() {
  return (
    <div className="container py-12 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">About Helping Hand</h1>
          <p className="text-white/70">Connecting mentors and learners through valuable content</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-white/80">
            Helping Hand is a platform designed to connect people with mentors in various fields through curated Twitter
            content. We believe that valuable knowledge is shared every day on social media, but it can be hard to find
            the right content for your specific needs.
          </p>
          <p className="text-white/80">
            Our platform allows users to submit tweets they find valuable, which are then reviewed by our community and
            administrators. The best content is promoted to our dashboard, organized by category, making it easy to find
            mentors and resources in your field of interest.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-[#1a1425] p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#9147ff] mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Submit Content</h3>
              <p className="text-white/70">
                Users submit valuable tweets they find on Twitter, along with a description and category.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#1a1425] p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#9147ff] mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Review Process</h3>
              <p className="text-white/70">
                Submitted content goes to the waiting list, where it's reviewed by our administrators
                Or if the admin will not review, then after 10 like it will automatic move to dashboard 
                section.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#1a1425] p-6 shadow-sm">
              <div className="text-3xl font-bold text-[#9147ff] mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Discover Mentors</h3>
              <p className="text-white/70">
                Approved content is moved to the dashboard, organized by category for easy discovery.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Join Our Community</h2>
          <p className="text-white/80">
            Whether you're looking for mentorship or want to share valuable content with others, Helping Hand is the
            platform for you. Start by browsing our dashboard or submitting your first tweet today.
          </p>
        </div>
      </div>
    </div>
  )
}
