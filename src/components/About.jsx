const aboutLists = [
  {
    title: "🌎 Explore the World",
    items: [
      "Find the best things to do in any city, from sightseeing to dining",
      "Discover hidden gems and off-the-beaten-path experiences",
    ],
  },
  {
    title: "🎯 Hit the Target",
    items: [
      "Save time planning your trip",
      "Discover new places and experiences you wouldn't have found on your own",
      "Make the most of your time in trips",
    ],
  },
  {
    title: "🤖 Powered by AI",
    items: [
      "Our AI-powered recommendations are trained on millions of reviews and articles",
      "Best of all, it's completely free!"
    ],
  },
];

const About = () => (
  <div className="grid mt-10 gap-8 lg:grid-cols-3">
    {aboutLists.map(({ title, items }) => (
      <div key={title} className="prose">
        <h2 className="mt-0 mb-4 font-bold text-gray-900">{title}</h2>
        <ul className="pl-5">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

export default About;
