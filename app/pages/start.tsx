// File: pages/start.tsx

import Head from "next/head";
import { Wendy_One } from "next/font/google";

const wendyone = Wendy_One({
  weight: "400",
  subsets: ["latin"],
});

const StartPage: React.FC = () => {
    
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wendy+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative min-h-screen bg-green-500 flex items-center justify-center">
        {/* Mobile frame */}
        <div className="relative w-full max-w-md h-screen bg-white shadow-md overflow-hidden flex flex-col">
          {/* Image Container */}
          <div className="relative flex-grow">
            <img
              src="/images/image2.png" // Replace with a different image for this layout
              alt="Different Start"
              className="w-full h-full object-cover"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
              {/* Description and Slogan */}
              <div className="text-center text-white space-y-6">
                <h1 className={`text-4xl font-bold ${wendyone.className}`}>
                  Welcome to the Next Step!
                </h1>
                <p className={`text-md`}>
                  Unleash Your Potential with the Right Match
                </p>
                {/* Ellipses with Button */}
                <div className="relative flex justify-center items-center top-20">
                  {/* Ellipses and other elements if necessary */}
                </div>
              </div>
            </div>
            {/* Footer Section */}
            <div className="absolute bottom-0 w-full">
              <footer className="bg-[#21322E] text-white py-2 text-center w-full">
                <p className="text-sm">© 2024 Visionverse. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartPage;
