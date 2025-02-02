import React, { useState } from "react";
import Stamp from "./data/stamp.png";
import CelebrationImage from "./data/bear-kiss-bear-kisses.gif";
import ExplosiveButton from './ExplosiveButton';

const ValentinesCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWhiteBoxVisible, setIsWhiteBoxVisible] = useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [showText, setShowText] = useState(false);
  const [expandWhiteBox, setExpandWhiteBox] = useState(false);

  const moveButton = (e) => {
    const noButton = e.target;
    const whiteBox = document.querySelector(".white-box");
    const whiteBoxRect = whiteBox.getBoundingClientRect();

    const maxX = whiteBoxRect.width - noButton.offsetWidth;
    const maxY = whiteBoxRect.height - noButton.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  };

  const handleClick = () => {
    if (!isOpen) {
      // Weißes Rechteck erscheint von der Mitte aus und fährt 150px nach oben
      setIsWhiteBoxVisible(true);

      // Nach 700ms fährt das rote Rechteck nach unten
      setTimeout(() => {
        setIsOpen(true);
      }, 700);
    }
  };

  const handleYesClick = () => {
    setIsFinalStep(true);
  };

  const handleTextReveal = () => {
    setTimeout(() => {
      setShowText(true);
      setExpandWhiteBox(true); // Weißes Rechteck dehnt sich nach unten aus
    }, 500);

  };

  return (
    <div
      className="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="relative w-full max-w-3xl mx-auto">
        {/* Weißes Rechteck (von der Mitte nach oben) */}
        <div
          className={`white-box absolute left-1/2 top-1/2 w-full max-w-[700px] bg-white rounded-lg shadow-lg transform -translate-x-1/2 transition-all duration-700 ease-in-out ${isWhiteBoxVisible
            ? `${expandWhiteBox ? "-translate-y-1/2" : "-translate-y-[calc(50%+150px)]"} opacity-100`
            : "-translate-y-1/2 opacity-0"
            } ${expandWhiteBox ? "h-[80vh] p-6" : "aspect-[1.4/1]"
            }`}
          style={{
            zIndex: 1,
            willChange: "transform, opacity"
          }}
        >

          {!isFinalStep ? (
            <>
              <div className="flex justify-center items-center h-full flex-col">
                <p className="text-5xl font-bold text-[#ff9aad] " style={{ fontFamily: "'Pacifico', cursive" }}>
                  My love,
                </p>
                <br />
                <p className="text-center text-[#ff9aad] text-xl md:text-2xl font-semibold">
                  Do you want to be my Valentine?
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    className="px-6 py-2 bg-[#ffb6c1] text-white font-bold rounded-lg shadow-md hover:bg-[#ff9aad] transition-colors duration-300"
                    onClick={handleYesClick}
                  >
                    Yes
                  </button>
                  <button
                    className="px-6 py-2 border-2 border-[#ffb6c1] text-[#ffb6c1] rounded-lg shadow-md hover:bg-[#ffb6c1] hover:text-white transition-colors duration-300"
                    onMouseOver={moveButton}
                    id="noButton"
                    style={{
                      position: "relative",
                      transition: "left 0.3s ease-out, top 0.3s ease-out",
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-start h-full p-6 overflow-hidden">
              <img src={CelebrationImage} alt="Celebration" className="w-28 mb-4" />
              <p className="text-center text-[#ffb6c1] text-xl md:text-2xl font-semibold">
                <p>How wonderful 🤍,</p>
                <p className="font-light">You are the best!</p>
              </p>
              {!showText ? (
                <>
                  <ExplosiveButton onClick={handleTextReveal} />
                </>
              ) : (
                <div className="flex flex-col items-center mt-4 w-full h-full overflow-hidden">
                  <div className="w-full h-[60vh] overflow-y-scroll no-scrollbar p-4">
                    <p className="text-center text-[#ff9aad] text-lg md:text-xl font-light px-6">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

                      Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

                      Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.

                      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.

                      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    </p>
                  </div>
                  <div className="flex justify-center w-full mt-6">
                    <p className="text-3xl font-bold text-[#ff9aad] " style={{ fontFamily: "'Pacifico', cursive" }}>
                      Thanks
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hauptrechteck (rot) */}
        {!isFinalStep && (
          <div
            className={`absolute left-1/2 top-1/2 w-full max-w-[700px] aspect-[1.4/1] bg-[#ffb6c1] rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer transform -translate-x-1/2 transition-all duration-700 ease-in-out ${isOpen ? "translate-y-[calc(100%+20px)] opacity-0" : "-translate-y-1/2 opacity-100"
              }`}
            onClick={handleClick}
            style={{ zIndex: 2, willChange: "transform, opacity" }}
          >
            <div className="absolute top-4 right-4 md:w-24 w-16">
              <img src={Stamp} alt="Decorative stamp" className="w-full h-full object-contain" />
            </div>
            <p className="text-5xl font-bold text-[#ffffff] " style={{ fontFamily: "'Pacifico', cursive" }}>
              For you, my love
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentinesCard;