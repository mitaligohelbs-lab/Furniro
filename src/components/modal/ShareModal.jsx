import { useState } from "react";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import { FaClipboardCheck } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";

import Vector from "../../assets/Vector.png";

const NGROK_URL = "https://trustless-louisa-voluptuously.ngrok-free.dev";

const ShareModal = ({ isOpen, isClose, name, id }) => {
  const shareUrl = `${NGROK_URL}/shop/${id}`;
  const shareText = `Check out ${name}`;
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (value) => {
    if (value === "whatsapp") {
      const text = `Check this product 👇\n ${shareUrl}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    } else if (value === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}`,
        "_blank",
      );
    } else if (value === "twitter") {
      const text = "Check this product 👇";
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text,
        )}&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
      );
    } else if (value === "Email") {
      const subject = "Check this product";
      const body = `Hey,\n\nLook at this:\n${shareUrl}`;
      window.open(
        `mailto:?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`,
        "_blank",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 h-30 flex justify-end">
      <div className="absolute insert-0 bg-black/50" onClick={isClose}></div>
      <div className="w-2xs rounded-lg bg-white text-black shadow-xl p-4 flex flex-col items-center space-y-4 absolute top-55 right-8">
        <img
          src={Vector}
          alt="remove"
          className="mx-auto cursor-pointer w-5 h-5 absolute top-2 right-3"
          onClick={isClose}
        />

        <div className="flex justify-center items-center   gap-5 pt-3">
          <WhatsappShareButton url={shareUrl} title={shareText}>
            <WhatsappIcon
              round={true}
              size={35}
              onClick={() => handleShare("whatsapp")}
            />
            <span className="text-sm">Whatsapp</span>
          </WhatsappShareButton>

          <FacebookShareButton url={shareUrl} title={shareText}>
            <FacebookIcon
              round={true}
              size={35}
              onClick={() => handleShare("facebook")}
            />
            <span className="text-sm"> Facebook</span>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={shareText}>
            <TwitterIcon
              round={true}
              size={35}
              onClick={() => handleShare("twitter")}
            />
            <span className="text-sm">Twitter</span>
          </TwitterShareButton>

          <EmailShareButton url={shareUrl} title={shareText}>
            <EmailIcon
              size={35}
              round={true}
              className="text-red-400 cursor-pointer"
              onClick={() => handleShare("Email")}
            />
            <span className="text-sm">Gmail</span>
          </EmailShareButton>
        </div>

        <button
          className="px-4 py-2 bg-blue-400 text-white rounded-md flex items-center gap-2"
          onClick={handleClick}
        >
          {copied ? (
            <FaClipboardCheck size={24} />
          ) : (
            <FaRegClipboard size={16} />
          )}
          {copied ? "Copied" : " Copy URL"}
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
