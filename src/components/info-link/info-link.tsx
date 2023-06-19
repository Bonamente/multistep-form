import cn from 'classnames';

import style from './info-link.module.css';

interface InfoLinkProps {
  linkText: string;
  linkUrl: string;
  Icon: React.FC;
}

const InfoLink: React.FC<InfoLinkProps> = ({ linkText, linkUrl, Icon }) => (
  <div className={cn(style.wrapper)}>
    <Icon />
    <div className={cn(style.linkContainer)}>
      <a className={cn(style.link)} href={linkUrl}>
        {linkText}
      </a>
    </div>
  </div>
);

export default InfoLink;
