import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LETTERS = ["O", "P", "U", "S"];
const LETTER_STAGGER = 0.1;

const BrandMark = () => {
  const [expanded, setExpanded] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const MotionDiv = motion.div;
  const MotionP = motion.p;
  const MotionSpan = motion.span;

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarsePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="brand-mark"
      onMouseEnter={!isCoarsePointer ? () => setExpanded(true) : undefined}
      onMouseLeave={!isCoarsePointer ? () => setExpanded(false) : undefined}
      onClick={isCoarsePointer ? () => setExpanded((v) => !v) : undefined}
      role={isCoarsePointer ? "button" : undefined}
      aria-label={isCoarsePointer ? "Toggle OPUS definition" : undefined}
      tabIndex={isCoarsePointer ? 0 : undefined}
      onKeyDown={
        isCoarsePointer
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setExpanded((v) => !v);
              }
            }
          : undefined
      }
    >
      <div className="brand-mark__identity">
        <img src="/opusLogo.svg" alt="OPUS logo" className="brand-mark__logo" />
        <AnimatePresence>
          {expanded && (
            <MotionDiv
              className="brand-mark__name-letters"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {LETTERS.map((letter, i) => (
                <MotionSpan
                  key={letter}
                  className="brand-mark__letter"
                  variants={{
                    hidden: { opacity: 0, width: 0, marginRight: 0 },
                    visible: {
                      opacity: 1,
                      width: "auto",
                      marginRight: i < LETTERS.length - 1 ? 2 : 0,
                    },
                  }}
                  transition={{
                    duration: 0.44,
                    delay: i * LETTER_STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </MotionSpan>
              ))}
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>

      <div className="brand-mark__subtitle-area">
        <AnimatePresence mode="wait">
          {expanded ? (
            <MotionDiv
              key="definition"
              className="brand-mark__definition"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              <div className="brand-mark__entry">
                <div className="brand-mark__entry-head">
                  <span className="brand-mark__word">opus</span>
                  <span className="brand-mark__pos">n.</span>
                  <span className="brand-mark__lang">Latin</span>
                </div>
                <span className="brand-mark__meaning">a body of work; a creative composition</span>
              </div>
              <div className="brand-mark__entry">
                <div className="brand-mark__entry-head">
                  <span className="brand-mark__word">opus</span>
                  <span className="brand-mark__pos">adj.</span>
                  <span className="brand-mark__lang">Romanian</span>
                </div>
                <span className="brand-mark__meaning">opposite; against the grain</span>
              </div>
            </MotionDiv>
          ) : (
            <MotionP
              key="tagline"
              className="brand-mark__tagline"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              human experience design
            </MotionP>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrandMark;
