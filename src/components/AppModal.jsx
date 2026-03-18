import { motion, AnimatePresence } from "framer-motion";
import "./AppModal.css";

const APP_CONTENT = {
  loop: {
    id: "loop",
    name: "Loop",
    subtitle: "Meditation Timer",
    description:
      "A meditation timer you own forever. Set a duration. Choose a sound or silence. Tap play. One-time purchase, all features included.",
    state: "available",
    websiteUrl: "https://opusloop.co",
    appStoreUrl: "https://apps.apple.com/app/opus-loop-meditation-timer/id6740513432",
  },
  first: {
    id: "first",
    name: "1st\u00B0",
    subtitle: "Your inner circle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis placerat elit, vitae pulvinar sem volutpat a. Launching soon.",
    state: "coming-soon",
  },
  contact: {
    id: "contact",
    name: "Contact",
    subtitle: "OPUS",
    state: "contact",
  },
};

const ICON_SETTLE_DURATION = 0.55;
const BOX_EXPAND_DELAY = 0.35;

const ModalGlyph = ({ type }) => {
  if (type === "loop") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <g clipPath="url(#modalLoopClip)">
          <path d="M66.9993 100.522C70.0569 102.369 73.4701 103.682 77.1086 104.333C76.7095 104.802 76.2858 105.261 75.8401 105.707L62.6409 118.907C61.1829 120.365 58.8186 120.365 57.3606 118.907L44.1604 105.707C43.7159 105.263 43.2941 104.803 42.8948 104.332C46.5379 103.68 49.951 102.369 53.0061 100.527L60.0002 107.519L66.9993 100.522ZM99.51 104.806C92.0054 111.436 83.2334 115.858 74.0383 118.071L81.1203 110.988L81.8371 110.245C83.4075 108.564 84.7531 106.736 85.8694 104.804L99.51 104.806ZM34.1311 104.804C35.4137 107.024 37 109.106 38.8811 110.988L45.9592 118.071C36.7655 115.857 27.995 111.435 20.4914 104.806L34.1311 104.804ZM9.01292 81.1193L9.80003 81.8772L10.593 82.5822C12.0441 83.8289 13.5872 84.919 15.1985 85.8488L15.1975 99.5129C8.56559 92.0075 4.1428 83.2339 1.92894 74.0373L9.01292 81.1193ZM118.072 74.0373C115.859 83.2324 111.437 92.0044 104.807 99.509L104.805 85.8684C107.025 84.5857 109.107 83.0004 110.989 81.1193L118.072 74.0373ZM25.6809 73.1994L26.3743 73.8615L27.0315 74.4338C28.6451 75.7862 30.3951 76.8799 32.2278 77.715C30.3056 81.6554 29.2268 86.0887 29.2268 90.7736C33.9012 90.7736 38.3253 89.6998 42.2649 87.7854C43.339 90.1544 44.8533 92.3719 46.801 94.3195L47.509 95.0295C44.5216 96.5054 41.1574 97.3342 37.5998 97.3342H22.6662V82.4006C22.6662 78.843 23.4951 75.4788 24.9709 72.4914L25.6809 73.1994ZM95.0305 72.4914C96.3897 75.2427 97.1999 78.3136 97.3196 81.5607L97.3352 82.4006V97.3342H82.4016C78.844 97.3342 75.4798 96.5053 72.4924 95.0295L73.2004 94.3195L73.7834 93.7141C75.4526 91.9171 76.7723 89.913 77.7424 87.7883C81.6761 89.6995 86.1002 90.7736 90.7746 90.7736C90.7746 86.0992 89.7007 81.6751 87.7864 77.7356C90.159 76.6584 92.3758 75.1442 94.3205 73.1994L95.0305 72.4914ZM64.2629 73.0285C66.4679 74.9927 69.2009 76.3764 72.2151 76.9533C72.6578 81.2631 71.2259 85.7335 67.9201 89.0393L60.0002 96.9592L52.0803 89.0393C48.7748 85.7336 47.3427 81.2636 47.7844 76.9494C50.7992 76.3754 53.5326 74.9931 55.7453 73.0344C56.1306 76.2226 57.5512 79.3109 60.0002 81.76C62.4503 79.3099 63.8714 76.2202 64.2629 73.0285ZM104.984 43.466L105.708 44.1594L118.908 57.3596C120.254 58.7054 120.358 60.8237 119.219 62.2883L118.908 62.6398L105.708 75.8391C105.259 76.2884 104.795 76.7152 104.319 77.1184C103.66 73.4717 102.349 70.0596 100.512 67.007L107.52 59.9992L100.527 53.0061C102.37 49.9499 103.683 46.5368 104.334 42.8947L104.984 43.466ZM15.6868 42.8781C16.3441 46.5275 17.6541 49.9401 19.4905 52.9924L12.4817 59.9992L19.4748 66.9924C17.6307 70.0489 16.3189 73.463 15.6672 77.1057L15.0178 76.5334L14.2932 75.8391L1.093 62.6398C-0.252856 61.294 -0.356349 59.1757 0.782454 57.7111L1.093 57.3596L14.2932 44.1594C14.7436 43.709 15.209 43.2821 15.6868 42.8781ZM30.9612 52.0793C34.2669 48.7738 38.7368 47.3416 43.051 47.7834L43.0803 47.9592C43.6764 50.9084 45.0453 53.5773 46.966 55.7463C43.778 56.1296 40.6895 57.5503 38.2405 59.9992C40.6905 62.4493 43.7801 63.8704 46.9719 64.2619C45.0069 66.4651 43.6228 69.1963 43.0461 72.2141C38.9911 72.6307 34.7934 71.3872 31.5578 68.4846L30.9612 67.9191L23.0412 59.9992L30.9612 52.0793ZM76.9543 47.7844C81.0097 47.3684 85.208 48.6112 88.4436 51.5139L89.0403 52.0793L96.9602 59.9992L89.0403 67.9191C85.7346 71.2248 81.2647 72.6568 76.9504 72.215C76.3767 69.1965 74.9934 66.4644 73.0354 64.2531C76.2214 63.87 79.311 62.4492 81.761 59.9992C79.3109 57.5493 76.2212 56.129 73.0295 55.7375C74.9948 53.5309 76.3777 50.798 76.9543 47.7844ZM60.0022 50.0002C65.5251 50.0002 70.0022 54.4773 70.0022 60.0002C70.0021 65.5231 65.5251 70.0002 60.0022 70.0002C54.4794 70.0001 50.0023 65.523 50.0022 60.0002C50.0022 54.4773 54.4794 50.0003 60.0022 50.0002ZM37.5998 22.6652C41.1574 22.6652 44.5216 23.4941 47.509 24.9699L46.801 25.6799L46.218 26.2844C44.5487 28.0814 43.2291 30.0863 42.259 32.2111C38.3253 30.2998 33.9013 29.2258 29.2268 29.2258C29.2268 33.9003 30.3006 38.3242 32.2151 42.2639C29.8424 43.341 27.6257 44.8552 25.6809 46.8L24.9709 47.508C23.6117 44.7567 22.8006 41.6858 22.6809 38.4387L22.6662 37.5988V22.6652H37.5998ZM97.3352 37.5988C97.3352 41.1564 96.5064 44.5206 95.0305 47.508L94.3205 46.8L93.6272 46.1379L92.969 45.5647C91.3556 44.2125 89.6061 43.1195 87.7737 42.2844C89.6958 38.344 90.7746 33.9107 90.7746 29.2258C86.1002 29.2258 81.6762 30.2996 77.7366 32.2141C76.6624 29.8449 75.1482 27.6276 73.2004 25.6799L72.4924 24.9699C75.4798 23.4941 78.844 22.6652 82.4016 22.6652H97.3352V37.5988ZM67.9201 30.9602C71.2259 34.2659 72.6578 38.7356 72.216 43.05C69.2003 43.6243 66.4662 45.0073 64.2532 46.967C63.8711 43.7793 62.4503 40.6895 60.0002 38.2395C57.5504 40.6894 56.13 43.7793 55.7385 46.9709C53.5318 45.0058 50.7988 43.6218 47.7854 43.0451C47.3428 38.7356 48.7748 34.2658 52.0803 30.9602L60.0002 23.0402L67.9201 30.9602ZM15.1985 34.1291C12.9776 35.4119 10.8945 36.9985 9.01292 38.8801L1.92992 45.9582C4.1441 36.7628 8.56728 27.991 15.1985 20.4865V34.1291ZM104.807 20.4895C111.436 27.9931 115.858 36.7643 118.072 45.9582L110.989 38.8801L110.2 38.1223L109.407 37.4162C107.957 36.1705 106.416 35.0819 104.806 34.1525L104.807 20.4895ZM57.3606 1.092C58.8186 -0.36592 61.1829 -0.365983 62.6409 1.092L75.8401 14.2922C76.2846 14.7367 76.7073 15.195 77.1067 15.6662C73.4638 16.3185 70.0513 17.6303 66.9963 19.4729L60.0002 12.4807L53.0002 19.4758C49.9443 17.6296 46.5329 16.3189 42.8967 15.6672C43.2921 15.198 43.7148 14.7378 44.1604 14.2922L57.3606 1.092ZM38.8811 9.01192L38.1643 9.75313C36.5934 11.4352 35.2476 13.2637 34.1311 15.1965L20.4875 15.1975C27.992 8.56627 36.7638 4.14309 45.9592 1.92891L38.8811 9.01192ZM74.0383 1.92793C83.2349 4.14179 92.0085 8.56458 99.5139 15.1965L85.8713 15.1975C84.5885 12.9766 83.0019 10.8935 81.1203 9.01192L74.0383 1.92793Z" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="modalLoopClip">
            <rect width="120" height="120" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {type === "first" ? (
        <>
          <rect x="65" y="77" width="12" height="33" fill="currentColor" />
          <rect x="87" y="65" width="12" height="45" fill="currentColor" />
          <rect x="43" y="55" width="12" height="32" fill="currentColor" />
          <rect x="43" y="10" width="12" height="33" fill="currentColor" />
          <rect x="21" y="10" width="12" height="100" fill="currentColor" />
          <rect x="99" y="10" width="11" height="33" fill="currentColor" />
          <rect x="43" y="110" width="11" height="34" transform="rotate(-90 43 110)" fill="currentColor" />
          <rect x="43" y="87" width="10" height="34" transform="rotate(-90 43 87)" fill="currentColor" />
          <rect x="10" y="110" width="11" height="33" transform="rotate(-90 10 110)" fill="currentColor" />
          <rect x="10" y="21" width="11" height="23" transform="rotate(-90 10 21)" fill="currentColor" />
          <rect x="43" y="65" width="10" height="34" transform="rotate(-90 43 65)" fill="currentColor" />
          <rect x="77" y="65" width="10" height="33" transform="rotate(-90 77 65)" fill="currentColor" />
          <rect x="43" y="43" width="10" height="67" transform="rotate(-90 43 43)" fill="currentColor" />
          <rect x="43" y="21" width="11" height="67" transform="rotate(-90 43 21)" fill="currentColor" />
        </>
      ) : (
        <text x="60" y="78" textAnchor="middle" fontSize="76" fontWeight="400" fill="currentColor" fontFamily="Inter, sans-serif">@</text>
      )}
    </svg>
  );
};

const ContactLinkIcon = ({ type }) => {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4" y="4" width="16" height="16" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3.5" y="6" width="17" height="12" rx="3.5" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.2l5.2 2.8L10 14.8V9.2z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 8l7.5 5.2L19.5 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const AppModal = ({ appId, onClose }) => {
  const app = APP_CONTENT[appId];
  const MotionDiv = motion.div;

  return (
    <AnimatePresence>
      {app ? (
        <MotionDiv
          className="app-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          onClick={onClose}
        >
          <MotionDiv
            className={`app-modal${app.id === "contact" ? " app-modal--contact" : ""}`}
            initial={{
              opacity: 0,
              clipPath: "inset(0 100% 100% 0 round 20px)",
            }}
            animate={{
              opacity: 1,
              clipPath: "inset(0 0% 0% 0 round 20px)",
              transition: {
                delay: BOX_EXPAND_DELAY,
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            exit={{
              opacity: 0,
              clipPath: "inset(0 25% 25% 0 round 20px)",
              transition: {
                duration: 0.24,
                ease: [0.4, 0, 1, 1],
              },
            }}
            style={{ willChange: "clip-path, opacity" }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${app.name} details`}
          >
            <div className="app-modal__left">
              <div className="app-modal__head">
                <MotionDiv
                  className="app-modal__icon"
                  layoutId={`dock-icon-${app.id}`}
                  transition={{
                    layout: {
                      duration: ICON_SETTLE_DURATION,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                >
                  <span className="app-modal__icon-glyph">
                    <ModalGlyph type={app.id} />
                  </span>
                </MotionDiv>
                <div className="app-modal__info">
                  <h2>{app.name}</h2>
                  <p className="app-modal__subtitle">{app.subtitle}</p>
                </div>
              </div>

              {app.state === "contact" ? (
                <>
                  <div className="app-modal__contact-links">
                    <a
                      href="https://www.instagram.com/opus.ro"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <ContactLinkIcon type="instagram" />
                    </a>
                    <a
                      href="https://www.youtube.com/@opusro"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      title="YouTube"
                    >
                      <ContactLinkIcon type="youtube" />
                    </a>
                    <a
                      href="mailto:hello@opus.ro"
                      aria-label="Email"
                      title="Email"
                    >
                      <ContactLinkIcon type="email" />
                    </a>
                  </div>
                  <p className="app-modal__origin">With ❤️ from Romania</p>
                  <p className="app-modal__legal">Copyright © 2026 OPUSCULUM SRL. All rights reserved.</p>
                </>
              ) : (
                <>
                  <p className="app-modal__desc">{app.description}</p>
                  {app.state === "available" ? (
                    <div className="app-modal__actions">
                      <a href={app.appStoreUrl} target="_blank" rel="noreferrer">
                        App Store
                      </a>
                      <a href={app.websiteUrl} target="_blank" rel="noreferrer">
                        Website
                      </a>
                    </div>
                  ) : (
                    <span className="app-modal__coming-soon">Launching soon</span>
                  )}
                </>
              )}
            </div>

            {app.id !== "contact" && (
              <div className="app-modal__right" aria-hidden="true">
                {app.id === "loop" ? (
                  <video
                    className="app-modal__video"
                    src="/opusloop.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <div className="app-modal__placeholder">Coming soon</div>
                )}
              </div>
            )}
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
};

export default AppModal;
