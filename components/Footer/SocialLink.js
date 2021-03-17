import React from 'react';
import WhatsappIcon from '../../assets/svgs/NewWhatapp';
import Instagram from '../../assets/svgs/Instagram';
import TwitterIcon from '../../assets/svgs/Twitter';
import LinkedIn from '../../assets/svgs/LinkedIn';
import Facebook from '../../assets/svgs/facebook';
import TelegramIcon from '../../assets/svgs/telegram';
import YouTubeIcon from '../../assets/svgs/youtubeIcon';

const SocialLink = () => (
  <div className="navbar-social">
    <div className="social-container">
      <div className="social-item">
        <a href="https://twitter.com/tejimandiapp" target="__blank">
          <TwitterIcon />
        </a>
        <a
          target="__blank"
          href="https://api.whatsapp.com/send?phone=919324459287&text=Save%20our%20number%20+919324459287%20to%20your%20contacts%20and%20send%20this%20message%20to%20start"
        >
          <WhatsappIcon />
        </a>
        <a
          target="__blank"
          href="https://www.linkedin.com/company/tejimandiapp"
        >
          <LinkedIn />
        </a>
        <a
          target="__blank"
          href="https://www.facebook.com/TejiMandiInvest/"
        >
          <Facebook />
        </a>
        <a
          target="__blank"
          href="https://www.instagram.com/tejimandiapp"
        >
          <Instagram />
        </a>
        <a
          target="__blank"
          href="https://t.me/tejimandiapp"
        >

          <TelegramIcon />
        </a>
        <a
          target="__blank"
          href="https://www.youtube.com/channel/UC22aV3096SNSfweF7Io4NtQ?sub_confirmation=1"
        >
          <YouTubeIcon />
        </a>
      </div>
    </div>
  </div>
);

SocialLink.propTypes = {};

SocialLink.defaultProps = {};

export default SocialLink;
