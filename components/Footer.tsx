import Link from "next/link";

import Routes from "../routes";

interface FooterProps {
  scrollToTopSelector?: any;
}

export default function Footer(props: FooterProps) {
  const socialIconsSize = "18px";

  return (
    <div
      className={`container w-full flex flex-col sm:flex-row justify-between pt-16 pb-36 z-20 transition-colors duration-1000`}
    >
      <div className="flex flex-col-reverse gap-12 sm:gap-0 sm:flex-row">
        <div className="flex flex-col pr-24">
          <h3 className="pb-1 sm:pb-4">Contact</h3>
          <p>
            <a href="mailto:hello@spacetypeco.com">hello@spacetypeco.com</a>
          </p>
          <p>
            <a href="https://instagram.com/spacetypeco">Instagram</a>
          </p>
        </div>
        <div className="flex flex-col pr-24">
          <div className="flex flex-col pr-24">
            <h3 className="pb-1 sm:pb-4">Information</h3>
            <Link href={Routes.fonts.index}>
              <p>Fonts</p>
            </Link>
            <Link href={Routes.about}>
              <p>About</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
