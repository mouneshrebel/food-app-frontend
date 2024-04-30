import React from "react";
import { useTrail, animated } from "react-spring";

const About = () => {
  const paragraphs = [
    {
      title: "Our Mission",
      content:
        "Welcome to FoodDelight, your go-to destination for delicious and convenient food ordering.",
    },
    {
      title: "Our Menu",
      content:
        "At FoodDelight, we believe in making your dining experience as enjoyable as possible. Our curated menu features a wide range of cuisines to satisfy every palate.",
    },
    {
      title: "Our Team",
      content:
        "Our dedicated team of chefs and delivery experts work tirelessly to ensure your orders are prepared with care and delivered promptly.",
    },
    {
      title: "Thank You",
      content:
        "Thank you for choosing FoodDelight. We look forward to serving you with mouthwatering dishes that will leave you craving for more.",
    },
  ];

  const trail = useTrail(paragraphs.length, {
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 800 },
  });

  const colors = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-purple-300"];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={props}
            className={`rounded-lg shadow-md p-6 mb-4 ${colors[index]}`}
          >
            <h1 className="text-2xl font-semibold mb-4">
              {paragraphs[index].title}
            </h1>
            <p className="text-gray-600">{paragraphs[index].content}</p>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default About;
