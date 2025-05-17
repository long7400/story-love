import { useEffect, useState } from "react";

interface FooterProps {
  profile1Name: string;
  profile2Name: string;
}

export default function Footer({ profile1Name, profile2Name }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-script text-secondary mb-4">
          {profile1Name} & {profile2Name}
        </h2>
        <p className="max-w-lg mx-auto mb-6 text-gray-300">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </p>
        <p className="text-sm text-gray-400">
          Made with{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>{" "}
          | © {currentYear}
        </p>
      </div>
    </footer>
  );
}
